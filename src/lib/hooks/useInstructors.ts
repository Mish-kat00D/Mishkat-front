"use client";

import { useState, useCallback } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const useInstructors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        credentials: "include", 
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong");
      }
      return await res.json();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getInstructors = useCallback(async () => {
    return apiCall("instructor");
  }, []);

  const getInstructor = useCallback(async (id: string) => {
    return apiCall(`instructor/${id}`);
  }, []);

  const createInstructor = async (data: any) => {
    return apiCall("instructor", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const updateInstructor = async (id: string, data: any) => {
    return apiCall(`instructor/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };

  const deleteInstructor = async (id: string) => {
    return apiCall(`instructor/${id}`, {
      method: "DELETE",
    });
  };

  return {
    loading,
    error,
    getInstructors,
    getInstructor,
    createInstructor,
    updateInstructor,
    deleteInstructor,
  };
};
