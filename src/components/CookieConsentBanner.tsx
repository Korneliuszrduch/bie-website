"use client";

import { useEffect, useState } from "react";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import {
  applyConsentPrefs,
  hasConsentDecision,
  storePrefs,
  type ConsentPrefs,
} from "@/lib/consent";
import styles from "./CookieConsentBanner.module.css";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [rejectConfirm, setRejectConfirm] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({
    analytics: false,
    ads: false,
  });

  useEffect(() => {
    if (hasConsentDecision()) return;

    let done = false;
    let fallbackId = 0;
    let po: PerformanceObserver | null = null;

    const show = () => {
      if (done) return;
      done = true;
      window.clearTimeout(fallbackId);
      po?.disconnect();
      // Let the browser finalize LCP on real page content first.
      window.setTimeout(() => setVisible(true), 400);
    };

    try {
      po = new PerformanceObserver((list) => {
        if (list.getEntries().length > 0) show();
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      /* older browsers */
    }

    fallbackId = window.setTimeout(show, 3500);

    return () => {
      done = true;
      window.clearTimeout(fallbackId);
      po?.disconnect();
    };
  }, []);

  function save(next: ConsentPrefs) {
    storePrefs(next);
    applyConsentPrefs(next);
    setVisible(false);
    setCustomize(false);
    setRejectConfirm(false);
  }

  function rejectAll() {
    const next = { analytics: false, ads: false };
    setPrefs(next);
    save(next);
  }

  if (!visible) return null;

  return (
    <>
      <div
        className={styles.banner}
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
      >
        <div className={styles.dim} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Wymagana decyzja o cookies</p>
            <p id="cookie-consent-title" className={styles.title}>
              Zgoda na pliki cookies
            </p>
            <p id="cookie-consent-desc" className={styles.text}>
              <span className={styles.textDesktop}>
                W ramach serwisu stosujemy pliki cookies by umożliwić Ci wygodne
                korzystanie z serwisu. Jeśli nie zmienisz ustawień dotyczących
                cookies w Twojej przeglądarce, będą one umieszczane na Twoim
                komputerze. W każdej chwili możesz zmienić swoje ustawienia.
                Dowiedz się więcej w naszej{" "}
              </span>
              <span className={styles.textMobile}>
                Stosujemy pliki cookies, by ułatwić korzystanie z serwisu.
                Ustawienia możesz zmienić w każdej chwili. Więcej w{" "}
              </span>
              <button
                type="button"
                className={styles.policyLink}
                onClick={() => setPrivacyOpen(true)}
              >
                Polityce Prywatności
              </button>
              .
            </p>

            {customize ? (
              <div className={styles.customize}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                    }
                  />
                  <span>
                    <strong>Analityczne</strong>
                    <em>Statystyki odwiedzin (np. Google Analytics)</em>
                  </span>
                </label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={prefs.ads}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, ads: e.target.checked }))
                    }
                  />
                  <span>
                    <strong>Marketingowe</strong>
                    <em>Reklamy i pomiar konwersji (np. Google Ads)</em>
                  </span>
                </label>
                {rejectConfirm ? (
                  <p className={styles.confirm} role="status">
                    Czy na pewno? Odrzucisz wszystkie cookies opcjonalne.
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className={styles.actions}>
            {customize ? (
              rejectConfirm ? (
                <>
                  <button
                    type="button"
                    className={styles.reject}
                    onClick={() => setRejectConfirm(false)}
                  >
                    Anuluj
                  </button>
                  <button
                    type="button"
                    className={styles.accept}
                    onClick={rejectAll}
                  >
                    Tak, odrzuć
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.reject}
                    onClick={() => setRejectConfirm(true)}
                  >
                    Odrzuć wszystkie
                  </button>
                  <button
                    type="button"
                    className={styles.accept}
                    onClick={() => save(prefs)}
                  >
                    Zaakceptuj wybrane
                  </button>
                </>
              )
            ) : (
              <>
                <button
                  type="button"
                  className={styles.reject}
                  onClick={() => setCustomize(true)}
                >
                  Dostosuj wybór
                </button>
                <button
                  type="button"
                  className={styles.accept}
                  onClick={() => save({ analytics: true, ads: true })}
                >
                  Akceptuję
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <PrivacyPolicyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        closeLabel="Zamknij i wróć do zgody cookies"
      />
    </>
  );
}
