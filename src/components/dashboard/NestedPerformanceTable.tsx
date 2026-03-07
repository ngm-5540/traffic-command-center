import { useState } from "react";
import { ChevronRight, ChevronDown, Zap } from "lucide-react";
import type { Campaign, Adset, Ad } from "@/data/mockData";

interface NestedPerformanceTableProps {
  campaigns: Campaign[];
}

function MatchBadge({ rate }: { rate?: number }) {
  if (rate == null) return null;
  const color = rate >= 95 ? "bg-profit/15 text-profit" : rate >= 80 ? "bg-warning/15 text-warning" : "bg-loss/15 text-loss";
  return (
    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${color}`}>
      {rate}%
    </span>
  );
}

function AutomationIcon({ active }: { active?: boolean }) {
  if (!active) return null;
  return (
    <span className="inline-flex items-center text-warning" title="Automação ativa">
      <Zap className="h-3.5 w-3.5 fill-warning" />
    </span>
  );
}

function formatCurrency(v: number) {
  return `R$ ${v.toLocaleString("pt-BR")}`;
}

function AdRow({ ad, depth }: { ad: Ad; depth: number }) {
  return (
    <tr className="border-b border-border/50 text-xs hover:bg-accent/30">
      <td className="py-2.5 pr-3" style={{ paddingLeft: `${depth * 24 + 16}px` }}>
        <span className="text-muted-foreground">{ad.name}</span>
        <span className="ml-2 font-mono text-[10px] text-muted-foreground/60">ID: {ad.adId}</span>
      </td>
      <td className="py-2.5 px-3 text-right tabular-nums">{formatCurrency(ad.spend)}</td>
      <td className="py-2.5 px-3 text-right tabular-nums">{formatCurrency(ad.revenue)}</td>
      <td className="py-2.5 px-3 text-right tabular-nums">{ad.roas.toFixed(2)}</td>
      <td className="py-2.5 px-3 text-center">
        <MatchBadge rate={ad.matchRate} />
      </td>
      <td className="py-2.5 px-3 text-center">
        <AutomationIcon active={ad.automationActive} />
      </td>
    </tr>
  );
}

function AdsetRow({ adset, depth }: { adset: Adset; depth: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        className="border-b border-border/50 text-xs hover:bg-accent/30 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <td className="py-2.5 pr-3" style={{ paddingLeft: `${depth * 24 + 16}px` }}>
          <span className="inline-flex items-center gap-1">
            {open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            <span className="font-medium text-foreground/90">{adset.name}</span>
          </span>
        </td>
        <td className="py-2.5 px-3 text-right tabular-nums">{formatCurrency(adset.spend)}</td>
        <td className="py-2.5 px-3 text-right tabular-nums">{formatCurrency(adset.revenue)}</td>
        <td className="py-2.5 px-3 text-right tabular-nums">{adset.roas.toFixed(2)}</td>
        <td className="py-2.5 px-3 text-center">
          <MatchBadge rate={adset.matchRate} />
        </td>
        <td className="py-2.5 px-3 text-center">
          <AutomationIcon active={adset.automationActive} />
        </td>
      </tr>
      {open && adset.ads.map((ad) => <AdRow key={ad.id} ad={ad} depth={depth + 1} />)}
    </>
  );
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        className="border-b border-border text-xs hover:bg-accent/40 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <td className="py-3 pl-4 pr-3">
          <span className="inline-flex items-center gap-1.5">
            {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            <span className="font-semibold text-foreground">{campaign.name}</span>
          </span>
        </td>
        <td className="py-3 px-3 text-right tabular-nums font-medium">{formatCurrency(campaign.spend)}</td>
        <td className="py-3 px-3 text-right tabular-nums font-medium">{formatCurrency(campaign.revenue)}</td>
        <td className="py-3 px-3 text-right tabular-nums font-medium">{campaign.roas.toFixed(2)}</td>
        <td className="py-3 px-3 text-center">
          <MatchBadge rate={campaign.matchRate} />
        </td>
        <td className="py-3 px-3 text-center">
          <AutomationIcon active={campaign.automationActive} />
        </td>
      </tr>
      {open && campaign.adsets.map((adset) => <AdsetRow key={adset.id} adset={adset} depth={1} />)}
    </>
  );
}

export function NestedPerformanceTable({ campaigns }: NestedPerformanceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground">
            <th className="py-3 pl-4 pr-3 text-left font-medium">Nome</th>
            <th className="py-3 px-3 text-right font-medium">Spend</th>
            <th className="py-3 px-3 text-right font-medium">Revenue</th>
            <th className="py-3 px-3 text-right font-medium">ROAS</th>
            <th className="py-3 px-3 text-center font-medium">Match Rate</th>
            <th className="py-3 px-3 text-center font-medium">Auto</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c) => (
            <CampaignRow key={c.id} campaign={c} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
