const STORAGE_PREFIX = "castle-cloud";

export const STORAGE_KEYS = {
  projects: `${STORAGE_PREFIX}-projects`,
  materials: `${STORAGE_PREFIX}-materials`,
  vendors: `${STORAGE_PREFIX}-vendors`,
  purchaseOrders: `${STORAGE_PREFIX}-purchase-orders`,
  employees: `${STORAGE_PREFIX}-employees`,
  machines: `${STORAGE_PREFIX}-machines`,
  dpr: `${STORAGE_PREFIX}-dpr`,
  clientPayments: `${STORAGE_PREFIX}-client-payments`,
  clientInvoices: `${STORAGE_PREFIX}-client-invoices`,
  clientDocuments: `${STORAGE_PREFIX}-client-documents`,
  clientPhotos: `${STORAGE_PREFIX}-client-photos`,
  clientTimeline: `${STORAGE_PREFIX}-client-timeline`,
  attendanceLogs: `${STORAGE_PREFIX}-attendance-logs`,
} as const;

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function loadFromStorage<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw) as T[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
}

export function saveToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota errors in demo
  }
}

export function resetStorage(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

export function resetAllDemoStorage(): void {
  Object.values(STORAGE_KEYS).forEach(resetStorage);
}
