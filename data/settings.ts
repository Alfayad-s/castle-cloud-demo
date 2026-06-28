import { mockUsers } from "@/lib/auth";
import { APP_NAME, APP_TAGLINE, APP_VERSION, DEMO_CREDENTIALS } from "@/lib/constants";
import type { User } from "@/types";

export type CompanySettings = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  gstin: string;
  pan: string;
};

export type NotificationSettings = {
  lowStockAlerts: boolean;
  dprSubmissions: boolean;
  poApprovals: boolean;
  paymentReminders: boolean;
  machineMaintenance: boolean;
  weeklyReports: boolean;
};

export type AppPreferences = {
  currency: "INR" | "USD";
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  language: "en" | "hi";
  timezone: string;
  compactNumbers: boolean;
};

export type ActiveSession = {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
};

export const companySettings: CompanySettings = {
  name: "Castle Cloud Builders",
  tagline: APP_TAGLINE,
  email: "contact@castlecloudbuilders.com",
  phone: "+91 80 4567 8900",
  website: "www.castlecloudbuilders.com",
  address: "42, Industrial Layout, Whitefield",
  city: "Bangalore, Karnataka 560066",
  gstin: "29AABCB1234F1Z5",
  pan: "AABCB1234F",
};

export const defaultNotifications: NotificationSettings = {
  lowStockAlerts: true,
  dprSubmissions: true,
  poApprovals: true,
  paymentReminders: false,
  machineMaintenance: true,
  weeklyReports: true,
};

export const defaultPreferences: AppPreferences = {
  currency: "INR",
  dateFormat: "DD/MM/YYYY",
  language: "en",
  timezone: "Asia/Kolkata",
  compactNumbers: true,
};

export const activeSessions: ActiveSession[] = [
  {
    id: "sess-001",
    device: "Chrome on macOS",
    location: "Bangalore, IN",
    lastActive: "2026-06-27T18:30:00",
    current: true,
  },
  {
    id: "sess-002",
    device: "Safari on iPhone",
    location: "Bangalore, IN",
    lastActive: "2026-06-26T09:15:00",
    current: false,
  },
  {
    id: "sess-003",
    device: "Chrome on Windows",
    location: "Hyderabad, IN",
    lastActive: "2026-06-24T14:40:00",
    current: false,
  },
];

export const teamMembers: User[] = mockUsers;

export const demoInfo = {
  version: APP_VERSION,
  credentials: DEMO_CREDENTIALS,
  environment: "Demo / Prototype",
  lastUpdated: "2026-06-27",
};

export const roleLabels: Record<User["role"], string> = {
  admin: "Administrator",
  manager: "Project Manager",
  engineer: "Site Engineer",
  client: "Client",
};
