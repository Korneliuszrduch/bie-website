"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

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
  if (
    host === "nowa.bezpieczneinstalacjeelektryczne.pl" ||
    host.startsWith("nowa.")
  ) {
    return false;
  }
  return true;
}

function subscribe() {
  return () => {};
}

/**
 * Consent Mode defaults + restore from localStorage, then load GTM.
 * Tags that require analytics/ad consent should respect Consent Mode in GTM.
 */
const CONSENT_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
try {
  var c = localStorage.getItem('bie_cookie_consent');
  if (c === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  } else if (c === 'denied') {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  } else if (c && c.charAt(0) === '{') {
    var p = JSON.parse(c);
    gtag('consent', 'update', {
      analytics_storage: p.analytics ? 'granted' : 'denied',
      ad_storage: p.ads ? 'granted' : 'denied',
      ad_user_data: p.ads ? 'granted' : 'denied',
      ad_personalization: p.ads ? 'granted' : 'denied'
    });
  }
} catch (e) {}
`;

/**
 * Loads GTM on the live apex only. Host check is client-side so shared-hosting
 * builds still work when panel env vars are not injected into `npm run build`.
 */
export function GoogleTagManager() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => isAnalyticsHost(window.location.hostname),
    () => false,
  );
  const gtmId = resolveGtmId();

  if (!enabled || !gtmId) {
    // Still boot Consent Mode defaults on non-GTM hosts so banner updates work.
    return (
      <Script id="consent-default" strategy="beforeInteractive">
        {CONSENT_BOOTSTRAP}
      </Script>
    );
  }

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {CONSENT_BOOTSTRAP}
      </Script>
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
