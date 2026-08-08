"use client";

import { useEffect, useId, useRef } from "react";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";
import styles from "./PrivacyPolicyModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  closeLabel?: string;
};

export function PrivacyPolicyModal({
  open,
  onClose,
  closeLabel = "Zamknij i wróć do formularza",
}: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.root} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Zamknij politykę prywatności"
        onClick={onClose}
      />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            Polityka prywatności
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Zamknij"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          <PrivacyPolicyContent />
          <p className={styles.fullPage}>
            Pełna strona:{" "}
            <a href="/polityka-prywatnosci" target="_blank" rel="noreferrer">
              /polityka-prywatnosci
            </a>
          </p>
        </div>
        <div className={styles.footer}>
          <button type="button" className={styles.done} onClick={onClose}>
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
