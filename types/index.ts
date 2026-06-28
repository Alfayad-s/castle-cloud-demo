import type {
  ATTENDANCE_STATUSES,
  DPR_STATUSES,
  INVOICE_STATUSES,
  MACHINE_STATUSES,
  PAYMENT_STATUSES,
  PO_STATUSES,
  PROJECT_STATUSES,
} from "@/lib/constants";

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type PurchaseOrderStatus = (typeof PO_STATUSES)[number];
export type AttendanceStatus = (typeof ATTENDANCE_STATUSES)[number];
export type DprStatus = (typeof DPR_STATUSES)[number];
export type MachineStatus = (typeof MACHINE_STATUSES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];
export type UserRole = "admin" | "manager" | "engineer" | "client";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  designation?: string;
};

export type Project = {
  id: string;
  name: string;
  location: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  progress: number;
  manager: string;
  deadline: string;
  startDate: string;
  description?: string;
  engineers: string[];
  milestones: ProjectMilestone[];
};

export type ProjectMilestone = {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "pending";
  dueDate: string;
};

export type Material = {
  id: string;
  name: string;
  category: string;
  supplier: string;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
  unit: string;
  price: number;
  lastRestocked?: string;
  todayConsumption?: number;
};

export type Warehouse = {
  id: string;
  name: string;
  location: string;
  materialsCount: number;
  stockValue: number;
  manager: string;
};

export type MaterialTransfer = {
  id: string;
  materialId: string;
  materialName: string;
  from: string;
  to: string;
  quantity: number;
  unit: string;
  date: string;
};

export type MaterialPurchaseRecord = {
  id: string;
  materialId: string;
  poNumber: string;
  vendor: string;
  quantity: number;
  unit: string;
  amount: number;
  date: string;
};

export type MaterialConsumptionPoint = {
  day: string;
  quantity: number;
};

export type MaterialUsageRecord = {
  id: string;
  materialId: string;
  date: string;
  project: string;
  quantity: number;
  unit: string;
  usedBy: string;
  note?: string;
};

export type InventoryStats = {
  totalMaterials: number;
  stockValue: number;
  lowStockCount: number;
  todaysConsumption: number;
};

export type Vendor = {
  id: string;
  name: string;
  contact: string;
  email: string;
  category: string;
  gst: string;
  balance: number;
  projects: string[];
  rating: number;
};

export type AttendanceLog = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: AttendanceStatus;
  checkIn?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
};

export type VendorSeed = Omit<Vendor, "balance" | "projects">;

export type VendorStats = {
  totalVendors: number;
  activeProjects: number;
  totalOutstanding: number;
  avgRating: number;
};

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  projectId: string;
  projectName: string;
  status: PurchaseOrderStatus;
  amount: number;
  gst: number;
  deliveryDate: string;
  createdAt: string;
  items: PurchaseOrderItem[];
};

export type PurchaseOrderItem = {
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  price: number;
};

export type Employee = {
  id: string;
  name: string;
  designation: string;
  site: string;
  dailyWage: number;
  phone: string;
  photo?: string;
  attendanceToday: AttendanceStatus;
  joinDate?: string;
  employeeType?: "staff" | "worker";
};

export type LabourStats = {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  todaysWorkforce: number;
  monthlyPayrollEstimate: number;
};

export type AttendanceDay = {
  date: string;
  status: AttendanceStatus | "off";
};

export type PayrollPreviewRow = {
  employeeId: string;
  name: string;
  designation: string;
  site: string;
  dailyWage: number;
  daysWorked: number;
  estimatedPay: number;
};

export type DprPhoto = {
  id: string;
  caption: string;
  gradient: string;
};

export type DailyProgressReport = {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  engineer: string;
  weather: string;
  workers: number;
  machines: number;
  machinesList: string[];
  workDone: string;
  materialsUsed: Array<{ material: string; quantity: number; unit: string }>;
  remarks: string;
  hoursWorked: number;
  status: DprStatus;
  photos: DprPhoto[];
  submittedAt?: string;
};

export type DprStats = {
  totalReports: number;
  submittedToday: number;
  pendingReview: number;
  workersOnSiteToday: number;
  machinesActiveToday: number;
  hoursWorkedThisWeek: number;
};

export type Machine = {
  id: string;
  name: string;
  type: string;
  image: string;
  projectId: string;
  currentSite: string;
  operator: string;
  runningHours: number;
  fuelLevel: number;
  maintenanceDate: string;
  insuranceExpiry: string;
  status: MachineStatus;
  registrationNumber?: string;
  hourlyRate: number;
};

export type MachineryStats = {
  totalMachines: number;
  activeCount: number;
  maintenanceCount: number;
  idleCount: number;
  maintenanceDue: number;
  insuranceExpiringSoon: number;
  lowFuelCount: number;
  avgFuelLevel: number;
};

export type MachineAlert = {
  id: string;
  machineId: string;
  machineName: string;
  type: "maintenance" | "insurance" | "fuel";
  message: string;
  severity: "warning" | "danger";
  dueDate?: string;
};

export type DashboardStats = {
  runningProjects: number;
  completedProjects: number;
  pendingPayments: number;
  todaysAttendance: number;
  lowStockAlerts: number;
  activeMachines: number;
  revenue: number;
  expenses: number;
};

export type Activity = {
  id: string;
  message: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "danger";
};

export type ClientProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectId: string;
};

export type ClientPayment = {
  id: string;
  milestone: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
};

export type ClientInvoice = {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
};

export type ClientDocument = {
  id: string;
  name: string;
  type: "agreement" | "drawing" | "certificate" | "report" | "invoice";
  uploadedAt: string;
  size: string;
};

export type ClientPhoto = {
  id: string;
  caption: string;
  date: string;
  gradient: string;
};

export type ClientTimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "milestone" | "update" | "payment" | "document";
};

export type ClientPortalStats = {
  progress: number;
  totalContract: number;
  amountPaid: number;
  amountPending: number;
  nextPaymentAmount: number;
  nextPaymentDate: string;
  pendingInvoices: number;
};
