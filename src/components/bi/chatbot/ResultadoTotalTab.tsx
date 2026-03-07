import { useState, useMemo, useCallback } from "react";
import { Maximize2, Minimize2, Columns3, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formatBRL, formatROAS, formatPercent, formatNumber, formatDuration, getRoasColor } from "@/lib/format";
import { SparklineCell } from "./SparklineCell";
import { PopBadge } from "./PopBadge";
import { generatePreviousRecord } from "@/data/popMockData";
import type { ChatbotCampaign, ChatbotAdset, ChatbotAd } from "@/data/chatbotMockData";

interface Props {
  campaigns: ChatbotCampaign[];
  popEnabled?: boolean;
  focusMode?: boolean;
  onToggleFocusMode?: () => void;
  filtersNode?: React.ReactNode;
}

type Dimension = "campaign" | "adset" | "ad";

interface FlatRow {
  id: string;
  name: string;
  campaignName?: string;
  adsetName?: string;
  data: Record<string, any>;
  childCount?: string;
}

interface ColumnDef {
  key: string;
  label: string;
  shortLabel?: string;
  group: string;
  format: (v: any, row?: any) => React.ReactNode;
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
  { key: "resultAut", label: "Result. Aut.", group: "automation", format: (v) => <span className={v >= 0 ? "text-profit" : "text-loss"}>{formatBRL(v)}</span>, defaultVisible: true },
  { key: "marginAut", label: "Margem Aut.", group: "automation", format: (v) => formatPercent(v), defaultVisible: false },
  // Broadcast
  { key: "revenueBroad", label: "Rec. Broad.", group: "broadcast", format: (v) => formatBRL(v), defaultVisible: true },
  { key: "revBroadRate", label: "% Rec. Broad.", group: "broadcast", format: (v) => formatPercent(v), defaultVisible: false },
  { key: "resultBroad", label: "Result. Broad.", group: "broadcast", format: (v) => <span className={v >= 0 ? "text-profit" : "text-loss"}>{formatBRL(v)}</span>, defaultVisible: true },
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

const dimensionOptions: { value: Dimension; label: string }[] = [
  { value: "campaign", label: "Campanha" },
  { value: "adset", label: "Adset" },
  { value: "ad", label: "Ad" },
];

type SortDir = "asc" | "desc";
interface SortState { key: string; dir: SortDir; }

function sortRows<T>(items: T[], sort: SortState | null, getValue: (item: T, key: string) => any): T[] {
  if (!sort) return items;
  return [...items].sort((a, b) => {
    const va = getValue(a, sort.key) ?? 0;
    const vb = getValue(b, sort.key) ?? 0;
    if (typeof va === "string" && typeof vb === "string") {
      return sort.dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return sort.dir === "asc" ? va - vb : vb - va;
  });
}

function SortIcon({ active, dir }: { active: boolean; dir?: SortDir }) {
  if (!active) return <ArrowUpDown className="h-2.5 w-2.5 opacity-30" />;
  return dir === "asc" ? <ArrowUp className="h-2.5 w-2.5 text-primary" /> : <ArrowDown className="h-2.5 w-2.5 text-primary" />;
}

const invertColorKeys = new Set(["cost", "cpc", "cpm", "cps", "costPerConversion", "costPerLead", "costPerNewLead", "bounceRate", "timeToSession"]);

export function ResultadoTotalTab({ campaigns, popEnabled = false, focusMode = false, onToggleFocusMode }: Props) {
  const [visibleKeys, setVisibleKeys] = useState<string[]>(() => loadVisibleColumns() ?? defaultVisibleKeys);
  const [dimension, setDimension] = useState<Dimension>("campaign");
  const [showParentCols, setShowParentCols] = useState(true);
  const [sort, setSort] = useState<SortState | null>(null);

  // Generate previous period data for PoP
  const previousRowData = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    let idx = 0;
    for (const c of campaigns) {
      map.set(c.id, generatePreviousRecord(c, idx++));
      for (const adset of c.adsets) {
        map.set(adset.id, generatePreviousRecord(adset, idx++));
        for (const ad of adset.ads) {
          map.set(ad.id, generatePreviousRecord(ad, idx++));
        }
      }
    }
    return map;
  }, [campaigns]);

  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.dir === "asc" ? { key, dir: "desc" } : null;
      }
      return { key, dir: "desc" };
    });
  }, []);

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

  // Flatten data based on dimension
  const rows: FlatRow[] = useMemo(() => {
    if (dimension === "campaign") {
      return campaigns.map((c) => ({
        id: c.id,
        name: c.name,
        data: c as any,
        childCount: `${c.adsets.length} adsets, ${c.adsets.reduce((s, a) => s + a.ads.length, 0)} ads`,
      }));
    }
    if (dimension === "adset") {
      const result: FlatRow[] = [];
      for (const c of campaigns) {
        for (const adset of c.adsets) {
          result.push({
            id: adset.id,
            name: adset.name,
            campaignName: c.name,
            data: adset as any,
            childCount: `${adset.ads.length} ads`,
          });
        }
      }
      return result;
    }
    // ad
    const result: FlatRow[] = [];
    for (const c of campaigns) {
      for (const adset of c.adsets) {
        for (const ad of adset.ads) {
          result.push({
            id: ad.id,
            name: ad.name,
            campaignName: c.name,
            adsetName: adset.name,
            data: ad as any,
          });
        }
      }
    }
    return result;
  }, [campaigns, dimension]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    if (sort.key === "name") return sortRows(rows, sort, (r) => r.name);
    if (sort.key === "campaignName") return sortRows(rows, sort, (r) => r.campaignName ?? "");
    if (sort.key === "adsetName") return sortRows(rows, sort, (r) => r.adsetName ?? "");
    return sortRows(rows, sort, (r, k) => r.data[k]);
  }, [rows, sort]);

  // Sort campaigns for campaign view
  const sortedCampaigns = useMemo(() => {
    if (!sort || dimension !== "campaign") return campaigns;
    if (sort.key === "name") return sortRows(campaigns, sort, (c) => c.name);
    return sortRows(campaigns, sort, (c, k) => (c as any)[k]);
  }, [campaigns, sort, dimension]);

  // Number of sticky dimension columns
  const parentColCount = useMemo(() => {
    if (!showParentCols) return 1;
    if (dimension === "ad") return 3; // campaign + adset + ad
    if (dimension === "adset") return 2; // campaign + adset
    return 1; // campaign
  }, [dimension, showParentCols]);

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

  // Expanded rows (only for campaign dimension)
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((id: string) => {
    setExpandedCampaigns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const containerClass = "flex flex-col";

  const dimensionLabel = dimension === "campaign" ? "Campanha" : dimension === "adset" ? "Adset" : "Ad";

  // Sticky left offsets for dimension columns
  const dimColWidths = [180, 160, 160]; // approximate widths for each dim col

  return (
    <div className={containerClass}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-1 py-2">
        <div className="flex items-center gap-2">
          {/* Dimension switcher */}
          <div className="flex items-center rounded-md border border-border bg-muted/50 p-0.5">
            {dimensionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDimension(opt.value)}
                className={cn(
                  "px-2.5 py-1 text-[10px] font-semibold rounded transition-colors",
                  dimension === opt.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Show parent columns toggle */}
          {dimension !== "campaign" && (
            <label className="flex items-center gap-1.5 cursor-pointer">
              <Checkbox
                checked={showParentCols}
                onCheckedChange={(v) => setShowParentCols(!!v)}
                className="h-3.5 w-3.5"
              />
              <span className="text-[10px] text-muted-foreground font-medium">Hierarquia</span>
            </label>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 text-[10px] font-semibold tracking-wider">
                <Columns3 className="h-3 w-3" />
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[260px] max-h-[400px] overflow-y-auto p-2">
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
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onToggleFocusMode}>
          {focusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-30 bg-background">
            {/* Super-header row */}
            <tr className="border-b border-border">
              {/* Dimension super-header spanning all dim cols */}
              <th
                className="sticky left-0 z-40 bg-background px-3 py-1.5 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-r border-border"
                colSpan={parentColCount}
                rowSpan={2}
              >
                <div className="flex flex-col gap-0.5">
                  <span>{dimensionLabel}</span>
                  {dimension !== "campaign" && showParentCols && (
                    <span className="text-[9px] text-muted-foreground/60 font-normal normal-case">
                      {dimension === "ad" ? "+ Campanha, Adset" : "+ Campanha"}
                    </span>
                  )}
                </div>
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
              {visibleColumns.map((col) => {
                const isTrend = col.key.endsWith("Trend");
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "px-2 py-1.5 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                      !isTrend && "cursor-pointer hover:text-foreground select-none"
                    )}
                    onClick={!isTrend ? () => toggleSort(col.key) : undefined}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {col.shortLabel ?? col.label}
                      {!isTrend && <SortIcon active={sort?.key === col.key} dir={sort?.dir} />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dimension === "campaign" ? (
              // Campaign view with expand
              sortedCampaigns.map((campaign) => (
                <>
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
                    {visibleColumns.map((col) => {
                      const val = (campaign as any)[col.key];
                      const prev = previousRowData.get(campaign.id);
                      const prevVal = prev?.[col.key];
                      const isTrend = col.key.endsWith("Trend");
                      return (
                        <td key={col.key} className="px-2 py-2 text-right font-mono font-bold whitespace-nowrap">
                          <div className="flex flex-col items-end">
                            <span>{col.format(val, campaign)}</span>
                            {popEnabled && !isTrend && typeof val === "number" && prevVal != null && (
                              <PopBadge current={val} previous={prevVal} invertColor={invertColorKeys.has(col.key)} />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {expandedCampaigns.has(campaign.id) && campaign.adsets.map((adset) => (
                    <tr key={adset.id} className="border-b border-border/50 bg-card/30 hover:bg-accent/30 transition-colors">
                      <td className="sticky left-0 z-20 bg-card/30 px-3 py-1.5 pl-8 text-foreground/80 whitespace-nowrap border-r border-border text-[11px] shadow-[2px_0_4px_-2px_rgba(0,0,0,0.3)]">
                        ↳ {adset.name}
                        <span className="ml-2 text-[10px] text-muted-foreground font-mono">({adset.ads.length} ads)</span>
                      </td>
                      {visibleColumns.map((col) => {
                        const val = (adset as any)[col.key];
                        const prev = previousRowData.get(adset.id);
                        const prevVal = prev?.[col.key];
                        const isTrend = col.key.endsWith("Trend");
                        return (
                          <td key={col.key} className="px-2 py-1.5 text-right font-mono text-[11px] whitespace-nowrap text-foreground/70">
                            <div className="flex flex-col items-end">
                              <span>{col.format(val)}</span>
                              {popEnabled && !isTrend && typeof val === "number" && prevVal != null && (
                                <PopBadge current={val} previous={prevVal} invertColor={invertColorKeys.has(col.key)} />
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              ))
            ) : (
              // Flat view for adset / ad dimension
              sortedRows.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                  {/* Parent columns */}
                  {dimension === "ad" && showParentCols && (
                    <>
                      <td className="sticky left-0 z-20 bg-background px-3 py-2 text-[10px] text-muted-foreground whitespace-nowrap border-r border-border/50 max-w-[180px] truncate">
                        {row.campaignName}
                      </td>
                      <td className="sticky z-20 bg-background px-3 py-2 text-[10px] text-muted-foreground whitespace-nowrap border-r border-border/50 max-w-[160px] truncate" style={{ left: 180 }}>
                        {row.adsetName}
                      </td>
                    </>
                  )}
                  {dimension === "adset" && showParentCols && (
                    <td className="sticky left-0 z-20 bg-background px-3 py-2 text-[10px] text-muted-foreground whitespace-nowrap border-r border-border/50 max-w-[180px] truncate">
                      {row.campaignName}
                    </td>
                  )}
                  {/* Name column */}
                  <td
                    className={cn(
                      "sticky z-20 bg-background px-3 py-2 font-semibold text-foreground whitespace-nowrap border-r border-border shadow-[2px_0_4px_-2px_rgba(0,0,0,0.3)]",
                      "max-w-[200px] truncate"
                    )}
                    style={{
                      left: !showParentCols ? 0
                        : dimension === "ad" ? 340
                        : dimension === "adset" ? 180
                        : 0,
                    }}
                  >
                    {row.name}
                    {row.childCount && (
                      <span className="ml-2 text-[10px] text-muted-foreground font-mono">({row.childCount})</span>
                    )}
                  </td>
                  {/* Data columns */}
                  {visibleColumns.map((col) => {
                    const val = row.data[col.key];
                    const prev = previousRowData.get(row.id);
                    const prevVal = prev?.[col.key];
                    const isTrend = col.key.endsWith("Trend");
                    return (
                      <td key={col.key} className="px-2 py-2 text-right font-mono whitespace-nowrap">
                        <div className="flex flex-col items-end">
                          <span>{col.format(val, row.data)}</span>
                          {popEnabled && !isTrend && typeof val === "number" && prevVal != null && (
                            <PopBadge current={val} previous={prevVal} invertColor={invertColorKeys.has(col.key)} />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
          {/* Totals */}
          <tfoot className="sticky bottom-0 z-30 bg-background border-t-2 border-primary/30">
            <tr>
              <td
                className="sticky left-0 z-40 bg-background px-3 py-2 font-bold text-foreground text-xs border-r border-border shadow-[2px_0_4px_-2px_rgba(0,0,0,0.3)]"
                colSpan={parentColCount}
              >
                TOTAL ({rows.length})
              </td>
              {visibleColumns.map((col) => {
                const total = rows.reduce((s, r) => s + (typeof r.data[col.key] === "number" ? r.data[col.key] : 0), 0);
                const isAvg = ["roas", "ctr", "cpc", "cpm", "rps", "cps", "ecpm", "bounceRate", "timeToSession", "connectRate", "convRate", "leadsRate", "newLeadsRate", "uniqueLeadsRate", "revAutRate", "revBroadRate", "marginAut", "marginBroad", "costPerConversion", "costPerLead", "costPerNewLead"].includes(col.key);
                const isTrend = col.key.endsWith("Trend");
                const value = isTrend ? [] : isAvg && rows.length > 0 ? total / rows.length : total;
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
