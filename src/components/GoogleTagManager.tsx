"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/** Public container ID — safe in source; env can override after rebuild. */
const FALLBACK_GTM_ID = "GTM-MMM4RWL";

function resolveGtmId(): string {
  return (
    process.env.NEXT_PUBLIC_GTM_ID?.trim() ||
    process.env.GTM_ID?.trim() ||
    FALLBACK_GTM_ID
  );
}

function isAnalyticsHost(hostname: string): boolean {
  const host = hostname.toLowerCase().split(":")[0];
  if (!host || host === "localhost" || host === "127.0.0.1") return false;
  if (host === "nowa.bezpieczneinstalacjeelektryczne.pl" || host.startsWith("nowa.")) {
    return false;
  }
  return true;
}

/**
 * Loads GTM on the live apex only. Host check is client-side so shared-hosting
 * builds still work when panel env vars are not injected into `npm run build`.
 */
export function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false);
  const gtmId = resolveGtmId();

  useEffect(() => {
    setEnabled(isAnalyticsHost(window.location.hostname));
  }, []);

  if (!enabled || !gtmId) return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height={0}
          width={0}
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
