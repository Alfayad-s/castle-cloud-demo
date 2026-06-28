"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BreadcrumbEntry = {
  label: string;
  href?: string;
};

export type PageMeta = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbEntry[];
  actions?: ReactNode;
};

const defaultMeta: PageMeta = {
  title: "Dashboard",
  description: "Overview of projects, inventory, labour, and financial metrics.",
};

type PageMetaContextValue = {
  meta: PageMeta;
  setMeta: (meta: PageMeta) => void;
};

const PageMetaContext = createContext<PageMetaContextValue | null>(null);

export function PageMetaProvider({ children }: { children: ReactNode }) {
  const [meta, setMeta] = useState<PageMeta>(defaultMeta);

  const value = useMemo(() => ({ meta, setMeta }), [meta]);

  return <PageMetaContext.Provider value={value}>{children}</PageMetaContext.Provider>;
}

export function usePageMeta() {
  const context = useContext(PageMetaContext);

  if (!context) {
    throw new Error("usePageMeta must be used within a PageMetaProvider.");
  }

  return context;
}

export function PageMetaSync({
  title,
  description,
  breadcrumbs,
  actions,
}: PageMeta) {
  const { setMeta } = usePageMeta();

  useEffect(() => {
    setMeta({ title, description, breadcrumbs, actions });
    return () => setMeta(defaultMeta);
  }, [title, description, breadcrumbs, actions, setMeta]);

  return null;
}
