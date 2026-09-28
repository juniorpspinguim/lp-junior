BEGIN;
CREATE TABLE public.crm_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  restaurant_name text NOT NULL CHECK(length(trim(restaurant_name)) BETWEEN 1 AND 160),
  contact_name text NOT NULL DEFAULT '' CHECK(length(contact_name)<=200),
  phone text NOT NULL DEFAULT '' CHECK(length(phone)<=200),
  email text NOT NULL DEFAULT '' CHECK(length(email)<=200),
  city text NOT NULL DEFAULT '' CHECK(length(city)<=200),
  niche text NOT NULL DEFAULT '' CHECK(length(niche)<=200),
  source text NOT NULL DEFAULT '' CHECK(length(source)<=200),
  stage text NOT NULL DEFAULT 'novo' CHECK(stage IN ('novo','diagnostico','reuniao','proposta','negociacao','ganho','perdido')),
  estimated_value numeric(12,2) NOT NULL DEFAULT 0 CHECK(estimated_value>=0 AND estimated_value<=99999999),
  proposal_slug text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(id,user_id)
);
CREATE TABLE public.crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES auth.users(id),
  contact_id uuid NOT NULL, title text NOT NULL CHECK(length(trim(title)) BETWEEN 1 AND 200),
  due_date date NOT NULL CHECK(due_date BETWEEN '2000-01-01' AND '2100-12-31'),
  completed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY(contact_id,user_id) REFERENCES public.crm_contacts(id,user_id)
);
CREATE TABLE public.crm_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES auth.users(id),
  contact_id uuid NOT NULL, kind text NOT NULL CHECK(kind IN ('nota','reuniao','ligacao','whatsapp','sistema')),
  body text NOT NULL CHECK(length(trim(body)) BETWEEN 1 AND 4000), created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY(contact_id,user_id) REFERENCES public.crm_contacts(id,user_id)
);
CREATE INDEX crm_contacts_owner ON public.crm_contacts(user_id,updated_at DESC);
CREATE INDEX crm_tasks_owner ON public.crm_tasks(user_id,due_date);
CREATE INDEX crm_events_owner ON public.crm_events(user_id,contact_id,created_at DESC);
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.crm_contacts,public.crm_tasks,public.crm_events FROM anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.crm_contacts,public.crm_tasks TO authenticated;
GRANT SELECT,INSERT ON public.crm_events TO authenticated;
CREATE POLICY crm_contacts_read ON public.crm_contacts FOR SELECT TO authenticated USING(user_id=(SELECT auth.uid()));
CREATE POLICY crm_contacts_insert ON public.crm_contacts FOR INSERT TO authenticated WITH CHECK(user_id=(SELECT auth.uid()) AND (proposal_slug IS NULL OR EXISTS(SELECT 1 FROM public.proposals p WHERE p.slug=proposal_slug AND p.user_id=(SELECT auth.uid()) AND p.deleted_at IS NULL)));
CREATE POLICY crm_contacts_update ON public.crm_contacts FOR UPDATE TO authenticated USING(user_id=(SELECT auth.uid())) WITH CHECK(user_id=(SELECT auth.uid()) AND (proposal_slug IS NULL OR EXISTS(SELECT 1 FROM public.proposals p WHERE p.slug=proposal_slug AND p.user_id=(SELECT auth.uid()))));
CREATE POLICY crm_tasks_owner ON public.crm_tasks FOR ALL TO authenticated USING(user_id=(SELECT auth.uid())) WITH CHECK(user_id=(SELECT auth.uid()));
CREATE POLICY crm_events_read ON public.crm_events FOR SELECT TO authenticated USING(user_id=(SELECT auth.uid()));
CREATE POLICY crm_events_insert ON public.crm_events FOR INSERT TO authenticated WITH CHECK(user_id=(SELECT auth.uid()) AND kind IN ('nota','reuniao','ligacao','whatsapp'));
CREATE FUNCTION public.crm_contact_before_write() RETURNS trigger LANGUAGE plpgsql SET search_path='' AS $$ BEGIN NEW.updated_at:=now(); IF TG_OP='UPDATE' AND (NEW.id IS DISTINCT FROM OLD.id OR NEW.user_id IS DISTINCT FROM OLD.user_id) THEN RAISE EXCEPTION 'Identidade do contato nao pode ser alterada'; END IF; RETURN NEW; END; $$;
CREATE TRIGGER crm_contact_before_write BEFORE UPDATE ON public.crm_contacts FOR EACH ROW EXECUTE FUNCTION public.crm_contact_before_write();
CREATE FUNCTION public.crm_log_change() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path='' AS $$
DECLARE message text; contact uuid;
BEGIN
  IF TG_TABLE_NAME='crm_contacts' THEN
    contact:=NEW.id;
    IF TG_OP='INSERT' THEN message:='Contato cadastrado.';
    ELSIF NEW.stage IS DISTINCT FROM OLD.stage THEN message:='Etapa: '||OLD.stage||' → '||NEW.stage||'.';
    ELSE message:='Cadastro atualizado.'; END IF;
  ELSE
    contact:=NEW.contact_id;
    IF TG_OP='UPDATE' AND (NEW.contact_id IS DISTINCT FROM OLD.contact_id OR NEW.user_id IS DISTINCT FROM OLD.user_id OR NEW.id IS DISTINCT FROM OLD.id) THEN RAISE EXCEPTION 'Identidade da tarefa nao pode ser alterada'; END IF;
    IF TG_OP='INSERT' THEN message:='Retorno agendado: '||NEW.title||' • '||to_char(NEW.due_date,'DD/MM/YYYY');
    ELSIF NEW.completed_at IS DISTINCT FROM OLD.completed_at THEN message:=CASE WHEN NEW.completed_at IS NULL THEN 'Retorno reaberto: ' ELSE 'Retorno concluido: ' END||NEW.title;
    ELSE message:='Retorno atualizado: '||NEW.title; END IF;
  END IF;
  INSERT INTO public.crm_events(user_id,contact_id,kind,body) VALUES(NEW.user_id,contact,'sistema',message);
  RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.crm_log_change(),public.crm_contact_before_write() FROM PUBLIC;
CREATE TRIGGER crm_contacts_log AFTER INSERT OR UPDATE ON public.crm_contacts FOR EACH ROW EXECUTE FUNCTION public.crm_log_change();
CREATE TRIGGER crm_tasks_log AFTER INSERT OR UPDATE ON public.crm_tasks FOR EACH ROW EXECUTE FUNCTION public.crm_log_change();
COMMIT;
