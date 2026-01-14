"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for loading to finish before making decisions
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (user.role !== "ADMIN") {
        router.push("/"); // Or 403 page
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not loading and we have an admin user, render children
  // (The useEffect will handle the redirect if conditions aren't met, 
  // but we return null here to avoid flashing content)
  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}
