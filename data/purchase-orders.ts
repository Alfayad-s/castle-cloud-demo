import type { PurchaseOrder, PurchaseOrderStatus } from "@/types";

export type PurchaseOrderStats = {
  totalOrders: number;
  pendingApproval: number;
  inProgress: number;
  totalValue: number;
  deliveredThisMonth: number;
};

export type PurchaseStatusStep = {
  status: PurchaseOrderStatus;
  label: string;
  date?: string;
  note?: string;
};

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "po-001",
    poNumber: "PO-2026-0142",
    vendorId: "ven-001",
    vendorName: "ABC Cement",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    status: "ordered",
    amount: 152000,
    gst: 27360,
    deliveryDate: "2026-07-02",
    createdAt: "2026-06-20",
    items: [
      { materialId: "mat-001", materialName: "Cement", quantity: 400, unit: "bags", price: 380 },
    ],
  },
  {
    id: "po-002",
    poNumber: "PO-2026-0143",
    vendorId: "ven-002",
    vendorName: "Steel World",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    status: "approved",
    amount: 620000,
    gst: 111600,
    deliveryDate: "2026-07-10",
    createdAt: "2026-06-25",
    items: [
      { materialId: "mat-002", materialName: "Steel", quantity: 10, unit: "tons", price: 62000 },
    ],
  },
  {
    id: "po-003",
    poNumber: "PO-2026-0138",
    vendorId: "ven-004",
    vendorName: "Prime Hardware",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    status: "delivered",
    amount: 97500,
    gst: 17550,
    deliveryDate: "2026-06-18",
    createdAt: "2026-06-05",
    items: [
      { materialId: "mat-005", materialName: "Tiles", quantity: 1500, unit: "sqft", price: 65 },
    ],
  },
  {
    id: "po-004",
    poNumber: "PO-2026-0144",
    vendorId: "ven-003",
    vendorName: "Build Supply",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    status: "requested",
    amount: 54000,
    gst: 9720,
    deliveryDate: "2026-07-15",
    createdAt: "2026-06-26",
    items: [
      { materialId: "mat-003", materialName: "Sand", quantity: 1200, unit: "cft", price: 45 },
    ],
  },
  {
    id: "po-005",
    poNumber: "PO-2026-0135",
    vendorId: "ven-004",
    vendorName: "Prime Hardware",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    status: "completed",
    amount: 210000,
    gst: 37800,
    deliveryDate: "2026-05-28",
    createdAt: "2026-05-20",
    items: [
      { materialId: "mat-006", materialName: "Paint", quantity: 500, unit: "liters", price: 420 },
    ],
  },
  {
    id: "po-006",
    poNumber: "PO-2026-0145",
    vendorId: "ven-003",
    vendorName: "Build Supply",
    projectId: "proj-001",
    projectName: "Luxury Villa",
    status: "requested",
    amount: 85000,
    gst: 15300,
    deliveryDate: "2026-07-08",
    createdAt: "2026-06-27",
    items: [
      { materialId: "mat-004", materialName: "Bricks", quantity: 10000, unit: "nos", price: 8 },
      { materialId: "mat-007", materialName: "Plywood", quantity: 40, unit: "sheets", price: 1250 },
    ],
  },
  {
    id: "po-007",
    poNumber: "PO-2026-0140",
    vendorId: "ven-002",
    vendorName: "Steel World",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    status: "delivered",
    amount: 310000,
    gst: 55800,
    deliveryDate: "2026-06-22",
    createdAt: "2026-06-08",
    items: [
      { materialId: "mat-002", materialName: "Steel", quantity: 5, unit: "tons", price: 62000 },
    ],
  },
  {
    id: "po-008",
    poNumber: "PO-2026-0146",
    vendorId: "ven-001",
    vendorName: "ABC Cement",
    projectId: "proj-003",
    projectName: "Apartment Tower",
    status: "approved",
    amount: 76000,
    gst: 13680,
    deliveryDate: "2026-07-20",
    createdAt: "2026-06-24",
    items: [
      { materialId: "mat-001", materialName: "Cement", quantity: 200, unit: "bags", price: 380 },
    ],
  },
  {
    id: "po-009",
    poNumber: "PO-2026-0132",
    vendorId: "ven-004",
    vendorName: "Prime Hardware",
    projectId: "proj-002",
    projectName: "Commercial Complex",
    status: "completed",
    amount: 147000,
    gst: 26460,
    deliveryDate: "2026-05-15",
    createdAt: "2026-05-05",
    items: [
      {
        materialId: "mat-009",
        materialName: "Electrical Conduit",
        quantity: 4200,
        unit: "meters",
        price: 35,
      },
    ],
  },
  {
    id: "po-010",
    poNumber: "PO-2026-0147",
    vendorId: "ven-003",
    vendorName: "Build Supply",
    projectId: "proj-004",
    projectName: "Warehouse Project",
    status: "ordered",
    amount: 96000,
    gst: 17280,
    deliveryDate: "2026-07-05",
    createdAt: "2026-06-23",
    items: [
      { materialId: "mat-008", materialName: "Aggregate 20mm", quantity: 1800, unit: "cft", price: 52 },
    ],
  },
];

export const poStatusTrend = [
  { month: "Jan", requested: 2, approved: 1, ordered: 1, delivered: 3, completed: 2 },
  { month: "Feb", requested: 3, approved: 2, ordered: 2, delivered: 2, completed: 3 },
  { month: "Mar", requested: 2, approved: 3, ordered: 3, delivered: 4, completed: 2 },
  { month: "Apr", requested: 4, approved: 2, ordered: 2, delivered: 3, completed: 4 },
  { month: "May", requested: 3, approved: 4, ordered: 3, delivered: 2, completed: 3 },
  { month: "Jun", requested: 5, approved: 3, ordered: 4, delivered: 3, completed: 2 },
];

export const vendorSpend = [
  { vendor: "ABC Cement", value: 228000 },
  { vendor: "Steel World", value: 930000 },
  { vendor: "Build Supply", value: 235000 },
  { vendor: "Prime Hardware", value: 454500 },
];

const statusTimelineMap: Record<string, PurchaseStatusStep[]> = {
  "po-001": [
    { status: "requested", label: "Requested", date: "2026-06-20", note: "Raised by site store" },
    { status: "approved", label: "Approved", date: "2026-06-21", note: "Approved by Rajesh Kumar" },
    { status: "ordered", label: "Ordered", date: "2026-06-22", note: "PO sent to ABC Cement" },
    { status: "delivered", label: "Delivered" },
    { status: "completed", label: "Completed" },
  ],
  "po-002": [
    { status: "requested", label: "Requested", date: "2026-06-25", note: "Urgent steel requirement" },
    { status: "approved", label: "Approved", date: "2026-06-26", note: "Approved by Priya Menon" },
    { status: "ordered", label: "Ordered" },
    { status: "delivered", label: "Delivered" },
    { status: "completed", label: "Completed" },
  ],
  "po-003": [
    { status: "requested", label: "Requested", date: "2026-06-05" },
    { status: "approved", label: "Approved", date: "2026-06-06" },
    { status: "ordered", label: "Ordered", date: "2026-06-07" },
    { status: "delivered", label: "Delivered", date: "2026-06-18", note: "Delivered to Finishing Store" },
    { status: "completed", label: "Completed" },
  ],
  "po-004": [
    { status: "requested", label: "Requested", date: "2026-06-26", note: "Awaiting manager approval" },
    { status: "approved", label: "Approved" },
    { status: "ordered", label: "Ordered" },
    { status: "delivered", label: "Delivered" },
    { status: "completed", label: "Completed" },
  ],
};

const defaultTimeline: PurchaseStatusStep[] = [
  { status: "requested", label: "Requested" },
  { status: "approved", label: "Approved" },
  { status: "ordered", label: "Ordered" },
  { status: "delivered", label: "Delivered" },
  { status: "completed", label: "Completed" },
];

export function getPurchaseOrderById(id: string): PurchaseOrder | undefined {
  return purchaseOrders.find((order) => order.id === id);
}

export function getPurchaseOrderStats(): PurchaseOrderStats {
  const totalValue = purchaseOrders.reduce((sum, po) => sum + po.amount + po.gst, 0);

  return {
    totalOrders: purchaseOrders.length,
    pendingApproval: purchaseOrders.filter((po) => po.status === "requested").length,
    inProgress: purchaseOrders.filter((po) =>
      ["approved", "ordered"].includes(po.status),
    ).length,
    totalValue,
    deliveredThisMonth: purchaseOrders.filter(
      (po) => po.status === "delivered" && po.deliveryDate.startsWith("2026-06"),
    ).length,
  };
}

export function getPurchaseStatusTimeline(order: PurchaseOrder): PurchaseStatusStep[] {
  const custom = statusTimelineMap[order.id];
  if (custom) {
    return custom.map((step) => ({
      ...step,
      date: step.date ?? (step.status === order.status ? order.createdAt : undefined),
    }));
  }

  const statusOrder: PurchaseOrderStatus[] = [
    "requested",
    "approved",
    "ordered",
    "delivered",
    "completed",
  ];
  const currentIndex = statusOrder.indexOf(order.status);

  return defaultTimeline.map((step, index) => ({
    ...step,
    date:
      index <= currentIndex
        ? index === 0
          ? order.createdAt
          : index === currentIndex
            ? order.deliveryDate
            : undefined
        : undefined,
  }));
}

export function getGrandTotal(order: PurchaseOrder): number {
  return order.amount + order.gst;
}
