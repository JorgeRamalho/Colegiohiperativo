import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { query, waitForDb } from "./db.js";
import { ensureSchema } from "./ensureSchema.js";
import usuariosRouter from "./routes/usuarios.js";
import authRouter from "./routes/auth.js";
import emailVerificationRouter from "./routes/email-verification.js";
import matriculasRouter from "./routes/matriculas.js";
import contatoRouter from "./routes/contato.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "hiperativo-admin";
const JWT_SECRET = process.env.JWT_SECRET || "hiperativo-dev-secret";

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", async (_req, res) => {
  try {
    await query("SELECT 1");
    return res.json({
      ok: true,
      service: "hiperativo-api",
      database: "up",
      time: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      service: "hiperativo-api",
      database: "down",
      message: error.message,
    });
  }
});

/**
 * Lê o JWT Bearer da requisição.
 * @param req Requisição HTTP.
 * @returns Payload autenticado ou null.
 */
function readBearerUser(req) {
  const authHeader = req.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!bearer) {
    return null;
  }

  try {
    return jwt.verify(bearer, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Middleware que exige usuário autenticado.
 */
function requireAuth(req, res, next) {
  const user = readBearerUser(req);
  if (!user) {
    return res.status(401).json({ message: "Não autenticado." });
  }
  req.user = user;
  return next();
}

/**
 * Middleware que exige token de administrador nas rotas de listagem.
 */
function requireAdmin(req, res, next) {
  const token = req.get("x-admin-token") || req.query.token;
  if (token === ADMIN_TOKEN) {
    return next();
  }

  const user = readBearerUser(req);
  if (user?.user_type === "funcionario") {
    req.user = user;
    return next();
  }

  return res.status(401).json({ message: "Não autorizado." });
}

app.get("/api/me/matriculas", requireAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, protocolo, full_name, email, phone, course_name, shift, created_at
       FROM matriculas
       WHERE email = $1
       ORDER BY created_at DESC
       LIMIT 20`,
      [req.user.email]
    );
    return res.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao listar matrículas do usuário:", error);
    return res.status(500).json({ message: "Erro ao listar matrículas." });
  }
});

app.get("/api/admin/matriculas", requireAdmin, async (_req, res) => {
  try {
    const result = await query(
      `SELECT id, protocolo, full_name, email, phone, course_name, shift, created_at
       FROM matriculas
       ORDER BY created_at DESC
       LIMIT 100`
    );
    return res.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao listar matrículas:", error);
    return res.status(500).json({ message: "Erro ao listar matrículas." });
  }
});

app.get("/api/admin/usuarios", requireAdmin, async (_req, res) => {
  try {
    const result = await query(
      `SELECT id, full_name, email, user_type, created_at
       FROM usuarios
       ORDER BY created_at DESC
       LIMIT 100`
    );
    return res.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro ao listar usuários." });
  }
});

app.get("/api/admin/mensagens", requireAdmin, async (_req, res) => {
  try {
    const result = await query(
      `SELECT id, nome, email, telefone, assunto, mensagem, created_at
       FROM mensagens_contato
       ORDER BY created_at DESC
       LIMIT 100`
    );
    return res.json({ items: result.rows });
  } catch (error) {
    console.error("Erro ao listar mensagens:", error);
    return res.status(500).json({ message: "Erro ao listar mensagens." });
  }
});

app.use("/api/usuarios", usuariosRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth", emailVerificationRouter);
app.use("/api/cadastros", matriculasRouter);
app.use("/api/matriculas", matriculasRouter);
app.use("/api/contato", contatoRouter);

async function start() {
  try {
    await waitForDb();
    await ensureSchema();
    app.listen(PORT, () => {
      console.log(`Hiperativo API em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Não foi possível conectar ao PostgreSQL:", error.message);
    process.exit(1);
  }
}

start();
