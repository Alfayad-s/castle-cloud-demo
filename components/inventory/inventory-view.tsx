"use client";

import {
  AlertTriangle,
  Boxes,
  IndianRupee,
  TrendingDown,
  Warehouse,
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

import { MaterialsTable, LowStockAlert } from "@/components/inventory/materials-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { InventoryStats, Material, Warehouse as WarehouseType } from "@/types";
import { formatCompactCurrency, formatCurrency, formatNumber } from "@/lib/formatters";

type InventoryViewProps = {
  materials: Material[];
  stats: InventoryStats;
  lowStockMaterials: Material[];
  warehouses: WarehouseType[];
  categoryStock: { category: string; value: number }[];
  weeklyConsumption: { day: string; cement: number; steel: number; sand: number }[];
};

const PIE_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4", "#F97316", "#64748B"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function InventoryView({
  materials,
  stats,
  lowStockMaterials,
  warehouses,
  categoryStock,
  weeklyConsumption,
}: InventoryViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <LowStockAlert materials={lowStockMaterials} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Boxes}
          label="Total Materials"
          value={String(stats.totalMaterials)}
          tone="blue"
        />
        <StatCard
          icon={IndianRupee}
          label="Inventory Value"
          value={formatCompactCurrency(stats.stockValue)}
          tone="emerald"
          hint={formatCurrency(stats.stockValue)}
        />
        <StatCard
          icon={AlertTriangle}
          label="Low Stock"
          value={String(stats.lowStockCount)}
          tone="rose"
        />
        <StatCard
          icon={TrendingDown}
          label="Today's Usage"
          value={formatNumber(stats.todaysConsumption)}
          tone="amber"
          hint="units consumed today"
        />
      </div>

      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="materials">Material Table</TabsTrigger>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-4">
          <MaterialsTable data={materials} />
        </TabsContent>

        <TabsContent value="warehouses" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {warehouses.map((warehouse) => (
              <Card key={warehouse.id} className="rounded-xl shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{warehouse.name}</CardTitle>
                      <CardDescription>{warehouse.location}</CardDescription>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                      <Warehouse className="size-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                  <Row label="Manager" value={warehouse.manager} />
                  <Row label="Materials" value={String(warehouse.materialsCount)} />
                  <Row
                    label="Stock Value"
                    value={formatCurrency(warehouse.stockValue)}
                    highlight
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Stock Value by Category</CardTitle>
                <CardDescription>Inventory value distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={categoryStock}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="category"
                    >
                      {categoryStock.map((_, index) => (
                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
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

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Weekly Consumption</CardTitle>
                <CardDescription>Cement, steel & sand usage this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyConsumption}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={36} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="cement" name="Cement (bags)" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="steel" name="Steel (tons)" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sand" name="Sand (cft)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
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
  tone: "blue" | "emerald" | "rose" | "amber";
  hint?: string;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    rose: "bg-rose-500/10 text-rose-600",
    amber: "bg-amber-500/10 text-amber-600",
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

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-muted/20 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "font-semibold text-blue-600 dark:text-blue-400" : "font-medium"}>
        {value}
      </span>
    </div>
  );
}
