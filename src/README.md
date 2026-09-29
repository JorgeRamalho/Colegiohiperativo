# `src/` — Frontend React

| Caminho | Descrição |
|---------|-----------|
| `main.tsx` | Monta a árvore React em `#root` |
| `App.tsx` | Definição de rotas |
| `styles/global.css` | Design tokens e reset/global |
| `components/Header/` | Cabeçalho, menu e scroll |
| `components/Footer/` | Rodapé institucional |
| `components/Layout/` | Shell das páginas |
| `components/Logo/` | Marca SVG |
| `pages/*.tsx` | Páginas; CSS no mesmo nome `.css` quando existir |
| `context/AuthContext.tsx` | Estado de login |
| `hooks/useScrollHeader.ts` | Comportamento do header no scroll |
| `services/api.ts` | Cliente HTTP base |
| `services/enrollmentApi.ts` | Endpoints de matrícula |
| `utils/validation.ts` | Validações de formulário |
| `utils/authSession.ts` | Persistência de sessão no browser |
| `data/constants.ts` | Textos e constantes de domínio |
| `types/index.ts` | Tipos compartilhados |

Alias `@/` aponta para esta pasta (ver `config/vite.config.ts`).
