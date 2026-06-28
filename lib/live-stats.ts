import type { AnalyticsStats } from "@/data/analytics";
import type { PurchaseOrderStats } from "@/data/purchase-orders";
import type {
  DailyProgressReport,
  DprStats,
  Employee,
  InventoryStats,
  LabourStats,
  Machine,
  MachineAlert,
  MachineryStats,
  Material,
  PayrollPreviewRow,
  Project,
  PurchaseOrder,
  Vendor,
  VendorStats,
} from "@/types";

export function computeInventoryStats(materials: Material[]): InventoryStats {
  const stockValue = materials.reduce(
    (total, material) => total + material.currentStock * material.price,
    0,
  );
  const lowStockCount = materials.filter(
    (material) => material.currentStock <= material.minimumStock,
  ).length;
  const todaysConsumption = materials.reduce(
    (total, material) => total + (material.todayConsumption ?? 0),
    0,
  );

  return {
    totalMaterials: materials.length,
    stockValue,
    lowStockCount,
    todaysConsumption,
  };
}

export function getLowStockMaterials(materials: Material[]): Material[] {
  return materials.filter((material) => material.currentStock <= material.minimumStock);
}

export function computePurchaseStats(orders: PurchaseOrder[]): PurchaseOrderStats {
  const totalValue = orders.reduce((sum, po) => sum + po.amount + po.gst, 0);

  return {
    totalOrders: orders.length,
    pendingApproval: orders.filter((po) => po.status === "requested").length,
    inProgress: orders.filter((po) => ["approved", "ordered"].includes(po.status)).length,
    totalValue,
    deliveredThisMonth: orders.filter(
      (po) => po.status === "delivered" && po.deliveryDate.startsWith("2026-06"),
    ).length,
  };
}

export function computeVendorSpend(orders: PurchaseOrder[]) {
  const map = new Map<string, number>();
  for (const order of orders) {
    map.set(order.vendorName, (map.get(order.vendorName) ?? 0) + order.amount + order.gst);
  }
  return [...map.entries()].map(([vendor, value]) => ({ vendor, value }));
}

export function computeVendorStats(vendors: Vendor[]): VendorStats {
  const allProjects = new Set<string>();
  for (const vendor of vendors) {
    for (const project of vendor.projects) allProjects.add(project);
  }

  return {
    totalVendors: vendors.length,
    activeProjects: allProjects.size,
    totalOutstanding: vendors.reduce((sum, vendor) => sum + vendor.balance, 0),
    avgRating:
      vendors.length === 0
        ? 0
        : Math.round((vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length) * 10) / 10,
  };
}

export function computeLabourStats(employees: Employee[]): LabourStats {
  const presentToday = employees.filter((e) => e.attendanceToday === "present").length;
  const absentToday = employees.filter((e) => e.attendanceToday === "absent").length;
  const lateToday = employees.filter((e) => e.attendanceToday === "late").length;

  return {
    totalEmployees: employees.length,
    presentToday,
    absentToday,
    lateToday,
    todaysWorkforce: presentToday + lateToday,
    monthlyPayrollEstimate: employees.reduce((sum, e) => sum + e.dailyWage * 26, 0),
  };
}

const PAYROLL_DAYS_MAP: Record<string, number> = {
  "emp-005": 22,
  "emp-006": 18,
  "emp-007": 24,
  "emp-010": 23,
  "emp-011": 21,
  "emp-012": 20,
  "emp-013": 22,
  "emp-014": 16,
};

export function computePayrollPreview(employees: Employee[]): PayrollPreviewRow[] {
  return employees
    .filter((employee) => employee.dailyWage > 0)
    .map((employee) => {
      const daysWorked = PAYROLL_DAYS_MAP[employee.id] ?? 20;
      return {
        employeeId: employee.id,
        name: employee.name,
        designation: employee.designation,
        site: employee.site,
        dailyWage: employee.dailyWage,
        daysWorked,
        estimatedPay: employee.dailyWage * daysWorked,
      };
    });
}

export function computeDesignationBreakdown(employees: Employee[]) {
  const map = new Map<string, number>();
  for (const employee of employees) {
    map.set(employee.designation, (map.get(employee.designation) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([designation, count]) => ({ designation, count }))
    .sort((a, b) => b.count - a.count);
}

const REFERENCE_DATE = new Date("2026-06-27");
const MAINTENANCE_WINDOW_DAYS = 30;
const INSURANCE_WINDOW_DAYS = 60;
const LOW_FUEL_THRESHOLD = 25;
const TODAY = "2026-06-27";

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - REFERENCE_DATE.getTime()) / (1000 * 60 * 60 * 24));
}

export function computeDprStats(
  reports: DailyProgressReport[],
  hoursWorkedThisWeek = 0,
): DprStats {
  const todays = reports.filter((report) => report.date === TODAY);

  return {
    totalReports: reports.length,
    submittedToday: todays.filter((report) => report.status !== "draft").length,
    pendingReview: reports.filter((report) => report.status === "draft").length,
    workersOnSiteToday: todays.reduce((sum, report) => sum + report.workers, 0),
    machinesActiveToday: todays.reduce((sum, report) => sum + report.machines, 0),
    hoursWorkedThisWeek,
  };
}

export function computeMachineryStats(machines: Machine[]): MachineryStats {
  const activeCount = machines.filter((machine) => machine.status === "active").length;
  const maintenanceCount = machines.filter((machine) => machine.status === "maintenance").length;
  const idleCount = machines.filter((machine) => machine.status === "idle").length;

  return {
    totalMachines: machines.length,
    activeCount,
    maintenanceCount,
    idleCount,
    maintenanceDue: machines.filter((machine) => daysUntil(machine.maintenanceDate) <= MAINTENANCE_WINDOW_DAYS)
      .length,
    insuranceExpiringSoon: machines.filter(
      (machine) => daysUntil(machine.insuranceExpiry) <= INSURANCE_WINDOW_DAYS,
    ).length,
    lowFuelCount: machines.filter((machine) => machine.fuelLevel <= LOW_FUEL_THRESHOLD).length,
    avgFuelLevel:
      machines.length === 0
        ? 0
        : Math.round(machines.reduce((sum, machine) => sum + machine.fuelLevel, 0) / machines.length),
  };
}

export function computeMachineAlerts(machines: Machine[]): MachineAlert[] {
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
        id: `${machine.id}-ins-overdue`,
        machineId: machine.id,
        machineName: machine.name,
        type: "insurance",
        message: "Insurance expired",
        severity: "danger",
        dueDate: machine.insuranceExpiry,
      });
    } else if (insuranceDays <= INSURANCE_WINDOW_DAYS) {
      alerts.push({
        id: `${machine.id}-ins-due`,
        machineId: machine.id,
        machineName: machine.name,
        type: "insurance",
        message: `Insurance expires in ${insuranceDays} day${insuranceDays !== 1 ? "s" : ""}`,
        severity: insuranceDays <= 14 ? "danger" : "warning",
        dueDate: machine.insuranceExpiry,
      });
    }

    if (machine.fuelLevel <= LOW_FUEL_THRESHOLD) {
      alerts.push({
        id: `${machine.id}-fuel-low`,
        machineId: machine.id,
        machineName: machine.name,
        type: "fuel",
        message: `Fuel at ${machine.fuelLevel}%`,
        severity: machine.fuelLevel <= 15 ? "danger" : "warning",
      });
    }
  }

  return alerts;
}

export function computeAnalyticsStats(projects: Project[]): AnalyticsStats {
  const revenue = projects.reduce((sum, project) => sum + project.budget, 0);
  const expenses = projects.reduce((sum, project) => sum + project.spent, 0);
  const netProfit = revenue - expenses;
  const labourCost = Math.round(expenses * 0.32);
  const materialCost = Math.round(expenses * 0.42);
  const machineryCost = Math.round(expenses * 0.16);
  const avgProjectCompletion =
    projects.length === 0
      ? 0
      : Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length);

  return {
    revenue,
    expenses,
    netProfit,
    profitMargin: revenue === 0 ? 0 : Math.round((netProfit / revenue) * 100),
    labourCost,
    materialCost,
    machineryCost,
    avgProjectCompletion,
  };
}

export function computeProjectBudgetVsActual(projects: Project[]) {
  return projects.map((project) => ({
    project: project.name,
    budget: project.budget,
    actual: project.spent,
    variance: project.budget - project.spent,
    utilization: project.budget === 0 ? 0 : Math.round((project.spent / project.budget) * 100),
  }));
}

export function computeProjectCompletion(projects: Project[]) {
  return projects.map((project) => ({
    name: project.name,
    progress: project.progress,
  }));
}

export function computeCostByProject(projects: Project[]) {
  return projects.map((project) => ({
    name: project.name,
    materials: Math.round(project.spent * 0.42),
    labour: Math.round(project.spent * 0.32),
    machinery: Math.round(project.spent * 0.16),
    other: Math.round(project.spent * 0.1),
  }));
}
