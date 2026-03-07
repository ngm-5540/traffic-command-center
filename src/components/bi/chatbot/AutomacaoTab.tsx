import { useState } from "react";
import { formatBRL, formatNumber, formatPercent, formatROAS, getRoasColor } from "@/lib/format";
import { DrilldownSheet } from "./DrilldownSheet";
import type { Automation } from "@/data/chatbotMockData";

interface Props {
  automations: Automation[];
}

export function AutomacaoTab({ automations }: Props) {
  const [selected, setSelected] = useState<Automation | null>(null);

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b border-border">
              {["Nome", "Msgs", "Enviados", "Entregues", "Lidos", "Clicados", "Respondidos", "Receita", "Custo", "Lucro", "ROAS", "Rev/MSG"].map((h) => (
                <th key={h} className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap ${h === "Nome" ? "text-left" : "text-right"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {automations.map((aut) => (
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
