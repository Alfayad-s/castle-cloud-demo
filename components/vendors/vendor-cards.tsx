"use client";

import Link from "next/link";
import { Building2, IndianRupee, Phone, Receipt, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Vendor } from "@/types";
import { cn } from "@/lib/utils";

type VendorCardsProps = {
  vendors: Vendor[];
};

export function VendorCards({ vendors }: VendorCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  const projectLabel =
    vendor.projects.length === 0
      ? "No projects"
      : vendor.projects.length === 1
        ? vendor.projects[0]
        : `${vendor.projects.length} projects`;

  return (
    <Link href={`/vendors/${vendor.id}`} className="group block">
      <Card className="h-full rounded-xl shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:hover:border-blue-500/40">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <Building2 className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {vendor.name}
                </p>
                <p className="text-xs text-muted-foreground">{vendor.category}</p>
              </div>
            </div>
            <RatingStars rating={vendor.rating} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow icon={Phone} label="Phone" value={vendor.contact} />
            <InfoRow icon={Receipt} label="GST" value={vendor.gst} mono />
            <InfoRow
              icon={IndianRupee}
              label="Balance"
              value={formatCurrency(vendor.balance)}
              accent={vendor.balance > 0 ? "text-amber-600" : "text-emerald-600"}
            />
            <InfoRow icon={Building2} label="Projects" value={projectLabel} />
          </div>

          {vendor.projects.length > 1 ? (
            <p className="truncate text-[11px] text-muted-foreground">
              {vendor.projects.join(" · ")}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  return (
    <div className="flex shrink-0 flex-col items-end gap-0.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index < fullStars || (index === fullStars && hasHalf);
          return (
            <Star
              key={index}
              className={cn(
                "size-3.5",
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted-foreground/30",
              )}
            />
          );
        })}
      </div>
      <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
  accent?: string;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </p>
      <p className={cn("truncate font-medium", mono && "font-mono text-xs", accent)}>{value}</p>
    </div>
  );
}
