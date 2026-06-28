"use client";

import type { ReactNode } from "react";

import { PageIntro } from "@/components/layout/page-header";
import {
  PageMetaSync,
  type BreadcrumbEntry,
} from "@/components/layout/page-meta-context";
import { cn } from "@/lib/utils";

type PageShellProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbEntry[];
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PageShell({
  title,
  description,
  breadcrumbs,
  actions,
  children,
  className,
}: PageShellProps) {
  return (
    <>
      <PageMetaSync
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      <PageIntro />
      <div className={cn("flex flex-1 flex-col gap-6 p-6", className)}>
        {children ?? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-card/50 p-12">
            <p className="text-sm text-muted-foreground">
              Module UI will be implemented here.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
