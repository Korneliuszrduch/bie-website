"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";

function isCalendarUrl(href: string): boolean {
  return (
    href.includes("calendar.google.com") ||
    href.includes("appointments/schedules")
  );
}

/**
 * Delegated click tracking for tel/mailto/CTA/calendar links.
 * Does not read or send form field values (PII-safe).
 */
export function ConversionTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      const ctaLocation =
        anchor.getAttribute("data-cta") ||
        anchor.getAttribute("data-cta-location") ||
        undefined;
      const serviceName =
        anchor.getAttribute("data-service") || undefined;

      if (href.startsWith("tel:")) {
        pushDataLayer({
          event: "phone_click",
          cta_location: ctaLocation || "tel_link",
          link_url: href,
          service_name: serviceName,
        });
        return;
      }

      if (href.startsWith("mailto:")) {
        pushDataLayer({
          event: "email_click",
          cta_location: ctaLocation || "mailto_link",
          link_url: "mailto:",
          service_name: serviceName,
        });
        return;
      }

      if (anchor.hasAttribute("data-calendar") || isCalendarUrl(href)) {
        pushDataLayer({
          event: "calendar_click",
          cta_location: ctaLocation || "calendar",
          link_url: href.startsWith("http") ? href.split("?")[0] : href,
          service_name: serviceName,
        });
        return;
      }

      if (ctaLocation || anchor.hasAttribute("data-cta")) {
        pushDataLayer({
          event: "cta_click",
          cta_location: ctaLocation || "cta",
          link_url: href,
          service_name: serviceName,
        });
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
