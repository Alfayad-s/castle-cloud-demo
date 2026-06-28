import { getTodaysDprs } from "./dpr";
import { getInventoryStats } from "./inventory";
import { getLabourStats } from "./labour";
import { getMachineryStats } from "./machinery";
import { projects } from "./projects";
import type { Activity, DailyProgressReport, DashboardStats, Project } from "@/types";

export const dashboardStats: DashboardStats = {
  runningProjects: projects.filter((p) => p.status === "in-progress" || p.status === "planning").length,
  completedProjects: projects.filter((p) => p.status === "completed").length,
  pendingPayments: 4,
  todaysAttendance: 0,
  lowStockAlerts: 0,
  activeMachines: 0,
  revenue: 24500000,
  expenses: 18200000,
};

export const recentActivities: Activity[] = [
  {
    id: "act-001",
    message: "PO-2026-0142 approved for ABC Cement",
    timestamp: "2026-06-27T09:30:00",
    type: "success",
  },
  {
    id: "act-002",
    message: "Steel stock below minimum threshold",
    timestamp: "2026-06-27T08:15:00",
    type: "warning",
  },
  {
    id: "act-003",
    message: "DPR submitted for Luxury Villa",
    timestamp: "2026-06-27T07:45:00",
    type: "info",
  },
  {
    id: "act-004",
    message: "Tower Crane scheduled for maintenance",
    timestamp: "2026-06-26T16:20:00",
    type: "warning",
  },
  {
    id: "act-005",
    message: "Warehouse Project marked as completed",
    timestamp: "2026-06-26T11:00:00",
    type: "success",
  },
  {
    id: "act-006",
    message: "68 workers deployed at Commercial Complex",
    timestamp: "2026-06-27T06:00:00",
    type: "info",
  },
  {
    id: "act-007",
    message: "Invoice INV-2026-048 pending client approval",
    timestamp: "2026-06-26T14:30:00",
    type: "warning",
  },
];

export const chartData = {
  projectProgress: [
    { name: "Luxury Villa", progress: 62, id: "proj-001" },
    { name: "Commercial Complex", progress: 45, id: "proj-002" },
    { name: "Apartment Tower", progress: 8, id: "proj-003" },
    { name: "Warehouse", progress: 100, id: "proj-004" },
  ],
  materialConsumption: [
    { month: "Jan", cement: 420, steel: 18, sand: 2400 },
    { month: "Feb", cement: 380, steel: 22, sand: 2100 },
    { month: "Mar", cement: 510, steel: 25, sand: 2800 },
    { month: "Apr", cement: 460, steel: 20, sand: 2600 },
    { month: "May", cement: 490, steel: 24, sand: 2750 },
    { month: "Jun", cement: 520, steel: 28, sand: 2900 },
  ],
  budgetVsActual: [
    { project: "Luxury Villa", budget: 8500000, actual: 5120000 },
    { project: "Commercial", budget: 42000000, actual: 18900000 },
    { project: "Apartment", budget: 68000000, actual: 4200000 },
    { project: "Warehouse", budget: 12000000, actual: 11850000 },
  ],
  monthlyExpenses: [
    { month: "Jan", amount: 2800000 },
    { month: "Feb", amount: 3100000 },
    { month: "Mar", amount: 2950000 },
    { month: "Apr", amount: 3200000 },
    { month: "May", amount: 3400000 },
    { month: "Jun", amount: 2850000 },
  ],
};

export const quickActions = [
  {
    label: "New Project",
    description: "Create a construction project",
    href: "/projects",
    tone: "blue" as const,
  },
  {
    label: "Create Purchase Order",
    description: "Raise a material PO",
    href: "/purchase",
    tone: "amber" as const,
  },
  {
    label: "Upload DPR",
    description: "Submit daily progress",
    href: "/dpr",
    tone: "emerald" as const,
  },
  {
    label: "Add Material",
    description: "Update inventory stock",
    href: "/inventory",
    tone: "violet" as const,
  },
];

export function getLiveDashboardStats(): DashboardStats {
  const labour = getLabourStats();
  const inventory = getInventoryStats();
  const machinery = getMachineryStats();
  const attendancePercent = Math.round(
    ((labour.presentToday + labour.lateToday) / labour.totalEmployees) * 100,
  );

  return {
    ...dashboardStats,
    runningProjects: projects.filter(
      (p) => p.status === "in-progress" || p.status === "planning",
    ).length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    todaysAttendance: attendancePercent,
    lowStockAlerts: inventory.lowStockCount,
    activeMachines: machinery.activeCount,
  };
}

export function getActiveProjects(): Project[] {
  return projects.filter((p) => p.status !== "completed");
}

export function getTodaysSiteUpdates(): DailyProgressReport[] {
  return getTodaysDprs();
}

export function getNetProfit(): number {
  return dashboardStats.revenue - dashboardStats.expenses;
}

export function getProfitMargin(): number {
  return Math.round((getNetProfit() / dashboardStats.revenue) * 100);
}
