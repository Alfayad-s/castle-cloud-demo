"use client";

import Link from "next/link";
import { Building2, Calendar, Check, MapPin, Phone, User } from "lucide-react";

import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PurchaseStatusStep } from "@/data/purchase-orders";
import { getGrandTotal } from "@/data/purchase-orders";
import { vendors } from "@/data/vendors";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { PO_STATUS_CONFIG } from "@/lib/status-colors";
import type { PurchaseOrder } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PurchaseOrderDetailViewProps = {
  order: PurchaseOrder;
  timeline: PurchaseStatusStep[];
};

const STATUS_ORDER = ["requested", "approved", "ordered", "delivered", "completed"] as const;

export function PurchaseOrderDetailView({ order, timeline }: PurchaseOrderDetailViewProps) {
  const vendor = vendors.find((item) => item.id === order.vendorId);
  const grandTotal = getGrandTotal(order);
  const currentIndex = STATUS_ORDER.indexOf(order.status);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Subtotal" value={formatCurrency(order.amount)} />
        <MetricCard label="GST (18%)" value={formatCurrency(order.gst)} />
        <MetricCard label="Grand Total" value={formatCurrency(grandTotal)} accent />
        <MetricCard label="Delivery Date" value={formatDate(order.deliveryDate)} />
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Status Timeline</CardTitle>
          <CardDescription>Approval and delivery workflow progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {timeline.map((step, index) => {
              const stepIndex = STATUS_ORDER.indexOf(step.status);
              const isComplete = stepIndex < currentIndex;
              const isCurrent = step.status === order.status;
              const isPending = stepIndex > currentIndex;

              return (
                <div key={step.status} className="relative flex flex-col items-center text-center">
                  {index < timeline.length - 1 ? (
                    <span
                      className={cn(
                        "absolute top-4 left-[calc(50%+16px)] hidden h-px w-[calc(100%-32px)] md:block",
                        isComplete ? "bg-emerald-400" : "bg-border",
                      )}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "relative z-10 flex size-8 items-center justify-center rounded-full border-2",
                      isComplete && "border-emerald-500 bg-emerald-500 text-white",
                      isCurrent && "border-blue-500 bg-blue-500 text-white shadow-[0_0_0_4px_rgba(37,99,235,0.15)]",
                      isPending && "border-muted bg-background text-muted-foreground",
                    )}
                  >
                    {isComplete ? <Check className="size-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}
                  </div>
                  <p className="mt-2 text-sm font-medium">{step.label}</p>
                  {step.date ? (
                    <p className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">
                      {formatDate(step.date)}
                    </p>
                  ) : null}
                  {step.note && isCurrent ? (
                    <p className="mt-1 text-[11px] text-blue-600 dark:text-blue-400">{step.note}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Materials</CardTitle>
            <CardDescription>Line items included in this purchase order</CardDescription>
          </CardHeader>
          <CardContent className="p-0 pb-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead className="pr-6 text-right">Line Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.materialId}>
                    <TableCell className="pl-6 font-medium">{item.materialName}</TableCell>
                    <TableCell className="tabular-nums">
                      {formatNumber(item.quantity)} {item.unit}
                    </TableCell>
                    <TableCell className="tabular-nums">{formatCurrency(item.price)}</TableCell>
                    <TableCell className="pr-6 text-right font-semibold tabular-nums">
                      {formatCurrency(item.quantity * item.price)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableCell colSpan={3} className="pl-6 text-right font-medium">
                    Subtotal
                  </TableCell>
                  <TableCell className="pr-6 text-right font-semibold tabular-nums">
                    {formatCurrency(order.amount)}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableCell colSpan={3} className="pl-6 text-right font-medium">
                    GST
                  </TableCell>
                  <TableCell className="pr-6 text-right font-semibold tabular-nums">
                    {formatCurrency(order.gst)}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-blue-50/50 hover:bg-blue-50/50 dark:bg-blue-500/5">
                  <TableCell colSpan={3} className="pl-6 text-right text-base font-semibold">
                    Grand Total
                  </TableCell>
                  <TableCell className="pr-6 text-right text-base font-bold tabular-nums text-blue-600 dark:text-blue-400">
                    {formatCurrency(grandTotal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Vendor & Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Vendor
              </p>
              <p className="mt-1 font-semibold">{order.vendorName}</p>
              {vendor ? (
                <div className="mt-2 space-y-1.5 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Phone className="size-3.5" />
                    {vendor.contact}
                  </p>
                  <p className="truncate">{vendor.email}</p>
                  <p className="rounded-md bg-muted/60 px-2 py-0.5 text-xs">{vendor.category}</p>
                </div>
              ) : null}
            </div>

            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Project
              </p>
              <Link
                href={`/projects/${order.projectId}`}
                className="mt-1 flex items-center gap-2 font-semibold transition-colors hover:text-blue-600"
              >
                <Building2 className="size-4" />
                {order.projectName}
              </Link>
            </div>

            <InfoRow icon={Calendar} label="Created" value={formatDate(order.createdAt)} />
            <InfoRow icon={MapPin} label="Delivery" value={formatDate(order.deliveryDate)} />
            <InfoRow
              icon={User}
              label="Status"
              value={<StatusBadge config={PO_STATUS_CONFIG[order.status]} size="sm" />}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          "text-xl font-semibold tabular-nums",
          accent && "text-blue-600 dark:text-blue-400",
        )}
      >
        {value}
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function PurchaseOrderDetailActions() {
  return (
    <Link href="/purchase" className={cn(buttonVariants({ variant: "outline" }))}>
      Back to Purchase
    </Link>
  );
}
