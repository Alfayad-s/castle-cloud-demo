import { purchaseOrders } from "./purchase-orders";
import type { PurchaseOrder, Vendor, VendorStats } from "@/types";

const vendorSeed: Omit<Vendor, "balance" | "projects">[] = [
  {
    id: "ven-001",
    name: "ABC Cement",
    contact: "+91 98765 43210",
    email: "sales@abccement.in",
    category: "Cement & Binding",
    gst: "27AABCU9603R1ZM",
    rating: 4.6,
  },
  {
    id: "ven-002",
    name: "Steel World",
    contact: "+91 91234 56789",
    email: "orders@steelworld.in",
    category: "Steel & Metal",
    gst: "29AACCS1234F1Z5",
    rating: 4.8,
  },
  {
    id: "ven-003",
    name: "Build Supply",
    contact: "+91 99887 76655",
    email: "supply@buildsupply.co",
    category: "Aggregates & Masonry",
    gst: "27AABCB5678G1Z2",
    rating: 4.3,
  },
  {
    id: "ven-004",
    name: "Prime Hardware",
    contact: "+91 90001 12233",
    email: "hello@primehardware.in",
    category: "Finishing & Hardware",
    gst: "27AABCP9012H1Z8",
    rating: 4.7,
  },
];

function getVendorProjects(vendorId: string): string[] {
  const projects = new Set<string>();
  for (const order of purchaseOrders) {
    if (order.vendorId === vendorId) {
      projects.add(order.projectName);
    }
  }
  return [...projects];
}

function getVendorBalance(vendorId: string): number {
  return purchaseOrders
    .filter((order) => order.vendorId === vendorId && order.status !== "completed")
    .reduce((sum, order) => sum + order.amount + order.gst, 0);
}

export const vendors: Vendor[] = vendorSeed.map((vendor) => ({
  ...vendor,
  projects: getVendorProjects(vendor.id),
  balance: getVendorBalance(vendor.id),
}));

export function getVendorById(id: string): Vendor | undefined {
  return vendors.find((vendor) => vendor.id === id);
}

export function getVendorOrders(vendorId: string): PurchaseOrder[] {
  return purchaseOrders.filter((order) => order.vendorId === vendorId);
}

export function getVendorStats(): VendorStats {
  const allProjects = new Set<string>();
  for (const vendor of vendors) {
    for (const project of vendor.projects) {
      allProjects.add(project);
    }
  }

  return {
    totalVendors: vendors.length,
    activeProjects: allProjects.size,
    totalOutstanding: vendors.reduce((sum, vendor) => sum + vendor.balance, 0),
    avgRating:
      Math.round((vendors.reduce((sum, vendor) => sum + vendor.rating, 0) / vendors.length) * 10) /
      10,
  };
}
