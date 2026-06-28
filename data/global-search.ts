import { dailyProgressReports } from "./dpr";
import { employees } from "./employees";
import { machines } from "./machines";
import { materials } from "./materials";
import { projects } from "./projects";
import { purchaseOrders } from "./purchase-orders";
import { MAIN_NAV } from "@/lib/constants";

export type SearchCategory =
  | "Pages"
  | "Projects"
  | "Materials"
  | "Purchase Orders"
  | "Labour"
  | "Machinery"
  | "DPR";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category: SearchCategory;
  keywords: string[];
};

export type GroupedSearchResults = {
  category: SearchCategory;
  items: SearchResult[];
};

const RECENT_SEARCHES_KEY = "buildmaster-recent-searches";
const MAX_RECENT = 5;

function buildSearchIndex(): SearchResult[] {
  const pages: SearchResult[] = MAIN_NAV.map((item) => ({
    id: `page-${item.href}`,
    title: item.title,
    subtitle: "Navigate to module",
    href: item.href,
    category: "Pages" as const,
    keywords: [item.title.toLowerCase(), item.href.replace("/", "")],
  }));

  const projectResults: SearchResult[] = projects.map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: `${p.location} · ${p.manager} · ${p.progress}% complete`,
    href: `/projects/${p.id}`,
    category: "Projects" as const,
    keywords: [p.name, p.location, p.manager, p.status, ...p.engineers].map((s) =>
      s.toLowerCase(),
    ),
  }));

  const materialResults: SearchResult[] = materials.map((m) => ({
    id: m.id,
    title: m.name,
    subtitle: `${m.category} · ${m.currentStock} ${m.unit} in stock`,
    href: `/inventory/${m.id}`,
    category: "Materials" as const,
    keywords: [m.name, m.category, m.supplier, m.warehouse].map((s) => s.toLowerCase()),
  }));

  const poResults: SearchResult[] = purchaseOrders.map((po) => ({
    id: po.id,
    title: po.poNumber,
    subtitle: `${po.vendorName} · ${po.projectName} · ${po.status}`,
    href: `/purchase/${po.id}`,
    category: "Purchase Orders" as const,
    keywords: [po.poNumber, po.vendorName, po.projectName, po.status].map((s) =>
      s.toLowerCase(),
    ),
  }));

  const labourResults: SearchResult[] = employees.map((e) => ({
    id: e.id,
    title: e.name,
    subtitle: `${e.designation} · ${e.site}`,
    href: `/labour/${e.id}`,
    category: "Labour" as const,
    keywords: [e.name, e.designation, e.site, e.phone].map((s) => s.toLowerCase()),
  }));

  const machineResults: SearchResult[] = machines.map((m) => ({
    id: m.id,
    title: m.name,
    subtitle: `${m.type} · ${m.currentSite} · ${m.status}`,
    href: `/machinery/${m.id}`,
    category: "Machinery" as const,
    keywords: [m.name, m.type, m.currentSite, m.operator, m.registrationNumber ?? ""].map(
      (s) => s.toLowerCase(),
    ),
  }));

  const dprResults: SearchResult[] = dailyProgressReports.map((d) => ({
    id: d.id,
    title: d.id.toUpperCase(),
    subtitle: `${d.projectName} · ${d.engineer} · ${d.date}`,
    href: `/dpr/${d.id}`,
    category: "DPR" as const,
    keywords: [d.id, d.projectName, d.engineer, d.workDone, d.date].map((s) => s.toLowerCase()),
  }));

  return [
    ...pages,
    ...projectResults,
    ...materialResults,
    ...poResults,
    ...labourResults,
    ...machineResults,
    ...dprResults,
  ];
}

const searchIndex = buildSearchIndex();

export const quickSearchLinks: SearchResult[] = [
  searchIndex.find((i) => i.href === "/dashboard")!,
  searchIndex.find((i) => i.href === "/projects")!,
  searchIndex.find((i) => i.href === "/inventory")!,
  searchIndex.find((i) => i.href === "/analytics")!,
].filter(Boolean);

export function searchGlobal(query: string, limit = 12): GroupedSearchResults[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const scored = searchIndex
    .map((item) => {
      const titleMatch = item.title.toLowerCase().includes(normalized);
      const subtitleMatch = item.subtitle.toLowerCase().includes(normalized);
      const keywordMatch = item.keywords.some((k) => k.includes(normalized));
      const startsWith = item.title.toLowerCase().startsWith(normalized) ? 3 : 0;
      const score =
        (titleMatch ? 2 : 0) + (subtitleMatch ? 1 : 0) + (keywordMatch ? 1 : 0) + startsWith;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);

  const grouped = new Map<SearchCategory, SearchResult[]>();
  for (const item of scored) {
    const list = grouped.get(item.category) ?? [];
    list.push(item);
    grouped.set(item.category, list);
  }

  const order: SearchCategory[] = [
    "Pages",
    "Projects",
    "Materials",
    "Purchase Orders",
    "Labour",
    "Machinery",
    "DPR",
  ];

  return order
    .filter((cat) => grouped.has(cat))
    .map((cat) => ({ category: cat, items: grouped.get(cat)! }));
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === "undefined" || !query.trim()) return;
  const trimmed = query.trim();
  const recent = getRecentSearches().filter((q) => q !== trimmed);
  recent.unshift(trimmed);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

export function resolveRecentSearch(query: string): SearchResult | undefined {
  const normalized = query.toLowerCase();
  return searchIndex.find(
    (item) =>
      item.title.toLowerCase() === normalized ||
      item.title.toLowerCase().includes(normalized) ||
      item.keywords.some((k) => k === normalized),
  );
}
