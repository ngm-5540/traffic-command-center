

## Ajustar grid para reduzir colunas quando o conteúdo fica apertado

**Problema:** Em larguras intermediárias, os cards ficam estreitos demais — números empilham e nomes de projetos são cortados pelo `truncate`.

**Solução:** Ajustar os breakpoints do grid para que as colunas só aumentem quando há espaço suficiente, e garantir que o conteúdo interno dos cards tenha `min-width` adequado.

### Mudanças em `src/pages/Dashboard.tsx`:

1. **Grid de projetos (linha 205):** Alterar breakpoints para valores mais conservadores usando `min-width` arbitrário ou breakpoints maiores:
   - De: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`
   - Para: `md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5`
   - Mover de `sm` (640px) para `md` (768px) para 2 colunas — dá mais espaço por card.

2. **Largura mínima dos cards:** Adicionar `min-w-[240px]` nos cards para que o grid naturalmente reduza colunas quando não há espaço, combinado com `auto-fill`:
   - Trocar o grid fixo por: `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`
   - Isso é mais fluido que breakpoints fixos — o browser decide quantas colunas cabem baseado no espaço disponível.

3. **Métricas internas (linha 230):** Adicionar `text-xs` com `whitespace-nowrap` nos valores monetários do `Metric` component para evitar quebra de linha nos números.

4. **Nome do projeto (linha 221):** Manter `truncate` mas com tooltip ou título nativo (`title={project.name}`) para que o nome completo fique acessível ao passar o mouse.

### Abordagem preferida — CSS Grid auto-fill:
```text
Antes (breakpoints fixos):
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5

Depois (auto-fill fluido):
  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
```
Isso elimina o problema na raiz: o grid se adapta automaticamente à largura disponível, nunca criando colunas menores que 260px.

