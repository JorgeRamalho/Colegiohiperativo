# `e2e/` — Testes Playwright

| Caminho | Descrição |
|---------|-----------|
| `cadastro.spec.ts` | Fluxo de registro |
| `matricula.spec.ts` | Fluxo de matrícula |
| `confirm-email.spec.ts` | Confirmação de e-mail |
| `helpers/auth-flow.ts` | Passos de login/cadastro |
| `helpers/enrollment-flow.ts` | Passos de matrícula |
| `helpers/db-verify.ts` | Asserts no PostgreSQL |
| `fixtures/test-data.ts` | Dados sintéticos |
| `global-setup.ts` | Setup global da suíte |

```bash
npm run test:e2e
npm run test:e2e:ui
```

Relatórios: `playwright-report/` e `e2e-results/` (ignorados no Git).
