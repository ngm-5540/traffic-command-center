import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const META_API = "https://graph.facebook.com/v21.0";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get Meta token from integration_credentials
    const { data: credRow, error: credErr } = await supabase
      .from("integration_credentials")
      .select("credentials")
      .eq("provider", "meta")
      .single();

    if (credErr || !credRow) {
      return new Response(
        JSON.stringify({ error: "Meta credentials not found. Configure in Settings." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = (credRow.credentials as any).token;
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Meta token is empty. Configure in Settings." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const action = body.action || "list_accounts";

    if (action === "list_accounts") {
      // List ad accounts
      const res = await fetch(
        `${META_API}/me/adaccounts?fields=id,name,account_status,currency&access_token=${token}`
      );
      const data = await res.json();
      if (data.error) {
        return new Response(
          JSON.stringify({ error: `Meta API: ${data.error.message}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ accounts: data.data || [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "fetch_insights") {
      const adAccountId = body.ad_account_id;
      const datePreset = body.date_preset || "today"; // today, yesterday, last_7d, last_30d, this_month
      const since = body.since; // YYYY-MM-DD
      const until = body.until; // YYYY-MM-DD

      if (!adAccountId) {
        return new Response(
          JSON.stringify({ error: "ad_account_id is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Fetch campaigns with insights
      let timeRange = "";
      if (since && until) {
        timeRange = `&time_range={"since":"${since}","until":"${until}"}`;
      } else {
        timeRange = `&date_preset=${datePreset}`;
      }

      const campaignsRes = await fetch(
        `${META_API}/${adAccountId}/campaigns?fields=id,name,status,objective&limit=100&access_token=${token}`
      );
      const campaignsData = await campaignsRes.json();

      if (campaignsData.error) {
        return new Response(
          JSON.stringify({ error: `Meta API: ${campaignsData.error.message}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Fetch account-level insights
      const insightsRes = await fetch(
        `${META_API}/${adAccountId}/insights?fields=spend,impressions,clicks,cpc,cpm,ctr,actions,action_values,conversions,cost_per_action_type${timeRange}&access_token=${token}`
      );
      const insightsData = await insightsRes.json();

      // Fetch campaign-level insights
      const campaignInsightsRes = await fetch(
        `${META_API}/${adAccountId}/insights?fields=campaign_id,campaign_name,spend,impressions,clicks,actions,action_values&level=campaign${timeRange}&limit=500&access_token=${token}`
      );
      const campaignInsightsData = await campaignInsightsRes.json();

      return new Response(
        JSON.stringify({
          campaigns: campaignsData.data || [],
          account_insights: insightsData.data?.[0] || null,
          campaign_insights: campaignInsightsData.data || [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
