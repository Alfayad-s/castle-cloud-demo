"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Fuel,
  Gauge,
  Shield,
  Truck,
  Wrench,
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

import { MachineCards } from "@/components/machinery/machine-cards";
import { MachinesTable } from "@/components/machinery/machines-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/formatters";
import type { Machine, MachineAlert, MachineryStats } from "@/types";
import { cn } from "@/lib/utils";

type MachineryViewProps = {
  machines: Machine[];
  stats: MachineryStats;
  alerts: MachineAlert[];
  siteMachineDeployment: {
    site: string;
    active: number;
    maintenance: number;
    idle: number;
  }[];
  machineTypeBreakdown: { type: string; count: number }[];
  weeklyMachineHours: { day: string; hours: number }[];
  fuelLevelByMachine: { name: string; fuel: number }[];
};

const PIE_COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#64748B", "#06B6D4", "#EC4899", "#84CC16"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

const alertIcons = {
  maintenance: Wrench,
  insurance: Shield,
  fuel: Fuel,
};

export function MachineryView({
  machines,
  stats,
  alerts,
  siteMachineDeployment,
  machineTypeBreakdown,
  weeklyMachineHours,
  fuelLevelByMachine,
}: MachineryViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Truck} label="Total Fleet" value={String(stats.totalMachines)} tone="blue" />
        <StatCard icon={Gauge} label="Active" value={String(stats.activeCount)} tone="emerald" />
        <StatCard
          icon={Wrench}
          label="In Maintenance"
          value={String(stats.maintenanceCount)}
          tone="amber"
          hint={`${stats.maintenanceDue} due soon`}
        />
        <StatCard icon={Fuel} label="Low Fuel" value={String(stats.lowFuelCount)} tone="rose" />
        <StatCard
          icon={Shield}
          label="Avg Fuel Level"
          value={`${stats.avgFuelLevel}%`}
          tone="violet"
          hint={`${stats.insuranceExpiringSoon} insurance alerts`}
        />
      </div>

      <Tabs defaultValue="fleet" className="w-full">
        <TabsList className="h-9">
          <TabsTrigger value="fleet">Fleet</TabsTrigger>
          <TabsTrigger value="equipment">Equipment List</TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts
            {alerts.length > 0 ? (
              <span className="ml-1.5 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {alerts.length}
              </span>
            ) : null}
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="mt-4">
          <MachineCards machines={machines} />
        </TabsContent>

        <TabsContent value="equipment" className="mt-4">
          <MachinesTable data={machines} />
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <Card className="rounded-xl shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Maintenance & Compliance Alerts</CardTitle>
              <CardDescription>
                Maintenance due, insurance expiry, and low fuel warnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No active alerts. All equipment is compliant.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {alerts.map((alert) => {
                    const Icon = alertIcons[alert.type];
                    return (
                      <Link
                        key={alert.id}
                        href={`/machinery/${alert.machineId}`}
                        className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:border-blue-300 hover:bg-blue-500/5 dark:hover:border-blue-500/40"
                      >
                        <span
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg",
                            alert.severity === "danger"
                              ? "bg-rose-500/10 text-rose-600"
                              : "bg-amber-500/10 text-amber-600",
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {alert.machineName}
                            </p>
                            <StatusBadge
                              config={{
                                label: alert.severity === "danger" ? "Critical" : "Warning",
                                tone: alert.severity === "danger" ? "rose" : "amber",
                              }}
                              size="sm"
                            />
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{alert.message}</p>
                          {alert.dueDate ? (
                            <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                              Due: {formatDate(alert.dueDate)}
                            </p>
                          ) : null}
                        </div>
                        <AlertTriangle
                          className={cn(
                            "size-4 shrink-0",
                            alert.severity === "danger" ? "text-rose-500" : "text-amber-500",
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Deployment by Site</CardTitle>
                <CardDescription>Machine status across active construction sites</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={siteMachineDeployment}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="site" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Bar dataKey="active" name="Active" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="maintenance" name="Maintenance" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="idle" name="Idle" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Weekly Machine Hours</CardTitle>
                <CardDescription>Total fleet operating hours this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={weeklyMachineHours}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 11 }} width={32} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="hours" name="Hours" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Fuel Levels</CardTitle>
                <CardDescription>Current fuel percentage by machine</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={fuelLevelByMachine} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="fuel" name="Fuel %" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Equipment Types</CardTitle>
                <CardDescription>Fleet composition by machine category</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="h-[220px] w-full max-w-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={machineTypeBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="type"
                      >
                        {machineTypeBreakdown.map((_, index) => (
                          <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid flex-1 gap-2 sm:grid-cols-2">
                  {machineTypeBreakdown.map((item, index) => (
                    <div key={item.type} className="flex items-center gap-2 rounded-lg border px-3 py-2">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                      />
                      <span className="text-sm text-muted-foreground">{item.type}</span>
                      <span className="ml-auto font-semibold tabular-nums">{item.count}</span>
                    </div>
                  ))}
                </div>
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
  tone: "blue" | "emerald" | "amber" | "rose" | "violet";
  hint?: string;
}) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-600",
    amber: "bg-amber-500/10 text-amber-600",
    rose: "bg-rose-500/10 text-rose-600",
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
