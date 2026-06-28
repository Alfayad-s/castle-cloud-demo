import {
  getInventoryStockValue,
  getLowStockMaterials,
  getMaterialById,
  getTodaysConsumption,
  materials,
} from "./materials";
import type {
  InventoryStats,
  MaterialConsumptionPoint,
  MaterialPurchaseRecord,
  MaterialTransfer,
  MaterialUsageRecord,
  Warehouse,
} from "@/types";

export const warehouses: Warehouse[] = [
  {
    id: "wh-001",
    name: "Site Store A",
    location: "Luxury Villa Site",
    materialsCount: 2,
    stockValue: 1009600,
    manager: "Anita Sharma",
  },
  {
    id: "wh-002",
    name: "Main Yard",
    location: "Central Depot",
    materialsCount: 1,
    stockValue: 5270000,
    manager: "Rajesh Kumar",
  },
  {
    id: "wh-003",
    name: "Quarry Yard",
    location: "Outer Ring Road",
    materialsCount: 2,
    stockValue: 103400,
    manager: "Vikram Patel",
  },
  {
    id: "wh-004",
    name: "Finishing Store",
    location: "Commercial Complex",
    materialsCount: 2,
    stockValue: 308800,
    manager: "Priya Menon",
  },
  {
    id: "wh-005",
    name: "MEP Store",
    location: "Commercial Complex",
    materialsCount: 2,
    stockValue: 396200,
    manager: "Suresh Reddy",
  },
];

export const materialTransfers: MaterialTransfer[] = [
  {
    id: "tr-001",
    materialId: "mat-001",
    materialName: "Cement",
    from: "Central Depot",
    to: "Site Store A",
    quantity: 200,
    unit: "bags",
    date: "2026-06-20",
  },
  {
    id: "tr-002",
    materialId: "mat-002",
    materialName: "Steel",
    from: "Main Yard",
    to: "Commercial Complex",
    quantity: 5,
    unit: "tons",
    date: "2026-06-18",
  },
  {
    id: "tr-003",
    materialId: "mat-003",
    materialName: "Sand",
    from: "Quarry Yard",
    to: "Luxury Villa Site",
    quantity: 400,
    unit: "cft",
    date: "2026-06-22",
  },
  {
    id: "tr-004",
    materialId: "mat-005",
    materialName: "Tiles",
    from: "Finishing Store",
    to: "Luxury Villa Site",
    quantity: 800,
    unit: "sqft",
    date: "2026-06-15",
  },
  {
    id: "tr-005",
    materialId: "mat-009",
    materialName: "Electrical Conduit",
    from: "MEP Store",
    to: "Commercial Complex",
    quantity: 1200,
    unit: "meters",
    date: "2026-06-10",
  },
];

export const materialPurchases: MaterialPurchaseRecord[] = [
  {
    id: "mp-001",
    materialId: "mat-001",
    poNumber: "PO-2026-0142",
    vendor: "ABC Cement",
    quantity: 400,
    unit: "bags",
    amount: 152000,
    date: "2026-06-20",
  },
  {
    id: "mp-002",
    materialId: "mat-002",
    poNumber: "PO-2026-0143",
    vendor: "Steel World",
    quantity: 10,
    unit: "tons",
    amount: 620000,
    date: "2026-06-10",
  },
  {
    id: "mp-003",
    materialId: "mat-005",
    poNumber: "PO-2026-0138",
    vendor: "Prime Hardware",
    quantity: 1500,
    unit: "sqft",
    amount: 97500,
    date: "2026-06-05",
  },
  {
    id: "mp-004",
    materialId: "mat-006",
    poNumber: "PO-2026-0135",
    vendor: "Prime Hardware",
    quantity: 500,
    unit: "liters",
    amount: 210000,
    date: "2026-05-28",
  },
  {
    id: "mp-005",
    materialId: "mat-003",
    poNumber: "PO-2026-0144",
    vendor: "Build Supply",
    quantity: 1200,
    unit: "cft",
    amount: 54000,
    date: "2026-06-25",
  },
];

export const categoryStock = [
  { category: "Binding", value: 159600 },
  { category: "Structural", value: 5270000 },
  { category: "Aggregate", value: 103400 },
  { category: "Masonry", value: 144000 },
  { category: "Finishing", value: 308800 },
  { category: "Woodwork", value: 850000 },
  { category: "MEP", value: 396200 },
  { category: "Plumbing", value: 249200 },
];

export const weeklyConsumption = [
  { day: "Mon", cement: 72, steel: 1.8, sand: 140 },
  { day: "Tue", cement: 80, steel: 2.1, sand: 165 },
  { day: "Wed", cement: 68, steel: 2.4, sand: 150 },
  { day: "Thu", cement: 90, steel: 2.0, sand: 175 },
  { day: "Fri", cement: 85, steel: 2.4, sand: 180 },
  { day: "Sat", cement: 45, steel: 1.2, sand: 90 },
  { day: "Sun", cement: 30, steel: 0.8, sand: 60 },
];

export function getInventoryStats(): InventoryStats {
  return {
    totalMaterials: materials.length,
    stockValue: getInventoryStockValue(),
    lowStockCount: getLowStockMaterials().length,
    todaysConsumption: getTodaysConsumption(),
  };
}

export function getMaterialPurchases(materialId: string): MaterialPurchaseRecord[] {
  return materialPurchases.filter((record) => record.materialId === materialId);
}

export const materialUsageHistory: MaterialUsageRecord[] = [
  {
    id: "usg-001",
    materialId: "mat-001",
    date: "2026-06-27",
    project: "Luxury Villa",
    quantity: 85,
    unit: "bags",
    usedBy: "Anita Sharma",
    note: "Foundation pour — Block C",
  },
  {
    id: "usg-002",
    materialId: "mat-001",
    date: "2026-06-26",
    project: "Luxury Villa",
    quantity: 72,
    unit: "bags",
    usedBy: "Vikram Patel",
  },
  {
    id: "usg-003",
    materialId: "mat-001",
    date: "2026-06-25",
    project: "Apartment Tower",
    quantity: 48,
    unit: "bags",
    usedBy: "Rajesh Kumar",
  },
  {
    id: "usg-004",
    materialId: "mat-002",
    date: "2026-06-27",
    project: "Commercial Complex",
    quantity: 2.4,
    unit: "tons",
    usedBy: "Suresh Reddy",
    note: "Column reinforcement",
  },
  {
    id: "usg-005",
    materialId: "mat-002",
    date: "2026-06-26",
    project: "Commercial Complex",
    quantity: 2.1,
    unit: "tons",
    usedBy: "Priya Menon",
  },
  {
    id: "usg-006",
    materialId: "mat-003",
    date: "2026-06-27",
    project: "Luxury Villa",
    quantity: 180,
    unit: "cft",
    usedBy: "Anita Sharma",
  },
  {
    id: "usg-007",
    materialId: "mat-006",
    date: "2026-06-27",
    project: "Luxury Villa",
    quantity: 18,
    unit: "liters",
    usedBy: "Priya Menon",
    note: "Interior walls — Level 2",
  },
  {
    id: "usg-008",
    materialId: "mat-006",
    date: "2026-06-26",
    project: "Luxury Villa",
    quantity: 22,
    unit: "liters",
    usedBy: "Priya Menon",
  },
  {
    id: "usg-009",
    materialId: "mat-005",
    date: "2026-06-27",
    project: "Luxury Villa",
    quantity: 120,
    unit: "sqft",
    usedBy: "Anita Sharma",
  },
  {
    id: "usg-010",
    materialId: "mat-009",
    date: "2026-06-27",
    project: "Commercial Complex",
    quantity: 310,
    unit: "meters",
    usedBy: "Suresh Reddy",
  },
];

export function getMaterialUsageHistory(materialId: string): MaterialUsageRecord[] {
  return materialUsageHistory
    .filter((record) => record.materialId === materialId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMaterialTransfers(materialId: string): MaterialTransfer[] {
  return materialTransfers.filter((record) => record.materialId === materialId);
}

export function getMaterialConsumptionTrend(
  materialId: string,
): MaterialConsumptionPoint[] {
  const trends: Record<string, MaterialConsumptionPoint[]> = {
    "mat-001": [
      { day: "Mon", quantity: 72 },
      { day: "Tue", quantity: 80 },
      { day: "Wed", quantity: 68 },
      { day: "Thu", quantity: 90 },
      { day: "Fri", quantity: 85 },
      { day: "Sat", quantity: 45 },
      { day: "Sun", quantity: 30 },
    ],
    "mat-002": [
      { day: "Mon", quantity: 1.8 },
      { day: "Tue", quantity: 2.1 },
      { day: "Wed", quantity: 2.4 },
      { day: "Thu", quantity: 2.0 },
      { day: "Fri", quantity: 2.4 },
      { day: "Sat", quantity: 1.2 },
      { day: "Sun", quantity: 0.8 },
    ],
    "mat-006": [
      { day: "Mon", quantity: 12 },
      { day: "Tue", quantity: 15 },
      { day: "Wed", quantity: 10 },
      { day: "Thu", quantity: 22 },
      { day: "Fri", quantity: 18 },
      { day: "Sat", quantity: 8 },
      { day: "Sun", quantity: 5 },
    ],
  };

  return (
    trends[materialId] ?? [
      { day: "Mon", quantity: 20 },
      { day: "Tue", quantity: 25 },
      { day: "Wed", quantity: 18 },
      { day: "Thu", quantity: 30 },
      { day: "Fri", quantity: 22 },
      { day: "Sat", quantity: 12 },
      { day: "Sun", quantity: 8 },
    ]
  );
}

export function getWarehouseForMaterial(materialId: string): Warehouse | undefined {
  const material = getMaterialById(materialId);
  if (!material) return undefined;
  return warehouses.find((warehouse) => warehouse.name === material.warehouse);
}

export { materials, getMaterialById, getLowStockMaterials };
