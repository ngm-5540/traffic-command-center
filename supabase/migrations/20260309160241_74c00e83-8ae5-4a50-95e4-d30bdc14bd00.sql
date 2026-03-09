
CREATE TABLE public.api_data_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL,
  cache_key text NOT NULL DEFAULT '',
  date_range text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  fetched_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (provider, cache_key, date_range)
);

ALTER TABLE public.api_data_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all select on api_data_cache" ON public.api_data_cache FOR SELECT TO public USING (true);
CREATE POLICY "Allow all insert on api_data_cache" ON public.api_data_cache FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow all update on api_data_cache" ON public.api_data_cache FOR UPDATE TO public USING (true);
CREATE POLICY "Allow all delete on api_data_cache" ON public.api_data_cache FOR DELETE TO public USING (true);
