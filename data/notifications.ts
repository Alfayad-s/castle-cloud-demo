import type { Activity } from "@/types";

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: Activity["type"];
  href?: string;
};

export const demoNotifications: AppNotification[] = [
  {
    id: "notif-001",
    title: "PO Approved",
    message: "PO-2026-0142 for ABC Cement has been approved by Rajesh Kumar.",
    timestamp: "2026-06-27T09:30:00",
    read: false,
    type: "success",
    href: "/purchase/po-001",
  },
  {
    id: "notif-002",
    title: "Low Stock Alert",
    message: "Steel stock (85 tons) is below minimum threshold of 100 tons.",
    timestamp: "2026-06-27T08:15:00",
    read: false,
    type: "warning",
    href: "/inventory/mat-002",
  },
  {
    id: "notif-003",
    title: "DPR Submitted",
    message: "Anita Sharma submitted today's DPR for Luxury Villa project.",
    timestamp: "2026-06-27T07:45:00",
    read: false,
    type: "info",
    href: "/dpr/dpr-001",
  },
  {
    id: "notif-004",
    title: "Maintenance Due",
    message: "Tower Crane TC-5013 insurance expired. Schedule renewal immediately.",
    timestamp: "2026-06-26T16:20:00",
    read: true,
    type: "warning",
    href: "/machinery/mac-003",
  },
  {
    id: "notif-005",
    title: "Project Completed",
    message: "Warehouse Project handover completed. Final inspection passed.",
    timestamp: "2026-06-26T11:00:00",
    read: true,
    type: "success",
    href: "/projects/proj-004",
  },
  {
    id: "notif-006",
    title: "Payment Pending",
    message: "Client invoice INV-2026-048 (₹12.75 L) is due on 15 Jul 2026.",
    timestamp: "2026-06-26T09:00:00",
    read: false,
    type: "warning",
    href: "/client",
  },
  {
    id: "notif-007",
    title: "New Employee Added",
    message: "Ramesh Yadav (Mason) assigned to Luxury Villa site.",
    timestamp: "2026-06-25T14:30:00",
    read: true,
    type: "info",
    href: "/labour/emp-005",
  },
  {
    id: "notif-008",
    title: "Budget Threshold",
    message: "Commercial Complex has reached 45% of allocated budget.",
    timestamp: "2026-06-25T10:15:00",
    read: true,
    type: "info",
    href: "/projects/proj-002",
  },
];

export function getUnreadCount(notifications: AppNotification[]): number {
  return notifications.filter((n) => !n.read).length;
}
