import { notFound } from "next/navigation";

import { getVendorById, getVendorOrders } from "@/data/vendors";
import { PageShell } from "@/components/layout/page-shell";
import { VendorDetailView } from "@/components/vendors/vendor-detail-view";

type VendorDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
  const { id } = await params;
  const vendor = getVendorById(id);

  if (!vendor) {
    notFound();
  }

  return (
    <PageShell
      title={vendor.name}
      description={`${vendor.category} · GST ${vendor.gst}`}
      breadcrumbs={[{ label: "Vendors", href: "/vendors" }, { label: vendor.name }]}
    >
      <VendorDetailView vendor={vendor} orders={getVendorOrders(vendor.id)} />
    </PageShell>
  );
}
