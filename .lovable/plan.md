

## Tornar o grid de cards mais dinâmico em telas grandes

**Problema:** O grid atual usa `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` fixo, ficando desproporcional em telas muito grandes (fullscreen em monitores wide).

**Solução:** Usar mais breakpoints do Tailwind para adicionar colunas progressivamente e limitar a largura máxima do container.

### Mudanças em `src/pages/Dashboard.tsx`:

1. **Grid dos project cards (linha 205):** Alterar de `sm:grid-cols-2 lg:grid-cols-4` para `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5` — assim em telas extra-largas cabem 5 colunas, mantendo os cards proporcionais.

2. **Container principal:** Adicionar `max-w-[1920px] mx-auto` no wrapper do conteúdo para evitar que o layout se estique infinitamente em monitores ultrawide.

3. **KPI cards (linha 168):** Manter `grid-cols-2 sm:grid-cols-4` pois são sempre 4 itens, mas aplicar o mesmo `max-w-[1920px] mx-auto` para consistência.

