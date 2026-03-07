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
  // Google Ads — variação ampla de ROAS
  { id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", name: "Saúde BR - Life", vertical: "google_ads", status: "ativo", type: "Saúde", revenue: 18420.50, spend: 7230.00, profit: 11190.50, roas: 1.55 },
  { id: "b2c3d4e5-f6a7-8901-bcde-f12345678901", name: "Finanças - CDB Pro", vertical: "google_ads", status: "ativo", type: "Finanças", revenue: 1320100.00, spend: 1400500.00, profit: -80400.00, roas: -0.06 },
  { id: "c3d4e5f6-a7b8-9012-cdef-123456789012", name: "Educação - Cursos", vertical: "google_ads", status: "alerta", type: "Educação", revenue: 5200.00, spend: 4800.00, profit: 400.00, roas: 0.08 },
  { id: "d4e5f6a7-b8c9-0123-defa-234567890123", name: "Tech - SaaS Lead", vertical: "google_ads", status: "pausado", type: "Tecnologia", revenue: 450.00, spend: 3100.00, profit: -2650.00, roas: -0.85 },
  { id: "e5f6a7b8-c9d0-1234-efab-345678901234", name: "E-commerce Moda", vertical: "google_ads", status: "ativo", type: "E-commerce", revenue: 9870.30, spend: 3450.00, profit: 6420.30, roas: 0.86 },
  // Meta Ads
  { id: "f6a7b8c9-d0e1-2345-fabc-456789012345", name: "Saúde BR - Vida", vertical: "meta_ads", status: "ativo", type: "Saúde", revenue: 22340.00, spend: 9100.00, profit: 13240.00, roas: 0.45 },
  { id: "a7b8c9d0-e1f2-3456-abcd-567890123456", name: "Curiosidades Mundo", vertical: "meta_ads", status: "ativo", type: "Entretenimento", revenue: 14600.00, spend: 6800.00, profit: 7800.00, roas: 1.15 },
  { id: "b8c9d0e1-f2a3-4567-bcde-678901234567", name: "Receitas Fáceis", vertical: "meta_ads", status: "alerta", type: "Culinária", revenue: 200.00, spend: 2900.00, profit: -2700.00, roas: -0.93 },
  { id: "c9d0e1f2-a3b4-5678-cdef-789012345678", name: "Pets & Amor", vertical: "meta_ads", status: "pausado", type: "Pets", revenue: 0.00, spend: 2200.00, profit: -2200.00, roas: -1.00 },
  // Chatbot
  { id: "d0e1f2a3-b4c5-6789-defa-890123456789", name: "Atendimento Saúde", vertical: "chatbot", status: "ativo", type: "Atendimento", revenue: 8900.00, spend: 2100.00, profit: 6800.00, roas: 1.00 },
  { id: "e1f2a3b4-c5d6-7890-efab-901234567890", name: "Suporte Financeiro", vertical: "chatbot", status: "ativo", type: "Suporte", revenue: 5400.00, spend: 1800.00, profit: 3600.00, roas: 0.00 },
  { id: "f2a3b4c5-d6e7-8901-fabc-012345678901", name: "Bot Vendas Auto", vertical: "chatbot", status: "alerta", type: "Vendas", revenue: 1900.00, spend: 1700.00, profit: 200.00, roas: 0.12 },
];
