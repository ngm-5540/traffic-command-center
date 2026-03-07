export type Vertical = "todos" | "google_ads" | "meta_ads" | "chatbot";
export type ProjectStatus = "ativo" | "alerta" | "pausado";
export type Period = "hoje" | "ontem" | "7d";

export interface DashboardProject {
  id: string;
  name: string;
  vertical: Vertical;
  status: ProjectStatus;
  type: string;
  revenue: number;
  spend: number;
  profit: number;
  roas: number;
}

export const verticals: { key: Vertical; label: string }[] = [
  { key: "todos", label: "TODOS" },
  { key: "google_ads", label: "GOOGLE ADS" },
  { key: "meta_ads", label: "META ADS" },
  { key: "chatbot", label: "CHATBOT" },
];

export const periods: { key: Period; label: string }[] = [
  { key: "hoje", label: "HOJE" },
  { key: "ontem", label: "ONTEM" },
  { key: "7d", label: "7D" },
];

export const dashboardProjects: DashboardProject[] = [
  // Google Ads
  { id: "g1", name: "Saúde BR - Life", vertical: "google_ads", status: "ativo", type: "Saúde", revenue: 18420.50, spend: 7230.00, profit: 11190.50, roas: 2.55 },
  { id: "g2", name: "Finanças - CDB Pro", vertical: "google_ads", status: "ativo", type: "Finanças", revenue: 1320100.00, spend: 1400500.00, profit: -80400.00, roas: 0.94 },
  { id: "g3", name: "Educação - Cursos", vertical: "google_ads", status: "alerta", type: "Educação", revenue: 5200.00, spend: 4800.00, profit: 400.00, roas: 1.08 },
  { id: "g4", name: "Tech - SaaS Lead", vertical: "google_ads", status: "pausado", type: "Tecnologia", revenue: 1200.00, spend: 3100.00, profit: -1900.00, roas: 0.39 },
  { id: "g5", name: "E-commerce Moda", vertical: "google_ads", status: "ativo", type: "E-commerce", revenue: 9870.30, spend: 3450.00, profit: 6420.30, roas: 2.86 },
  // Meta Ads
  { id: "m1", name: "Saúde BR - Vida", vertical: "meta_ads", status: "ativo", type: "Saúde", revenue: 22340.00, spend: 9100.00, profit: 13240.00, roas: 2.45 },
  { id: "m2", name: "Curiosidades Mundo", vertical: "meta_ads", status: "ativo", type: "Entretenimento", revenue: 14600.00, spend: 6800.00, profit: 7800.00, roas: 2.15 },
  { id: "m3", name: "Receitas Fáceis", vertical: "meta_ads", status: "alerta", type: "Culinária", revenue: 3100.00, spend: 2900.00, profit: 200.00, roas: 1.07 },
  { id: "m4", name: "Pets & Amor", vertical: "meta_ads", status: "pausado", type: "Pets", revenue: 800.00, spend: 2200.00, profit: -1400.00, roas: 0.36 },
  // Chatbot
  { id: "c1", name: "Atendimento Saúde", vertical: "chatbot", status: "ativo", type: "Atendimento", revenue: 8900.00, spend: 2100.00, profit: 6800.00, roas: 4.24 },
  { id: "c2", name: "Suporte Financeiro", vertical: "chatbot", status: "ativo", type: "Suporte", revenue: 5400.00, spend: 1800.00, profit: 3600.00, roas: 3.00 },
  { id: "c3", name: "Bot Vendas Auto", vertical: "chatbot", status: "alerta", type: "Vendas", revenue: 1900.00, spend: 1700.00, profit: 200.00, roas: 1.12 },
];
