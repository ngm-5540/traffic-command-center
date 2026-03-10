import { useState, useEffect } from "react";
import { Save, Eye, EyeOff, Upload, Check, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMetaAdAccounts, useMetaBusinesses, useGA4Properties, useIntegrationConfig } from "@/hooks/useRealData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type CredentialState = {
  meta: { token: string };
  gam: { networkCode: string; revShare: string; serviceAccountJson: string };
  analytics: { serviceAccountJson: string };
};

const EMPTY: CredentialState = {
  meta: { token: "" },
  gam: { networkCode: "", revShare: "", serviceAccountJson: "" },
  analytics: { serviceAccountJson: "" },
};

export default function SettingsPage() {
  const { config, update: updateConfig } = useIntegrationConfig();
  const [creds, setCreds] = useState<CredentialState>(EMPTY);
  const [safeMargin, setSafeMargin] = useState("15");
  const [usdBrlRate, setUsdBrlRate] = useState(config.usd_brl_rate || "5.1");
  const [showMetaToken, setShowMetaToken] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const metaAccounts = useMetaAdAccounts();
  const metaBusinesses = useMetaBusinesses();
  const ga4Properties = useGA4Properties();
  const { toast } = useToast();

  // Load credentials on mount
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("integration_credentials")
        .select("provider, credentials");

      if (!error && data) {
        const next = { ...EMPTY };
        for (const row of data) {
          const p = row.provider as keyof CredentialState;
          if (p in next) {
            next[p] = { ...next[p], ...(row.credentials as any) };
          }
        }
        setCreds(next);
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const providers: { provider: string; credentials: any }[] = [
        { provider: "meta", credentials: creds.meta },
        { provider: "gam", credentials: creds.gam },
        { provider: "analytics", credentials: creds.analytics },
      ];

      for (const p of providers) {
        const { error } = await supabase
          .from("integration_credentials")
          .upsert(
            { provider: p.provider, credentials: p.credentials },
            { onConflict: "provider" }
          );
        if (error) throw error;
      }

      toast({ title: "Credenciais salvas com sucesso!" });
    } catch (err: any) {
      toast({ title: "Erro ao salvar", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring";

  const handleFileUpload = (
    key: "gam" | "analytics",
    field: "serviceAccountJson"
  ) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setCreds((prev) => ({
          ...prev,
          [key]: { ...prev[key], [field]: text },
        }));
        toast({ title: `Arquivo ${file.name} carregado` });
      };
      reader.readAsText(file);
    };
    input.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-2xl space-y-6 h-full overflow-y-auto">
      <div>
        <h1 className="mb-1 text-xl font-semibold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">Parâmetros gerais e integrações</p>
      </div>

      {/* General Parameters */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Parâmetros Gerais</h3>
        <p className="text-xs text-muted-foreground">
          Configurações gerais do dashboard.
        </p>
        <div className="flex gap-3 max-w-md">
          <label className="space-y-1.5 block flex-1">
            <span className="text-xs font-medium text-muted-foreground">Safe Margin Offset (%)</span>
            <input
              type="number"
              value={safeMargin}
              onChange={(e) => setSafeMargin(e.target.value)}
              className={inputClass}
              placeholder="15"
            />
          </label>
          <label className="space-y-1.5 block w-36">
            <span className="text-xs font-medium text-muted-foreground">Cotação USD → BRL</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={usdBrlRate}
              onChange={(e) => {
                setUsdBrlRate(e.target.value);
                updateConfig({ usd_brl_rate: e.target.value });
              }}
              className={inputClass}
              placeholder="5.10"
            />
          </label>
        </div>
      </div>

      {/* Integration Credentials */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Credenciais de Integração</h3>
        <p className="text-xs text-muted-foreground">
          Tokens e service accounts para conexão com plataformas externas.
        </p>

        <Tabs defaultValue="meta" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="meta" className="flex-1">Meta Ads</TabsTrigger>
            <TabsTrigger value="gam" className="flex-1">GAM</TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
          </TabsList>

          {/* Meta Ads */}
          <TabsContent value="meta" className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground">
              Token de desenvolvedor para acessar a API do Meta Ads.
            </p>
            <label className="space-y-1.5 block">
              <span className="text-xs font-medium text-muted-foreground">Developer Token</span>
              <div className="relative">
                <input
                  type={showMetaToken ? "text" : "password"}
                  value={creds.meta.token}
                  onChange={(e) =>
                    setCreds((p) => ({ ...p, meta: { token: e.target.value } }))
                  }
                  className={inputClass + " pr-10"}
                  placeholder="EAAxxxxxxx..."
                />
                <button
                  type="button"
                  onClick={() => setShowMetaToken(!showMetaToken)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showMetaToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
          </TabsContent>

          {/* GAM */}
          <TabsContent value="gam" className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground">
              Credenciais do Google Ad Manager via Service Account.
            </p>
            <div className="flex gap-3">
              <label className="space-y-1.5 block flex-1">
                <span className="text-xs font-medium text-muted-foreground">Network Code</span>
                <input
                  value={creds.gam.networkCode}
                  onChange={(e) =>
                    setCreds((p) => ({
                      ...p,
                      gam: { ...p.gam, networkCode: e.target.value },
                    }))
                  }
                  className={inputClass}
                  placeholder="123456789"
                />
              </label>
              <label className="space-y-1.5 block w-28">
                <span className="text-xs font-medium text-muted-foreground">Rev. Share (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={creds.gam.revShare}
                  onChange={(e) =>
                    setCreds((p) => ({
                      ...p,
                      gam: { ...p.gam, revShare: e.target.value },
                    }))
                  }
                  className={inputClass}
                  placeholder="20"
                />
              </label>
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground block">
                Service Account JSON
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleFileUpload("gam", "serviceAccountJson")}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload JSON
                </button>
                {creds.gam.serviceAccountJson && (
                  <span className="inline-flex items-center gap-1 text-xs text-primary">
                    <Check className="h-3.5 w-3.5" /> Carregado
                  </span>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4 pt-2">
            <p className="text-xs text-muted-foreground">
              Service Account para acessar a API do Google Analytics.
            </p>
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground block">
                Service Account JSON
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleFileUpload("analytics", "serviceAccountJson")}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload JSON
                </button>
                {creds.analytics.serviceAccountJson && (
                  <span className="inline-flex items-center gap-1 text-xs text-primary">
                    <Check className="h-3.5 w-3.5" /> Carregado
                  </span>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Account Selection */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-4">
        <h3 className="text-sm font-semibold text-foreground">Contas e Propriedades</h3>
        <p className="text-xs text-muted-foreground">
          Selecione as contas que serão usadas para puxar dados reais no Dashboard.
        </p>

        {/* Meta Business Managers & Ad Accounts */}
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Business Managers e Contas</span>
          {metaBusinesses.isLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Carregando BMs...
            </div>
          ) : metaBusinesses.error ? (
            <div className="flex items-center gap-2">
              <p className="text-xs text-destructive">{metaBusinesses.error.message}</p>
              <button onClick={() => metaBusinesses.refetch()} className="text-xs text-primary hover:underline">
                <RefreshCw className="h-3 w-3 inline mr-1" />Tentar novamente
              </button>
            </div>
          ) : metaBusinesses.data && metaBusinesses.data.length > 0 ? (
            <Accordion type="multiple" className="w-full">
              {metaBusinesses.data.map((bm) => (
                <AccordionItem key={bm.id} value={bm.id} className="border-border">
                  <AccordionTrigger className="text-xs font-medium py-2 hover:no-underline">
                    <span className="flex items-center gap-2 flex-1">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                      {bm.name}
                      <span className="text-muted-foreground font-normal">({bm.ad_accounts.length} contas)</span>
                      <span className="ml-auto flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <label className="text-[10px] text-muted-foreground whitespace-nowrap">Imposto</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={config.bm_tax_rates?.[bm.id] || ""}
                          onChange={(e) => {
                            const current = config.bm_tax_rates || {};
                            const newBmTaxRates = { ...current, [bm.id]: e.target.value };
                            const adAccountTaxRates: Record<string, string> = {};
                            if (metaBusinesses.data) {
                              for (const b of metaBusinesses.data) {
                                const rate = b.id === bm.id ? e.target.value : (newBmTaxRates[b.id] || "0");
                                for (const acc of b.ad_accounts) {
                                  adAccountTaxRates[acc.id] = rate;
                                }
                              }
                            }
                            updateConfig({ bm_tax_rates: newBmTaxRates, ad_account_tax_rates: adAccountTaxRates });
                          }}
                          className={inputClass + " w-16 h-7 text-[11px]"}
                          placeholder="0%"
                        />
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 space-y-2">
                    {bm.ad_accounts.length === 0 ? (
                      <p className="text-xs text-muted-foreground pl-4">Nenhuma conta encontrada nesta BM.</p>
                    ) : (
                      <div className="space-y-1 pl-4">
                        {bm.ad_accounts.map((acc) => (
                          <div key={acc.id} className="flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5">
                            <span className="text-xs text-foreground">{acc.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground font-mono">{acc.id}</span>
                              <span className={`inline-block h-1.5 w-1.5 rounded-full ${acc.account_status === 1 ? "bg-green-500" : "bg-red-500"}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-xs text-muted-foreground">Salve o token Meta primeiro e recarregue.</p>
          )}
        </div>

        {/* GA4 Property */}
        <label className="space-y-1.5 block">
          <span className="text-xs font-medium text-muted-foreground">Propriedade GA4</span>
          {ga4Properties.isLoading ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Carregando propriedades...
            </div>
          ) : ga4Properties.error ? (
            <div className="flex items-center gap-2">
              <p className="text-xs text-destructive">{ga4Properties.error.message}</p>
              <button onClick={() => ga4Properties.refetch()} className="text-xs text-primary hover:underline">
                <RefreshCw className="h-3 w-3 inline mr-1" />Tentar novamente
              </button>
            </div>
          ) : ga4Properties.data && ga4Properties.data.length > 0 ? (
            <Select value={config.ga4_property_id || ""} onValueChange={(v) => updateConfig({ ga4_property_id: v })}>
              <SelectTrigger className="h-9 text-sm border-border">
                <SelectValue placeholder="Selecione uma propriedade" />
              </SelectTrigger>
              <SelectContent>
                {ga4Properties.data.flatMap((acc) =>
                  (acc.propertySummaries || []).map((prop) => (
                    <SelectItem key={prop.property} value={prop.property.replace("properties/", "")} className="text-xs">
                      {prop.displayName} ({acc.displayName})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-xs text-muted-foreground">Salve o JSON da service account do Analytics primeiro e recarregue.</p>
          )}
        </label>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saving ? "Salvando..." : "Salvar Configurações"}
      </button>
    </div>
  );
}
