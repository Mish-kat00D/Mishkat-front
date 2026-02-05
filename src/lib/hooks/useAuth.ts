"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import {
  RegisterDto,
  RegisterResponseDto,
  LoginDto,
  AuthResponseDto,
  UserResponseDto,
  ForgotPasswordDto,
  VerifyResetCodeDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from "@/types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Singleton auth store - shared across all useAuth instances
type AuthState = {
  user: UserResponseDto | null;
  loading: boolean;
};

let authState: AuthState = {
  user: null,
  loading: true,
};

const listeners = new Set<() => void>();

const setAuthState = (newState: Partial<AuthState>) => {
  authState = { ...authState, ...newState };
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => authState;
const getServerSnapshot = () => ({ user: null, loading: true });

// Flag to prevent multiple profile fetches
let profileFetched = false;

export const useAuth = () => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async <T>(
    endpoint: string,
    method: "GET" | "POST" = "GET",
    body?: any
  ): Promise<T> => {
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || res.statusText);
      }

      return (await res.json()) as T;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    }
  };

  const getProfile = useCallback(async () => {
    setAuthState({ loading: true });
    try {
      const userData = await apiCall<UserResponseDto>("profile", "GET");
      setAuthState({ user: userData, loading: false });
      return userData;
    } catch (err) {
      setAuthState({ user: null, loading: false });
      console.error("Failed to load profile:", err);
    }
  }, []);

  const register = async (
    data: RegisterDto
  ): Promise<RegisterResponseDto> => {
    return apiCall<RegisterResponseDto>("register", "POST", data);
  };

  const login = async (
    data: LoginDto
  ): Promise<{ user: UserResponseDto }> => {
    const res = await apiCall<{ user: UserResponseDto }>(
      "login",
      "POST",
      data
    );
    setAuthState({ user: res.user });
    return res;
  };

  const logout = async (): Promise<void> => {
    await apiCall("logout", "POST");
    setAuthState({ user: null });
    profileFetched = false; // Allow re-fetch on next login
  };

  const verifyEmail = async (token: string): Promise<void> => {
    await fetch(`${API_URL}/auth/verify-email?token=${token}`, {
      credentials: "include",
    });
  };

  const googleAuth = (): void => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const refreshToken = async (token: string) => {
    return apiCall<AuthResponseDto>(
      `refresh?refresh_token=${token}`,
      "POST"
    );
  };

  const forgotPassword = async (email: string) => {
    return apiCall<ForgotPasswordDto>("forgot-password", "POST", { email });
  };

  const verifyResetCode = async (data: VerifyResetCodeDto) => {
    return apiCall("verify-reset-code", "POST", data);
  };

  const resetPassword = async (data: ResetPasswordDto) => {
    return apiCall("reset-password", "POST", data);
  };

  const changePassword = async (data: ChangePasswordDto) => {
    return apiCall("change-password", "POST", data);
  };

  // Fetch profile only once across all instances
  useEffect(() => {
    if (!profileFetched) {
      profileFetched = true;
      getProfile();
    }
  }, [getProfile]);

  return {
    user: state.user,
    loading: state.loading,
    error,
    register,
    login,
    logout,
    verifyEmail,
    googleAuth,
    refreshToken,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    getProfile,
    changePassword,
  };
};
