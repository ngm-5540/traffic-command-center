import { useState, useMemo } from "react";
import { Copy, Check, Link2 } from "lucide-react";
import { projects, utmSources, utmMediums } from "@/data/mockData";

export default function UrlBuilder() {
  const [projectId, setProjectId] = useState(projects[0].id);
  const [source, setSource] = useState(utmSources[0]);
  const [medium, setMedium] = useState(utmMediums[0]);
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [term, setTerm] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://example.com/lp");
  const [copied, setCopied] = useState(false);

  const project = projects.find((p) => p.id === projectId);

  const builtUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (source) params.set("utm_source", source);
    if (medium) params.set("utm_medium", medium);
    if (campaign) params.set("utm_campaign", campaign);
    if (content) params.set("utm_content", content);
    if (term) params.set("utm_term", term);
    if (projectId) params.set("project", projectId);
    const qs = params.toString();
    return qs ? `${baseUrl}?${qs}` : baseUrl;
  }, [baseUrl, source, medium, campaign, content, term, projectId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(builtUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectClass =
    "h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring";
  const inputClass =
    "h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring";

  return (
    <div className="p-4 lg:p-6 max-w-3xl space-y-6">
      <div>
        <h1 className="mb-1 text-xl font-semibold text-foreground">Campaign URL Builder</h1>
        <p className="text-sm text-muted-foreground">Monte URLs com UTMs para rastreamento de campanhas</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Projeto</span>
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={selectClass}>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Base URL</span>
            <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} className={inputClass} placeholder="https://..." />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Source</span>
            <select value={source} onChange={(e) => setSource(e.target.value)} className={selectClass}>
              {utmSources.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Medium</span>
            <select value={medium} onChange={(e) => setMedium(e.target.value)} className={selectClass}>
              {utmMediums.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Campaign</span>
            <input value={campaign} onChange={(e) => setCampaign(e.target.value)} className={inputClass} placeholder="nome_campanha" />
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Content</span>
            <input value={content} onChange={(e) => setContent(e.target.value)} className={inputClass} placeholder="variacao_a" />
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Term</span>
            <input value={term} onChange={(e) => setTerm(e.target.value)} className={inputClass} placeholder="keyword" />
          </label>
        </div>
      </div>

      {/* URL Preview */}
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-primary">
          <Link2 className="h-3.5 w-3.5" />
          Link Preview
        </div>
        <p className="mb-4 break-all font-mono text-sm text-foreground/90">{builtUrl}</p>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copiado!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
