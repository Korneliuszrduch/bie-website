import { notFound } from "next/navigation";
import { ServicePageView } from "@/components/ServicePageView";
import { getService } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo";

const SLUG = "przeglady-instalacji-elektrycznych";
const service = getService(SLUG);
if (!service) throw new Error(`Missing service content: ${SLUG}`);

export const metadata = buildPageMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/uslugi/${SLUG}`,
  noIndex: Boolean(service.thinContent),
});

export default function ServicePage() {
  const data = getService(SLUG);
  if (!data) notFound();
  return <ServicePageView service={data} />;
}
