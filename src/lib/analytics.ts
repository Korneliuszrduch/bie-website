export type DataLayerEvent = {
  event: string;
  page_path?: string;
  cta_location?: string;
  service_name?: string;
  link_url?: string;
  [key: string]: string | undefined;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push a GTM/GA event. Never include PII (name, phone, email, message). */
export function pushDataLayer(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const page_path =
    payload.page_path ||
    `${window.location.pathname}${window.location.search || ""}`;
  window.dataLayer.push({ ...payload, page_path });
}
