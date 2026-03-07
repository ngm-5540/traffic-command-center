

## Plano: Nova Página de Projetos (Dashboard)

Tudo será construído em um único arquivo: `src/pages/Dashboard.tsx`. Os dados e formatadores já existem em `src/data/dashboardData.ts` e `src/lib/format.ts`.

### Estrutura do componente

**1. Header Superior (fixo no topo do conteúdo)**
- Menu horizontal centralizado com 3 opções texto-only: GOOGLE ADS | META ADS | CHATBOT
- Opção ativa: `border-b-2 border-primary font-semibold text-foreground`; inativas: `text-muted-foreground`
- Lado direito: botões de período (HOJE/ONTEM/7D) como toggle group + texto "Usuário" estático
- State: `activeVertical` e `activePeriod` via `useState`

**2. Barra de KPIs Consolidados**
- Linha horizontal abaixo do header com 4 métricas: TOTAL SPEND, TOTAL REVENUE, TOTAL PROFIT, AVG ROAS
- Calculados com `useMemo` filtrando `dashboardProjects` pela vertical ativa
- Valores em `font-mono` (JetBrains Mono já importado no CSS), labels em `text-[10px] uppercase text-muted-foreground`

**3. Grid de Cards**
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- Cada card:
  - Lucro > 0: `bg-card border-border` (padrão dark theme)
  - Lucro < 0: `bg-red-950/20 border-red-800/40`
  - Header: nome + badge status (ATIVO=verde, ALERTA=amarelo, PAUSADO=cinza)
  - Grid 2x2 com RECEITA, CUSTO, LUCRO (destaque semântico), ROAS
  - Todos valores monetários em `font-mono` com `formatBRL`

**4. Mobile**
- Em `sm:` e abaixo, card vira layout compacto: nome+badge no topo, LUCRO e ROAS em destaque grande, receita/custo menores abaixo
- Detectado via classes responsivas do Tailwind (sem JS)

### Arquivos alterados
- `src/pages/Dashboard.tsx` — reescrita completa

