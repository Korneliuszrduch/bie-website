import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Article routes reserved for future posts — unknown slugs return 404. */
export default async function PoradnikSlugPage({ params }: Props) {
  await params;
  notFound();
}
