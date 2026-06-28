"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  AUTH_COOKIE,
  authenticate,
  parseUser,
  serializeUser,
} from "@/lib/auth";
import type { User } from "@/types";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function setAuthCookie(user: User | null, remember = false) {
  if (typeof document === "undefined") return;

  if (!user) {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
    return;
  }

  const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8;
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(serializeUser(user))}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function readAuthCookie(): User | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${AUTH_COOKIE}=`));

  if (!match) return null;

  return parseUser(decodeURIComponent(match.split("=")[1]));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = readAuthCookie();
    queueMicrotask(() => {
      setUser(storedUser);
      setIsLoading(false);
    });
  }, []);

  const login = useCallback(
    async (email: string, password: string, remember = false) => {
      const authenticatedUser = authenticate(email, password);

      if (!authenticatedUser) {
        return false;
      }

      setUser(authenticatedUser);
      setAuthCookie(authenticatedUser, remember);
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setAuthCookie(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({ user, isLoading, login, logout }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
