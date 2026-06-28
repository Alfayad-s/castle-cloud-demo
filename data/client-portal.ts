import { getProjectById } from "./projects";
import { getProjectDetailCharts } from "./project-details";
import type {
  ClientDocument,
  ClientInvoice,
  ClientPayment,
  ClientPhoto,
  ClientPortalStats,
  ClientProfile,
  ClientTimelineEvent,
} from "@/types";

export const demoClient: ClientProfile = {
  id: "client-001",
  name: "Arun & Priya Mehta",
  email: "arun.mehta@email.com",
  phone: "+91 98450 12345",
  company: "Mehta Family Trust",
  projectId: "proj-001",
};

export const clientPayments: ClientPayment[] = [
  {
    id: "pay-001",
    milestone: "Booking Advance (10%)",
    amount: 850000,
    dueDate: "2025-11-15",
    paidDate: "2025-11-10",
    status: "paid",
  },
  {
    id: "pay-002",
    milestone: "Foundation Complete",
    amount: 1275000,
    dueDate: "2025-12-25",
    paidDate: "2025-12-20",
    status: "paid",
  },
  {
    id: "pay-003",
    milestone: "Columns & Beams",
    amount: 1700000,
    dueDate: "2026-02-15",
    paidDate: "2026-02-10",
    status: "paid",
  },
  {
    id: "pay-004",
    milestone: "Roof Slab Casting",
    amount: 1275000,
    dueDate: "2026-07-15",
    status: "pending",
  },
  {
    id: "pay-005",
    milestone: "Finishing Works",
    amount: 1275000,
    dueDate: "2026-08-30",
    status: "upcoming",
  },
  {
    id: "pay-006",
    milestone: "Final Handover",
    amount: 2125000,
    dueDate: "2026-09-10",
    status: "upcoming",
  },
];

export const clientInvoices: ClientInvoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2025-084",
    description: "Foundation stage — materials & labour",
    amount: 1275000,
    issueDate: "2025-12-18",
    dueDate: "2025-12-25",
    status: "paid",
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2026-012",
    description: "Column & beam structural work",
    amount: 1700000,
    issueDate: "2026-02-05",
    dueDate: "2026-02-15",
    status: "paid",
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2026-048",
    description: "First floor roof slab casting",
    amount: 1275000,
    issueDate: "2026-06-20",
    dueDate: "2026-07-15",
    status: "pending",
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2026-055",
    description: "Electrical & plumbing rough-in",
    amount: 680000,
    issueDate: "2026-06-25",
    dueDate: "2026-07-05",
    status: "pending",
  },
];

export const clientDocuments: ClientDocument[] = [
  {
    id: "doc-001",
    name: "Construction Agreement — Signed",
    type: "agreement",
    uploadedAt: "2025-10-28",
    size: "2.4 MB",
  },
  {
    id: "doc-002",
    name: "Approved Floor Plans (G+1)",
    type: "drawing",
    uploadedAt: "2025-11-05",
    size: "8.1 MB",
  },
  {
    id: "doc-003",
    name: "Structural Stability Certificate",
    type: "certificate",
    uploadedAt: "2026-02-12",
    size: "1.2 MB",
  },
  {
    id: "doc-004",
    name: "Progress Report — June 2026",
    type: "report",
    uploadedAt: "2026-06-27",
    size: "3.6 MB",
  },
  {
    id: "doc-005",
    name: "BBMP Building NOC",
    type: "certificate",
    uploadedAt: "2025-10-15",
    size: "890 KB",
  },
  {
    id: "doc-006",
    name: "Invoice INV-2026-048",
    type: "invoice",
    uploadedAt: "2026-06-20",
    size: "420 KB",
  },
];

export const clientPhotos: ClientPhoto[] = [
  {
    id: "cp-1",
    caption: "Roof slab casting — first floor",
    date: "2026-06-27",
    gradient: "from-slate-600 to-slate-800",
  },
  {
    id: "cp-2",
    caption: "Curing mats applied on slab",
    date: "2026-06-27",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "cp-3",
    caption: "Rebar inspection before pour",
    date: "2026-06-25",
    gradient: "from-amber-600 to-orange-700",
  },
  {
    id: "cp-4",
    caption: "Internal plastering — ground floor",
    date: "2026-06-26",
    gradient: "from-stone-500 to-stone-700",
  },
  {
    id: "cp-5",
    caption: "Electrical conduit layout",
    date: "2026-06-24",
    gradient: "from-sky-600 to-blue-700",
  },
  {
    id: "cp-6",
    caption: "Column formwork — first floor",
    date: "2026-06-22",
    gradient: "from-orange-600 to-red-700",
  },
];

export const progressTimeline = [
  { month: "Nov", progress: 8 },
  { month: "Dec", progress: 18 },
  { month: "Jan", progress: 28 },
  { month: "Feb", progress: 38 },
  { month: "Mar", progress: 45 },
  { month: "Apr", progress: 52 },
  { month: "May", progress: 58 },
  { month: "Jun", progress: 62 },
];

export function getClientTimeline(): ClientTimelineEvent[] {
  const project = getProjectById(demoClient.projectId);
  const charts = getProjectDetailCharts(demoClient.projectId);

  const milestoneEvents: ClientTimelineEvent[] =
    project?.milestones.map((ms) => ({
      id: ms.id,
      date: ms.dueDate,
      title: ms.name,
      description:
        ms.status === "completed"
          ? "Milestone completed on schedule."
          : ms.status === "in-progress"
            ? "Work currently in progress."
            : "Scheduled upcoming milestone.",
      type: "milestone" as const,
    })) ?? [];

  const updateEvents: ClientTimelineEvent[] = charts.siteUpdates.map((update) => ({
    id: update.id,
    date: update.date,
    title: update.title,
    description: update.note,
    type: "update" as const,
  }));

  const paymentEvents: ClientTimelineEvent[] = clientPayments
    .filter((p) => p.status === "paid" && p.paidDate)
    .map((p) => ({
      id: p.id,
      date: p.paidDate!,
      title: `Payment received — ${p.milestone}`,
      description: `₹${(p.amount / 100000).toFixed(2)} L credited.`,
      type: "payment" as const,
    }));

  return [...milestoneEvents, ...updateEvents, ...paymentEvents].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
}

export function getClientPortalStats(): ClientPortalStats {
  const project = getProjectById(demoClient.projectId)!;
  const paid = clientPayments.filter((p) => p.status === "paid");
  const pending = clientPayments.filter((p) => p.status === "pending");
  const nextPending = pending[0] ?? clientPayments.find((p) => p.status === "upcoming");

  return {
    progress: project.progress,
    totalContract: project.budget,
    amountPaid: paid.reduce((sum, p) => sum + p.amount, 0),
    amountPending: clientPayments
      .filter((p) => p.status !== "paid")
      .reduce((sum, p) => sum + p.amount, 0),
    nextPaymentAmount: nextPending?.amount ?? 0,
    nextPaymentDate: nextPending?.dueDate ?? "—",
    pendingInvoices: clientInvoices.filter((i) => i.status === "pending").length,
  };
}

export function getClientProject() {
  return getProjectById(demoClient.projectId)!;
}

export function getClientProjectCharts() {
  return getProjectDetailCharts(demoClient.projectId);
}

const documentTypeLabels: Record<ClientDocument["type"], string> = {
  agreement: "Agreement",
  drawing: "Drawing",
  certificate: "Certificate",
  report: "Report",
  invoice: "Invoice",
};

export function getDocumentTypeLabel(type: ClientDocument["type"]): string {
  return documentTypeLabels[type];
}
