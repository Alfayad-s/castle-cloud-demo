import { purchaseOrders as seedPurchaseOrders } from "@/data/purchase-orders";
import type { PurchaseOrder, Vendor, VendorSeed } from "@/types";

export function enrichVendor(vendor: VendorSeed, orders: PurchaseOrder[]): Vendor {
  const vendorOrders = orders.filter((order) => order.vendorId === vendor.id);
  const projects = [...new Set(vendorOrders.map((order) => order.projectName))];
  const balance = vendorOrders
    .filter((order) => order.status !== "completed")
    .reduce((sum, order) => sum + order.amount + order.gst, 0);

  return { ...vendor, projects, balance };
}

export function enrichVendors(vendorSeeds: VendorSeed[], orders: PurchaseOrder[]): Vendor[] {
  return vendorSeeds.map((vendor) => enrichVendor(vendor, orders));
}

export function syncPurchaseOrderRelations(
  order: PurchaseOrder,
  vendors: VendorSeed[],
  projects: { id: string; name: string }[],
): PurchaseOrder {
  const vendor = vendors.find((item) => item.id === order.vendorId);
  const project = projects.find((item) => item.id === order.projectId);

  return {
    ...order,
    vendorName: vendor?.name ?? order.vendorName,
    projectName: project?.name ?? order.projectName,
  };
}

export { seedPurchaseOrders };
