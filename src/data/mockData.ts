export interface Ad {
  id: string;
  name: string;
  adId: string;
  spend: number;
  revenue: number;
  roas: number;
  matchRate?: number;
  automationActive?: boolean;
}

export interface Adset {
  id: string;
  name: string;
  spend: number;
  revenue: number;
  roas: number;
  matchRate?: number;
  automationActive?: boolean;
  ads: Ad[];
}

export interface Campaign {
  id: string;
  name: string;
  spend: number;
  revenue: number;
  roas: number;
  matchRate: number;
  automationActive?: boolean;
  adsets: Adset[];
}

export interface Project {
  id: string;
  uuid: string;
  name: string;
  status: "active" | "paused";
  spend: number;
  revenue: number;
  profit: number;
  roas: number;
  campaigns: Campaign[];
}

export interface ChartDataPoint {
  day: string;
  spend: number;
  revenue: number;
}

export interface RpsDataPoint {
  hour: string;
  rps: number;
}

export const projects: Project[] = [
  {
    id: "fin-alpha",
    uuid: "A3k9Z",
    name: "Finanças Alpha",
    status: "active",
    spend: 7000,
    revenue: 11600,
    profit: 4600,
    roas: 1.66,
    campaigns: [
      {
        id: "cbo-fin-broad",
        name: "CBO_Finanças_Broad",
        spend: 5000,
        revenue: 8500,
        roas: 1.70,
        matchRate: 98,
        adsets: [
          {
            id: "lal-1",
            name: "Lookalike_1%",
            spend: 3000,
            revenue: 5400,
            roas: 1.80,
            automationActive: true,
            ads: [
              { id: "ad-1", name: "Video_V1", adId: "123", spend: 2000, revenue: 4000, roas: 2.00 },
              { id: "ad-2", name: "Imagem_Est", adId: "678", spend: 1000, revenue: 1400, roas: 1.40 },
            ],
          },
          {
            id: "int-1",
            name: "Interesses",
            spend: 2000,
            revenue: 3100,
            roas: 1.55,
            matchRate: 85,
            ads: [
              { id: "ad-3", name: "Carrossel_V2", adId: "901", spend: 1200, revenue: 1900, roas: 1.58 },
              { id: "ad-4", name: "Static_Banner", adId: "234", spend: 800, revenue: 1200, roas: 1.50 },
            ],
          },
        ],
      },
      {
        id: "abo-fin-retarget",
        name: "ABO_Finanças_Retarget",
        spend: 2000,
        revenue: 3100,
        roas: 1.55,
        matchRate: 92,
        adsets: [
          {
            id: "ret-180d",
            name: "Retarget_180d",
            spend: 2000,
            revenue: 3100,
            roas: 1.55,
            ads: [
              { id: "ad-5", name: "DPA_V1", adId: "567", spend: 2000, revenue: 3100, roas: 1.55 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "saude-beta",
    uuid: "B7mX2",
    name: "Saúde Beta",
    status: "active",
    spend: 4530,
    revenue: 6580,
    profit: 2050,
    roas: 1.45,
    campaigns: [
      {
        id: "cbo-saude-broad",
        name: "CBO_Saude_Broad",
        spend: 4530,
        revenue: 6580,
        roas: 1.45,
        matchRate: 91,
        automationActive: true,
        adsets: [
          {
            id: "lal-saude",
            name: "Lookalike_3%",
            spend: 2800,
            revenue: 4200,
            roas: 1.50,
            automationActive: true,
            ads: [
              { id: "ad-6", name: "Video_Saude_V1", adId: "111", spend: 1800, revenue: 2800, roas: 1.56 },
              { id: "ad-7", name: "Image_Saude", adId: "222", spend: 1000, revenue: 1400, roas: 1.40 },
            ],
          },
          {
            id: "int-saude",
            name: "Interesses_Saude",
            spend: 1730,
            revenue: 2380,
            roas: 1.38,
            matchRate: 78,
            ads: [
              { id: "ad-8", name: "Carousel_Saude", adId: "333", spend: 1730, revenue: 2380, roas: 1.38 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "curiosidades",
    uuid: "C1pQ8",
    name: "Curiosidades Mundo",
    status: "active",
    spend: 3000,
    revenue: 4000,
    profit: 1000,
    roas: 1.33,
    campaigns: [
      {
        id: "cbo-curio",
        name: "CBO_Curiosidades_Viral",
        spend: 3000,
        revenue: 4000,
        roas: 1.33,
        matchRate: 88,
        adsets: [
          {
            id: "broad-curio",
            name: "Broad_18_65",
            spend: 3000,
            revenue: 4000,
            roas: 1.33,
            automationActive: true,
            ads: [
              { id: "ad-9", name: "Video_Viral_V1", adId: "444", spend: 2000, revenue: 2800, roas: 1.40 },
              { id: "ad-10", name: "Slideshow_V2", adId: "555", spend: 1000, revenue: 1200, roas: 1.20 },
            ],
          },
        ],
      },
    ],
  },
];

export const globalSummary = {
  spend: 14530,
  revenue: 22180,
  profit: 7650,
  roas: 1.52,
  spendTrend: 8,
  revenueTrend: 15,
  profitTrend: 22,
  roasTrend: 5,
};

export const chartData: ChartDataPoint[] = [
  { day: "Seg", spend: 2000, revenue: 3500 },
  { day: "Ter", spend: 2500, revenue: 4100 },
  { day: "Qua", spend: 3100, revenue: 4800 },
  { day: "Qui", spend: 1800, revenue: 3200 },
  { day: "Sex", spend: 2200, revenue: 3600 },
  { day: "Sáb", spend: 1500, revenue: 2100 },
  { day: "Dom", spend: 1430, revenue: 1880 },
];

export const rpsData: RpsDataPoint[] = [
  { hour: "00h", rps: 12 },
  { hour: "02h", rps: 5 },
  { hour: "04h", rps: 3 },
  { hour: "06h", rps: 8 },
  { hour: "08h", rps: 25 },
  { hour: "10h", rps: 45 },
  { hour: "12h", rps: 62 },
  { hour: "14h", rps: 58 },
  { hour: "16h", rps: 48 },
  { hour: "18h", rps: 72 },
  { hour: "20h", rps: 85 },
  { hour: "22h", rps: 38 },
];

export const utmSources = ["facebook", "google", "tiktok", "taboola", "outbrain"];
export const utmMediums = ["cpc", "cpm", "social", "display", "native"];
