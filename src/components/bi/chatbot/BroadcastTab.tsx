import { useState, useMemo, useCallback } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL, formatNumber, formatROAS, getRoasColor } from "@/lib/format";
import { DrilldownSheet } from "./DrilldownSheet";
import { PopBadge } from "./PopBadge";
import { cn } from "@/lib/utils";
import { generatePreviousRecord } from "@/data/popMockData";
import type { BroadcastDispatch } from "@/data/chatbotMockData";

interface Props {
  broadcasts: BroadcastDispatch[];
  popEnabled?: boolean;
  focusMode?: boolean;
  onToggleFocusMode?: () => void;
  filtersNode?: React.ReactNode;
  tabsListNode?: React.ReactNode;
}

type SortDir = "asc" | "desc";
interface SortState { key: string; dir: SortDir; }

function SortIcon({ active, dir }: { active: boolean; dir?: SortDir }) {
  if (!active) return <ArrowUpDown className="h-2.5 w-2.5 opacity-30" />;
  return dir === "asc" ? <ArrowUp className="h-2.5 w-2.5 text-primary" /> : <ArrowDown className="h-2.5 w-2.5 text-primary" />;
}

const columns: { key: string; label: string; align: "left" | "right"; getValue: (b: BroadcastDispatch) => any }[] = [
  { key: "name", label: "Nome", align: "left", getValue: (b) => b.name },
  { key: "date", label: "Data", align: "left", getValue: (b) => b.date },
  { key: "sent", label: "Enviados", align: "right", getValue: (b) => b.sent },
  { key: "delivered", label: "Entregues", align: "right", getValue: (b) => b.delivered },
  { key: "read", label: "Lidos", align: "right", getValue: (b) => b.read },
  { key: "clicked", label: "Clicados", align: "right", getValue: (b) => b.clicked },
  { key: "replied", label: "Respondidos", align: "right", getValue: (b) => b.replied },
  { key: "revenue", label: "Receita", align: "right", getValue: (b) => b.revenue },
  { key: "cost", label: "Custo", align: "right", getValue: (b) => b.cost },
  { key: "profit", label: "Lucro", align: "right", getValue: (b) => b.profit },
  { key: "roas", label: "ROAS", align: "right", getValue: (b) => b.roas },
];

const invertColorKeys = new Set(["cost"]);

export function BroadcastTab({ broadcasts, popEnabled = false, focusMode, onToggleFocusMode, filtersNode, tabsListNode }: Props) {
  const [selected, setSelected] = useState<BroadcastDispatch | null>(null);
  const [sort, setSort] = useState<SortState | null>(null);

  const previousData = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    broadcasts.forEach((b, i) => map.set(b.id, generatePreviousRecord(b, i * 200)));
    return map;
  }, [broadcasts]);

  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev?.key === key) return prev.dir === "asc" ? { key, dir: "desc" } : null;
      return { key, dir: "desc" };
    });
  }, []);

  const sorted = useMemo(() => {
    if (!sort) return broadcasts;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return broadcasts;
    return [...broadcasts].sort((a, b) => {
      const va = col.getValue(a);
      const vb = col.getValue(b);
      if (typeof va === "string") return sort.dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sort.dir === "asc" ? va - vb : vb - va;
    });
  }, [broadcasts, sort]);

  const maxRevenue = useMemo(() => Math.max(...broadcasts.map((b) => b.revenue), 1), [broadcasts]);

  return (
    <>
      <div className="flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 px-1 py-2">
          <div className="flex items-center gap-2 flex-wrap">
            {tabsListNode}
            <div className="h-5 w-px bg-border shrink-0" />
            {filtersNode}
          </div>
          {onToggleFocusMode && (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onToggleFocusMode}>
              {focusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-background">
              <tr className="border-b border-border">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap cursor-pointer hover:text-foreground select-none",
                      col.align === "left" ? "text-left" : "text-right"
                    )}
                    onClick={() => toggleSort(col.key)}
                  >
                    <span className="inline-flex items-center gap-0.5">
                      {col.label}
                      <SortIcon active={sort?.key === col.key} dir={sort?.dir} />
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((b) => {
                const heatOpacity = maxRevenue > 0 ? (b.revenue / maxRevenue) * 0.4 : 0;
                const prev = previousData.get(b.id);
                return (
                  <tr
                    key={b.id}
                    className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                    onClick={() => setSelected(b)}
                  >
                    {columns.map((col) => {
                      const val = col.getValue(b);
                      const prevVal = prev ? prev[col.key] : undefined;
                      const isName = col.key === "name";
                      const isDate = col.key === "date";
                      const isRevenue = col.key === "revenue";
                      const isProfit = col.key === "profit";
                      const isRoas = col.key === "roas";

                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "px-3 py-2 font-mono font-bold whitespace-nowrap",
                            isName && "text-foreground font-medium font-sans",
                            isDate && "text-muted-foreground font-sans",
                            !isName && !isDate && "text-right"
                          )}
                          style={isRevenue ? { backgroundColor: `hsla(var(--success), ${heatOpacity})` } : undefined}
                        >
                          <div className={cn("flex flex-col", !isName && !isDate && "items-end")}>
                            <span className={cn(
                              isProfit && (b.profit >= 0 ? "text-profit" : "text-loss")
                            )} style={isRoas ? { color: getRoasColor(b.roas) } : undefined}>
                              {isName ? b.name
                                : isDate ? b.date
                                : isProfit ? formatBRL(val)
                                : isRoas ? formatROAS(val)
                                : isRevenue ? formatBRL(val)
                                : col.key === "cost" ? formatBRL(val)
                                : formatNumber(val)}
                            </span>
                            {popEnabled && !isName && !isDate && typeof val === "number" && prevVal != null && (
                              <PopBadge current={val} previous={prevVal} invertColor={invertColorKeys.has(col.key)} />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <DrilldownSheet
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        type="broadcast"
        data={selected}
      />
    </>
  );
}
