import { useState, useEffect, useCallback } from "react";
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
    staleTime: 1000 * 60 * 30, // 30 min
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

// ── Real Dashboard Data ──

function formatDate(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function useRealDashboardData(dateRange?: DateRange) {
  const config = getStoredConfig();
  const adAccountId = config.meta_ad_account_id;
  const ga4PropertyId = config.ga4_property_id;

  const since = dateRange?.from ? formatDate(dateRange.from) : undefined;
  const until = dateRange?.to ? formatDate(dateRange.to) : since;

  // Meta Ads insights
  const metaQuery = useQuery({
    queryKey: ["meta-insights", adAccountId, since, until],
    queryFn: () =>
      fetchMetaInsights({
        adAccountId: adAccountId!,
        since,
        until,
      }),
    enabled: !!adAccountId && !!since,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // GAM Revenue
  const gamQuery = useQuery({
    queryKey: ["gam-revenue", since, until],
    queryFn: () => fetchGAMRevenue({ startDate: since, endDate: until }),
    enabled: !!since,
    retry: 1,
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

  // Transform Meta campaigns + GAM revenue into DashboardProject format
  const projects: DashboardProject[] = [];

  if (metaQuery.data?.campaign_insights) {
    for (const ci of metaQuery.data.campaign_insights) {
      const spend = parseFloat(ci.spend || "0");

      // Extract purchase/conversion value from action_values
      let revenue = 0;
      if (ci.action_values) {
        for (const av of ci.action_values) {
          if (
            av.action_type === "offsite_conversion.fb_pixel_purchase" ||
            av.action_type === "purchase" ||
            av.action_type === "omni_purchase"
          ) {
            revenue += parseFloat(av.value || "0");
          }
        }
      }

      const profit = revenue - spend;
      const roas = spend > 0 ? (revenue - spend) / spend : 0;

      // Extract leads from actions
      let leads = 0;
      if (ci.actions) {
        for (const a of ci.actions) {
          if (
            a.action_type === "lead" ||
            a.action_type === "offsite_conversion.fb_pixel_lead" ||
            a.action_type === "onsite_conversion.lead_grouped"
          ) {
            leads += parseInt(a.value || "0");
          }
        }
      }

      projects.push({
        id: ci.campaign_id,
        name: ci.campaign_name,
        vertical: "meta_ads",
        status: "ativo",
        type: "Meta Ads",
        revenue,
        spend,
        profit,
        roas,
        sessions: 0,
        leads,
      });
    }
  }

  // Merge GA4 session data (totals for now)
  let totalSessions = 0;
  if (ga4Query.data?.rows) {
    for (const row of ga4Query.data.rows) {
      totalSessions += parseInt(row.metricValues?.[0]?.value || "0");
    }
    // Distribute sessions proportionally across projects
    const totalSpend = projects.reduce((s, p) => s + p.spend, 0);
    if (totalSpend > 0) {
      for (const p of projects) {
        p.sessions = Math.round((p.spend / totalSpend) * totalSessions);
      }
    }
  }

  // Add GAM revenue if available (override Meta revenue for revenue-from-GAM model)
  // TODO: When GAM data is structured per ad-unit, map to projects
  let gamTotalRevenue = 0;
  if (gamQuery.data?.rows) {
    for (const row of gamQuery.data.rows) {
      // GAM revenue is in micros (divide by 1,000,000)
      const revenueCol = row.dimensionValues ? row.metricValues : null;
      if (revenueCol) {
        gamTotalRevenue += parseFloat(revenueCol[2]?.value || "0") / 1_000_000;
      }
    }
  }

  // If GAM revenue is available, distribute it proportionally
  if (gamTotalRevenue > 0) {
    const totalSpend = projects.reduce((s, p) => s + p.spend, 0);
    for (const p of projects) {
      const share = totalSpend > 0 ? p.spend / totalSpend : 1 / projects.length;
      p.revenue = gamTotalRevenue * share;
      p.profit = p.revenue - p.spend;
      p.roas = p.spend > 0 ? (p.revenue - p.spend) / p.spend : 0;
    }
  }

  const isConfigured = !!adAccountId;
  const isLoading = metaQuery.isLoading || gamQuery.isLoading || ga4Query.isLoading;
  const errors = [
    metaQuery.error?.message,
    gamQuery.error?.message,
    ga4Query.error?.message,
  ].filter(Boolean);

  return {
    projects,
    isConfigured,
    isLoading,
    errors,
    refetch: () => {
      metaQuery.refetch();
      gamQuery.refetch();
      ga4Query.refetch();
    },
  };
}
