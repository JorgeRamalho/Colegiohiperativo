# `api/` — Backend Node

Servidor Express (entrada em `src/server.js`) com PostgreSQL.

| Caminho | Descrição |
|---------|-----------|
| `src/server.js` | Bootstrap HTTP, middleware, rotas |
| `src/db.js` | Pool de conexão PostgreSQL |
| `src/ensureSchema.js` | Migração/schema na subida |
| `src/routes/auth.js` | Login e registro |
| `src/routes/usuarios.js` | Perfil de usuário |
| `src/routes/matriculas.js` | Matrículas |
| `src/routes/contato.js` | Formulário de contato |
| `src/routes/email-verification.js` | Confirmação de e-mail |
| `src/services/crypto/` | Tokens de ativação (+ testes Vitest) |
| `src/config/env.ts` | Leitura tipada de `.env` |
| `src/errors/email.errors.ts` | Erros de envio/validação de e-mail |
| `src/utils/protocolo.js` | Geração de protocolos |
| `sql/init.sql` | DDL inicial |
| `.env.example` | Variáveis necessárias |

```bash
cd api
cp .env.example .env   # ajustar valores
npm install
npm run dev
```

Porta padrão: **3001**. Health: `GET /api/health`.
