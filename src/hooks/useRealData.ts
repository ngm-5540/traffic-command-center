import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { listMetaAdAccounts, fetchMetaInsights, listGA4Properties, fetchGA4Data, fetchGAMRevenue } from "@/lib/api";
import type { DashboardProject } from "@/data/dashboardData";
import type { DateRange } from "react-day-picker";

interface IntegrationConfig {
  meta_ad_account_id?: string;
  ga4_property_id?: string;
}

function getStoredConfig(): IntegrationConfig {
  try {
    const raw = localStorage.getItem("integration_config");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveIntegrationConfig(config: IntegrationConfig) {
  localStorage.setItem("integration_config", JSON.stringify(config));
}

export function useIntegrationConfig() {
  const [config, setConfig] = useState<IntegrationConfig>(getStoredConfig);

  const update = useCallback((patch: Partial<IntegrationConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      saveIntegrationConfig(next);
      return next;
    });
  }, []);

  return { config, update };
}

// ── Meta Ad Accounts Discovery ──
export function useMetaAdAccounts() {
  return useQuery({
    queryKey: ["meta-ad-accounts"],
    queryFn: listMetaAdAccounts,
    retry: 1,
    staleTime: 1000 * 60 * 30,
  });
}

// ── GA4 Properties Discovery ──
export function useGA4Properties() {
  return useQuery({
    queryKey: ["ga4-properties"],
    queryFn: listGA4Properties,
    retry: 1,
    staleTime: 1000 * 60 * 30,
  });
}

// ── DB Projects + Mappings ──

interface DbProject {
  id: string;
  name: string;
  type: string;
}

interface DbProjectAdAccount {
  project_id: string;
  ad_account_id: string;
  platform: string;
}

export function useDbProjects() {
  return useQuery({
    queryKey: ["db-projects"],
    queryFn: async () => {
      const { data: projects, error: pErr } = await supabase
        .from("projects")
        .select("id, name, type");
      if (pErr) throw new Error(pErr.message);

      const { data: mappings, error: mErr } = await supabase
        .from("project_ad_accounts")
        .select("project_id, ad_account_id, platform");
      if (mErr) throw new Error(mErr.message);

      return {
        projects: (projects || []) as DbProject[],
        mappings: (mappings || []) as DbProjectAdAccount[],
      };
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ── Real Dashboard Data ──

function formatDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function useRealDashboardData(dateRange?: DateRange) {
  const config = getStoredConfig();
  const ga4PropertyId = config.ga4_property_id;

  const since = dateRange?.from ? formatDate(dateRange.from) : undefined;
  const until = dateRange?.to ? formatDate(dateRange.to) : since;

  // Fetch projects and their ad account mappings from DB
  const dbQuery = useDbProjects();
  const dbProjects = dbQuery.data?.projects || [];
  const dbMappings = dbQuery.data?.mappings || [];

  // Collect unique Meta ad account IDs from mappings
  const metaAdAccountIds = useMemo(() => {
    return [...new Set(
      dbMappings
        .filter((m) => m.platform === "meta")
        .map((m) => m.ad_account_id)
    )];
  }, [dbMappings]);

  // Fetch Meta insights for ALL mapped ad accounts
  const metaQueries = useQuery({
    queryKey: ["meta-insights-all", metaAdAccountIds, since, until],
    queryFn: async () => {
      const results: Record<string, any> = {};
      await Promise.all(
        metaAdAccountIds.map(async (accountId) => {
          try {
            const data = await fetchMetaInsights({ adAccountId: accountId, since, until });
            results[accountId] = data;
          } catch (err) {
            console.error(`Meta insights error for ${accountId}:`, err);
            results[accountId] = { campaign_insights: [] };
          }
        })
      );
      return results;
    },
    enabled: metaAdAccountIds.length > 0 && !!since,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // GAM Revenue (non-blocking — returns empty on failure)
  const gamQuery = useQuery({
    queryKey: ["gam-revenue", since, until],
    queryFn: async () => {
      try {
        // Fetch GAM rev share from credentials
        const { data: gamCred } = await supabase
          .from("integration_credentials")
          .select("credentials")
          .eq("provider", "gam")
          .single();
        const revSharePct = parseFloat((gamCred?.credentials as any)?.revShare || "0");

        const report = await fetchGAMRevenue({ startDate: since, endDate: until });
        return { ...report, revSharePct };
      } catch (err) {
        console.warn("GAM revenue fetch failed (non-blocking):", err);
        return { rows: [], revSharePct: 0 };
      }
    },
    enabled: !!since,
    retry: 0,
    staleTime: 1000 * 60 * 5,
  });

  // GA4 Sessions
  const ga4Query = useQuery({
    queryKey: ["ga4-data", ga4PropertyId, since, until],
    queryFn: () =>
      fetchGA4Data({
        propertyId: ga4PropertyId!,
        startDate: since,
        endDate: until,
      }),
    enabled: !!ga4PropertyId && !!since,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // Build project-level aggregation
  const projects: DashboardProject[] = useMemo(() => {
    if (!dbProjects.length) return [];

    const metaData = metaQueries.data || {};
    const result: DashboardProject[] = [];

    for (const proj of dbProjects) {
      // Find ad accounts mapped to this project
      const projectMappings = dbMappings.filter((m) => m.project_id === proj.id);
      const projectMetaAccounts = projectMappings
        .filter((m) => m.platform === "meta")
        .map((m) => m.ad_account_id);

      let totalSpend = 0;
      let totalRevenue = 0;
      let totalLeads = 0;

      // Aggregate all campaigns from all mapped ad accounts
      for (const accountId of projectMetaAccounts) {
        const accountData = metaData[accountId];
        if (!accountData?.campaign_insights) continue;

        for (const ci of accountData.campaign_insights) {
          totalSpend += parseFloat(ci.spend || "0");

          // Revenue from purchase actions
          if (ci.action_values) {
            for (const av of ci.action_values) {
              if (
                av.action_type === "offsite_conversion.fb_pixel_purchase" ||
                av.action_type === "purchase" ||
                av.action_type === "omni_purchase"
              ) {
                totalRevenue += parseFloat(av.value || "0");
              }
            }
          }

          // Leads
          if (ci.actions) {
            for (const a of ci.actions) {
              if (
                a.action_type === "lead" ||
                a.action_type === "offsite_conversion.fb_pixel_lead" ||
                a.action_type === "onsite_conversion.lead_grouped"
              ) {
                totalLeads += parseInt(a.value || "0");
              }
            }
          }
        }
      }

      const totalProfit = totalRevenue - totalSpend;
      const roas = totalSpend > 0 ? (totalRevenue - totalSpend) / totalSpend : 0;

      // Map project type to vertical
      const verticalMap: Record<string, "chatbot" | "meta_ads" | "google_ads"> = {
        chatbot: "chatbot",
        meta_ads: "meta_ads",
        google_ads: "google_ads",
      };

      result.push({
        id: proj.id,
        name: proj.name,
        vertical: verticalMap[proj.type] || "chatbot",
        status: "ativo",
        type: proj.type,
        revenue: totalRevenue,
        spend: totalSpend,
        profit: totalProfit,
        roas,
        sessions: 0,
        leads: totalLeads,
      });
    }

    // Distribute GA4 sessions proportionally
    let totalSessions = 0;
    if (ga4Query.data?.rows) {
      for (const row of ga4Query.data.rows) {
        totalSessions += parseInt(row.metricValues?.[0]?.value || "0");
      }
      const allSpend = result.reduce((s, p) => s + p.spend, 0);
      if (allSpend > 0) {
        for (const p of result) {
          p.sessions = Math.round((p.spend / allSpend) * totalSessions);
        }
      }
    }

    // GAM revenue override (with rev share discount)
    let gamTotalRevenue = 0;
    const revSharePct = gamQuery.data?.revSharePct || 0;
    if (gamQuery.data?.rows) {
      for (const row of gamQuery.data.rows) {
        const revenueCol = row.dimensionValues ? row.metricValues : null;
        if (revenueCol) {
          gamTotalRevenue += parseFloat(revenueCol[2]?.value || "0") / 1_000_000;
        }
      }
      // Apply rev share discount: publisher keeps (100 - revShare)%
      if (revSharePct > 0) {
        gamTotalRevenue = gamTotalRevenue * (1 - revSharePct / 100);
      }
    }
    if (gamTotalRevenue > 0) {
      const allSpend = result.reduce((s, p) => s + p.spend, 0);
      for (const p of result) {
        const share = allSpend > 0 ? p.spend / allSpend : 1 / result.length;
        p.revenue = gamTotalRevenue * share;
        p.profit = p.revenue - p.spend;
        p.roas = p.spend > 0 ? (p.revenue - p.spend) / p.spend : 0;
      }
    }

    return result;
  }, [dbProjects, dbMappings, metaQueries.data, ga4Query.data, gamQuery.data]);

  const isConfigured = dbProjects.length > 0;
  const isLoading = dbQuery.isLoading || metaQueries.isLoading || gamQuery.isLoading || ga4Query.isLoading;
  const errors = [
    dbQuery.error?.message,
    metaQueries.error?.message,
    gamQuery.error?.message,
    ga4Query.error?.message,
  ].filter(Boolean);

  return {
    projects,
    isConfigured,
    isLoading,
    errors,
    refetch: () => {
      dbQuery.refetch();
      metaQueries.refetch();
      gamQuery.refetch();
      ga4Query.refetch();
    },
  };
}
