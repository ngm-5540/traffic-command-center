import { useState, useMemo, useCallback } from "react";
import { Maximize2, Minimize2, Pin, Columns3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatBRL, formatROAS, formatPercent, formatNumber, formatDuration, getRoasColor } from "@/lib/format";
import { SparklineCell } from "./SparklineCell";
import type { ChatbotCampaign } from "@/data/chatbotMockData";

interface Props {
  campaigns: ChatbotCampaign[];
}

interface ColumnDef {
  key: string;
  label: string;
  shortLabel?: string;
  group: string;
  format: (v: any, row?: ChatbotCampaign) => React.ReactNode;
  align?: "left" | "right";
  defaultVisible?: boolean;
}

const columnGroups = [
  { key: "dimensions", label: "Dimensões", colSpan: 1 },
  { key: "financial", label: "Financeiro", colSpan: 0 },
  { key: "traffic", label: "Tráfego Meta Ads", colSpan: 0 },
  { key: "performance", label: "Performance", colSpan: 0 },
  { key: "automation", label: "Automação", colSpan: 0 },
  { key: "broadcast", label: "Broadcast", colSpan: 0 },
  { key: "conversion", label: "Conversão", colSpan: 0 },
];

const allColumns: ColumnDef[] = [
  // Financial
  { key: "cost", label: "Custo", group: "financial", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "revenue", label: "Receita", group: "financial", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "profit", label: "Lucro", group: "financial", format: (v, row) => <span className={row && row.profit >= 0 ? "text-profit" : "text-loss"}>{formatBRL(v)}</span>, defaultVisible: true },
  { key: "roas", label: "ROAS", group: "financial", format: (v) => <span style={{ color: getRoasColor(v) }}>{formatROAS(v)}</span>, defaultVisible: true },
  { key: "budget", label: "Budget", group: "financial", format: (v) => formatBRL(v), defaultVisible: false },
  { key: "budgetRemaining", label: "Budget Rest.", group: "financial", format: (v) => formatBRL(v), defaultVisible: false },
  // Traffic
  { key: "impressions", label: "Impressões", group: "traffic", format: (v) => formatNumber(v), defaultVisible: true },
  { key: "linkClicks", label: "Cliques", group: "traffic", format: (v) => formatNumber(v), defaultVisible: true },
  { key: "ctr", label: "CTR", group: "traffic", format: (v) => formatPercent(v), defaultVisible: true },
  { key: "cpc", label: "CPC", group: "traffic", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "cpm", label: "CPM", group: "traffic", format: (v) => formatBRL(v), defaultVisible: false },
  // Performance
  { key: "sessions", label: "Sessões", group: "performance", format: (v) => formatNumber(v), defaultVisible: true },
  { key: "rps", label: "RPS", group: "performance", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "rpsTrend", label: "RPS Trend", group: "performance", format: (v) => <SparklineCell data={v} color="hsl(var(--success))" />, defaultVisible: true },
  { key: "cps", label: "CPS", group: "performance", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "costTrend", label: "Custo Trend", group: "performance", format: (v) => <SparklineCell data={v} color="hsl(var(--destructive))" />, defaultVisible: false },
  { key: "ecpm", label: "eCPM", group: "performance", format: (v) => formatBRL(v), defaultVisible: false },
  { key: "bounceRate", label: "Bounce", group: "performance", format: (v) => formatPercent(v), defaultVisible: false },
  { key: "timeToSession", label: "T. Sessão", group: "performance", format: (v) => formatDuration(v), defaultVisible: false },
  { key: "connectRate", label: "Conexão", group: "performance", format: (v) => formatPercent(v), defaultVisible: false },
  // Automation
  { key: "revenueAut", label: "Rec. Aut.", group: "automation", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "revAutRate", label: "% Rec. Aut.", group: "automation", format: (v) => formatPercent(v), defaultVisible: false },
  { key: "resultAut", label: "Result. Aut.", group: "automation", format: (v, row) => <span className={v >= 0 ? "text-profit" : "text-loss"}>{formatBRL(v)}</span>, defaultVisible: true },
  { key: "marginAut", label: "Margem Aut.", group: "automation", format: (v) => formatPercent(v), defaultVisible: false },
  // Broadcast
  { key: "revenueBroad", label: "Rec. Broad.", group: "broadcast", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "revBroadRate", label: "% Rec. Broad.", group: "broadcast", format: (v) => formatPercent(v), defaultVisible: false },
  { key: "resultBroad", label: "Result. Broad.", group: "broadcast", format: (v, row) => <span className={v >= 0 ? "text-profit" : "text-loss"}>{formatBRL(v)}</span>, defaultVisible: true },
  { key: "marginBroad", label: "Margem Broad.", group: "broadcast", format: (v) => formatPercent(v), defaultVisible: false },
  // Conversion
  { key: "conversions", label: "Conversões", group: "conversion", format: (v) => formatNumber(v), defaultVisible: true },
  { key: "convRate", label: "Taxa Conv.", group: "conversion", format: (v) => formatPercent(v), defaultVisible: true },
  { key: "costPerConversion", label: "C/Conv.", group: "conversion", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "leads", label: "Leads", group: "conversion", format: (v) => formatNumber(v), defaultVisible: false },
  { key: "costPerLead", label: "C/Lead", group: "conversion", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "newLeads", label: "Novos Leads", group: "conversion", format: (v) => formatNumber(v), defaultVisible: false },
  { key: "costPerNewLead", label: "C/Novo Lead", group: "conversion", format: (v) => formatBRL(v), defaultVisible: false },
  { key: "uniqueLeadsRate", label: "% Únicos", group: "conversion", format: (v) => formatPercent(v), defaultVisible: false },
];

function loadVisibleColumns(): string[] | null {
  try {
    const raw = localStorage.getItem("chatbot_bi_columns");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveVisibleColumns(cols: string[]) {
  localStorage.setItem("chatbot_bi_columns", JSON.stringify(cols));
}

const defaultVisibleKeys = allColumns.filter((c) => c.defaultVisible).map((c) => c.key);

const presets: { label: string; keys: string[] }[] = [
  { label: "Padrão", keys: defaultVisibleKeys },
  { label: "Financeiro", keys: ["cost", "revenue", "profit", "roas", "budget", "budgetRemaining"] },
  { label: "Tráfego", keys: ["impressions", "linkClicks", "ctr", "cpc", "cpm", "sessions"] },
  { label: "Completo", keys: allColumns.map((c) => c.key) },
];

export function ResultadoTotalTab({ campaigns }: Props) {
  const [focusMode, setFocusMode] = useState(false);
  const [pinnedCols, setPinnedCols] = useState(1); // name column always pinned
  const [visibleKeys, setVisibleKeys] = useState<string[]>(() => loadVisibleColumns() ?? defaultVisibleKeys);

  const toggleColumn = useCallback((key: string) => {
    setVisibleKeys((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      saveVisibleColumns(next);
      return next;
    });
  }, []);

  const applyPreset = useCallback((keys: string[]) => {
    setVisibleKeys(keys);
    saveVisibleColumns(keys);
  }, []);

  const visibleColumns = useMemo(() => allColumns.filter((c) => visibleKeys.includes(c.key)), [visibleKeys]);

  // Compute group spans for super-header
  const superHeaders = useMemo(() => {
    const groups: { key: string; label: string; colSpan: number }[] = [];
    let lastGroup = "";
    for (const col of visibleColumns) {
      if (col.group === lastGroup) {
        groups[groups.length - 1].colSpan++;
      } else {
        const grp = columnGroups.find((g) => g.key === col.group);
        groups.push({ key: col.group, label: grp?.label ?? col.group, colSpan: 1 });
        lastGroup = col.group;
      }
    }
    return groups;
  }, [visibleColumns]);

  // Expanded adsets
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((id: string) => {
    setExpandedCampaigns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const containerClass = focusMode
    ? "fixed inset-0 z-[100] bg-background flex flex-col"
    : "flex flex-col";

  return (
    <div className={containerClass}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-1 py-2">
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-[10px] font-semibold tracking-wider">
                <Columns3 className="h-3 w-3" />
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[260px] max-h-[400px] overflow-y-auto p-2">
              {/* Presets */}
              <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-border">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => applyPreset(p.keys)}
                    className="rounded px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {columnGroups.map((group) => {
                const cols = allColumns.filter((c) => c.group === group.key);
                if (cols.length === 0) return null;
                return (
                  <div key={group.key} className="mb-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-1">{group.label}</p>
                    {cols.map((col) => (
                      <label key={col.key} className="flex items-center gap-2 px-1 py-1 rounded hover:bg-accent cursor-pointer">
                        <Checkbox
                          checked={visibleKeys.includes(col.key)}
                          onCheckedChange={() => toggleColumn(col.key)}
                          className="h-3.5 w-3.5"
                        />
                        <span className="text-xs text-foreground">{col.label}</span>
                      </label>
                    ))}
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFocusMode((f) => !f)}>
          {focusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-30 bg-background">
            {/* Super-header row */}
            <tr className="border-b border-border">
              <th className="sticky left-0 z-40 bg-background px-3 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-r border-border" rowSpan={2}>
                Campanha
              </th>
              {superHeaders.map((sh) => (
                <th
                  key={sh.key}
                  colSpan={sh.colSpan}
                  className="px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-r border-border last:border-r-0"
                >
                  {sh.label}
                </th>
              ))}
            </tr>
            {/* Column headers */}
            <tr className="border-b border-border">
              {visibleColumns.map((col) => (
                <th key={col.key} className="px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">{col.shortLabel ?? col.label}</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">{col.label}</TooltipContent>
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <>
                {/* Campaign row */}
                <tr
                  key={campaign.id}
                  className="border-b border-border hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => toggleExpand(campaign.id)}
                >
                  <td className="sticky left-0 z-20 bg-background px-3 py-2 font-semibold text-foreground whitespace-nowrap border-r border-border shadow-[2px_0_4px_-2px_rgba(0,0,0,0.3)]">
                    <span className="mr-1.5 text-muted-foreground text-[10px]">
                      {expandedCampaigns.has(campaign.id) ? "▼" : "▶"}
                    </span>
                    {campaign.name}
                    <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                      ({campaign.adsets.length} adsets, {campaign.adsets.reduce((s, a) => s + a.ads.length, 0)} ads)
                    </span>
                  </td>
                  {visibleColumns.map((col) => (
                    <td key={col.key} className="px-2 py-2 text-right font-mono font-bold whitespace-nowrap">
                      {col.format((campaign as any)[col.key], campaign)}
                    </td>
                  ))}
                </tr>
                {/* Expanded adsets */}
                {expandedCampaigns.has(campaign.id) && campaign.adsets.map((adset) => (
                  <tr key={adset.id} className="border-b border-border/50 bg-card/30 hover:bg-accent/30 transition-colors">
                    <td className="sticky left-0 z-20 bg-card/30 px-3 py-1.5 pl-8 text-foreground/80 whitespace-nowrap border-r border-border text-[11px] shadow-[2px_0_4px_-2px_rgba(0,0,0,0.3)]">
                      ↳ {adset.name}
                      <span className="ml-2 text-[10px] text-muted-foreground font-mono">({adset.ads.length} ads)</span>
                    </td>
                    {visibleColumns.map((col) => (
                      <td key={col.key} className="px-2 py-1.5 text-right font-mono text-[11px] whitespace-nowrap text-foreground/70">
                        {col.format((adset as any)[col.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
          {/* Totals */}
          <tfoot className="sticky bottom-0 z-30 bg-background border-t-2 border-primary/30">
            <tr>
              <td className="sticky left-0 z-40 bg-background px-3 py-2 font-bold text-foreground text-xs border-r border-border shadow-[2px_0_4px_-2px_rgba(0,0,0,0.3)]">
                TOTAL
              </td>
              {visibleColumns.map((col) => {
                const total = campaigns.reduce((s, c) => s + (typeof (c as any)[col.key] === "number" ? (c as any)[col.key] : 0), 0);
                const isAvg = ["roas", "ctr", "cpc", "cpm", "rps", "cps", "ecpm", "bounceRate", "timeToSession", "connectRate", "convRate", "leadsRate", "newLeadsRate", "uniqueLeadsRate", "revAutRate", "revBroadRate", "marginAut", "marginBroad", "costPerConversion", "costPerLead", "costPerNewLead"].includes(col.key);
                const isTrend = col.key.endsWith("Trend");
                const value = isTrend ? [] : isAvg && campaigns.length > 0 ? total / campaigns.length : total;
                return (
                  <td key={col.key} className="px-2 py-2 text-right font-mono font-bold text-xs whitespace-nowrap">
                    {isTrend ? "—" : col.format(value)}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
