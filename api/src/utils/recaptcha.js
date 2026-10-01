import { RECAPTCHA_SECRET_KEY } from "../config/env.ts";

export async function verifyRecaptcha(token) {
  if (!token || !RECAPTCHA_SECRET_KEY) {
    return true;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Erro ao verificar reCAPTCHA:", error);
    return false;
  }
}
