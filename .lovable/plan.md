

# Chatbot BI Dashboard — Fase 1: Plano de Implementação

## Resumo

Implementar o dashboard completo de BI para projetos Chatbot com tabelas avançadas, filtros, KPIs, sparklines, drill-down via Sheet e mock data com volumes realistas e variados.

## Arquivos a Criar

### 1. `src/data/chatbotMockData.ts`
Mock data com volumes variados refletindo cenários reais:
- **8 campanhas** com hierarquia variável:
  - Campanha 1: 4 adsets (2, 5, 1, 8 ads cada)
  - Campanha 2: 1 adset (15 ads)
  - Campanha 3: 6 adsets (1-3 ads cada)
  - Campanha 4: 2 adsets (4, 7 ads)
  - Campanha 5: 1 adset (1 ad) — campanha mínima
  - Campanha 6: 3 adsets (3, 6, 2 ads)
  - Campanha 7: 5 adsets (2-10 ads)
  - Campanha 8: 2 adsets (12, 4 ads)
- **Automações** (6): com 1, 3, 7, 12, 5, 2 mensagens respectivamente
- **Broadcasts** (15 disparos): volumes variados de envios (200 a 50.000)
- Todas as métricas: cost, revenue, profit, roas, budget, budgetRemaining, rps, cps, sessions, ecpm, impressions, pmr, ips, bounceRate, timeToSession, connectRate, revenueAut, revAutRate, resultAut, marginAut, revenueBroad, revBroadRate, resultBroad, marginBroad, costPerConversion, convRate, conversions, costPerLead, leadsRate, leads, costPerNewLead, newLeadsRate, newLeads, uniqueLeadsRate, cpc, ctr, linkClicks, cpm
- 7-day trend arrays para sparklines (rpsTrend, costTrend)
- Cenários mistos: ~60% lucro, ~40% prejuízo
- Listas de fanpages, countries, hours para filtros

### 2. `src/pages/ProjectDetail.tsx`
- Rota `/project/:id`, busca projeto por ID
- Header com botão voltar + nome + badge vertical
- Renderiza `<ChatbotBi />` para chatbot, placeholder para outros

### 3. `src/components/bi/ChatbotBi.tsx`
- Sticky filter header: 6 Selects + DateRange Picker com PoP toggle
- KPI bar: 6 cards (ROAS, Lucro, Custo, Receita, RPS, C.Lead) com Tooltip Shadcn
- Tabs Shadcn: "Resultado Total", "Automação", "Broadcast"

### 4. `src/components/bi/chatbot/ResultadoTotalTab.tsx`
- **Focus Mode**: botão Maximize/Minimize, fullscreen com `fixed inset-0 z-[100]`
- **Super-Headers**: 2 linhas de thead (grupos: Dimensões, Financeiro, Tráfego Meta Ads, Performance, Automação, Broadcast, Conversão)
- **Pinned Columns**: ícone Pin, `sticky left-0 z-20` com sombra
- **Column Toggler**: DropdownMenu com checkboxes + presets salvos em localStorage
- **Sparklines**: colunas RPS e Custo com mini LineChart
- Header sticky, `font-mono text-right` para números, cores condicionais

### 5. `src/components/bi/chatbot/AutomacaoTab.tsx`
- Tabela com todas as métricas de automação
- Clique na linha abre DrilldownSheet

### 6. `src/components/bi/chatbot/BroadcastTab.tsx`
- Tabela com métricas de broadcast + heatmap na coluna receita
- Clique na linha abre DrilldownSheet

### 7. `src/components/bi/chatbot/DrilldownSheet.tsx`
- Sheet Shadcn (side="right")
- BarChart horizontal (funil) + card Rev. MSG Rate

### 8. `src/components/bi/chatbot/SparklineCell.tsx`
- Mini LineChart Recharts (80x25px, sem eixos)

### 9. `src/components/bi/GoogleAdsBi.tsx` e `MetaAdsBi.tsx`
- Placeholders "Em breve"

## Arquivos a Modificar

- **`src/App.tsx`**: Rota `/project/:id` → ProjectDetail
- **`src/pages/Dashboard.tsx`**: Cards clicáveis com `useNavigate`
- **`src/lib/format.ts`**: Adicionar `formatPercent`, `formatNumber`, `formatDuration`

