import { useState, useMemo, useCallback } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { formatBRL, formatNumber, formatPercent, formatROAS, getRoasColor } from "@/lib/format";
import { DrilldownSheet } from "./DrilldownSheet";
import { cn } from "@/lib/utils";
import type { Automation } from "@/data/chatbotMockData";

interface Props {
  automations: Automation[];
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

export function AutomacaoTab({ automations }: Props) {
  const [selected, setSelected] = useState<Automation | null>(null);
  const [sort, setSort] = useState<SortState | null>(null);

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
                <td className="px-3 py-2 text-foreground font-medium whitespace-nowrap">
                  {aut.name}
                  <span className="ml-1.5 text-[10px] text-muted-foreground font-mono">({aut.messages.length})</span>
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold">{aut.messages.length}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(aut.totalSent)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(aut.totalDelivered)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(aut.totalRead)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(aut.totalClicked)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatNumber(aut.totalReplied)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatBRL(aut.revenue)}</td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatBRL(aut.cost)}</td>
                <td className={`px-3 py-2 text-right font-mono font-bold ${aut.profit >= 0 ? "text-profit" : "text-loss"}`}>
                  {formatBRL(aut.profit)}
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold" style={{ color: getRoasColor(aut.roas) }}>
                  {formatROAS(aut.roas)}
                </td>
                <td className="px-3 py-2 text-right font-mono font-bold">{formatBRL(aut.revMsgRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
