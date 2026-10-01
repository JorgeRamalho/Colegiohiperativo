import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT ?? 3001);
export const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
export const ACTIVATION_TOKEN_SECRET =
  process.env.ACTIVATION_TOKEN_SECRET ?? "hiperativo-activation-dev-secret";
export const ACTIVATION_TOKEN_TTL_HOURS = Number(process.env.ACTIVATION_TOKEN_TTL_HOURS ?? 24);

export const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL ?? "http://localhost:3010";
export const EMAIL_SERVICE_API_KEY =
  process.env.EMAIL_SERVICE_API_KEY ?? "dev-hiperativo-key";
export const EMAIL_SERVICE_APP = process.env.EMAIL_SERVICE_APP ?? "hiperativo";
export const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY ?? "";
export const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "hiperativo-admin";
