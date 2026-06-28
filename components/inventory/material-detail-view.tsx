"use client";

import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MaterialImage } from "@/components/inventory/material-image";
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
import type {
  Material,
  MaterialConsumptionPoint,
  MaterialPurchaseRecord,
  MaterialTransfer,
  MaterialUsageRecord,
  Warehouse,
} from "@/types";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { getStockLevelPercent, getStockStatus } from "@/lib/status-colors";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MaterialDetailViewProps = {
  material: Material;
  warehouse?: Warehouse;
  purchases: MaterialPurchaseRecord[];
  transfers: MaterialTransfer[];
  usageHistory: MaterialUsageRecord[];
  consumption: MaterialConsumptionPoint[];
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function MaterialDetailView({
  material,
  warehouse,
  purchases,
  transfers,
  usageHistory,
  consumption,
}: MaterialDetailViewProps) {
  const stockPercent = getStockLevelPercent(material.currentStock, material.minimumStock);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4 rounded-xl border bg-muted/20 p-4">
        <MaterialImage material={material} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold">{material.name}</h2>
            <StatusBadge
              config={getStockStatus(material.currentStock, material.minimumStock)}
              size="sm"
            />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {material.category} · {material.supplier} · {material.warehouse}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <MetricCard label="Current Stock" value={`${formatNumber(material.currentStock)} ${material.unit}`} />
        <MetricCard label="Minimum Stock" value={`${formatNumber(material.minimumStock)} ${material.unit}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Consumption Graph</CardTitle>
            <CardDescription>Daily usage over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={consumption}>
                <defs>
                  <linearGradient id="consumptionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 11 }} width={40} />
                <Tooltip
                  formatter={(value) => [`${Number(value)} ${material.unit}`, "Consumed"]}
                  contentStyle={tooltipStyle}
                />
                <Area
                  type="monotone"
                  dataKey="quantity"
                  name="Consumed"
                  stroke="#2563EB"
                  fill="url(#consumptionGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Stock Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <InfoRow label="Unit price" value={formatCurrency(material.price)} />
            <InfoRow
              label="Stock value"
              value={formatCurrency(material.currentStock * material.price)}
            />
            <InfoRow
              label="Today's usage"
              value={`${formatNumber(material.todayConsumption ?? 0)} ${material.unit}`}
            />
            <InfoRow
              label="Last restocked"
              value={material.lastRestocked ? formatDate(material.lastRestocked) : "—"}
            />
            <div className="rounded-lg border bg-muted/20 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Stock level</span>
                <span className="text-xs font-medium tabular-nums">{stockPercent}%</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${stockPercent}%` }}
                />
              </div>
            </div>
            {warehouse ? (
              <div className="rounded-lg border p-3">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Warehouse
                </p>
                <p className="mt-1 font-medium">{warehouse.name}</p>
                <p className="text-sm text-muted-foreground">{warehouse.location}</p>
                <p className="mt-1 text-sm">Manager: {warehouse.manager}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <HistoryCard title="Purchase History" description="Recent PO deliveries for this material">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="pr-6">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.length ? (
                purchases.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="pl-6 font-medium">{record.poNumber}</TableCell>
                    <TableCell>{record.vendor}</TableCell>
                    <TableCell className="tabular-nums">
                      {formatNumber(record.quantity)} {record.unit}
                    </TableCell>
                    <TableCell className="tabular-nums">{formatCurrency(record.amount)}</TableCell>
                    <TableCell className="pr-6 tabular-nums text-muted-foreground">
                      {formatDate(record.date)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <EmptyRow colSpan={5} message="No purchase records found." />
              )}
            </TableBody>
          </Table>
        </HistoryCard>

        <HistoryCard title="Transfer History" description="Stock movements between warehouses/sites">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="pr-6">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.length ? (
                transfers.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="pl-6">{record.from}</TableCell>
                    <TableCell>{record.to}</TableCell>
                    <TableCell className="tabular-nums">
                      {formatNumber(record.quantity)} {record.unit}
                    </TableCell>
                    <TableCell className="pr-6 tabular-nums text-muted-foreground">
                      {formatDate(record.date)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <EmptyRow colSpan={4} message="No transfer records found." />
              )}
            </TableBody>
          </Table>
        </HistoryCard>
      </div>

      <HistoryCard title="Usage History" description="Site consumption and daily usage records">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Date</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Used By</TableHead>
              <TableHead className="pr-6">Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usageHistory.length ? (
              usageHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="pl-6 tabular-nums text-muted-foreground">
                    {formatDate(record.date)}
                  </TableCell>
                  <TableCell>{record.project}</TableCell>
                  <TableCell className="tabular-nums">
                    {formatNumber(record.quantity)} {record.unit}
                  </TableCell>
                  <TableCell>{record.usedBy}</TableCell>
                  <TableCell className="pr-6 text-muted-foreground">
                    {record.note ?? "—"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <EmptyRow colSpan={5} message="No usage records found." />
            )}
          </TableBody>
        </Table>
      </HistoryCard>
    </div>
  );
}

function HistoryCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-2">{children}</CardContent>
    </Card>
  );
}

function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-8 text-center text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export function MaterialDetailActions() {
  return (
    <Link href="/inventory" className={cn(buttonVariants({ variant: "outline" }))}>
      Back to Inventory
    </Link>
  );
}
