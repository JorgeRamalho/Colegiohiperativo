import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { submitLogin } from '../services/enrollmentApi';
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  isStaffUser,
  setSession,
  type StoredUser,
} from '../utils/authSession';

type AuthContextValue = {
  token: string | null;
  user: StoredUser | null;
  loading: boolean;
  isAdmin: boolean;
  signin: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<StoredUser | null>(() => getStoredUser());

  const persistSession = useCallback((nextToken: string, nextUser: StoredUser) => {
    setSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const signin = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      const result = await submitLogin(email, password, rememberMe);
      persistSession(result.token, result.user);
    },
    [persistSession],
  );

  const signout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading: false,
      isAdmin: isStaffUser(user),
      signin,
      signout,
    }),
    [token, user, signin, signout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
