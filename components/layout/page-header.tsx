"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { usePageMeta } from "@/components/layout/page-meta-context";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PageIntro() {
  const { meta } = usePageMeta();
  const { breadcrumbs = [], actions } = meta;

  const hasIntro = breadcrumbs.length > 0 || actions;

  if (!hasIntro) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b bg-card/40 px-6 py-2.5 lg:px-8">
      {breadcrumbs.length > 0 ? (
        <Breadcrumb className="min-w-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/dashboard" />}>
                <Home className="size-4" />
                <span className="sr-only">Dashboard</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="contents">
                <BreadcrumbSeparator>
                  <ChevronRight className="size-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink render={<Link href={item.href} />}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <div />
      )}
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
