
-- Projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'chatbot',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all select on projects" ON public.projects FOR SELECT TO public USING (true);
CREATE POLICY "Allow all insert on projects" ON public.projects FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow all update on projects" ON public.projects FOR UPDATE TO public USING (true);

-- Mapping: which ad accounts belong to which project
CREATE TABLE public.project_ad_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  ad_account_id text NOT NULL,
  platform text NOT NULL DEFAULT 'meta',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, ad_account_id, platform)
);

ALTER TABLE public.project_ad_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all select on project_ad_accounts" ON public.project_ad_accounts FOR SELECT TO public USING (true);
CREATE POLICY "Allow all insert on project_ad_accounts" ON public.project_ad_accounts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow all update on project_ad_accounts" ON public.project_ad_accounts FOR UPDATE TO public USING (true);
CREATE POLICY "Allow all delete on project_ad_accounts" ON public.project_ad_accounts FOR DELETE TO public USING (true);

-- Trigger for updated_at on projects
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
