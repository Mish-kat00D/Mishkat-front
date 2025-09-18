// components/AuthProvider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthUIContextType = {
  open: (view?: "login" | "signup") => void;
  close: () => void;
  view: "login" | "signup";
  isOpen: boolean;
};

const AuthUIContext = createContext<AuthUIContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"login" | "signup">("login");

  const open = (nextView: "login" | "signup" = "login") => {
    setView(nextView);
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);

  return (
    <AuthUIContext.Provider value={{ open, close, view, isOpen }}>
      {children}
    </AuthUIContext.Provider>
  );
}

export const useAuthUI = () => {
  const ctx = useContext(AuthUIContext);
  if (!ctx) throw new Error("useAuthUI must be used inside <AuthProvider>");
  return ctx;
};
