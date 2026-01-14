"use client";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string, name: string) => {
    setToken(token);
    setUserId(uid);
    setName(name);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token, name })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setName(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem("userData");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.token && parsed?.userId) {
          queueMicrotask(() =>
            login(parsed.userId, parsed.token, parsed.name ?? "")
          );
        }
      } catch {
        // ignore corrupt data
      }
    }
  }, [login]);

  const contextValue = {
    isLoggedIn: !!token,
    token,
    login,
    logout,
    name,
    userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
