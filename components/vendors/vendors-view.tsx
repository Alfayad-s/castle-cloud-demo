"use client";

import { useMemo, useState } from "react";
import { Building2, IndianRupee, Search, Star, Users } from "lucide-react";

import { VendorCards } from "@/components/vendors/vendor-cards";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatCompactCurrency, formatCurrency } from "@/lib/formatters";
import type { Vendor, VendorStats } from "@/types";

type VendorsViewProps = {
  vendors: Vendor[];
  stats: VendorStats;
};

export function VendorsView({ vendors, stats }: VendorsViewProps) {
  const [query, setQuery] = useState("");

  const filteredVendors = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return vendors;

    return vendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(normalized) ||
        vendor.category.toLowerCase().includes(normalized) ||
        vendor.gst.toLowerCase().includes(normalized) ||
        vendor.contact.includes(normalized) ||
        vendor.projects.some((project) => project.toLowerCase().includes(normalized)),
    );
  }, [query, vendors]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Vendors"
          value={String(stats.totalVendors)}
          tone="blue"
        />
        <StatCard
          icon={Building2}
          label="Active Projects"
          value={String(stats.activeProjects)}
          tone="emerald"
          hint="Across all vendors"
        />
        <StatCard
          icon={IndianRupee}
          label="Outstanding Balance"
          value={formatCompactCurrency(stats.totalOutstanding)}
          tone="amber"
          hint={formatCurrency(stats.totalOutstanding)}
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value={stats.avgRating.toFixed(1)}
          tone="violet"
          hint="Out of 5.0"
        />
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search vendors, GST, projects..."
          className="h-10 pl-9"
        />
      </div>

      {filteredVendors.length === 0 ? (
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No vendors match your search.
          </CardContent>
        </Card>
      ) : (
        <VendorCards vendors={filteredVendors} />
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "blue" | "emerald" | "amber" | "violet";
  hint?: string;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    violet: "bg-violet-500/10 text-violet-600",
  };

  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex items-start gap-3 p-4">
        <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="mt-0.5 text-xl font-semibold tabular-nums">{value}</p>
          {hint ? <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
