BEGIN;
LOCK TABLE public.proposals IN ACCESS EXCLUSIVE MODE;
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS proposal_number integer;
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS proposal_year integer;
CREATE TABLE IF NOT EXISTS public.proposal_year_counters (
  year integer PRIMARY KEY,
  last_number integer NOT NULL
);
ALTER TABLE public.proposal_year_counters ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.proposal_year_counters FROM anon, authenticated;
WITH numbered AS (
  SELECT id, extract(year FROM created_at AT TIME ZONE 'America/Bahia')::integer AS year,
    row_number() OVER (PARTITION BY extract(year FROM created_at AT TIME ZONE 'America/Bahia') ORDER BY created_at, id)::integer AS number
  FROM public.proposals
)
UPDATE public.proposals p SET proposal_year = n.year,
  proposal_number = n.number + CASE WHEN n.year = 2026 THEN 100 ELSE 0 END
FROM numbered n WHERE p.id = n.id AND p.proposal_number IS NULL;
INSERT INTO public.proposal_year_counters(year, last_number)
SELECT proposal_year, max(proposal_number) FROM public.proposals GROUP BY proposal_year
ON CONFLICT(year) DO UPDATE SET last_number = greatest(public.proposal_year_counters.last_number, excluded.last_number);
CREATE UNIQUE INDEX IF NOT EXISTS proposals_year_number_unique ON public.proposals(proposal_year, proposal_number);
CREATE OR REPLACE FUNCTION public.assign_proposal_number() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE y integer := extract(year FROM CURRENT_TIMESTAMP AT TIME ZONE 'America/Bahia')::integer;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW.proposal_number IS DISTINCT FROM OLD.proposal_number OR NEW.proposal_year IS DISTINCT FROM OLD.proposal_year THEN
      RAISE EXCEPTION 'O número da proposta não pode ser alterado.';
    END IF;
    RETURN NEW;
  END IF;
  INSERT INTO public.proposal_year_counters(year, last_number)
  VALUES (y, CASE WHEN y = 2026 THEN 101 ELSE 1 END)
  ON CONFLICT(year) DO UPDATE SET last_number = public.proposal_year_counters.last_number + 1
  RETURNING last_number INTO NEW.proposal_number;
  NEW.proposal_year := y;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.assign_proposal_number() FROM PUBLIC;
CREATE OR REPLACE TRIGGER assign_proposal_number BEFORE INSERT OR UPDATE ON public.proposals
FOR EACH ROW EXECUTE FUNCTION public.assign_proposal_number();
ALTER TABLE public.proposals ALTER COLUMN proposal_number SET NOT NULL;
ALTER TABLE public.proposals ALTER COLUMN proposal_year SET NOT NULL;
COMMIT;
