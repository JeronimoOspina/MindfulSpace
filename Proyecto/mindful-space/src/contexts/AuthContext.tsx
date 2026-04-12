import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ApiError, login as loginRequest, register as registerRequest, type ApiUser } from "@/lib/api";

type User = ApiUser;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "mindfulspace_token";
const USER_KEY = "mindfulspace_user";

const getInitialUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getInitialUser);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await loginRequest({ email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof ApiError ? error.message : "No se pudo iniciar sesión",
      };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const data = await registerRequest({ name, email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: error instanceof ApiError ? error.message : "No se pudo registrar el usuario",
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout, isAuthenticated: !!user }),
    [login, logout, register, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
