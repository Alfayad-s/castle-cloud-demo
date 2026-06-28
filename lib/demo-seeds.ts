import { clientDocuments, clientInvoices, clientPayments, clientPhotos } from "@/data/client-portal";
import { dailyProgressReports } from "@/data/dpr";
import { employees } from "@/data/employees";
import { materials } from "@/data/materials";
import { machines } from "@/data/machines";
import { purchaseOrders } from "@/data/purchase-orders";
import { projects } from "@/data/projects";
import { vendors as vendorRecords } from "@/data/vendors";
import type {
  AttendanceLog,
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

export const demoSeeds = {
  projects,
  materials,
  vendorSeeds: vendorRecords.map(({ balance: _b, projects: _p, ...vendor }) => vendor) as VendorSeed[],
  purchaseOrders,
  employees,
  machines,
  dpr: dailyProgressReports,
  clientPayments,
  clientInvoices,
  clientDocuments,
  clientPhotos,
  clientTimeline: [] as ClientTimelineEvent[],
  attendanceLogs: [] as AttendanceLog[],
};

export type DemoCollectionKey = keyof typeof demoSeeds;

export type DemoEntityMap = {
  projects: Project;
  materials: Material;
  vendorSeeds: VendorSeed;
  purchaseOrders: PurchaseOrder;
  employees: Employee;
  machines: Machine;
  dpr: DailyProgressReport;
  clientPayments: ClientPayment;
  clientInvoices: ClientInvoice;
  clientDocuments: ClientDocument;
  clientPhotos: ClientPhoto;
  clientTimeline: ClientTimelineEvent;
  attendanceLogs: AttendanceLog;
};

export type DemoVendor = Vendor;
