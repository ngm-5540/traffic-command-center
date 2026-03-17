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
  revenueUsd: number; // Raw GAM revenue in USD (before rev share)
  spend: number;
  profit: number;
  roas: number;
  sessions: number;
  leads: number;
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

export const dashboardProjects: DashboardProject[] = [];
