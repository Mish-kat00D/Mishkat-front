import AuthGuard from "@/components/guards/AuthGuard";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </AuthGuard>
  );
}
