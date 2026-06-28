"use client";

import Link from "next/link";
import { Fuel, Gauge, MapPin, User, Wrench } from "lucide-react";

import { MachineImage } from "@/components/machinery/machine-image";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatNumber } from "@/lib/formatters";
import { getFuelLevelTone, MACHINE_STATUS_CONFIG } from "@/lib/status-colors";
import type { Machine } from "@/types";
import { cn } from "@/lib/utils";

type MachineCardsProps = {
  machines: Machine[];
};

export function MachineCards({ machines }: MachineCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {machines.map((machine) => (
        <MachineCard key={machine.id} machine={machine} />
      ))}
    </div>
  );
}

function MachineCard({ machine }: { machine: Machine }) {
  const fuelTone = getFuelLevelTone(machine.fuelLevel);

  return (
    <Link href={`/machinery/${machine.id}`} className="group block">
      <Card className="h-full rounded-xl shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:hover:border-blue-500/40">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                <MachineImage
                  machine={machine}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {machine.name}
                </p>
                <p className="text-xs text-muted-foreground">{machine.type}</p>
              </div>
            </div>
            <StatusBadge config={MACHINE_STATUS_CONFIG[machine.status]} size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow icon={MapPin} label="Site" value={machine.currentSite} />
            <InfoRow icon={User} label="Operator" value={machine.operator} />
            <InfoRow
              icon={Gauge}
              label="Running Hours"
              value={formatNumber(machine.runningHours)}
            />
            <InfoRow
              icon={Wrench}
              label="Maintenance"
              value={formatDate(machine.maintenanceDate)}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Fuel className="size-3" />
                Fuel Level
              </span>
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
            <div className="h-2 overflow-hidden rounded-full bg-muted">
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
        </CardContent>
      </Card>
    </Link>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </p>
      <p className="truncate font-medium">{value}</p>
    </div>
  );
}
