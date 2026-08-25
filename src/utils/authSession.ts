const TOKEN_KEY = 'hiperativo_token';
const USER_KEY = 'hiperativo_user';

/**
 * Perfil do usuário autenticado armazenado no navegador.
 */
export interface StoredUser {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  cpf?: string;
  user_type: string;
}

/**
 * Persiste token e perfil após login bem-sucedido.
 * @param token JWT retornado pela API.
 * @param user Perfil autenticado.
 */
export function setSession(token: string, user: StoredUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Remove a sessão salva no navegador.
 */
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Recupera o token JWT salvo no localStorage.
 * @returns Token ou null quando não há sessão.
 */
export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Indica se o perfil autenticado tem acesso administrativo.
 * @param user Perfil autenticado ou nulo.
 */
export function isStaffUser(user: StoredUser | null): boolean {
  return user?.user_type === 'funcionario';
}

/**
 * Recupera o usuário autenticado salvo no localStorage.
 * @returns Dados do usuário ou null quando não há sessão.
 */
export function getStoredUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

/**
 * Verifica se há token de autenticação ativo no navegador.
 * @returns true quando o usuário está autenticado.
 */
export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}
