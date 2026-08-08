export const CONSENT_STORAGE_KEY = "bie_cookie_consent";

export type CookieConsentChoice = "granted" | "denied";

export type ConsentPrefs = {
  analytics: boolean;
  ads: boolean;
};

export type ConsentState = {
  analytics_storage: CookieConsentChoice;
  ad_storage: CookieConsentChoice;
  ad_user_data: CookieConsentChoice;
  ad_personalization: CookieConsentChoice;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function prefsToChoice(prefs: ConsentPrefs): CookieConsentChoice | "custom" {
  if (prefs.analytics && prefs.ads) return "granted";
  if (!prefs.analytics && !prefs.ads) return "denied";
  return "custom";
}

export function prefsToConsentState(prefs: ConsentPrefs): ConsentState {
  return {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.ads ? "granted" : "denied",
    ad_user_data: prefs.ads ? "granted" : "denied",
    ad_personalization: prefs.ads ? "granted" : "denied",
  };
}

/** null = no decision yet */
export function readStoredPrefs(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (raw === "granted") return { analytics: true, ads: true };
    if (raw === "denied") return { analytics: false, ads: false };
    if (raw && raw.startsWith("{")) {
      const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
      return {
        analytics: Boolean(parsed.analytics),
        ads: Boolean(parsed.ads),
      };
    }
  } catch {
    /* private mode / bad JSON */
  }
  return null;
}

/** @deprecated use readStoredPrefs — kept for simple granted/denied checks */
export function readStoredConsent(): CookieConsentChoice | null {
  const prefs = readStoredPrefs();
  if (!prefs) return null;
  const choice = prefsToChoice(prefs);
  return choice === "custom" ? "granted" : choice;
}

export function hasConsentDecision(): boolean {
  return readStoredPrefs() !== null;
}

export function storePrefs(prefs: ConsentPrefs): void {
  try {
    const choice = prefsToChoice(prefs);
    if (choice === "custom") {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ v: 1, analytics: prefs.analytics, ads: prefs.ads }),
      );
    } else {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    }
  } catch {
    /* ignore */
  }
}

export function storeConsent(choice: CookieConsentChoice): void {
  storePrefs(
    choice === "granted"
      ? { analytics: true, ads: true }
      : { analytics: false, ads: false },
  );
}

/** Ensure gtag helper exists (Consent Mode). */
export function ensureGtag(): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args);
    };
  }
}

export function applyConsentPrefs(prefs: ConsentPrefs): void {
  ensureGtag();
  const state = prefsToConsentState(prefs);
  window.gtag?.("consent", "update", state);
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: "cookie_consent_update",
    cookie_consent: prefsToChoice(prefs),
    consent_analytics: prefs.analytics ? "granted" : "denied",
    consent_ads: prefs.ads ? "granted" : "denied",
  });
}

export function applyConsentUpdate(choice: CookieConsentChoice): void {
  applyConsentPrefs(
    choice === "granted"
      ? { analytics: true, ads: true }
      : { analytics: false, ads: false },
  );
}
