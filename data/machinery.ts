import { machines } from "./machines";
import type { Machine, MachineAlert, MachineryStats } from "@/types";

const REFERENCE_DATE = new Date("2026-06-27");
const MAINTENANCE_WINDOW_DAYS = 30;
const INSURANCE_WINDOW_DAYS = 60;
const LOW_FUEL_THRESHOLD = 25;

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - REFERENCE_DATE.getTime()) / (1000 * 60 * 60 * 24));
}

function isMaintenanceDue(machine: Machine): boolean {
  return daysUntil(machine.maintenanceDate) <= MAINTENANCE_WINDOW_DAYS;
}

function isInsuranceExpiringSoon(machine: Machine): boolean {
  return daysUntil(machine.insuranceExpiry) <= INSURANCE_WINDOW_DAYS;
}

function isLowFuel(machine: Machine): boolean {
  return machine.fuelLevel <= LOW_FUEL_THRESHOLD;
}

export function getMachineryStats(): MachineryStats {
  const activeCount = machines.filter((m) => m.status === "active").length;
  const maintenanceCount = machines.filter((m) => m.status === "maintenance").length;
  const idleCount = machines.filter((m) => m.status === "idle").length;

  return {
    totalMachines: machines.length,
    activeCount,
    maintenanceCount,
    idleCount,
    maintenanceDue: machines.filter(isMaintenanceDue).length,
    insuranceExpiringSoon: machines.filter(isInsuranceExpiringSoon).length,
    lowFuelCount: machines.filter(isLowFuel).length,
    avgFuelLevel: Math.round(
      machines.reduce((sum, m) => sum + m.fuelLevel, 0) / machines.length,
    ),
  };
}

export function getMachineAlerts(): MachineAlert[] {
  const alerts: MachineAlert[] = [];

  for (const machine of machines) {
    const maintenanceDays = daysUntil(machine.maintenanceDate);
    if (maintenanceDays < 0) {
      alerts.push({
        id: `${machine.id}-maint-overdue`,
        machineId: machine.id,
        machineName: machine.name,
        type: "maintenance",
        message: "Maintenance overdue",
        severity: "danger",
        dueDate: machine.maintenanceDate,
      });
    } else if (maintenanceDays <= MAINTENANCE_WINDOW_DAYS) {
      alerts.push({
        id: `${machine.id}-maint-due`,
        machineId: machine.id,
        machineName: machine.name,
        type: "maintenance",
        message: `Maintenance due in ${maintenanceDays} day${maintenanceDays !== 1 ? "s" : ""}`,
        severity: maintenanceDays <= 7 ? "danger" : "warning",
        dueDate: machine.maintenanceDate,
      });
    }

    const insuranceDays = daysUntil(machine.insuranceExpiry);
    if (insuranceDays < 0) {
      alerts.push({
        id: `${machine.id}-ins-expired`,
        machineId: machine.id,
        machineName: machine.name,
        type: "insurance",
        message: "Insurance expired",
        severity: "danger",
        dueDate: machine.insuranceExpiry,
      });
    } else if (insuranceDays <= INSURANCE_WINDOW_DAYS) {
      alerts.push({
        id: `${machine.id}-ins-expiring`,
        machineId: machine.id,
        machineName: machine.name,
        type: "insurance",
        message: `Insurance expires in ${insuranceDays} day${insuranceDays !== 1 ? "s" : ""}`,
        severity: insuranceDays <= 14 ? "danger" : "warning",
        dueDate: machine.insuranceExpiry,
      });
    }

    if (isLowFuel(machine)) {
      alerts.push({
        id: `${machine.id}-fuel-low`,
        machineId: machine.id,
        machineName: machine.name,
        type: "fuel",
        message: `Low fuel level (${machine.fuelLevel}%)`,
        severity: machine.fuelLevel <= 15 ? "danger" : "warning",
      });
    }
  }

  return alerts.sort((a, b) => {
    if (a.severity === b.severity) return 0;
    return a.severity === "danger" ? -1 : 1;
  });
}

export const siteMachineDeployment = [
  { site: "Commercial Complex", active: 5, maintenance: 1, idle: 0 },
  { site: "Luxury Villa", active: 2, maintenance: 0, idle: 0 },
  { site: "Apartment Tower", active: 1, maintenance: 0, idle: 1 },
  { site: "Warehouse Project", active: 0, maintenance: 0, idle: 1 },
];

export const machineTypeBreakdown = [
  { type: "Tower Crane", count: 2 },
  { type: "Excavator", count: 1 },
  { type: "Concrete Mixer", count: 1 },
  { type: "JCB", count: 1 },
  { type: "Batching Plant", count: 1 },
  { type: "Concrete Pump", count: 1 },
  { type: "Dumper", count: 1 },
  { type: "Compactor", count: 1 },
  { type: "Forklift", count: 1 },
];

export const weeklyMachineHours = [
  { day: "Mon", hours: 42 },
  { day: "Tue", hours: 48 },
  { day: "Wed", hours: 44 },
  { day: "Thu", hours: 51 },
  { day: "Fri", hours: 46 },
  { day: "Sat", hours: 28 },
  { day: "Sun", hours: 12 },
];

export const fuelLevelByMachine = machines
  .map((m) => ({ name: m.name.split(" ").slice(0, 2).join(" "), fuel: m.fuelLevel }))
  .sort((a, b) => a.fuel - b.fuel);
