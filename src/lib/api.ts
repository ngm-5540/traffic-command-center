import { supabase } from "@/integrations/supabase/client";

// ── Meta Ads API ──

export async function listMetaAdAccounts() {
  const { data, error } = await supabase.functions.invoke("fetch-meta-ads", {
    body: { action: "list_accounts" },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data.accounts as { id: string; name: string; account_status: number; currency: string }[];
}

export async function fetchMetaInsights(params: {
  adAccountId: string;
  since?: string;
  until?: string;
  datePreset?: string;
}) {
  const { data, error } = await supabase.functions.invoke("fetch-meta-ads", {
    body: {
      action: "fetch_insights",
      ad_account_id: params.adAccountId,
      since: params.since,
      until: params.until,
      date_preset: params.datePreset,
    },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as {
    campaigns: any[];
    account_insights: any;
    campaign_insights: any[];
  };
}

// ── Google Analytics (GA4) ──

export async function listGA4Properties() {
  const { data, error } = await supabase.functions.invoke("fetch-google-data", {
    body: { action: "list_ga4_properties" },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data.accountSummaries as {
    account: string;
    displayName: string;
    propertySummaries?: { property: string; displayName: string }[];
  }[];
}

export async function fetchGA4Data(params: {
  propertyId: string;
  startDate?: string;
  endDate?: string;
}) {
  const { data, error } = await supabase.functions.invoke("fetch-google-data", {
    body: {
      action: "fetch_ga4_data",
      property_id: params.propertyId,
      start_date: params.startDate,
      end_date: params.endDate,
    },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data.report;
}

// ── Google Ad Manager (GAM) ──

export async function fetchGAMRevenue(params: {
  startDate?: string;
  endDate?: string;
  countryIds?: string[];
}) {
  const { data, error } = await supabase.functions.invoke("fetch-google-data", {
    body: {
      action: "fetch_gam_revenue",
      start_date: params.startDate,
      end_date: params.endDate,
      country_ids: params.countryIds,
    },
  });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data.report;
}
