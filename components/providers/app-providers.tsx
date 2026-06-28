"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

import { SplashScreen } from "@/components/layout/splash-screen";
import { AuthProvider } from "@/hooks/use-auth";
import { DemoDataProvider } from "@/hooks/use-demo-data";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <DemoDataProvider>
          <TooltipProvider>
            <SplashScreen />
            {children}
            <Toaster richColors closeButton position="top-right" />
          </TooltipProvider>
        </DemoDataProvider>
      </AuthProvider>
    </NextThemesProvider>
  );
}
