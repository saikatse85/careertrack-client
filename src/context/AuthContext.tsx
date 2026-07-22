"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { User } from "@/types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  data: User;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

interface MeResponse {
  success: boolean;
  data: User;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access-token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await apiFetch<MeResponse>("/auth/me");

      setUser(response.data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("access-token");

      document.cookie = "access-token=; path=/; max-age=0; SameSite=Lax";

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginData: LoginData) => {
    const response = await apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    localStorage.setItem("access-token", response.token);

    // Server middleware storage
    document.cookie = `access-token=${response.token}; path=/; max-age=86400; SameSite=Lax`;

    setUser(response.data);

    router.push("/dashboard");
  };

  const register = async (registerData: RegisterData) => {
    await apiFetch<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(registerData),
    });

    router.push("/auth");
  };

  const logout = () => {
    localStorage.removeItem("access-token");

    document.cookie = "access-token=; path=/; max-age=0; SameSite=Lax";

    setUser(null);

    router.push("/auth");
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
