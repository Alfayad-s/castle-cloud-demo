"use client";

import {
  CheckCircle2,
  ClipboardList,
  IndianRupee,
  Truck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PurchaseOrdersTable } from "@/components/purchase/purchase-orders-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PurchaseOrderStats } from "@/data/purchase-orders";
import type { PurchaseOrder } from "@/types";
import { formatCompactCurrency, formatCurrency } from "@/lib/formatters";

type PurchaseViewProps = {
  orders: PurchaseOrder[];
  stats: PurchaseOrderStats;
  statusTrend: {
    month: string;
    requested: number;
    approved: number;
    ordered: number;
    delivered: number;
    completed: number;
  }[];
  vendorSpend: { vendor: string; value: number }[];
};

const VENDOR_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function PurchaseView({
  orders,
  stats,
  statusTrend,
  vendorSpend,
}: PurchaseViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ClipboardList} label="Total POs" value={String(stats.totalOrders)} tone="blue" />
        <StatCard
          icon={IndianRupee}
          label="Total Value"
          value={formatCompactCurrency(stats.totalValue)}
          tone="emerald"
        />
        <StatCard
          icon={CheckCircle2}
          label="Pending Approval"
          value={String(stats.pendingApproval)}
          tone="amber"
        />
        <StatCard
          icon={Truck}
          label="In Progress"
          value={String(stats.inProgress)}
          tone="violet"
          hint={`${stats.deliveredThisMonth} delivered this month`}
        />
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4">
          <PurchaseOrdersTable data={orders} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">PO Status Trend</CardTitle>
                <CardDescription>Monthly purchase order status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="requested" stackId="a" fill="#64748B" name="Requested" />
                    <Bar dataKey="approved" stackId="a" fill="#2563EB" name="Approved" />
                    <Bar dataKey="ordered" stackId="a" fill="#F59E0B" name="Ordered" />
                    <Bar dataKey="delivered" stackId="a" fill="#8B5CF6" name="Delivered" />
                    <Bar dataKey="completed" stackId="a" fill="#10B981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Spend by Vendor</CardTitle>
                <CardDescription>Total PO value per vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vendorSpend}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="vendor"
                    >
                      {vendorSpend.map((_, index) => (
                        <Cell key={index} fill={VENDOR_COLORS[index % VENDOR_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                      contentStyle={tooltipStyle}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
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
      <CardContent className="flex items-start gap-4 p-5">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
          {hint ? <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
