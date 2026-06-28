"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  Clock,
  Package,
  Search,
  ShoppingCart,
  Truck,
  Users,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
  quickSearchLinks,
  resolveRecentSearch,
  searchGlobal,
  type SearchCategory,
  type SearchResult,
} from "@/data/global-search";
import { cn } from "@/lib/utils";

const categoryIcons: Record<SearchCategory, React.ComponentType<{ className?: string }>> = {
  Pages: Search,
  Projects: Building2,
  Materials: Package,
  "Purchase Orders": ShoppingCart,
  Labour: Users,
  Machinery: Truck,
  DPR: ClipboardList,
};

type FlatResult = SearchResult & { flatIndex: number };

export function GlobalSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const groupedResults = useMemo(() => searchGlobal(query), [query]);

  const flatResults: FlatResult[] = useMemo(() => {
    const items: FlatResult[] = [];
    let index = 0;
    for (const group of groupedResults) {
      for (const item of group.items) {
        items.push({ ...item, flatIndex: index++ });
      }
    }
    return items;
  }, [groupedResults]);

  const showSuggestions = isOpen && (query.length > 0 || recentSearches.length > 0);

  const loadRecent = useCallback(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateTo = (result: SearchResult) => {
    addRecentSearch(result.title);
    loadRecent();
    setQuery("");
    setIsOpen(false);
    router.push(result.href);
  };

  const handleRecentClick = (term: string) => {
    const match = resolveRecentSearch(term);
    if (match) {
      navigateTo(match);
    } else {
      setQuery(term);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (!showSuggestions) return;

    const navigableCount = query ? flatResults.length : recentSearches.length + quickSearchLinks.length;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(navigableCount, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + Math.max(navigableCount, 1)) % Math.max(navigableCount, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (query && flatResults[activeIndex]) {
        navigateTo(flatResults[activeIndex]);
      } else if (!query && activeIndex < quickSearchLinks.length) {
        navigateTo(quickSearchLinks[activeIndex]);
      } else if (!query && recentSearches[activeIndex - quickSearchLinks.length]) {
        handleRecentClick(recentSearches[activeIndex - quickSearchLinks.length]);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search projects, materials, POs, labour..."
          className={cn(
            "h-11 w-full rounded-xl border-muted-foreground/15 bg-muted/50 pl-10 pr-20 text-sm shadow-sm transition-all",
            "placeholder:text-muted-foreground/70",
            isOpen && "border-blue-400/50 bg-background ring-2 ring-blue-500/20",
          )}
        />
        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : null}
          <kbd className="hidden rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </div>
      </div>

      {showSuggestions ? (
        <div className="absolute top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-xl">
          <div className="max-h-[min(420px,calc(100vh-8rem))] overflow-y-auto">
            {!query && recentSearches.length > 0 ? (
              <SearchSection title="Recent Searches">
                <div className="flex flex-wrap gap-2 px-3 pb-1">
                  {recentSearches.map((term, index) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleRecentClick(term)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors hover:bg-muted",
                        activeIndex === quickSearchLinks.length + index && "bg-muted ring-1 ring-blue-500/30",
                      )}
                    >
                      <Clock className="size-3 text-muted-foreground" />
                      {term}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      clearRecentSearches();
                      loadRecent();
                    }}
                    className="px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
              </SearchSection>
            ) : null}

            {!query ? (
              <SearchSection title="Quick Access">
                {quickSearchLinks.map((item, index) => {
                  const Icon = categoryIcons[item.category];
                  return (
                    <SuggestionRow
                      key={item.id}
                      icon={Icon}
                      title={item.title}
                      subtitle={item.subtitle}
                      category={item.category}
                      active={activeIndex === index}
                      onClick={() => navigateTo(item)}
                    />
                  );
                })}
              </SearchSection>
            ) : null}

            {query && groupedResults.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="text-sm font-medium">No results found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try searching for a project name, material, PO number, or employee
                </p>
              </div>
            ) : null}

            {query
              ? groupedResults.map((group) => {
                  const Icon = categoryIcons[group.category];
                  return (
                    <SearchSection key={group.category} title={group.category}>
                      {group.items.map((item) => (
                        <SuggestionRow
                          key={item.id}
                          icon={Icon}
                          title={item.title}
                          subtitle={item.subtitle}
                          category={group.category}
                          active={flatResults[activeIndex]?.id === item.id}
                          onClick={() => navigateTo(item)}
                          highlight={query}
                        />
                      ))}
                    </SearchSection>
                  );
                })
              : null}
          </div>

          <div className="flex items-center justify-between border-t bg-muted/30 px-3 py-2 text-[10px] text-muted-foreground">
            <div className="flex gap-3">
              <span>
                <kbd className="rounded border px-1">↑</kbd>{" "}
                <kbd className="rounded border px-1">↓</kbd> Navigate
              </span>
              <span>
                <kbd className="rounded border px-1">↵</kbd> Open
              </span>
              <span>
                <kbd className="rounded border px-1">Esc</kbd> Close
              </span>
            </div>
            <span>{query ? `${flatResults.length} results` : "Global search"}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SearchSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-2">
      <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function SuggestionRow({
  icon: Icon,
  title,
  subtitle,
  category,
  active,
  onClick,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  category: string;
  active?: boolean;
  onClick: () => void;
  highlight?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/60",
        active && "bg-blue-500/8 ring-1 ring-inset ring-blue-500/20",
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {highlight ? highlightText(title, highlight) : title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <span className="hidden shrink-0 text-[10px] text-muted-foreground sm:inline">{category}</span>
      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/50" />
    </button>
  );
}

function highlightText(text: string, query: string) {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-blue-500/15 px-0.5 text-blue-700 dark:text-blue-300">
        {text.slice(index, index + query.length)}
      </mark>
      {text.slice(index + query.length)}
    </>
  );
}
