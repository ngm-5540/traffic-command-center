import { useState, useMemo, useCallback } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { formatBRL, formatNumber, formatROAS, getRoasColor } from "@/lib/format";
import { DrilldownSheet } from "./DrilldownSheet";
import { cn } from "@/lib/utils";
import type { BroadcastDispatch } from "@/data/chatbotMockData";

interface Props {
  broadcasts: BroadcastDispatch[];
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

export function BroadcastTab({ broadcasts }: Props) {
  const [selected, setSelected] = useState<BroadcastDispatch | null>(null);
  const [sort, setSort] = useState<SortState | null>(null);

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
              return (
                <tr
                  key={b.id}
                  className="border-b border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => setSelected(b)}
                >
                  <td className="px-3 py-2 text-foreground font-medium whitespace-nowrap">{b.name}</td>
                  <td className="px-3 py-2 text-muted-foreground font-mono whitespace-nowrap">{b.date}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(b.sent)}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(b.delivered)}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(b.read)}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(b.clicked)}</td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(b.replied)}</td>
                  <td
                    className="px-3 py-2 text-right font-mono font-bold"
                    style={{ backgroundColor: `hsla(var(--success), ${heatOpacity})` }}
                  >
                    {formatBRL(b.revenue)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-bold">{formatBRL(b.cost)}</td>
                  <td className={`px-3 py-2 text-right font-mono font-bold ${b.profit >= 0 ? "text-profit" : "text-loss"}`}>
                    {formatBRL(b.profit)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-bold" style={{ color: getRoasColor(b.roas) }}>
                    {formatROAS(b.roas)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
