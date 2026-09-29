# Colégio Faculdade Hiperativo

Portal institucional — educação integral do Ensino Fundamental ao Mestrado.

- **Produção:** https://colegiohiperativo.vercel.app/
- **Repositório:** https://github.com/JorgeRamalho/Colegiohiperativo

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | React 18, TypeScript, Vite |
| Backend | Node.js (`api/`) |
| Banco | PostgreSQL ([infra](https://github.com/JorgeRamalho/infra)) |
| Testes E2E | Playwright |

## Estrutura

| Pasta | Conteúdo |
|-------|----------|
| [`src/`](./src/README.md) | Aplicação React |
| [`api/`](./api/README.md) | API REST |
| [`config/`](./config/README.md) | Vite, TypeScript, Playwright |
| [`docs/`](./docs/README.md) | Documentação e [CHANGELOG](./docs/CHANGELOG.md) |
| [`public/`](./public/README.md) | Assets estáticos |
| [`e2e/`](./e2e/README.md) | Testes de ponta a ponta |
| [`scripts/`](./scripts/README.md) | Dev local (PowerShell / batch) |

Mapa completo: [`docs/estrutura-do-projeto.md`](./docs/estrutura-do-projeto.md).

## Como executar

```powershell
git clone https://github.com/JorgeRamalho/Colegiohiperativo.git
cd Colegiohiperativo
npm run api:install
npm run infra:up
.\scripts\run-dev.ps1
```

Só frontend (Windows): `scripts\iniciar-site.bat`

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | http://localhost:5173 |
| `npm run build` | Build de produção |
| `npm run api:dev` | API http://localhost:3001 |
| `npm run test:e2e` | Playwright |

## Autor

**Jorge R. Barbosa** — [LinkedIn](https://www.linkedin.com/in/jorge-r-barbosa-aabb0417b/) · [GitHub](https://github.com/JorgeRamalho)
