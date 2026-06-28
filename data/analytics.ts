import { chartData, dashboardStats } from "./dashboard";
import { projects } from "./projects";
import { weeklyMachineHours } from "./machinery";
import { poStatusTrend, vendorSpend } from "./purchase-orders";

export type AnalyticsStats = {
  revenue: number;
  expenses: number;
  netProfit: number;
  profitMargin: number;
  labourCost: number;
  materialCost: number;
  machineryCost: number;
  avgProjectCompletion: number;
};

export const revenueVsExpenses = [
  { month: "Jan", revenue: 4200000, expenses: 2800000 },
  { month: "Feb", revenue: 3800000, expenses: 3100000 },
  { month: "Mar", revenue: 5100000, expenses: 2950000 },
  { month: "Apr", revenue: 4600000, expenses: 3200000 },
  { month: "May", revenue: 5400000, expenses: 3400000 },
  { month: "Jun", revenue: 4900000, expenses: 2850000 },
];

export const expenseBreakdown = [
  { name: "Materials", value: 8200000, color: "#2563EB" },
  { name: "Labour", value: 5400000, color: "#10B981" },
  { name: "Machinery", value: 2400000, color: "#F59E0B" },
  { name: "Subcontract", value: 1500000, color: "#8B5CF6" },
  { name: "Overhead", value: 700000, color: "#64748B" },
];

export const labourCostTrend = [
  { month: "Jan", cost: 780000 },
  { month: "Feb", cost: 820000 },
  { month: "Mar", cost: 850000 },
  { month: "Apr", cost: 910000 },
  { month: "May", cost: 960000 },
  { month: "Jun", cost: 880000 },
];

export const materialCostTrend = [
  { month: "Jan", cost: 1100000 },
  { month: "Feb", cost: 1050000 },
  { month: "Mar", cost: 1280000 },
  { month: "Apr", cost: 1150000 },
  { month: "May", cost: 1320000 },
  { month: "Jun", cost: 1180000 },
];

export const projectBudgetVsActual = chartData.budgetVsActual.map((item) => ({
  ...item,
  variance: item.budget - item.actual,
  utilization: Math.round((item.actual / item.budget) * 100),
}));

export const projectCompletion = chartData.projectProgress;

export const purchaseTrend = poStatusTrend.map((item) => ({
  month: item.month,
  orders: item.requested + item.approved + item.ordered + item.delivered + item.completed,
  value: item.delivered * 180000 + item.completed * 220000,
}));

export const topVendors = vendorSpend.sort((a, b) => b.value - a.value);

export const machineUsageTrend = weeklyMachineHours;

export const machineUsageByType = [
  { type: "Tower Crane", hours: 86 },
  { type: "Excavator", hours: 42 },
  { type: "Batching Plant", hours: 38 },
  { type: "Concrete Pump", hours: 32 },
  { type: "JCB", hours: 24 },
  { type: "Others", hours: 48 },
];

export const costByProject = projects.map((project) => ({
  name: project.name,
  materials: Math.round(project.spent * 0.42),
  labour: Math.round(project.spent * 0.32),
  machinery: Math.round(project.spent * 0.16),
  other: Math.round(project.spent * 0.1),
}));

export function getAnalyticsStats(): AnalyticsStats {
  const labourCost = expenseBreakdown.find((item) => item.name === "Labour")?.value ?? 0;
  const materialCost = expenseBreakdown.find((item) => item.name === "Materials")?.value ?? 0;
  const machineryCost = expenseBreakdown.find((item) => item.name === "Machinery")?.value ?? 0;
  const { revenue, expenses } = dashboardStats;
  const netProfit = revenue - expenses;
  const avgProjectCompletion = Math.round(
    projects.reduce((sum, project) => sum + project.progress, 0) / projects.length,
  );

  return {
    revenue,
    expenses,
    netProfit,
    profitMargin: Math.round((netProfit / revenue) * 100),
    labourCost,
    materialCost,
    machineryCost,
    avgProjectCompletion,
  };
}
