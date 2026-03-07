

## Redesign visual dos cards da Visão Global

Manter as mesmas informações (Nome, UUID, Lucro, ROAS, Custo, Receita) mas com um visual mais polido estilo "command center".

### Mudanças no `GlobalView.tsx`

1. **Borda lateral colorida** — borda esquerda de 3px verde (lucro positivo) ou vermelha (lucro negativo) para leitura rápida do status.

2. **Header do card redesenhado** — Nome do projeto com fonte maior e UUID como badge sutil ao lado. Adicionar um dot indicator de status (ativo/pausado).

3. **Métrica principal em destaque** — Lucro com fonte grande e bold centralizado no card, com cor semântica. ROAS como badge pill ao lado do lucro.

4. **Custo e Receita como barra de progresso visual** — Em vez de só números, mostrar uma barra horizontal fina que representa a proporção custo/receita, com os valores numéricos abaixo. Isso dá contexto visual imediato.

5. **Hover com elevação** — Sombra sutil e leve escala no hover para feedback interativo.

6. **Background com gradiente sutil** — Um gradiente muito leve do canto superior esquerdo baseado na cor do lucro (verde ou vermelho com ~5% opacidade).

### Responsividade
- Grid mantém `grid-cols-1 sm:2 md:3 lg:4 xl:5`
- `whitespace-nowrap` e `min-w-fit` continuam nos valores
- Mobile: tipografia reduzida conforme regras existentes

### Arquivo alterado
- `src/components/dashboard/GlobalView.tsx` — único arquivo modificado

