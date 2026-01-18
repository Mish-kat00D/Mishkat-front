"use client";

import { useState, useCallback } from "react";
// We might need to import specific types if available, or define them here temporarily
// Ideally we should have a shared types file. Using 'any' sparingly for now if types aren't fully available/exposed.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const useWorkshops = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    setLoading(true);
    setError(null);
    try {
        // Retrieve token from storage if referenced or rely on cookies (httpOnly)
        // Backend seems to use cookies for sessions, but maybe Bearer for some?
        // Admin usually has a token. Let's assume cookies are handled by 'include'.
        // However, standard JWT often uses Authorization header.
        // Let's check useAuth again. It has apiCall. 
        // It uses credentials: "include". 
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

  const getWorkshops = useCallback(async () => {
    return apiCall("workshops");
  }, []);

  const createWorkshop = useCallback(async (data: any) => {
    return apiCall("workshops", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }, []);

  const deleteWorkshop = useCallback(async (id: string) => {
    return apiCall(`workshops/${id}`, {
      method: "DELETE",
    });
  }, []);

  const updateWorkshop = useCallback(async (id: string, data: any) => {
    return apiCall(`workshops/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }, []);

    const getWorkshopBySlug = useCallback(async (slug: string) => {
        return apiCall(`workshops/${slug}`);
    }, []);

    const getSessions = useCallback(async (workshopId: string) => {
        return apiCall(`workshop/${workshopId}/session`);
    }, []);

    const getSession = useCallback(async (workshopId: string, sessionId: string) => {
        return apiCall(`workshop/${workshopId}/session/${sessionId}`);
    }, []);

    const updateSession = useCallback(async (workshopId: string, sessionId: string, data: any) => {
        return apiCall(`workshop/${workshopId}/session/${sessionId}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }, []);

    const deleteSession = useCallback(async (workshopId: string, sessionId: string) => {
        return apiCall(`workshop/${workshopId}/session/${sessionId}`, {
            method: "DELETE",
        });
    }, []);

    const getSessionUploadUrl = useCallback(async (workshopId: string, sessionId: string) => {
         return apiCall(`workshop/${workshopId}/session/${sessionId}/upload-url`);
    }, []);

  return {
    loading,
    error,
    getWorkshops,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
    getWorkshopBySlug,
    getSessions,
    getSession,
    updateSession,
    deleteSession,
    getSessionUploadUrl
  };
};
