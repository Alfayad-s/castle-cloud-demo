"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ClientPortalView } from "@/components/client/client-portal-view";
import { CrudToolbar } from "@/components/crud/crud-toolbar";
import { DeleteConfirmDialog } from "@/components/crud/delete-confirm-dialog";
import { EntityFormDialog } from "@/components/crud/entity-form-dialog";
import { Button } from "@/components/ui/button";
import { useCrudState } from "@/hooks/use-crud-state";
import { useDemoData } from "@/hooks/use-demo-data";
import {
  demoClient,
  getClientPortalStats,
  getClientProject,
  getClientProjectCharts,
  getClientTimeline,
  progressTimeline,
} from "@/data/client-portal";
import {
  clientDocumentFields,
  clientInvoiceFields,
  clientPaymentFields,
} from "@/lib/crud-schemas";
import type { ClientDocument, ClientInvoice, ClientPayment } from "@/types";

const defaultPayment = {
  milestone: "",
  amount: 0,
  dueDate: "2026-07-01",
  paidDate: "",
  status: "pending" as const,
};

const defaultInvoice = {
  invoiceNumber: "",
  description: "",
  amount: 0,
  issueDate: "2026-06-27",
  dueDate: "2026-07-15",
  status: "pending" as const,
};

const defaultDocument = {
  name: "",
  type: "report" as const,
  uploadedAt: "2026-06-27",
  size: "1.2 MB",
};

type ClientCrudKind = "payment" | "invoice" | "document";

export function ClientPortalPageClient() {
  const {
    projects,
    clientPayments,
    clientInvoices,
    clientDocuments,
    clientPhotos,
    clientTimeline,
    createClientPayment,
    updateClientPayment,
    deleteClientPayment,
    createClientInvoice,
    updateClientInvoice,
    deleteClientInvoice,
    createClientDocument,
    updateClientDocument,
    deleteClientDocument,
    resetDemoData,
    isReady,
  } = useDemoData();

  const paymentCrud = useCrudState<ClientPayment>();
  const invoiceCrud = useCrudState<ClientInvoice>();
  const documentCrud = useCrudState<ClientDocument>();
  const [activeKind, setActiveKind] = useState<ClientCrudKind>("payment");

  const project = useMemo(() => getClientProject(projects), [projects]);
  const charts = useMemo(() => getClientProjectCharts(), []);
  const stats = useMemo(
    () => getClientPortalStats(clientPayments, clientInvoices, project),
    [clientPayments, clientInvoices, project],
  );
  const timeline = useMemo(() => getClientTimeline(), []);

  if (!isReady) {
    return <p className="text-sm text-muted-foreground">Loading client portal...</p>;
  }

  function openCreate(kind: ClientCrudKind) {
    setActiveKind(kind);
    if (kind === "payment") paymentCrud.startCreate();
    if (kind === "invoice") invoiceCrud.startCreate();
    if (kind === "document") documentCrud.startCreate();
  }

  return (
    <div className="flex flex-col gap-4">
      <CrudToolbar onReset={resetDemoData}>
        <Button type="button" size="sm" variant="outline" onClick={() => openCreate("payment")}>
          Add Payment
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => openCreate("invoice")}>
          Add Invoice
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => openCreate("document")}>
          Add Document
        </Button>
      </CrudToolbar>

      <ClientPortalView
        client={demoClient}
        project={project}
        charts={charts}
        stats={stats}
        payments={clientPayments}
        invoices={clientInvoices}
        documents={clientDocuments}
        photos={clientPhotos}
        timeline={timeline}
        progressTimeline={progressTimeline}
        onEditPayment={(payment) => {
          setActiveKind("payment");
          paymentCrud.startEdit(payment);
        }}
        onDeletePayment={(payment) =>
          paymentCrud.deleteDialog.askDelete(() => deleteClientPayment(payment.id))
        }
        onEditInvoice={(invoice) => {
          setActiveKind("invoice");
          invoiceCrud.startEdit(invoice);
        }}
        onDeleteInvoice={(invoice) =>
          invoiceCrud.deleteDialog.askDelete(() => deleteClientInvoice(invoice.id))
        }
        onEditDocument={(document) => {
          setActiveKind("document");
          documentCrud.startEdit(document);
        }}
        onDeleteDocument={(document) =>
          documentCrud.deleteDialog.askDelete(() => deleteClientDocument(document.id))
        }
      />

      <EntityFormDialog
        open={paymentCrud.open && activeKind === "payment"}
        onOpenChange={paymentCrud.setOpen}
        title={paymentCrud.editing ? "Edit Payment" : "Add Payment"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={clientPaymentFields}
        initialValues={paymentCrud.editing ?? defaultPayment}
        onSubmit={(values) => {
          const parsed = values as Omit<ClientPayment, "id">;
          if (paymentCrud.editing) {
            updateClientPayment(paymentCrud.editing.id, parsed);
            toast.success("Payment updated");
          } else {
            createClientPayment({ ...defaultPayment, ...parsed });
            toast.success("Payment created");
          }
        }}
      />

      <EntityFormDialog
        open={invoiceCrud.open && activeKind === "invoice"}
        onOpenChange={invoiceCrud.setOpen}
        title={invoiceCrud.editing ? "Edit Invoice" : "Add Invoice"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={clientInvoiceFields}
        initialValues={invoiceCrud.editing ?? defaultInvoice}
        onSubmit={(values) => {
          const parsed = values as Omit<ClientInvoice, "id">;
          if (invoiceCrud.editing) {
            updateClientInvoice(invoiceCrud.editing.id, parsed);
            toast.success("Invoice updated");
          } else {
            createClientInvoice({ ...defaultInvoice, ...parsed });
            toast.success("Invoice created");
          }
        }}
      />

      <EntityFormDialog
        open={documentCrud.open && activeKind === "document"}
        onOpenChange={documentCrud.setOpen}
        title={documentCrud.editing ? "Edit Document" : "Add Document"}
        description="Changes are saved to browser localStorage in demo mode."
        fields={clientDocumentFields}
        initialValues={documentCrud.editing ?? defaultDocument}
        onSubmit={(values) => {
          const parsed = values as Omit<ClientDocument, "id">;
          if (documentCrud.editing) {
            updateClientDocument(documentCrud.editing.id, parsed);
            toast.success("Document updated");
          } else {
            createClientDocument({ ...defaultDocument, ...parsed });
            toast.success("Document created");
          }
        }}
      />

      <DeleteConfirmDialog
        open={paymentCrud.deleteDialog.open}
        onOpenChange={paymentCrud.deleteDialog.setOpen}
        onConfirm={paymentCrud.deleteDialog.onConfirm}
      />
      <DeleteConfirmDialog
        open={invoiceCrud.deleteDialog.open}
        onOpenChange={invoiceCrud.deleteDialog.setOpen}
        onConfirm={invoiceCrud.deleteDialog.onConfirm}
      />
      <DeleteConfirmDialog
        open={documentCrud.deleteDialog.open}
        onOpenChange={documentCrud.deleteDialog.setOpen}
        onConfirm={documentCrud.deleteDialog.onConfirm}
      />
    </div>
  );
}
