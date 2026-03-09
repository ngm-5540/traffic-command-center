import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Safe JSON parse for external API responses ──

async function safeJson(res: Response, label: string): Promise<any> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${label} returned non-JSON (status ${res.status}): ${text.slice(0, 300)}`);
  }
}

// ── Google Service Account JWT Auth ──

async function getGoogleAccessToken(
  serviceAccountJson: string,
  scopes: string[]
): Promise<string> {
  const sa = JSON.parse(serviceAccountJson);
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: unknown) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const unsignedToken = `${encode(header)}.${encode(claim)}`;

  // Import private key
  const pemContents = sa.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");

  const binaryKey = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const jwt = `${unsignedToken}.${sig}`;

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenText = await tokenRes.text();
  let tokenData: any;
  try {
    tokenData = JSON.parse(tokenText);
  } catch {
    throw new Error(`Google OAuth returned non-JSON (status ${tokenRes.status}): ${tokenText.slice(0, 200)}`);
  }
  if (tokenData.error) {
    throw new Error(`Google OAuth error: ${tokenData.error_description || tokenData.error}`);
  }

  return tokenData.access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json().catch(() => ({}));
    const action = body.action || "list_ga4_properties";

    // ── Google Analytics (GA4) ──
    if (action === "list_ga4_properties" || action === "fetch_ga4_data") {
      const { data: credRow, error: credErr } = await supabase
        .from("integration_credentials")
        .select("credentials")
        .eq("provider", "analytics")
        .single();

      if (credErr || !credRow) {
        return new Response(
          JSON.stringify({ error: "Analytics credentials not found. Configure in Settings." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const saJson = (credRow.credentials as any).serviceAccountJson;
      if (!saJson) {
        return new Response(
          JSON.stringify({ error: "Analytics service account JSON is empty." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const accessToken = await getGoogleAccessToken(saJson, [
        "https://www.googleapis.com/auth/analytics.readonly",
      ]);

      if (action === "list_ga4_properties") {
        // List GA4 accounts and properties
        const accountsRes = await fetch(
          "https://analyticsadmin.googleapis.com/v1beta/accountSummaries",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const accountsData = await safeJson(accountsRes, "GA4 Admin API");

        if (accountsData.error) {
          return new Response(
            JSON.stringify({ error: `GA4 API: ${accountsData.error.message}` }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ accountSummaries: accountsData.accountSummaries || [] }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (action === "fetch_ga4_data") {
        const propertyId = body.property_id;
        const startDate = body.start_date || "today";
        const endDate = body.end_date || "today";

        if (!propertyId) {
          return new Response(
            JSON.stringify({ error: "property_id is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const reportRes = await fetch(
          `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dateRanges: [{ startDate, endDate }],
              metrics: [
                { name: "sessions" },
                { name: "totalUsers" },
                { name: "newUsers" },
                { name: "screenPageViews" },
                { name: "averageSessionDuration" },
                { name: "bounceRate" },
              ],
              dimensions: [{ name: "date" }],
              orderBys: [{ dimension: { dimensionName: "date" }, desc: false }],
            }),
          }
        );

        const reportData = await safeJson(reportRes, "GA4 Data API");
        if (reportData.error) {
          return new Response(
            JSON.stringify({ error: `GA4 API: ${reportData.error.message}` }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(JSON.stringify({ report: reportData }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ── Google Ad Manager (GAM) ──
    if (action === "fetch_gam_revenue") {
      const { data: credRow, error: credErr } = await supabase
        .from("integration_credentials")
        .select("credentials")
        .eq("provider", "gam")
        .single();

      if (credErr || !credRow) {
        return new Response(
          JSON.stringify({ error: "GAM credentials not found. Configure in Settings." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const creds = credRow.credentials as any;
      const networkCode = creds.networkCode;
      const saJson = creds.serviceAccountJson;

      if (!networkCode || !saJson) {
        return new Response(
          JSON.stringify({ error: "GAM network code or service account JSON is missing." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const accessToken = await getGoogleAccessToken(saJson, [
        "https://www.googleapis.com/auth/dfp",
      ]);

      const gamBase = `https://admanager.googleapis.com/v1/networks/${networkCode}`;

      // Build date range — use fixed dates if provided, otherwise THIS_MONTH
      const startDate = body.start_date;
      const endDate = body.end_date;

      let dateRange: any;
      if (startDate && endDate) {
        const sy = parseInt(startDate.slice(0, 4));
        const sm = parseInt(startDate.slice(5, 7));
        const sd = parseInt(startDate.slice(8, 10));
        const ey = parseInt(endDate.slice(0, 4));
        const em = parseInt(endDate.slice(5, 7));
        const ed = parseInt(endDate.slice(8, 10));
        dateRange = {
          fixed: {
            startDate: { year: sy, month: sm, day: sd },
            endDate: { year: ey, month: em, day: ed },
          },
        };
      } else {
        dateRange = { relative: "THIS_MONTH" };
      }

      // Build filters:
      // 1) KEY_VALUES_NAME CONTAINS "utm_content" OR "utm_medium=b" OR "utm_source=fb_vc"
      // 2) COUNTRY_ID IN [2840 (US), 2124 (CA)]
      const keyValuesFilter = body.key_values_filter || [
        "utm_content", "utm_medium=b", "utm_source=fb_vc"
      ];
      const countryIds = body.country_ids || ["2840", "2124"];

      const filters: any[] = [];

      // KEY_VALUES_NAME filter — OR of CONTAINS
      if (keyValuesFilter.length > 0) {
        filters.push({
          filterList: {
            type: "OR",
            filters: keyValuesFilter.map((kv: string) => ({
              fieldFilter: {
                field: { dimension: "KEY_VALUES_NAME" },
                operation: "CONTAINS",
                values: [{ stringValue: kv }],
              },
            })),
          },
        });
      }

      // COUNTRY_ID filter — IN
      if (countryIds.length > 0) {
        filters.push({
          fieldFilter: {
            field: { dimension: "COUNTRY_ID" },
            operation: "IN",
            values: countryIds.map((id: string) => ({ intValue: id })),
          },
        });
      }

      // Dimensions & Metrics matching user's GAM UI configuration
      const dimensions = body.dimensions || [
        "KEY_VALUES_NAME",
        "DATE",
      ];

      const metrics = body.metrics || [
        "UNFILLED_IMPRESSIONS",
        "AD_EXCHANGE_IMPRESSIONS",
        "AD_EXCHANGE_CLICKS",
        "AD_EXCHANGE_CTR",
        "AD_EXCHANGE_REVENUE",
        "AD_EXCHANGE_AVERAGE_ECPM",
        "AD_EXCHANGE_ACTIVE_VIEW_MEASURABLE_IMPRESSIONS",
        "AD_EXCHANGE_ACTIVE_VIEW_VIEWABLE_IMPRESSIONS",
        "PROGRAMMATIC_RESPONSES_SERVED",
        "PROGRAMMATIC_ELIGIBLE_AD_REQUESTS",
      ];

      console.log("GAM report config:", JSON.stringify({ dimensions, metrics, filters, dateRange }, null, 2));

      // Step 1: Create report
      const createRes = await fetch(`${gamBase}/reports`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportDefinition: {
            dimensions,
            metrics,
            filters,
            dateRange,
            reportType: "HISTORICAL",
            currencyCode: "USD",
          },
          displayName: `Lovable GAM Report ${new Date().toISOString()}`,
          visibility: "HIDDEN",
        }),
      });

      const report = await safeJson(createRes, "GAM Create Report");
      if (report.error) {
        return new Response(
          JSON.stringify({ error: `GAM API: ${report.error.message || JSON.stringify(report.error)}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const reportName = report.name;
      console.log("GAM report created:", reportName);

      // Step 2: Run the report
      const runRes = await fetch(
        `https://admanager.googleapis.com/v1/${reportName}:run`,
        { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const operation = await safeJson(runRes, "GAM Run Report");
      if (operation.error) {
        return new Response(
          JSON.stringify({ error: `GAM API (run): ${operation.error.message || JSON.stringify(operation.error)}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Step 3: Poll until done (max ~50s — 10 polls × 5s)
      let result = operation;
      const opName = operation.name;
      if (opName && !result.done) {
        for (let i = 0; i < 10; i++) {
          await new Promise((r) => setTimeout(r, 5000));
          console.log(`GAM poll attempt ${i + 1}/10...`);
          const pollRes = await fetch(
            `https://admanager.googleapis.com/v1/${opName}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          result = await safeJson(pollRes, "GAM Poll");
          if (result.done) {
            console.log("GAM report completed!");
            break;
          }
        }
      }

      if (!result.done) {
        // Clean up temp report even on timeout
        fetch(`https://admanager.googleapis.com/v1/${reportName}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }).catch(() => {});

        return new Response(
          JSON.stringify({ error: "GAM report timed out after 50s. Try a shorter date range." }),
          { status: 408, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Step 4: Fetch result rows (paginated)
      const reportResult = result.response?.reportResult;
      if (!reportResult) {
        return new Response(JSON.stringify({ report: { rows: [] } }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fetch all pages of results
      let allRows: any[] = [];
      let nextPageToken: string | undefined;
      do {
        const pageUrl = nextPageToken
          ? `https://admanager.googleapis.com/v1/${reportResult}:fetchRows?pageToken=${nextPageToken}`
          : `https://admanager.googleapis.com/v1/${reportResult}:fetchRows`;

        const fetchRowsRes = await fetch(pageUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const rowsData = await safeJson(fetchRowsRes, "GAM Fetch Rows");

        if (rowsData.rows) {
          allRows = allRows.concat(rowsData.rows);
        }
        nextPageToken = rowsData.nextPageToken;

        // Also capture header info on first page
        if (allRows.length === (rowsData.rows?.length || 0)) {
          // Store dimension/metric columns for client parsing
          if (rowsData.dimensionColumns) {
            (allRows as any).dimensionColumns = rowsData.dimensionColumns;
          }
          if (rowsData.metricColumns) {
            (allRows as any).metricColumns = rowsData.metricColumns;
          }
        }
      } while (nextPageToken);

      console.log(`GAM report fetched ${allRows.length} rows`);

      // Clean up temp report
      fetch(`https://admanager.googleapis.com/v1/${reportName}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      }).catch(() => {});

      return new Response(JSON.stringify({ report: { rows: allRows, totalRows: allRows.length } }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: `Unknown action: ${action}` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
