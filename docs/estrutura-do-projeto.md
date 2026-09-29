# Estrutura do projeto

Monorepo leve: **portal Vite/React** na raiz e **API Node** em `api/`. A raiz contém apenas entrada HTML, manifesto npm e configs mínimos exigidos pelo ecossistema (Vercel, TypeScript).

## Raiz (somente essencial)

| Arquivo | Função |
|---------|--------|
| `index.html` | Entrada HTML do Vite |
| `package.json` / `package-lock.json` | Dependências e scripts |
| `tsconfig.json` | Referências aos projetos TypeScript em `config/` |
| `vercel.json` / `.vercelignore` | Deploy na Vercel |
| `.gitignore` | Artefatos ignorados |
| `README.md` | Visão geral e como rodar |

**Não ficam na raiz:** Vite/Playwright/tsconfig de app (`config/`), CHANGELOG (`docs/CHANGELOG.md`), imagens (`public/images/`), scripts (`scripts/`), código (`src/`, `api/`).

## Árvore de diretórios

```
Projeto-ColegioHiperativo/
├── api/                 # Backend REST (Node)
├── config/              # Vite, TypeScript, Playwright
├── docs/                # Documentação e CHANGELOG
├── e2e/                 # Testes Playwright
├── public/              # Assets estáticos (URL /)
├── scripts/             # Automação local
├── src/                 # Frontend React/TypeScript
├── index.html
├── package.json
├── tsconfig.json
└── vercel.json
```

Infra Docker/Postgres: repositório [`infra`](https://github.com/JorgeRamalho/infra) em `../infra`.

## `config/`

Ver [`config/README.md`](../config/README.md).

## `src/` — frontend

Ver [`src/README.md`](../src/README.md).

## `api/` — backend

Ver [`api/README.md`](../api/README.md).

## `e2e/` — testes

Ver [`e2e/README.md`](../e2e/README.md).

## `scripts/` — automação

Ver [`scripts/README.md`](../scripts/README.md).

## `public/` — estáticos

Ver [`public/README.md`](../public/README.md). Imagens institucionais em `public/images/`.

## `docs/` — documentação

| Item | Uso |
|------|-----|
| `CHANGELOG.md` | Histórico de mudanças |
| `estrutura-do-projeto.md` | Este arquivo |
| `arquitetura.md` | Visão técnica |
| `planejamento/`, `pesquisa/`, `referencias/` | Gestão e referências |
