import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [safeMargin, setSafeMargin] = useState("15");
  const [gamNetworkCode, setGamNetworkCode] = useState("");
  const [gamApiKey, setGamApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring";

  return (
    <div className="p-4 lg:p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="mb-1 text-xl font-semibold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">Parâmetros gerais e integrações</p>
      </div>

      <div className="space-y-6">
        {/* Safe Margin */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Safe Margin Offset</h3>
          <p className="text-xs text-muted-foreground">
            Margem de segurança aplicada sobre o ROAS mínimo para decisões de automação.
          </p>
          <label className="space-y-1.5 block max-w-xs">
            <span className="text-xs font-medium text-muted-foreground">Offset (%)</span>
            <input
              type="number"
              value={safeMargin}
              onChange={(e) => setSafeMargin(e.target.value)}
              className={inputClass}
              placeholder="15"
            />
          </label>
        </div>

        {/* GAM Keys */}
        <div className="rounded-lg border border-border bg-card p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Chaves de Rede do GAM</h3>
          <p className="text-xs text-muted-foreground">
            Credenciais de integração com o Google Ad Manager.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Network Code</span>
              <input
                value={gamNetworkCode}
                onChange={(e) => setGamNetworkCode(e.target.value)}
                className={inputClass}
                placeholder="123456789"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">API Key</span>
              <input
                type="password"
                value={gamApiKey}
                onChange={(e) => setGamApiKey(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Save className="h-4 w-4" />
        {saved ? "Salvo!" : "Salvar Configurações"}
      </button>
    </div>
  );
}
