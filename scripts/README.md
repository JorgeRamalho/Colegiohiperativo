# `scripts/` — Automação local

| Arquivo | Uso |
|---------|-----|
| `run-dev.ps1` | **Recomendado:** infra + dependências + API + Vite |
| `iniciar-site.bat` | Só frontend (`npm run dev`); executar a partir da raiz ou duplo-clique no `.bat` |
| `ensure-infra.mjs` | Clona/atualiza `../infra` se ausente |

Scripts npm na raiz que delegam aqui:

- `npm run infra:ensure` → `ensure-infra.mjs`
- `npm run infra:up` / `db:up` → Docker Compose no repo `infra`
