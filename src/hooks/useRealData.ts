import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { listMetaAdAccounts, listMetaBusinesses, fetchMetaInsights, listGA4Properties, fetchGA4Data, fetchGAMRevenue } from "@/lib/api";
import { cachedFetch } from "@/lib/apiCache";
import type { DashboardProject } from "@/data/dashboardData";
import type { DateRange } from "react-day-picker";

interface IntegrationConfig {
  meta_ad_account_id?: string;
  ga4_property_id?: string;
  usd_brl_rate?: string;
  bm_tax_rates?: Record<string, string>; // bmId -> tax %
  ad_account_tax_rates?: Record<string, string>; // adAccountId -> tax %
}

function getStoredConfig(): IntegrationConfig {
  try {
    const raw = localStorage.getItem("integration_config");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Custom event name for cross-component reactivity
const CONFIG_CHANGE_EVENT = "integration_config_changed";

export function saveIntegrationConfig(config: IntegrationConfig) {
  localStorage.setItem("integration_config", JSON.stringify(config));
  // Dispatch custom event so other hooks in the same tab re-read
  window.dispatchEvent(new CustomEvent(CONFIG_CHANGE_EVENT));
}

/** Reactive hook: re-reads localStorage whenever config is saved anywhere */
export function useReactiveConfig(): IntegrationConfig {
  const [config, setConfig] = useState<IntegrationConfig>(getStoredConfig);

  useEffect(() => {
    const handler = () => setConfig(getStoredConfig());
    window.addEventListener(CONFIG_CHANGE_EVENT, handler);
    window.addEventListener("storage", handler); // cross-tab
    return () => {
      window.removeEventListener(CONFIG_CHANGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return config;
}

export function useIntegrationConfig() {
  const config = useReactiveConfig();

  const update = useCallback((patch: Partial<IntegrationConfig>) => {
    const current = getStoredConfig();
    const next = { ...current, ...patch };
    saveIntegrationConfig(next);
  }, []);

  return { config, update };
}

// ── Meta Business Managers Discovery ──
export function useMetaBusinesses() {
  return useQuery({
    queryKey: ["meta-businesses"],
    queryFn: listMetaBusinesses,
    retry: 1,
    staleTime: 1000 * 60 * 30,
  });
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
  const config = useReactiveConfig();
  const ga4PropertyId = config.ga4_property_id;
  const bmTaxRates = config.bm_tax_rates || {};
  const adAccountTaxRates = config.ad_account_tax_rates || {};

  // Fetch BMs to build adAccount → BM mapping for tax
  const bmQuery = useMetaBusinesses();

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
            const data = await cachedFetch(
              "meta",
              accountId,
              since,
              until,
              () => fetchMetaInsights({ adAccountId: accountId, since, until })
            );
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
    staleTime: 1000 * 60 * 14,
  });

  // GAM Revenue (non-blocking — returns empty on failure)
  const gamQuery = useQuery({
    queryKey: ["gam-revenue", since, until],
    queryFn: async () => {
      try {
        const { data: gamCred } = await supabase
          .from("integration_credentials")
          .select("credentials")
          .eq("provider", "gam")
          .single();
        const revSharePct = parseFloat((gamCred?.credentials as any)?.revShare || "0");

        const report = await cachedFetch(
          "gam",
          "default",
          since,
          until,
          () => fetchGAMRevenue({ startDate: since, endDate: until })
        );
        return { ...report, revSharePct };
      } catch (err) {
        console.warn("GAM revenue fetch failed (non-blocking):", err);
        throw err; // Let React Query know this failed so it retries
      }
    },
    enabled: !!since,
    retry: 1,
    staleTime: 1000 * 60 * 14,
  });

  // GA4 Sessions
  const ga4Query = useQuery({
    queryKey: ["ga4-data", ga4PropertyId, since, until],
    queryFn: () => {
      if (!ga4PropertyId) return Promise.resolve(null);
      return cachedFetch(
        "ga4",
        ga4PropertyId,
        since,
        until,
        () => fetchGA4Data({
          propertyId: ga4PropertyId,
          startDate: since,
          endDate: until,
        })
      );
    },
    enabled: !!ga4PropertyId && !!since,
    retry: 1,
    staleTime: 1000 * 60 * 14,
  });

  // Build project-level aggregation

  const projects: DashboardProject[] = useMemo(() => {
    if (!dbProjects.length) return [];

    const metaData = metaQueries.data || {};

    // Build adAccountId → bmId reverse map for tax
    const adAccountToBm: Record<string, string> = {};
    if (bmQuery.data) {
      for (const bm of bmQuery.data) {
        for (const acc of bm.ad_accounts) {
          adAccountToBm[acc.id] = bm.id;
        }
      }
    }

    // GAM total revenue from utm_source=fb_vc rows
    let gamTotalRevenue = 0;
    const revSharePct = gamQuery.data?.revSharePct || 0;
    const usdBrlRate = parseFloat(config.usd_brl_rate || "5.1") || 5.1;
    if (gamQuery.data?.rows) {
      for (const row of gamQuery.data.rows) {
        const kvName = row.dimensionValues?.[0]?.stringValue || "";
        if (!kvName.includes("utm_source=fb_vc")) continue;
        const primaryValues = row.metricValueGroups?.[0]?.primaryValues;
        if (primaryValues) {
          gamTotalRevenue += parseFloat(primaryValues[4]?.doubleValue || primaryValues[4]?.intValue || "0");
        }
      }
      if (revSharePct > 0) gamTotalRevenue = gamTotalRevenue * (1 - revSharePct / 100);
      gamTotalRevenue = gamTotalRevenue * usdBrlRate;
    }

    const result: DashboardProject[] = [];

    for (const proj of dbProjects) {
      const projectMappings = dbMappings.filter((m) => m.project_id === proj.id);
      const projectMetaAccounts = projectMappings
        .filter((m) => m.platform === "meta")
        .map((m) => m.ad_account_id);

      let totalSpend = 0;
      let totalLeads = 0;

      for (const accountId of projectMetaAccounts) {
        const accountData = metaData[accountId];
        if (!accountData?.campaign_insights) continue;

        // Use direct ad_account tax mapping first, then BM mapping as fallback
        const directTax = adAccountTaxRates[accountId];
        const bmId = adAccountToBm[accountId];
        const taxPct = directTax ? parseFloat(directTax) || 0 : (bmId ? parseFloat(bmTaxRates[bmId] || "0") : 0);
        console.log(`[Dashboard Tax] accountId=${accountId}, directTax=${directTax}, bmId=${bmId}, taxPct=${taxPct}, adAccountTaxRates keys=`, Object.keys(adAccountTaxRates));

        for (const ci of accountData.campaign_insights) {
          const rawSpend = parseFloat(ci.spend || "0");
          totalSpend += rawSpend * (1 + taxPct / 100);

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
        revenue: 0,
        spend: totalSpend,
        profit: 0,
        roas: 0,
        sessions: 0,
        leads: totalLeads,
      });
    }

    // Distribute GAM utm_source=fb_vc revenue by spend share
    if (gamTotalRevenue > 0) {
      const allSpend = result.reduce((s, p) => s + p.spend, 0);
      for (const p of result) {
        const share = allSpend > 0 ? p.spend / allSpend : 1 / result.length;
        p.revenue = gamTotalRevenue * share;
        p.profit = p.revenue - p.spend;
        p.roas = p.spend > 0 ? (p.revenue - p.spend) / p.spend : 0;
      }
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

    return result;
  }, [dbProjects, dbMappings, metaQueries.data, ga4Query.data, gamQuery.data, bmQuery.data, bmTaxRates, adAccountTaxRates, config.usd_brl_rate]);

  const isConfigured = dbProjects.length > 0;
  const isLoading = dbQuery.isLoading || metaQueries.isLoading || gamQuery.isLoading || ga4Query.isLoading;
  const errors = [
    dbQuery.error?.message,
    metaQueries.error?.message,
    gamQuery.error?.message,
    ga4Query.error?.message,
  ].filter(Boolean);

  const refetchAll = useCallback(() => {
    dbQuery.refetch();
    metaQueries.refetch();
    gamQuery.refetch();
    ga4Query.refetch();
  }, [dbQuery, metaQueries, gamQuery, ga4Query]);

  // Synchronized refetch: all 3 sources refresh together every 15 min when date range includes today
  const includestoday = useMemo(() => {
    if (!until) return true;
    return until >= format(new Date(), "yyyy-MM-dd");
  }, [until]);

  useEffect(() => {
    if (!includestoday) return;
    const interval = setInterval(() => {
      console.log("[sync-refetch] Refreshing all sources simultaneously...");
      refetchAll();
    }, 1000 * 60 * 15);
    return () => clearInterval(interval);
  }, [includestoday, refetchAll]);

  return {
    projects,
    isConfigured,
    isLoading,
    errors,
    refetch: refetchAll,
  };
}

// ── Project Detail: campaign-level data for a specific project ──

export function useProjectCampaigns(projectId: string | undefined, dateRange?: DateRange) {
  const config = useReactiveConfig();
  const bmTaxRates = config.bm_tax_rates || {};
  const adAccountTaxRates = config.ad_account_tax_rates || {};
  const usdBrlRate = parseFloat(config.usd_brl_rate || "5.1") || 5.1;

  const since = dateRange?.from ? formatDate(dateRange.from) : undefined;
  const until = dateRange?.to ? formatDate(dateRange.to) : since;

  const dbQuery = useDbProjects();
  const dbMappings = dbQuery.data?.mappings || [];
  const bmQuery = useMetaBusinesses();

  const projectMetaAccounts = useMemo(() => {
    if (!projectId) return [];
    return dbMappings
      .filter((m) => m.project_id === projectId && m.platform === "meta")
      .map((m) => m.ad_account_id);
  }, [projectId, dbMappings]);

  // Fetch insights for project's ad accounts
  const metaQuery = useQuery({
    queryKey: ["project-meta-insights", projectMetaAccounts, since, until],
    queryFn: async () => {
      const results: Record<string, any> = {};
      await Promise.all(
        projectMetaAccounts.map(async (accountId) => {
          try {
            const data = await cachedFetch(
              "meta",
              accountId,
              since,
              until,
              () => fetchMetaInsights({ adAccountId: accountId, since, until })
            );
            results[accountId] = data;
          } catch (err) {
            console.error(`Meta insights error for ${accountId}:`, err);
            results[accountId] = { campaign_insights: [], adset_insights: [], ad_insights: [] };
          }
        })
      );
      return results;
    },
    enabled: projectMetaAccounts.length > 0 && !!since,
    retry: 1,
    staleTime: 1000 * 60 * 14,
  });

  // GAM revenue for ad-level matching
  const gamQuery = useQuery({
    queryKey: ["gam-revenue", since, until],
    queryFn: async () => {
      try {
        const { data: gamCred } = await supabase
          .from("integration_credentials")
          .select("credentials")
          .eq("provider", "gam")
          .single();
        const revSharePct = parseFloat((gamCred?.credentials as any)?.revShare || "0");
        const report = await cachedFetch(
          "gam", "default", since, until,
          () => fetchGAMRevenue({ startDate: since, endDate: until })
        );
        return { ...report, revSharePct };
      } catch (err) {
        console.warn("GAM revenue fetch failed (non-blocking):", err);
        throw err;
      }
    },
    enabled: !!since,
    retry: 1,
    staleTime: 1000 * 60 * 14,
  });

  // Build adAccount → BM map
  const adAccountToBm: Record<string, string> = useMemo(() => {
    const map: Record<string, string> = {};
    if (bmQuery.data) {
      for (const bm of bmQuery.data) {
        for (const acc of bm.ad_accounts) {
          map[acc.id] = bm.id;
        }
      }
    }
    return map;
  }, [bmQuery.data]);

  // Build GAM ad_id → revenue map
  const gamAdRevenueMap: Record<string, number> = useMemo(() => {
    const map: Record<string, number> = {};
    const revSharePct = gamQuery.data?.revSharePct || 0;
    if (!gamQuery.data?.rows) return map;

    for (const row of gamQuery.data.rows) {
      const kvName = row.dimensionValues?.[0]?.stringValue || "";
      if (!kvName.startsWith("utm_content=")) continue;
      const match = kvName.match(/_aut_(\d+)_vc_/);
      if (!match) continue;

      const adId = match[1];
      const primaryValues = row.metricValueGroups?.[0]?.primaryValues;
      if (!primaryValues) continue;

      let rev = parseFloat(primaryValues[4]?.doubleValue || primaryValues[4]?.intValue || "0");
      if (revSharePct > 0) rev = rev * (1 - revSharePct / 100);
      rev = rev * usdBrlRate;

      map[adId] = (map[adId] || 0) + rev;
    }
    return map;
  }, [gamQuery.data, usdBrlRate]);

  // Build full hierarchy: campaign → adset → ad with GAM revenue per ad
  const campaigns = useMemo(() => {
    const metaData = metaQuery.data || {};

    // Collect all ads with their hierarchy info
    interface AdEntry {
      adId: string;
      adName: string;
      adsetId: string;
      adsetName: string;
      campaignId: string;
      campaignName: string;
      spend: number;
      impressions: number;
      clicks: number;
      revenue: number;
    }

    const allAds: AdEntry[] = [];

    // Helper to get tax % for a given ad account
    const getTaxPct = (accountId: string): number => {
      // Primary: direct ad_account → tax mapping (stored in localStorage)
      if (adAccountTaxRates[accountId]) {
        return parseFloat(adAccountTaxRates[accountId]) || 0;
      }
      // Fallback: BM query mapping
      const bmId = adAccountToBm[accountId];
      return bmId ? parseFloat(bmTaxRates[bmId] || "0") : 0;
    };

    for (const accountId of projectMetaAccounts) {
      const accountData = metaData[accountId];
      if (!accountData?.ad_insights) continue;

      const taxPct = getTaxPct(accountId);

      for (const ad of accountData.ad_insights) {
        const rawSpend = parseFloat(ad.spend || "0");
        const spend = rawSpend * (1 + taxPct / 100);
        const revenue = gamAdRevenueMap[ad.ad_id] || 0;

        allAds.push({
          adId: ad.ad_id,
          adName: ad.ad_name || ad.ad_id,
          adsetId: ad.adset_id,
          adsetName: ad.adset_name || ad.adset_id,
          campaignId: ad.campaign_id,
          campaignName: ad.campaign_name || ad.campaign_id,
          spend,
          impressions: parseInt(ad.impressions || "0"),
          clicks: parseInt(ad.clicks || "0"),
          revenue,
        });
      }
    }

    // Also use campaign_insights for campaigns that might not have ad-level data
    // Group ads by campaign
    const campaignMap = new Map<string, {
      name: string;
      adsetMap: Map<string, {
        name: string;
        ads: AdEntry[];
      }>;
    }>();

    for (const ad of allAds) {
      if (!campaignMap.has(ad.campaignId)) {
        campaignMap.set(ad.campaignId, { name: ad.campaignName, adsetMap: new Map() });
      }
      const campaign = campaignMap.get(ad.campaignId)!;
      if (!campaign.adsetMap.has(ad.adsetId)) {
        campaign.adsetMap.set(ad.adsetId, { name: ad.adsetName, ads: [] });
      }
      campaign.adsetMap.get(ad.adsetId)!.ads.push(ad);
    }

    // If no ad_insights, fall back to campaign_insights with proportional GAM revenue
    if (allAds.length === 0) {
      // Calculate total GAM revenue from utm_source=fb_vc for share-of-spend distribution
      let gamFbVcRevenue = 0;
      const revSharePct = gamQuery.data?.revSharePct || 0;
      if (gamQuery.data?.rows) {
        for (const row of gamQuery.data.rows) {
          const kvName = row.dimensionValues?.[0]?.stringValue || "";
          if (!kvName.includes("utm_source=fb_vc")) continue;
          const primaryValues = row.metricValueGroups?.[0]?.primaryValues;
          if (primaryValues) {
            let rev = parseFloat(primaryValues[4]?.doubleValue || primaryValues[4]?.intValue || "0");
            if (revSharePct > 0) rev = rev * (1 - revSharePct / 100);
            gamFbVcRevenue += rev * usdBrlRate;
          }
        }
      }

      // Collect all campaign spends first to calculate proportional shares
      const campaignEntries: { id: string; name: string; spend: number; impressions: number; clicks: number; accountId: string }[] = [];
      let totalFallbackSpend = 0;

      for (const accountId of projectMetaAccounts) {
        const accountData = metaData[accountId];
        if (!accountData?.campaign_insights) continue;
        const taxPct = getTaxPct(accountId);

        for (const ci of accountData.campaign_insights) {
          const rawSpend = parseFloat(ci.spend || "0");
          const spend = rawSpend * (1 + taxPct / 100);
          const impressions = parseInt(ci.impressions || "0");
          const clicks = parseInt(ci.clicks || "0");
          campaignEntries.push({ id: ci.campaign_id, name: ci.campaign_name || ci.campaign_id, spend, impressions, clicks, accountId });
          totalFallbackSpend += spend;
        }
      }

      // Now create entries with proportional revenue
      for (const cs of campaignEntries) {
        if (!campaignMap.has(cs.id)) {
          campaignMap.set(cs.id, { name: cs.name, adsetMap: new Map() });
        }

        const share = totalFallbackSpend > 0 ? cs.spend / totalFallbackSpend : 1 / campaignEntries.length;
        const campaignRevenue = gamFbVcRevenue * share;

        const syntheticAdsetId = `${cs.id}_all`;
        const campaign = campaignMap.get(cs.id)!;
        if (!campaign.adsetMap.has(syntheticAdsetId)) {
          campaign.adsetMap.set(syntheticAdsetId, { name: "Todos os conjuntos", ads: [] });
        }
        campaign.adsetMap.get(syntheticAdsetId)!.ads.push({
          adId: `${cs.id}_summary`,
          adName: "Resumo da campanha",
          adsetId: syntheticAdsetId,
          adsetName: "Todos os conjuntos",
          campaignId: cs.id,
          campaignName: cs.name,
          spend: cs.spend,
          impressions: cs.impressions,
          clicks: cs.clicks,
          revenue: campaignRevenue,
        });
      }
    }

    // Build final campaign array
    const result: any[] = [];

    for (const [campaignId, campaignData] of campaignMap) {
      const adsets: any[] = [];
      let campaignCost = 0;
      let campaignRevenue = 0;
      let campaignImpressions = 0;
      let campaignClicks = 0;

      for (const [adsetId, adsetData] of campaignData.adsetMap) {
        const ads: any[] = [];
        let adsetCost = 0;
        let adsetRevenue = 0;
        let adsetImpressions = 0;
        let adsetClicks = 0;

        for (const ad of adsetData.ads) {
          adsetCost += ad.spend;
          adsetRevenue += ad.revenue;
          adsetImpressions += ad.impressions;
          adsetClicks += ad.clicks;

          const adProfit = ad.revenue - ad.spend;
          ads.push({
            id: ad.adId,
            name: ad.adName,
            cost: ad.spend,
            revenue: ad.revenue,
            profit: adProfit,
            roas: ad.spend > 0 ? adProfit / ad.spend : 0,
            impressions: ad.impressions,
            linkClicks: ad.clicks,
            ctr: ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0,
            cpc: ad.clicks > 0 ? ad.spend / ad.clicks : 0,
            cpm: ad.impressions > 0 ? (ad.spend / ad.impressions) * 1000 : 0,
          });
        }

        const adsetProfit = adsetRevenue - adsetCost;
        adsets.push({
          id: adsetId,
          name: adsetData.name,
          cost: adsetCost,
          revenue: adsetRevenue,
          profit: adsetProfit,
          roas: adsetCost > 0 ? adsetProfit / adsetCost : 0,
          impressions: adsetImpressions,
          linkClicks: adsetClicks,
          ctr: adsetImpressions > 0 ? (adsetClicks / adsetImpressions) * 100 : 0,
          cpc: adsetClicks > 0 ? adsetCost / adsetClicks : 0,
          cpm: adsetImpressions > 0 ? (adsetCost / adsetImpressions) * 1000 : 0,
          ads,
        });

        campaignCost += adsetCost;
        campaignRevenue += adsetRevenue;
        campaignImpressions += adsetImpressions;
        campaignClicks += adsetClicks;
      }

      const campaignProfit = campaignRevenue - campaignCost;
      result.push({
        id: campaignId,
        name: campaignData.name,
        cost: campaignCost,
        revenue: campaignRevenue,
        profit: campaignProfit,
        roas: campaignCost > 0 ? campaignProfit / campaignCost : 0,
        impressions: campaignImpressions,
        linkClicks: campaignClicks,
        ctr: campaignImpressions > 0 ? (campaignClicks / campaignImpressions) * 100 : 0,
        cpc: campaignClicks > 0 ? campaignCost / campaignClicks : 0,
        cpm: campaignImpressions > 0 ? (campaignCost / campaignImpressions) * 1000 : 0,
        sessions: 0,
        rps: 0,
        cps: 0,
        leads: 0,
        rpsTrend: [],
        costTrend: [],
        adsets,
      });
    }

    return result;
  }, [metaQuery.data, gamAdRevenueMap, projectMetaAccounts, adAccountToBm, bmTaxRates, adAccountTaxRates]);

  const refetchAll = useCallback(() => {
    dbQuery.refetch();
    metaQuery.refetch();
    gamQuery.refetch();
  }, [dbQuery, metaQuery, gamQuery]);

  // Synchronized refetch for project detail
  const includesTodayProject = useMemo(() => {
    if (!until) return true;
    return until >= format(new Date(), "yyyy-MM-dd");
  }, [until]);

  useEffect(() => {
    if (!includesTodayProject) return;
    const interval = setInterval(() => {
      console.log("[sync-refetch] Project detail: refreshing all sources simultaneously...");
      refetchAll();
    }, 1000 * 60 * 15);
    return () => clearInterval(interval);
  }, [includesTodayProject, refetchAll]);

  return {
    campaigns,
    isLoading: dbQuery.isLoading || metaQuery.isLoading || gamQuery.isLoading,
    errors: [dbQuery.error?.message, metaQuery.error?.message, gamQuery.error?.message].filter(Boolean),
    refetch: refetchAll,
  };
}
