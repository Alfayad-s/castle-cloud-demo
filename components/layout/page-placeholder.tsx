import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageContentProps = {
  children?: ReactNode;
  className?: string;
};

/** @deprecated Use PageShell instead */
export function PagePlaceholder({ children, className }: PageContentProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)}>
      {children ?? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-card/50 p-12">
          <p className="text-sm text-muted-foreground">
            Module UI will be implemented here.
          </p>
        </div>
      )}
    </div>
  );
}

export function PageContent({ children, className }: PageContentProps) {
  return <div className={cn("flex flex-1 flex-col gap-6", className)}>{children}</div>;
}
