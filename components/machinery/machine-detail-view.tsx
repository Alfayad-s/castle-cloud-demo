"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  Fuel,
  Gauge,
  IndianRupee,
  MapPin,
  Shield,
  User,
  Wrench,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MachineImage } from "@/components/machinery/machine-image";
import { getMachineAlerts } from "@/data/machinery";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { getFuelLevelTone, MACHINE_STATUS_CONFIG } from "@/lib/status-colors";
import type { Machine } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MachineDetailViewProps = {
  machine: Machine;
  weeklyUsage: { day: string; hours: number }[];
};

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "12px",
};

export function MachineDetailView({ machine, weeklyUsage }: MachineDetailViewProps) {
  const fuelTone = getFuelLevelTone(machine.fuelLevel);
  const alerts = getMachineAlerts().filter((a) => a.machineId === machine.id);
  const weeklyTotal = weeklyUsage.reduce((sum, d) => sum + d.hours, 0);
  const estimatedWeeklyCost = weeklyTotal * machine.hourlyRate;

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-xl shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="relative mx-auto size-40 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border sm:mx-0 sm:size-48">
            <MachineImage
              machine={machine}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 160px, 192px"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h2 className="text-xl font-semibold">{machine.name}</h2>
                <StatusBadge config={MACHINE_STATUS_CONFIG[machine.status]} size="sm" />
              </div>
              <p className="mt-1 text-muted-foreground">{machine.type}</p>
              {machine.registrationNumber ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  Reg: {machine.registrationNumber}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {machine.currentSite}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5" />
                  {machine.operator}
                </span>
                <span className="flex items-center gap-1.5">
                  <IndianRupee className="size-3.5" />
                  {formatCurrency(machine.hourlyRate)}/hr
                </span>
              </div>
            </div>
            <div className="shrink-0 rounded-xl border bg-blue-500/5 px-6 py-4 text-center">
              <p className="text-xs text-muted-foreground">Running Hours</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                {formatNumber(machine.runningHours)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {alerts.length > 0 ? (
        <div className="flex flex-col gap-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm",
                alert.severity === "danger"
                  ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                  : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
              )}
            >
              <Wrench className="size-4 shrink-0" />
              <span>{alert.message}</span>
              {alert.dueDate ? (
                <span className="ml-auto text-xs tabular-nums opacity-80">
                  {formatDate(alert.dueDate)}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={Fuel}
          label="Fuel Level"
          value={`${machine.fuelLevel}%`}
          accent={fuelTone as "rose" | "amber" | "emerald"}
        />
        <MetricCard icon={Wrench} label="Next Maintenance" value={formatDate(machine.maintenanceDate)} />
        <MetricCard icon={Shield} label="Insurance Expiry" value={formatDate(machine.insuranceExpiry)} />
        <MetricCard icon={Gauge} label="Weekly Hours" value={`${weeklyTotal}h`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-xl shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Weekly Usage</CardTitle>
            <CardDescription>Operating hours logged this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={weeklyUsage}>
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
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Assigned Site</CardTitle>
            <CardDescription>Current project deployment</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link
              href={`/projects/${machine.projectId}`}
              className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:border-blue-300 hover:bg-blue-500/5 dark:hover:border-blue-500/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <Building2 className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{machine.currentSite}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">View project details</p>
              </div>
            </Link>

            <div className="rounded-lg border p-4">
              <p className="text-xs text-muted-foreground">Estimated Weekly Cost</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                {formatCurrency(estimatedWeeklyCost)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {weeklyTotal}h × {formatCurrency(machine.hourlyRate)}/hr
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Fuel Level</CardTitle>
          <CardDescription>Current tank capacity and refill status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tank capacity</span>
                <span
                  className={cn(
                    "font-semibold tabular-nums",
                    fuelTone === "rose" && "text-rose-600",
                    fuelTone === "amber" && "text-amber-600",
                    fuelTone === "emerald" && "text-emerald-600",
                  )}
                >
                  {machine.fuelLevel}%
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    fuelTone === "rose" && "bg-rose-500",
                    fuelTone === "amber" && "bg-amber-500",
                    fuelTone === "emerald" && "bg-emerald-500",
                  )}
                  style={{ width: `${machine.fuelLevel}%` }}
                />
              </div>
            </div>
            <Fuel
              className={cn(
                "size-8 shrink-0",
                fuelTone === "rose" && "text-rose-500",
                fuelTone === "amber" && "text-amber-500",
                fuelTone === "emerald" && "text-emerald-500",
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <ScheduleCard
          icon={Wrench}
          title="Maintenance Schedule"
          date={machine.maintenanceDate}
          description="Next scheduled service and inspection"
        />
        <ScheduleCard
          icon={Shield}
          title="Insurance Coverage"
          date={machine.insuranceExpiry}
          description="Policy renewal deadline"
        />
      </div>
    </div>
  );
}

export function MachineDetailActions() {
  return (
    <Link href="/machinery" className={buttonVariants({ variant: "outline", size: "sm" })}>
      All Equipment
    </Link>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: "rose" | "amber" | "emerald";
}) {
  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p
            className={cn(
              "mt-0.5 truncate text-lg font-semibold tabular-nums",
              accent === "rose" && "text-rose-600",
              accent === "amber" && "text-amber-600",
              accent === "emerald" && "text-emerald-600",
            )}
          >
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleCard({
  icon: Icon,
  title,
  date,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  date: string;
  description: string;
}) {
  const daysLeft = Math.ceil(
    (new Date(date).getTime() - new Date("2026-06-27").getTime()) / (1000 * 60 * 60 * 24),
  );
  const isOverdue = daysLeft < 0;
  const isSoon = daysLeft >= 0 && daysLeft <= 30;

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold tabular-nums">{formatDate(date)}</p>
            <p
              className={cn(
                "mt-1 text-xs",
                isOverdue && "text-rose-600",
                isSoon && !isOverdue && "text-amber-600",
                !isOverdue && !isSoon && "text-muted-foreground",
              )}
            >
              {isOverdue
                ? `${Math.abs(daysLeft)} days overdue`
                : daysLeft === 0
                  ? "Due today"
                  : `${daysLeft} days remaining`}
            </p>
          </div>
          <Calendar className="size-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}
