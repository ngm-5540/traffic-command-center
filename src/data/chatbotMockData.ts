// ── Types ──────────────────────────────────────────────
export interface ChatbotAd {
  id: string;
  name: string;
  cost: number;
  revenue: number;
  profit: number;
  roas: number;
  impressions: number;
  linkClicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  sessions: number;
  rps: number;
  cps: number;
  rpsTrend: number[];
  costTrend: number[];
}

export interface ChatbotAdset {
  id: string;
  name: string;
  ads: ChatbotAd[];
  // aggregated
  cost: number;
  revenue: number;
  profit: number;
  roas: number;
  budget: number;
  budgetRemaining: number;
  impressions: number;
  linkClicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  sessions: number;
  rps: number;
  cps: number;
  ecpm: number;
  pmr: number;
  ips: number;
  bounceRate: number;
  timeToSession: number;
  connectRate: number;
  rpsTrend: number[];
  costTrend: number[];
}

export interface ChatbotCampaign {
  id: string;
  name: string;
  adsets: ChatbotAdset[];
  cost: number;
  revenue: number;
  profit: number;
  roas: number;
  budget: number;
  budgetRemaining: number;
  impressions: number;
  linkClicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  sessions: number;
  rps: number;
  cps: number;
  ecpm: number;
  pmr: number;
  ips: number;
  bounceRate: number;
  timeToSession: number;
  connectRate: number;
  // automation
  revenueAut: number;
  revAutRate: number;
  resultAut: number;
  marginAut: number;
  // broadcast
  revenueBroad: number;
  revBroadRate: number;
  resultBroad: number;
  marginBroad: number;
  // conversion
  costPerConversion: number;
  convRate: number;
  conversions: number;
  costPerLead: number;
  leadsRate: number;
  leads: number;
  costPerNewLead: number;
  newLeadsRate: number;
  newLeads: number;
  uniqueLeadsRate: number;
  rpsTrend: number[];
  costTrend: number[];
}

export interface AutomationMessage {
  id: string;
  name: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  replied: number;
  revenue: number;
  cost: number;
}

export interface Automation {
  id: string;
  name: string;
  messages: AutomationMessage[];
  totalSent: number;
  totalDelivered: number;
  totalRead: number;
  totalClicked: number;
  totalReplied: number;
  revenue: number;
  cost: number;
  profit: number;
  roas: number;
  revMsgRate: number;
}

export interface BroadcastDispatch {
  id: string;
  name: string;
  date: string;
  sent: number;
  delivered: number;
  read: number;
  clicked: number;
  replied: number;
  revenue: number;
  cost: number;
  profit: number;
  roas: number;
}

// ── Helpers ──────────────────────────────────────────────
let _id = 0;
const uid = () => `mock-${++_id}`;
const rand = (min: number, max: number) => Math.round((Math.random() * (max - min) + min) * 100) / 100;
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const trend7 = (base: number, variance: number) =>
  Array.from({ length: 7 }, () => Math.max(0, base + (Math.random() - 0.5) * 2 * variance));

function makeAd(name: string, profitable: boolean): ChatbotAd {
  const cost = rand(50, 1200);
  const mult = profitable ? rand(1.1, 3.5) : rand(0.1, 0.9);
  const revenue = Math.round(cost * mult * 100) / 100;
  const profit = revenue - cost;
  const roas = cost > 0 ? profit / cost : 0;
  const impressions = randInt(500, 25000);
  const linkClicks = randInt(10, Math.floor(impressions * 0.08));
  const ctr = impressions > 0 ? linkClicks / impressions : 0;
  const cpc = linkClicks > 0 ? cost / linkClicks : 0;
  const cpm = impressions > 0 ? (cost / impressions) * 1000 : 0;
  const sessions = randInt(5, linkClicks);
  const rps = sessions > 0 ? revenue / sessions : 0;
  const cps = sessions > 0 ? cost / sessions : 0;
  return {
    id: uid(), name, cost, revenue, profit, roas,
    impressions, linkClicks, ctr, cpc, cpm,
    sessions, rps, cps,
    rpsTrend: trend7(rps, rps * 0.3),
    costTrend: trend7(cost / 7, cost * 0.05),
  };
}

function makeAdset(name: string, adCount: number, profitableRatio: number): ChatbotAdset {
  const ads: ChatbotAd[] = [];
  for (let i = 0; i < adCount; i++) {
    const profitable = Math.random() < profitableRatio;
    ads.push(makeAd(`${name} - Ad ${i + 1}`, profitable));
  }
  const cost = ads.reduce((s, a) => s + a.cost, 0);
  const revenue = ads.reduce((s, a) => s + a.revenue, 0);
  const profit = revenue - cost;
  const roas = cost > 0 ? profit / cost : 0;
  const impressions = ads.reduce((s, a) => s + a.impressions, 0);
  const linkClicks = ads.reduce((s, a) => s + a.linkClicks, 0);
  const sessions = ads.reduce((s, a) => s + a.sessions, 0);
  const budget = Math.round(cost * rand(1.1, 1.5));
  return {
    id: uid(), name, ads, cost, revenue, profit, roas,
    budget, budgetRemaining: Math.max(0, budget - cost),
    impressions, linkClicks,
    ctr: impressions > 0 ? linkClicks / impressions : 0,
    cpc: linkClicks > 0 ? cost / linkClicks : 0,
    cpm: impressions > 0 ? (cost / impressions) * 1000 : 0,
    sessions,
    rps: sessions > 0 ? revenue / sessions : 0,
    cps: sessions > 0 ? cost / sessions : 0,
    ecpm: impressions > 0 ? (revenue / impressions) * 1000 : 0,
    pmr: sessions > 0 ? revenue / sessions : 0,
    ips: impressions > 0 ? sessions / impressions : 0,
    bounceRate: rand(0.15, 0.65),
    timeToSession: rand(2, 45),
    connectRate: rand(0.3, 0.85),
    rpsTrend: trend7(sessions > 0 ? revenue / sessions : 0, 5),
    costTrend: trend7(cost / 7, cost * 0.03),
  };
}

function makeCampaign(
  name: string,
  adsetConfigs: { name: string; adCount: number }[],
  profitableRatio: number
): ChatbotCampaign {
  const adsets = adsetConfigs.map((c) => makeAdset(c.name, c.adCount, profitableRatio));
  const cost = adsets.reduce((s, a) => s + a.cost, 0);
  const revenue = adsets.reduce((s, a) => s + a.revenue, 0);
  const profit = revenue - cost;
  const roas = cost > 0 ? profit / cost : 0;
  const impressions = adsets.reduce((s, a) => s + a.impressions, 0);
  const linkClicks = adsets.reduce((s, a) => s + a.linkClicks, 0);
  const sessions = adsets.reduce((s, a) => s + a.sessions, 0);
  const budget = adsets.reduce((s, a) => s + a.budget, 0);

  const conversions = randInt(5, sessions * 0.3);
  const leads = randInt(conversions, conversions * 3);
  const newLeads = randInt(Math.floor(leads * 0.3), leads);

  const revenueAut = revenue * rand(0.3, 0.6);
  const revenueBroad = revenue * rand(0.1, 0.35);

  return {
    id: uid(), name, adsets, cost, revenue, profit, roas,
    budget, budgetRemaining: Math.max(0, budget - cost),
    impressions, linkClicks,
    ctr: impressions > 0 ? linkClicks / impressions : 0,
    cpc: linkClicks > 0 ? cost / linkClicks : 0,
    cpm: impressions > 0 ? (cost / impressions) * 1000 : 0,
    sessions,
    rps: sessions > 0 ? revenue / sessions : 0,
    cps: sessions > 0 ? cost / sessions : 0,
    ecpm: impressions > 0 ? (revenue / impressions) * 1000 : 0,
    pmr: sessions > 0 ? revenue / sessions : 0,
    ips: impressions > 0 ? sessions / impressions : 0,
    bounceRate: rand(0.15, 0.65),
    timeToSession: rand(2, 45),
    connectRate: rand(0.3, 0.85),
    revenueAut, revAutRate: revenue > 0 ? revenueAut / revenue : 0,
    resultAut: revenueAut - cost * 0.3, marginAut: revenueAut > 0 ? (revenueAut - cost * 0.3) / revenueAut : 0,
    revenueBroad, revBroadRate: revenue > 0 ? revenueBroad / revenue : 0,
    resultBroad: revenueBroad - cost * 0.1, marginBroad: revenueBroad > 0 ? (revenueBroad - cost * 0.1) / revenueBroad : 0,
    costPerConversion: conversions > 0 ? cost / conversions : 0,
    convRate: sessions > 0 ? conversions / sessions : 0,
    conversions,
    costPerLead: leads > 0 ? cost / leads : 0,
    leadsRate: sessions > 0 ? leads / sessions : 0,
    leads,
    costPerNewLead: newLeads > 0 ? cost / newLeads : 0,
    newLeadsRate: leads > 0 ? newLeads / leads : 0,
    newLeads,
    uniqueLeadsRate: sessions > 0 ? newLeads / sessions : 0,
    rpsTrend: trend7(sessions > 0 ? revenue / sessions : 0, 8),
    costTrend: trend7(cost / 7, cost * 0.03),
  };
}

// ── Campaigns ──────────────────────────────────────────
export const chatbotCampaigns: ChatbotCampaign[] = [
  makeCampaign("Campanha Saúde - Emagrecimento", [
    { name: "Mulheres 25-34", adCount: 2 },
    { name: "Homens 30-45", adCount: 5 },
    { name: "Lookalike Compradores", adCount: 1 },
    { name: "Retargeting Engajados", adCount: 8 },
  ], 0.7),
  makeCampaign("Campanha Finanças - Investimentos", [
    { name: "Broad Interesse Financeiro", adCount: 15 },
  ], 0.4),
  makeCampaign("Campanha Educação - Concursos", [
    { name: "Público Frio A", adCount: 1 },
    { name: "Público Frio B", adCount: 2 },
    { name: "Remarketing Site", adCount: 3 },
    { name: "Lookalike Alunos", adCount: 2 },
    { name: "Custom Audience", adCount: 1 },
    { name: "Interesse Direito", adCount: 3 },
  ], 0.55),
  makeCampaign("Campanha E-commerce - Moda", [
    { name: "Catálogo Feminino", adCount: 4 },
    { name: "Catálogo Masculino", adCount: 7 },
  ], 0.65),
  makeCampaign("Campanha Teste - Mínima", [
    { name: "Único Adset", adCount: 1 },
  ], 0.5),
  makeCampaign("Campanha Pets - Rações", [
    { name: "Cães Adultos", adCount: 3 },
    { name: "Filhotes", adCount: 6 },
    { name: "Gatos Premium", adCount: 2 },
  ], 0.6),
  makeCampaign("Campanha Viagem - Pacotes", [
    { name: "Nacional Nordeste", adCount: 2 },
    { name: "Nacional Sul", adCount: 4 },
    { name: "Internacional Europa", adCount: 10 },
    { name: "Cruzeiros", adCount: 3 },
    { name: "Mochilão", adCount: 6 },
  ], 0.5),
  makeCampaign("Campanha Tech - SaaS", [
    { name: "Developers", adCount: 12 },
    { name: "Managers", adCount: 4 },
  ], 0.45),
];

// ── Automations ──────────────────────────────────────────
function makeAutomationMsg(name: string): AutomationMessage {
  const sent = randInt(500, 15000);
  const delivered = randInt(Math.floor(sent * 0.85), sent);
  const read = randInt(Math.floor(delivered * 0.4), delivered);
  const clicked = randInt(0, Math.floor(read * 0.3));
  const replied = randInt(0, Math.floor(read * 0.15));
  const revenue = rand(0, clicked * 25);
  const cost = rand(0, sent * 0.02);
  return { id: uid(), name, sent, delivered, read, clicked, replied, revenue, cost };
}

function makeAutomation(name: string, msgCount: number): Automation {
  const msgNames = [
    "Boas-vindas", "Qualificação", "Oferta Principal", "Urgência", "Último Lembrete",
    "Upsell", "Cross-sell", "Pesquisa", "Reativação", "Conteúdo Gratuito",
    "Depoimento", "Desconto Final",
  ];
  const messages = Array.from({ length: msgCount }, (_, i) =>
    makeAutomationMsg(msgNames[i] || `Mensagem ${i + 1}`)
  );
  const totalSent = messages.reduce((s, m) => s + m.sent, 0);
  const totalDelivered = messages.reduce((s, m) => s + m.delivered, 0);
  const totalRead = messages.reduce((s, m) => s + m.read, 0);
  const totalClicked = messages.reduce((s, m) => s + m.clicked, 0);
  const totalReplied = messages.reduce((s, m) => s + m.replied, 0);
  const revenue = messages.reduce((s, m) => s + m.revenue, 0);
  const cost = messages.reduce((s, m) => s + m.cost, 0);
  return {
    id: uid(), name, messages,
    totalSent, totalDelivered, totalRead, totalClicked, totalReplied,
    revenue, cost, profit: revenue - cost,
    roas: cost > 0 ? (revenue - cost) / cost : 0,
    revMsgRate: totalSent > 0 ? revenue / totalSent : 0,
  };
}

export const chatbotAutomations: Automation[] = [
  makeAutomation("Fluxo Onboarding", 1),
  makeAutomation("Funil de Vendas Principal", 3),
  makeAutomation("Nutrição de Leads", 7),
  makeAutomation("Sequência Completa Premium", 12),
  makeAutomation("Recuperação de Carrinho", 5),
  makeAutomation("Reativação Inativos", 2),
];

// ── Broadcasts ──────────────────────────────────────────
function makeBroadcast(name: string, date: string, volume: number): BroadcastDispatch {
  const sent = volume;
  const delivered = randInt(Math.floor(sent * 0.88), sent);
  const read = randInt(Math.floor(delivered * 0.35), Math.floor(delivered * 0.75));
  const clicked = randInt(0, Math.floor(read * 0.2));
  const replied = randInt(0, Math.floor(read * 0.1));
  const revenue = rand(0, clicked * 30);
  const cost = rand(sent * 0.005, sent * 0.03);
  return {
    id: uid(), name, date, sent, delivered, read, clicked, replied,
    revenue, cost, profit: revenue - cost,
    roas: cost > 0 ? (revenue - cost) / cost : 0,
  };
}

export const chatbotBroadcasts: BroadcastDispatch[] = [
  makeBroadcast("Black Friday - Oferta Flash", "2025-11-29", 50000),
  makeBroadcast("Natal - Presentes", "2025-12-20", 42000),
  makeBroadcast("Ano Novo - Promoção", "2025-12-31", 38000),
  makeBroadcast("Lançamento Produto X", "2025-10-15", 25000),
  makeBroadcast("Webinar Convite", "2025-09-10", 18000),
  makeBroadcast("Pesquisa de Satisfação", "2025-08-05", 12000),
  makeBroadcast("Cupom Exclusivo", "2025-11-10", 30000),
  makeBroadcast("Reativação Base Fria", "2025-07-20", 45000),
  makeBroadcast("Novidade - Feature Update", "2025-10-01", 8000),
  makeBroadcast("Aniversário da Marca", "2025-06-15", 35000),
  makeBroadcast("Flash Sale 24h", "2025-11-15", 22000),
  makeBroadcast("Conteúdo Educativo", "2025-09-25", 5000),
  makeBroadcast("Pré-lançamento", "2025-10-05", 15000),
  makeBroadcast("Último Lote", "2025-11-28", 28000),
  makeBroadcast("Teste A/B Mensagem", "2025-08-15", 200),
];

// ── Filter options ──────────────────────────────────────
export const fanpageOptions = [
  "Saúde & Vida", "Finanças Pro", "Edu Concursos", "Moda Store",
  "Pet Love", "Viagem Total", "Tech SaaS",
];

export const countryOptions = ["Brasil", "Portugal", "Angola", "Moçambique"];
export const hourOptions = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
