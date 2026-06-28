"use client";

import Link from "next/link";
import { ArrowLeft, Building2, IndianRupee, Mail, Phone, Receipt, Star } from "lucide-react";

import { StatusBadge } from "@/components/ui/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { PO_STATUS_CONFIG } from "@/lib/status-colors";
import type { PurchaseOrder, Vendor } from "@/types";
import { cn } from "@/lib/utils";

type VendorDetailViewProps = {
  vendor: Vendor;
  orders: PurchaseOrder[];
};

export function VendorDetailView({ vendor, orders }: VendorDetailViewProps) {
  const totalSpend = orders.reduce((sum, order) => sum + order.amount + order.gst, 0);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/vendors"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-fit gap-2 px-0")}
      >
        <ArrowLeft className="size-4" />
        Back to Vendors
      </Link>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-xl">{vendor.name}</CardTitle>
                <CardDescription>{vendor.category}</CardDescription>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-amber-500/10 px-2.5 py-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold tabular-nums">{vendor.rating.toFixed(1)}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <DetailItem icon={Phone} label="Phone" value={vendor.contact} />
            <DetailItem icon={Mail} label="Email" value={vendor.email} />
            <DetailItem icon={Receipt} label="GST" value={vendor.gst} mono />
            <DetailItem
              icon={IndianRupee}
              label="Outstanding Balance"
              value={formatCurrency(vendor.balance)}
              accent={vendor.balance > 0 ? "text-amber-600" : "text-emerald-600"}
            />
            <DetailItem
              icon={Building2}
              label="Projects"
              value={vendor.projects.length > 0 ? vendor.projects.join(", ") : "None"}
              className="sm:col-span-2"
            />
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <SummaryRow label="Purchase orders" value={String(orders.length)} />
            <SummaryRow label="Total spend" value={formatCurrency(totalSpend)} />
            <SummaryRow label="Active projects" value={String(vendor.projects.length)} />
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Purchase Orders</CardTitle>
          <CardDescription>All orders placed with this vendor</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No purchase orders yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Delivery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <Link
                          href={`/purchase/${order.id}`}
                          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {order.poNumber}
                        </Link>
                      </TableCell>
                      <TableCell>{order.projectName}</TableCell>
                      <TableCell>
                        <StatusBadge config={PO_STATUS_CONFIG[order.status]} size="sm" />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(order.amount + order.gst)}
                      </TableCell>
                      <TableCell>{formatDate(order.deliveryDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
  mono,
  accent,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </p>
      <p className={cn("mt-1 font-medium", mono && "font-mono text-sm", accent)}>{value}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}
