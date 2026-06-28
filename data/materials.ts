import type { Material } from "@/types";

export const materials: Material[] = [
  {
    id: "mat-001",
    name: "Cement",
    category: "Binding",
    supplier: "ABC Cement",
    currentStock: 420,
    minimumStock: 200,
    warehouse: "Site Store A",
    unit: "bags",
    price: 380,
    lastRestocked: "2026-06-20",
    todayConsumption: 85,
  },
  {
    id: "mat-002",
    name: "Steel",
    category: "Structural",
    supplier: "Steel World",
    currentStock: 85,
    minimumStock: 100,
    warehouse: "Main Yard",
    unit: "tons",
    price: 62000,
    lastRestocked: "2026-06-10",
    todayConsumption: 2.4,
  },
  {
    id: "mat-003",
    name: "Sand",
    category: "Aggregate",
    supplier: "Build Supply",
    currentStock: 1200,
    minimumStock: 500,
    warehouse: "Quarry Yard",
    unit: "cft",
    price: 45,
    lastRestocked: "2026-06-22",
    todayConsumption: 180,
  },
  {
    id: "mat-004",
    name: "Bricks",
    category: "Masonry",
    supplier: "Build Supply",
    currentStock: 18000,
    minimumStock: 10000,
    warehouse: "Site Store B",
    unit: "nos",
    price: 8,
    lastRestocked: "2026-06-18",
    todayConsumption: 4500,
  },
  {
    id: "mat-005",
    name: "Tiles",
    category: "Finishing",
    supplier: "Prime Hardware",
    currentStock: 3200,
    minimumStock: 1500,
    warehouse: "Finishing Store",
    unit: "sqft",
    price: 65,
    lastRestocked: "2026-06-15",
    todayConsumption: 120,
  },
  {
    id: "mat-006",
    name: "Paint",
    category: "Finishing",
    supplier: "Prime Hardware",
    currentStock: 240,
    minimumStock: 300,
    warehouse: "Finishing Store",
    unit: "liters",
    price: 420,
    lastRestocked: "2026-05-28",
    todayConsumption: 18,
  },
  {
    id: "mat-007",
    name: "Plywood",
    category: "Woodwork",
    supplier: "Build Supply",
    currentStock: 680,
    minimumStock: 400,
    warehouse: "Site Store A",
    unit: "sheets",
    price: 1250,
    lastRestocked: "2026-06-12",
    todayConsumption: 24,
  },
  {
    id: "mat-008",
    name: "Aggregate 20mm",
    category: "Aggregate",
    supplier: "Build Supply",
    currentStock: 950,
    minimumStock: 600,
    warehouse: "Quarry Yard",
    unit: "cft",
    price: 52,
    lastRestocked: "2026-06-24",
    todayConsumption: 95,
  },
  {
    id: "mat-009",
    name: "Electrical Conduit",
    category: "MEP",
    supplier: "Prime Hardware",
    currentStock: 4200,
    minimumStock: 2500,
    warehouse: "MEP Store",
    unit: "meters",
    price: 35,
    lastRestocked: "2026-06-08",
    todayConsumption: 310,
  },
  {
    id: "mat-010",
    name: "PVC Pipes",
    category: "Plumbing",
    supplier: "Prime Hardware",
    currentStock: 890,
    minimumStock: 500,
    warehouse: "MEP Store",
    unit: "lengths",
    price: 280,
    lastRestocked: "2026-06-19",
    todayConsumption: 42,
  },
];

export function getMaterialById(id: string): Material | undefined {
  return materials.find((material) => material.id === id);
}

export function getLowStockMaterials(): Material[] {
  return materials.filter((material) => material.currentStock <= material.minimumStock);
}

export function getInventoryStockValue(): number {
  return materials.reduce(
    (total, material) => total + material.currentStock * material.price,
    0,
  );
}

export function getTodaysConsumption(): number {
  return materials.reduce(
    (total, material) => total + (material.todayConsumption ?? 0),
    0,
  );
}
