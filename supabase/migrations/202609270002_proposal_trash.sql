BEGIN;
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS plan_type text
CHECK (plan_type IN ('metodo_pinguim', 'metodo_marketplace', 'personalizado'));
CREATE INDEX IF NOT EXISTS proposals_trash_owner ON public.proposals(user_id, deleted_at);
-- Restrictive policy composes with existing policies; never grants new access.
CREATE POLICY proposals_trash_visibility ON public.proposals AS RESTRICTIVE FOR SELECT
TO anon, authenticated USING (deleted_at IS NULL OR user_id = (SELECT auth.uid()));
COMMIT;
