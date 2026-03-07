import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { formatBRL, formatNumber, formatPercent } from "@/lib/format";
import type { Automation, BroadcastDispatch } from "@/data/chatbotMockData";

interface DrilldownSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "automation" | "broadcast";
  data: Automation | BroadcastDispatch | null;
}

export function DrilldownSheet({ open, onOpenChange, type, data }: DrilldownSheetProps) {
  if (!data) return null;

  const isAutomation = type === "automation";
  const automationData = isAutomation ? (data as Automation) : null;
  const broadcastData = !isAutomation ? (data as BroadcastDispatch) : null;

  const funnelData = isAutomation && automationData
    ? [
        { name: "Enviados", value: automationData.totalSent, fill: "hsl(var(--muted-foreground))" },
        { name: "Entregues", value: automationData.totalDelivered, fill: "hsl(var(--primary))" },
        { name: "Lidos", value: automationData.totalRead, fill: "hsl(210, 80%, 65%)" },
        { name: "Clicados", value: automationData.totalClicked, fill: "hsl(var(--warning))" },
        { name: "Respondidos", value: automationData.totalReplied, fill: "hsl(var(--success))" },
      ]
    : broadcastData
      ? [
          { name: "Enviados", value: broadcastData.sent, fill: "hsl(var(--muted-foreground))" },
          { name: "Entregues", value: broadcastData.delivered, fill: "hsl(var(--primary))" },
          { name: "Lidos", value: broadcastData.read, fill: "hsl(210, 80%, 65%)" },
          { name: "Clicados", value: broadcastData.clicked, fill: "hsl(var(--warning))" },
          { name: "Respondidos", value: broadcastData.replied, fill: "hsl(var(--success))" },
        ]
      : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-sm font-semibold">{data.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Receita</span>
              <p className="font-mono text-lg font-bold text-foreground">{formatBRL(data.revenue)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Lucro</span>
              <p className={`font-mono text-lg font-bold ${data.profit >= 0 ? "text-profit" : "text-loss"}`}>
                {formatBRL(data.profit)}
              </p>
            </div>
            {isAutomation && automationData && (
              <>
                <div className="rounded-lg border border-border bg-card p-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Rev. MSG Rate</span>
                  <p className="font-mono text-lg font-bold text-foreground">{formatBRL(automationData.revMsgRate)}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Mensagens</span>
                  <p className="font-mono text-lg font-bold text-foreground">{formatNumber(automationData.messages.length)}</p>
                </div>
              </>
            )}
          </div>

          {/* Funnel */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Funil</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ left: 70, right: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(210, 20%, 90%)" }} width={65} />
                  <Tooltip
                    formatter={(value: number) => formatNumber(value)}
                    contentStyle={{ background: "hsl(228, 12%, 11%)", border: "1px solid hsl(228, 10%, 18%)", borderRadius: 6, fontSize: 12 }}
                    labelStyle={{ color: "hsl(210, 20%, 90%)" }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {funnelData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Message breakdown for automations */}
          {isAutomation && automationData && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">Mensagens</h4>
              <div className="space-y-1">
                {automationData.messages.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between rounded border border-border bg-card px-3 py-2">
                    <span className="text-xs text-foreground truncate mr-2">{msg.name}</span>
                    <div className="flex gap-3 text-[10px] font-mono text-muted-foreground shrink-0">
                      <span>{formatNumber(msg.sent)} env</span>
                      <span>{formatPercent(msg.sent > 0 ? msg.read / msg.sent : 0)} lidos</span>
                      <span className="text-foreground font-bold">{formatBRL(msg.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
