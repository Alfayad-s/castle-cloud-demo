export type FormFieldType = "text" | "number" | "date" | "textarea" | "select";

export type FormField = {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  step?: string;
};

export const projectFields: FormField[] = [
  { name: "name", label: "Project Name", type: "text", required: true },
  { name: "location", label: "Location", type: "text", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Planning", value: "planning" },
      { label: "In Progress", value: "in-progress" },
      { label: "On Hold", value: "on-hold" },
      { label: "Completed", value: "completed" },
    ],
  },
  { name: "manager", label: "Manager", type: "text", required: true },
  { name: "budget", label: "Budget", type: "number", required: true },
  { name: "spent", label: "Spent", type: "number", required: true },
  { name: "progress", label: "Progress %", type: "number", required: true },
  { name: "startDate", label: "Start Date", type: "date", required: true },
  { name: "deadline", label: "Deadline", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea" },
];

export const materialFields: FormField[] = [
  { name: "name", label: "Material", type: "text", required: true },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "supplier", label: "Supplier", type: "text", required: true },
  { name: "currentStock", label: "Current Stock", type: "number", required: true },
  { name: "minimumStock", label: "Minimum Stock", type: "number", required: true },
  { name: "warehouse", label: "Warehouse", type: "text", required: true },
  { name: "unit", label: "Unit", type: "text", required: true },
  { name: "price", label: "Unit Price", type: "number", required: true },
];

export const vendorFields: FormField[] = [
  { name: "name", label: "Company", type: "text", required: true },
  { name: "contact", label: "Phone", type: "text", required: true },
  { name: "email", label: "Email", type: "text", required: true },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "gst", label: "GST", type: "text", required: true },
  { name: "rating", label: "Rating", type: "number", required: true, step: "0.1" },
];

export const purchaseOrderFields: FormField[] = [
  { name: "poNumber", label: "PO Number", type: "text", required: true },
  { name: "vendorId", label: "Vendor ID", type: "text", required: true },
  { name: "projectId", label: "Project ID", type: "text", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Requested", value: "requested" },
      { label: "Approved", value: "approved" },
      { label: "Ordered", value: "ordered" },
      { label: "Delivered", value: "delivered" },
      { label: "Completed", value: "completed" },
    ],
  },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "gst", label: "GST", type: "number", required: true },
  { name: "deliveryDate", label: "Delivery Date", type: "date", required: true },
  { name: "createdAt", label: "Created Date", type: "date", required: true },
];

export const employeeFields: FormField[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text", required: true },
  { name: "site", label: "Site", type: "text", required: true },
  { name: "phone", label: "Phone", type: "text", required: true },
  { name: "dailyWage", label: "Daily Wage", type: "number", required: true },
  {
    name: "attendanceToday",
    label: "Today Status",
    type: "select",
    required: true,
    options: [
      { label: "Present", value: "present" },
      { label: "Absent", value: "absent" },
      { label: "Late", value: "late" },
    ],
  },
];

export const machineFields: FormField[] = [
  { name: "name", label: "Machine", type: "text", required: true },
  { name: "type", label: "Type", type: "text", required: true },
  { name: "image", label: "Image Key", type: "text", required: true },
  { name: "projectId", label: "Project ID", type: "text", required: true },
  { name: "currentSite", label: "Site", type: "text", required: true },
  { name: "operator", label: "Operator", type: "text", required: true },
  { name: "runningHours", label: "Running Hours", type: "number", required: true },
  { name: "fuelLevel", label: "Fuel Level %", type: "number", required: true },
  { name: "maintenanceDate", label: "Maintenance Date", type: "date", required: true },
  { name: "insuranceExpiry", label: "Insurance Expiry", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Maintenance", value: "maintenance" },
      { label: "Idle", value: "idle" },
    ],
  },
  { name: "hourlyRate", label: "Hourly Rate", type: "number", required: true },
];

export const dprFields: FormField[] = [
  { name: "projectId", label: "Project ID", type: "text", required: true },
  { name: "projectName", label: "Project Name", type: "text", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "engineer", label: "Engineer", type: "text", required: true },
  { name: "weather", label: "Weather", type: "text", required: true },
  { name: "workers", label: "Workers", type: "number", required: true },
  { name: "machines", label: "Machines", type: "number", required: true },
  { name: "workDone", label: "Work Done", type: "textarea", required: true },
  { name: "remarks", label: "Remarks", type: "textarea" },
  { name: "hoursWorked", label: "Hours Worked", type: "number", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Draft", value: "draft" },
      { label: "Submitted", value: "submitted" },
      { label: "Approved", value: "approved" },
    ],
  },
];

export const clientPaymentFields: FormField[] = [
  { name: "milestone", label: "Milestone", type: "text", required: true },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  { name: "paidDate", label: "Paid Date", type: "date" },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Paid", value: "paid" },
      { label: "Pending", value: "pending" },
      { label: "Upcoming", value: "upcoming" },
      { label: "Overdue", value: "overdue" },
    ],
  },
];

export const clientInvoiceFields: FormField[] = [
  { name: "invoiceNumber", label: "Invoice #", type: "text", required: true },
  { name: "description", label: "Description", type: "text", required: true },
  { name: "amount", label: "Amount", type: "number", required: true },
  { name: "issueDate", label: "Issue Date", type: "date", required: true },
  { name: "dueDate", label: "Due Date", type: "date", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Paid", value: "paid" },
      { label: "Pending", value: "pending" },
      { label: "Overdue", value: "overdue" },
    ],
  },
];

export const clientDocumentFields: FormField[] = [
  { name: "name", label: "Document Name", type: "text", required: true },
  {
    name: "type",
    label: "Type",
    type: "select",
    required: true,
    options: [
      { label: "Agreement", value: "agreement" },
      { label: "Drawing", value: "drawing" },
      { label: "Certificate", value: "certificate" },
      { label: "Report", value: "report" },
      { label: "Invoice", value: "invoice" },
    ],
  },
  { name: "uploadedAt", label: "Uploaded Date", type: "date", required: true },
  { name: "size", label: "Size", type: "text", required: true },
];

export function valuesFromEntity(
  fields: FormField[],
  entity?: Record<string, unknown>,
): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    const raw = entity?.[field.name];
    values[field.name] = raw === undefined || raw === null ? "" : String(raw);
  }
  return values;
}

export function parseFormValues(
  fields: FormField[],
  values: Record<string, string>,
): Record<string, unknown> {
  const parsed: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = values[field.name] ?? "";
    if (field.type === "number") {
      parsed[field.name] = raw === "" ? 0 : Number(raw);
    } else {
      parsed[field.name] = raw;
    }
  }
  return parsed;
}
