"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/stores/auth-context";
import { ThemeProvider } from "@/stores/theme-context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}