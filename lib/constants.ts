import {
  BarChart3,
  Building2,
  CalendarCheck,
  ClipboardList,
  HardHat,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

export const APP_NAME = "Castle Cloud Builders ERP";
export const APP_TAGLINE = "Intelligent Construction Management Platform";
export const APP_VERSION = "0.1.0-demo";

export { COMPANY_NAME, APP_DESCRIPTION, APP_DESCRIPTION_SHORT } from "@/lib/site-config";

export const DEMO_CREDENTIALS = {
  email: "admin@buildmaster.com",
  password: "demo123",
} as const;

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: Array<"admin" | "manager" | "engineer" | "client">;
};

export const MAIN_NAV: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", href: "/projects", icon: Building2 },
  { title: "Material Inventory", href: "/inventory", icon: Package },
  { title: "Purchase", href: "/purchase", icon: ShoppingCart },
  { title: "Vendors", href: "/vendors", icon: Store },
  { title: "Labour", href: "/labour", icon: Users },
  { title: "Attendance", href: "/attendance", icon: CalendarCheck },
  { title: "DPR", href: "/dpr", icon: ClipboardList },
  { title: "Machinery", href: "/machinery", icon: Truck },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Client Portal", href: "/client", icon: HardHat, roles: ["admin", "client"] },
  { title: "Settings", href: "/settings", icon: Settings },
];

export const PROJECT_STATUSES = [
  "planning",
  "in-progress",
  "on-hold",
  "completed",
] as const;

export const PO_STATUSES = [
  "requested",
  "approved",
  "ordered",
  "delivered",
  "completed",
] as const;

export const ATTENDANCE_STATUSES = ["present", "absent", "late"] as const;

export const DPR_STATUSES = ["draft", "submitted", "approved"] as const;

export const MACHINE_STATUSES = ["active", "maintenance", "idle"] as const;

export const PAYMENT_STATUSES = ["paid", "pending", "upcoming", "overdue"] as const;

export const INVOICE_STATUSES = ["paid", "pending", "overdue"] as const;

export const BRAND_COLORS = {
  primary: "#0F172A",
  secondary: "#2563EB",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  background: "#F8FAFC",
} as const;
