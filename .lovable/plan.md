

# Command Center — Arbitragem de Tráfego

## Design & Estilo
- Dark mode nativo estilo Grafana/Ant Design Pro — fundo escuro, tipografia limpa, alta densidade de dados
- Cores: fundo `#0f1117`, cards `#1a1d26`, bordas sutis, texto claro, acentos verde/vermelho para profit/loss
- Mobile-first e responsivo

## Estrutura de Layout
- **Sidebar esquerda** (collapsible): navegação entre Dashboard, URL Builder e Configurações — ícones Lucide, highlight na rota ativa
- **Sticky Header** fixo no topo com:
  - Project Switcher (Select Shadcn): "Visão Global (Todos)", "Finanças Alpha", "Saúde Beta", "Curiosidades Mundo"
  - 4 Summary Cards inline: Spend (R$14.530), Revenue (R$22.180), Profit (R$7.650), ROAS (1.52) — cada um com badge de tendência colorido

## Mock Data
- Arquivo centralizado com todos os dados fictícios fornecidos (projetos, campanhas, adsets, ads, chart data)
- Componentes 100% "burros" — recebem dados via props

## Tela 1: Dashboard
### Estado A — Visão Global
- Grid de cards por projeto ativo mostrando status (ativo/pausado), lucro do dia e ROAS

### Estado B — Visão Detalhada (ao selecionar projeto)
- **Dual-Axis Chart** (Recharts): linha vermelha (Gasto) vs linha verde (Receita), área entre elas visualizando lucro — dados dos últimos 7 dias
- **Heatmap/Barras** ao lado: picos de RPS por horário
- **Tabela de Performance** com:
  - Nested rows expansíveis (Campanha → Adsets → Ads) com dados do mock
  - Botão "Customizar Colunas"
  - Micro-badges de Match Rate (verde ≥95%, amarelo <95%)
  - Ícones de raio (⚡) para regras de automação ativas

## Tela 2: Campaign URL Builder
- Formulário com dropdowns (projeto, source, medium) e inputs de UTMs
- Preview em tempo real da URL montada conforme o usuário digita
- Botão "Copy Link" proeminente

## Tela 3: Configurações
- Formulários simples para Safe Margin Offset e chaves de rede do GAM
- Inputs com labels claros, estilo consistente com o dark theme

