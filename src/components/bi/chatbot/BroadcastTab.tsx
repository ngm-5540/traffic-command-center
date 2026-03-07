import { useState, useMemo } from "react";
import { formatBRL, formatNumber, formatROAS, getRoasColor } from "@/lib/format";
import { DrilldownSheet } from "./DrilldownSheet";
import type { BroadcastDispatch } from "@/data/chatbotMockData";

interface Props {
  broadcasts: BroadcastDispatch[];
}

export function BroadcastTab({ broadcasts }: Props) {
  const [selected, setSelected] = useState<BroadcastDispatch | null>(null);

  const maxRevenue = useMemo(() => Math.max(...broadcasts.map((b) => b.revenue), 1), [broadcasts]);

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b border-border">
              {["Nome", "Data", "Enviados", "Entregues", "Lidos", "Clicados", "Respondidos", "Receita", "Custo", "Lucro", "ROAS"].map((h) => (
                <th key={h} className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap ${h === "Nome" || h === "Data" ? "text-left" : "text-right"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {broadcasts.map((b) => {
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
