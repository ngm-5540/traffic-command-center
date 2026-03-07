import { useState, useMemo, useCallback } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBRL, formatNumber, formatPercent, formatROAS, getRoasColor } from "@/lib/format";
import { DrilldownSheet } from "./DrilldownSheet";
import { PopBadge } from "./PopBadge";
import { cn } from "@/lib/utils";
import { generatePreviousRecord } from "@/data/popMockData";
import type { Automation } from "@/data/chatbotMockData";

interface Props {
  automations: Automation[];
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

const columns: { key: string; label: string; align: "left" | "right"; getValue: (a: Automation) => any }[] = [
  { key: "name", label: "Nome", align: "left", getValue: (a) => a.name },
  { key: "msgs", label: "Msgs", align: "right", getValue: (a) => a.messages.length },
  { key: "totalSent", label: "Enviados", align: "right", getValue: (a) => a.totalSent },
  { key: "totalDelivered", label: "Entregues", align: "right", getValue: (a) => a.totalDelivered },
  { key: "totalRead", label: "Lidos", align: "right", getValue: (a) => a.totalRead },
  { key: "totalClicked", label: "Clicados", align: "right", getValue: (a) => a.totalClicked },
  { key: "totalReplied", label: "Respondidos", align: "right", getValue: (a) => a.totalReplied },
  { key: "revenue", label: "Receita", align: "right", getValue: (a) => a.revenue },
  { key: "cost", label: "Custo", align: "right", getValue: (a) => a.cost },
  { key: "profit", label: "Lucro", align: "right", getValue: (a) => a.profit },
  { key: "roas", label: "ROAS", align: "right", getValue: (a) => a.roas },
  { key: "revMsgRate", label: "Rev/MSG", align: "right", getValue: (a) => a.revMsgRate },
];

const invertColorKeys = new Set(["cost"]);

export function AutomacaoTab({ automations, popEnabled = false, focusMode, onToggleFocusMode, filtersNode, tabsListNode }: Props) {
  const [selected, setSelected] = useState<Automation | null>(null);
  const [sort, setSort] = useState<SortState | null>(null);

  const previousData = useMemo(() => {
    const map = new Map<string, Record<string, number>>();
    automations.forEach((a, i) => map.set(a.id, generatePreviousRecord(a, i * 100)));
    return map;
  }, [automations]);

  const toggleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev?.key === key) return prev.dir === "asc" ? { key, dir: "desc" } : null;
      return { key, dir: "desc" };
    });
  }, []);

  const sorted = useMemo(() => {
    if (!sort) return automations;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return automations;
    return [...automations].sort((a, b) => {
      const va = col.getValue(a);
      const vb = col.getValue(b);
      if (typeof va === "string") return sort.dir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sort.dir === "asc" ? va - vb : vb - va;
    });
  }, [automations, sort]);

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
              {sorted.map((aut) => (
                <tr
                  key={aut.id}
                  className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => setSelected(aut)}
                >
                  {columns.map((col) => {
                    const val = col.getValue(aut);
                    const prev = previousData.get(aut.id);
                    const prevVal = prev ? prev[col.key] : undefined;
                    const isName = col.key === "name";
                    const formatted = isName
                      ? <>{aut.name}<span className="ml-1.5 text-[10px] text-muted-foreground font-mono">({aut.messages.length})</span></>
                      : col.key === "profit"
                        ? <span className={aut.profit >= 0 ? "text-profit" : "text-loss"}>{formatBRL(val)}</span>
                        : col.key === "roas"
                          ? <span style={{ color: getRoasColor(val) }}>{formatROAS(val)}</span>
                          : col.key === "revenue" || col.key === "cost" || col.key === "revMsgRate"
                            ? formatBRL(val)
                            : formatNumber(val);
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          "px-3 py-2 font-mono font-bold whitespace-nowrap",
                          isName ? "text-foreground font-medium font-sans" : "text-right"
                        )}
                      >
                        <div className="flex flex-col items-end">
                          <span>{formatted}</span>
                          {popEnabled && !isName && typeof val === "number" && prevVal != null && (
                            <PopBadge current={val} previous={prevVal} invertColor={invertColorKeys.has(col.key)} />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DrilldownSheet
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        type="automation"
        data={selected}
      />
    </>
  );
}
