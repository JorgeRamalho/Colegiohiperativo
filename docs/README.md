# Documentação — Colégio Faculdade Hiperativo

Índice central da documentação do repositório. O código de produção fica fora de `docs/`; aqui ficam planejamento, pesquisa, arquitetura e referência de pastas.

| Documento | Conteúdo |
|-----------|----------|
| [estrutura-do-projeto.md](./estrutura-do-projeto.md) | Mapa completo de pastas e arquivos |
| [CHANGELOG.md](./CHANGELOG.md) | Histórico de alterações |
| [arquitetura.md](./arquitetura.md) | Visão técnica (frontend, API, infra, deploy) |
| [planejamento/README.md](./planejamento/README.md) | Backlog, decisões e escopo |
| [pesquisa/README.md](./pesquisa/README.md) | Notas de pesquisa e benchmarks |
| [referencias/README.md](./referencias/README.md) | Links úteis e materiais externos |

## Pastas com README próprio

Cada área principal do código tem um `README.md` local explicando o que vai em cada arquivo:

- [`../src/README.md`](../src/README.md) — frontend React
- [`../api/README.md`](../api/README.md) — API Node
- [`../e2e/README.md`](../e2e/README.md) — testes Playwright
- [`../config/README.md`](../config/README.md) — Vite, TS, Playwright
- [`../scripts/README.md`](../scripts/README.md) — automação local
- [`../public/README.md`](../public/README.md) — assets estáticos

## Manutenção

Ao criar uma pasta nova de código, adicione ou atualize o README da pasta e uma linha em `estrutura-do-projeto.md`.
