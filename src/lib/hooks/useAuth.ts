"use client";

import { useState, useEffect, useCallback } from "react";
import {
  RegisterDto,
  RegisterResponseDto,
  LoginDto,
  AuthResponseDto,
  UserResponseDto,
  ForgotPasswordDto,
  VerifyResetCodeDto,
  ResetPasswordDto,
} from "@/types/auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const useAuth = () => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async <T>(
    endpoint: string,
    method: "GET" | "POST" = "GET",
    body?: any
  ): Promise<T> => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const getProfile = useCallback(async () => {
    try {
      const userData = await apiCall<UserResponseDto>("profile", "GET");
      setUser(userData);
      return userData;
    } catch (err) {
      setUser(null);
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
    setUser(res.user);
    return res;
  };

  const logout = async (): Promise<void> => {
    await apiCall("logout", "POST");
    setUser(null);
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

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return {
    user,
    loading,
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
  };
};
