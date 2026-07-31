import { serializeJsonLd, type JsonLd as JsonLdData } from "@/lib/jsonld";

type Props = {
  data: JsonLdData | JsonLdData[];
};

/** Server-safe JSON-LD script tag. */
export function JsonLd({ data }: Props) {
  const payload = Array.isArray(data)
    ? data.length === 1
      ? data[0]
      : data
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
