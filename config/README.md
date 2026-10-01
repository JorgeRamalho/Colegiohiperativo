# `config/` — Ferramentas de build e testes

Configurações que antes ficavam na raiz do repositório.

| Arquivo | Ferramenta | Uso |
|---------|------------|-----|
| `vite.config.ts` | Vite | Dev server, proxy `/api`, build → `dist/` |
| `tsconfig.app.json` | TypeScript | Checagem do código em `src/` |
| `tsconfig.node.json` | TypeScript | Checagem dos configs Node (Vite, Playwright) |
| `playwright.config.ts` | Playwright | Testes E2E em `e2e/` |

Scripts npm na raiz passam `--config config/...` quando necessário. O `tsconfig.json` na raiz apenas referencia os projetos desta pasta.
