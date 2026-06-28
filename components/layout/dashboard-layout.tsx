"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { AppHeader, AppSidebar } from "@/components/layout/app-sidebar";
import { PageMetaProvider } from "@/components/layout/page-meta-context";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading Castle Cloud Builders...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageMetaProvider>
          <div className="flex items-center gap-2 border-b px-4 py-2 md:hidden">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm font-medium">Castle Cloud Builders</span>
          </div>
          <AppHeader />
          <main className="flex flex-1 flex-col overflow-auto">{children}</main>
        </PageMetaProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
