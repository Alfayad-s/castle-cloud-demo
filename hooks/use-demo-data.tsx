"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { demoSeeds } from "@/lib/demo-seeds";
import {
  generateId,
  loadFromStorage,
  resetAllDemoStorage,
  saveToStorage,
  STORAGE_KEYS,
} from "@/lib/demo-store";
import { enrichVendors, syncPurchaseOrderRelations } from "@/lib/vendor-utils";
import type {
  AttendanceLog,
  AttendanceStatus,
  ClientDocument,
  ClientInvoice,
  ClientPayment,
  ClientPhoto,
  ClientTimelineEvent,
  DailyProgressReport,
  Employee,
  Machine,
  Material,
  Project,
  PurchaseOrder,
  Vendor,
  VendorSeed,
} from "@/types";

type DemoDataContextValue = {
  isReady: boolean;
  projects: Project[];
  materials: Material[];
  vendors: Vendor[];
  purchaseOrders: PurchaseOrder[];
  employees: Employee[];
  machines: Machine[];
  dpr: DailyProgressReport[];
  clientPayments: ClientPayment[];
  clientInvoices: ClientInvoice[];
  clientDocuments: ClientDocument[];
  clientPhotos: ClientPhoto[];
  clientTimeline: ClientTimelineEvent[];
  attendanceLogs: AttendanceLog[];
  createProject: (item: Omit<Project, "id">) => Project;
  updateProject: (id: string, item: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  createMaterial: (item: Omit<Material, "id">) => Material;
  updateMaterial: (id: string, item: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  createVendor: (item: Omit<VendorSeed, "id">) => Vendor;
  updateVendor: (id: string, item: Partial<VendorSeed>) => void;
  deleteVendor: (id: string) => void;
  createPurchaseOrder: (item: Omit<PurchaseOrder, "id">) => PurchaseOrder;
  updatePurchaseOrder: (id: string, item: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (id: string) => void;
  createEmployee: (item: Omit<Employee, "id">) => Employee;
  updateEmployee: (id: string, item: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  createMachine: (item: Omit<Machine, "id">) => Machine;
  updateMachine: (id: string, item: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  createDpr: (item: Omit<DailyProgressReport, "id">) => DailyProgressReport;
  updateDpr: (id: string, item: Partial<DailyProgressReport>) => void;
  deleteDpr: (id: string) => void;
  createClientPayment: (item: Omit<ClientPayment, "id">) => ClientPayment;
  updateClientPayment: (id: string, item: Partial<ClientPayment>) => void;
  deleteClientPayment: (id: string) => void;
  createClientInvoice: (item: Omit<ClientInvoice, "id">) => ClientInvoice;
  updateClientInvoice: (id: string, item: Partial<ClientInvoice>) => void;
  deleteClientInvoice: (id: string) => void;
  createClientDocument: (item: Omit<ClientDocument, "id">) => ClientDocument;
  updateClientDocument: (id: string, item: Partial<ClientDocument>) => void;
  deleteClientDocument: (id: string) => void;
  logAttendance: (input: {
    employeeId: string;
    employeeName: string;
    date: string;
    status: AttendanceStatus;
    checkIn?: string;
    note?: string;
    id?: string;
  }) => AttendanceLog;
  resetDemoData: () => void;
};

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

function usePersistedState<T>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(seed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(loadFromStorage(key, seed));
    setReady(true);
  }, [key, seed]);

  const persist = useCallback(
    (next: T[] | ((prev: T[]) => T[])) => {
      setItems((prev) => {
        const value = typeof next === "function" ? next(prev) : next;
        saveToStorage(key, value);
        return value;
      });
    },
    [key],
  );

  return { items, setItems: persist, ready };
}

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const projectsState = usePersistedState(STORAGE_KEYS.projects, demoSeeds.projects);
  const materialsState = usePersistedState(STORAGE_KEYS.materials, demoSeeds.materials);
  const vendorSeedsState = usePersistedState(STORAGE_KEYS.vendors, demoSeeds.vendorSeeds);
  const purchaseOrdersState = usePersistedState(STORAGE_KEYS.purchaseOrders, demoSeeds.purchaseOrders);
  const employeesState = usePersistedState(STORAGE_KEYS.employees, demoSeeds.employees);
  const machinesState = usePersistedState(STORAGE_KEYS.machines, demoSeeds.machines);
  const dprState = usePersistedState(STORAGE_KEYS.dpr, demoSeeds.dpr);
  const clientPaymentsState = usePersistedState(STORAGE_KEYS.clientPayments, demoSeeds.clientPayments);
  const clientInvoicesState = usePersistedState(STORAGE_KEYS.clientInvoices, demoSeeds.clientInvoices);
  const clientDocumentsState = usePersistedState(STORAGE_KEYS.clientDocuments, demoSeeds.clientDocuments);
  const clientPhotosState = usePersistedState(STORAGE_KEYS.clientPhotos, demoSeeds.clientPhotos);
  const clientTimelineState = usePersistedState(STORAGE_KEYS.clientTimeline, demoSeeds.clientTimeline);
  const attendanceLogsState = usePersistedState(STORAGE_KEYS.attendanceLogs, demoSeeds.attendanceLogs);

  const isReady =
    projectsState.ready &&
    materialsState.ready &&
    vendorSeedsState.ready &&
    purchaseOrdersState.ready &&
    employeesState.ready &&
    machinesState.ready &&
    dprState.ready &&
    clientPaymentsState.ready &&
    clientInvoicesState.ready &&
    clientDocumentsState.ready &&
    clientPhotosState.ready &&
    clientTimelineState.ready &&
    attendanceLogsState.ready;

  const vendors = useMemo(
    () => enrichVendors(vendorSeedsState.items, purchaseOrdersState.items),
    [vendorSeedsState.items, purchaseOrdersState.items],
  );

  const employees = useMemo(() => {
    const today = "2026-06-27";
    const todayLogs = attendanceLogsState.items.filter((log) => log.date === today);

    return employeesState.items.map((employee) => {
      const log = todayLogs.find((item) => item.employeeId === employee.id);
      return log ? { ...employee, attendanceToday: log.status } : employee;
    });
  }, [employeesState.items, attendanceLogsState.items]);

  const createProject = useCallback(
    (item: Omit<Project, "id">) => {
      const created = { ...item, id: generateId("proj") };
      projectsState.setItems((prev) => [...prev, created]);
      return created;
    },
    [projectsState],
  );

  const updateProject = useCallback(
    (id: string, item: Partial<Project>) => {
      projectsState.setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...item } : p)));
    },
    [projectsState],
  );

  const deleteProject = useCallback(
    (id: string) => {
      projectsState.setItems((prev) => prev.filter((p) => p.id !== id));
    },
    [projectsState],
  );

  const createMaterial = useCallback(
    (item: Omit<Material, "id">) => {
      const created = { ...item, id: generateId("mat") };
      materialsState.setItems((prev) => [...prev, created]);
      return created;
    },
    [materialsState],
  );

  const updateMaterial = useCallback(
    (id: string, item: Partial<Material>) => {
      materialsState.setItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...item } : m)));
    },
    [materialsState],
  );

  const deleteMaterial = useCallback(
    (id: string) => {
      materialsState.setItems((prev) => prev.filter((m) => m.id !== id));
    },
    [materialsState],
  );

  const createVendor = useCallback(
    (item: Omit<VendorSeed, "id">) => {
      const created = { ...item, id: generateId("ven") };
      vendorSeedsState.setItems((prev) => [...prev, created]);
      return enrichVendors([created], purchaseOrdersState.items)[0];
    },
    [vendorSeedsState, purchaseOrdersState.items],
  );

  const updateVendor = useCallback(
    (id: string, item: Partial<VendorSeed>) => {
      vendorSeedsState.setItems((prev) => prev.map((v) => (v.id === id ? { ...v, ...item } : v)));
    },
    [vendorSeedsState],
  );

  const deleteVendor = useCallback(
    (id: string) => {
      vendorSeedsState.setItems((prev) => prev.filter((v) => v.id !== id));
    },
    [vendorSeedsState],
  );

  const createPurchaseOrder = useCallback(
    (item: Omit<PurchaseOrder, "id">) => {
      const created = syncPurchaseOrderRelations(
        { ...item, id: generateId("po") },
        vendorSeedsState.items,
        projectsState.items,
      );
      purchaseOrdersState.setItems((prev) => [...prev, created]);
      return created;
    },
    [purchaseOrdersState, vendorSeedsState.items, projectsState.items],
  );

  const updatePurchaseOrder = useCallback(
    (id: string, item: Partial<PurchaseOrder>) => {
      purchaseOrdersState.setItems((prev) =>
        prev.map((order) => {
          if (order.id !== id) return order;
          return syncPurchaseOrderRelations(
            { ...order, ...item },
            vendorSeedsState.items,
            projectsState.items,
          );
        }),
      );
    },
    [purchaseOrdersState, vendorSeedsState.items, projectsState.items],
  );

  const deletePurchaseOrder = useCallback(
    (id: string) => {
      purchaseOrdersState.setItems((prev) => prev.filter((order) => order.id !== id));
    },
    [purchaseOrdersState],
  );

  const createEmployee = useCallback(
    (item: Omit<Employee, "id">) => {
      const created = { ...item, id: generateId("emp") };
      employeesState.setItems((prev) => [...prev, created]);
      return created;
    },
    [employeesState],
  );

  const updateEmployee = useCallback(
    (id: string, item: Partial<Employee>) => {
      employeesState.setItems((prev) => prev.map((e) => (e.id === id ? { ...e, ...item } : e)));
    },
    [employeesState],
  );

  const deleteEmployee = useCallback(
    (id: string) => {
      employeesState.setItems((prev) => prev.filter((e) => e.id !== id));
    },
    [employeesState],
  );

  const createMachine = useCallback(
    (item: Omit<Machine, "id">) => {
      const created = { ...item, id: generateId("mac") };
      machinesState.setItems((prev) => [...prev, created]);
      return created;
    },
    [machinesState],
  );

  const updateMachine = useCallback(
    (id: string, item: Partial<Machine>) => {
      machinesState.setItems((prev) => prev.map((m) => (m.id === id ? { ...m, ...item } : m)));
    },
    [machinesState],
  );

  const deleteMachine = useCallback(
    (id: string) => {
      machinesState.setItems((prev) => prev.filter((m) => m.id !== id));
    },
    [machinesState],
  );

  const createDpr = useCallback(
    (item: Omit<DailyProgressReport, "id">) => {
      const created = { ...item, id: generateId("dpr") };
      dprState.setItems((prev) => [...prev, created]);
      return created;
    },
    [dprState],
  );

  const updateDpr = useCallback(
    (id: string, item: Partial<DailyProgressReport>) => {
      dprState.setItems((prev) => prev.map((report) => (report.id === id ? { ...report, ...item } : report)));
    },
    [dprState],
  );

  const deleteDpr = useCallback(
    (id: string) => {
      dprState.setItems((prev) => prev.filter((report) => report.id !== id));
    },
    [dprState],
  );

  const createClientPayment = useCallback(
    (item: Omit<ClientPayment, "id">) => {
      const created = { ...item, id: generateId("pay") };
      clientPaymentsState.setItems((prev) => [...prev, created]);
      return created;
    },
    [clientPaymentsState],
  );

  const updateClientPayment = useCallback(
    (id: string, item: Partial<ClientPayment>) => {
      clientPaymentsState.setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...item } : p)));
    },
    [clientPaymentsState],
  );

  const deleteClientPayment = useCallback(
    (id: string) => {
      clientPaymentsState.setItems((prev) => prev.filter((p) => p.id !== id));
    },
    [clientPaymentsState],
  );

  const createClientInvoice = useCallback(
    (item: Omit<ClientInvoice, "id">) => {
      const created = { ...item, id: generateId("inv") };
      clientInvoicesState.setItems((prev) => [...prev, created]);
      return created;
    },
    [clientInvoicesState],
  );

  const updateClientInvoice = useCallback(
    (id: string, item: Partial<ClientInvoice>) => {
      clientInvoicesState.setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...item } : i)));
    },
    [clientInvoicesState],
  );

  const deleteClientInvoice = useCallback(
    (id: string) => {
      clientInvoicesState.setItems((prev) => prev.filter((i) => i.id !== id));
    },
    [clientInvoicesState],
  );

  const createClientDocument = useCallback(
    (item: Omit<ClientDocument, "id">) => {
      const created = { ...item, id: generateId("doc") };
      clientDocumentsState.setItems((prev) => [...prev, created]);
      return created;
    },
    [clientDocumentsState],
  );

  const updateClientDocument = useCallback(
    (id: string, item: Partial<ClientDocument>) => {
      clientDocumentsState.setItems((prev) => prev.map((d) => (d.id === id ? { ...d, ...item } : d)));
    },
    [clientDocumentsState],
  );

  const deleteClientDocument = useCallback(
    (id: string) => {
      clientDocumentsState.setItems((prev) => prev.filter((d) => d.id !== id));
    },
    [clientDocumentsState],
  );

  const logAttendance = useCallback(
    (input: {
      employeeId: string;
      employeeName: string;
      date: string;
      status: AttendanceStatus;
      checkIn?: string;
      note?: string;
      id?: string;
    }) => {
      const now = new Date().toISOString();
      const existing = attendanceLogsState.items.find(
        (log) =>
          log.employeeId === input.employeeId &&
          log.date === input.date &&
          (input.id ? log.id === input.id : true),
      );

      if (existing || input.id) {
        const targetId = input.id ?? existing?.id;
        const updated: AttendanceLog = {
          ...(existing ?? {
            id: generateId("att"),
            employeeId: input.employeeId,
            employeeName: input.employeeName,
            date: input.date,
            createdAt: now,
          }),
          status: input.status,
          checkIn: input.checkIn,
          note: input.note,
          updatedAt: now,
        };

        attendanceLogsState.setItems((prev) =>
          prev.map((log) => (log.id === targetId ? { ...updated, id: targetId! } : log)),
        );

        if (input.date === "2026-06-27") {
          employeesState.setItems((prev) =>
            prev.map((employee) =>
              employee.id === input.employeeId
                ? { ...employee, attendanceToday: input.status }
                : employee,
            ),
          );
        }

        return { ...updated, id: targetId! };
      }

      const created: AttendanceLog = {
        id: generateId("att"),
        employeeId: input.employeeId,
        employeeName: input.employeeName,
        date: input.date,
        status: input.status,
        checkIn: input.checkIn,
        note: input.note,
        createdAt: now,
        updatedAt: now,
      };

      attendanceLogsState.setItems((prev) => [...prev, created]);

      if (input.date === "2026-06-27") {
        employeesState.setItems((prev) =>
          prev.map((employee) =>
            employee.id === input.employeeId
              ? { ...employee, attendanceToday: input.status }
              : employee,
          ),
        );
      }

      return created;
    },
    [attendanceLogsState, employeesState],
  );

  const resetDemoData = useCallback(() => {
    resetAllDemoStorage();
    window.location.reload();
  }, []);

  const value: DemoDataContextValue = {
    isReady,
    projects: projectsState.items,
    materials: materialsState.items,
    vendors,
    purchaseOrders: purchaseOrdersState.items,
    employees,
    machines: machinesState.items,
    dpr: dprState.items,
    clientPayments: clientPaymentsState.items,
    clientInvoices: clientInvoicesState.items,
    clientDocuments: clientDocumentsState.items,
    clientPhotos: clientPhotosState.items,
    clientTimeline: clientTimelineState.items,
    attendanceLogs: attendanceLogsState.items,
    createProject,
    updateProject,
    deleteProject,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    createVendor,
    updateVendor,
    deleteVendor,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    createMachine,
    updateMachine,
    deleteMachine,
    createDpr,
    updateDpr,
    deleteDpr,
    createClientPayment,
    updateClientPayment,
    deleteClientPayment,
    createClientInvoice,
    updateClientInvoice,
    deleteClientInvoice,
    createClientDocument,
    updateClientDocument,
    deleteClientDocument,
    logAttendance,
    resetDemoData,
  };

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error("useDemoData must be used within DemoDataProvider");
  }
  return context;
}
