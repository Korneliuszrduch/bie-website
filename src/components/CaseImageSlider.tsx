"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import type { RealizationGalleryImage } from "@/content/realizations";
import styles from "./CaseImageSlider.module.css";

type Props = {
  images: RealizationGalleryImage[];
  label: string;
};

export function CaseImageSlider({ images, label }: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const labelId = useId();
  const total = images.length;
  const current = images[index] ?? images[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + total) % total);
    },
    [total],
  );

  const closeLightbox = useCallback(() => setLightbox(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeLightbox();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
        return;
      }

      const target = e.target as HTMLElement | null;
      if (!target?.closest?.("[data-case-slider]")) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lightbox, closeLightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  if (!current || total === 0) return null;

  return (
    <>
      <div
        className={styles.slider}
        data-case-slider
        tabIndex={0}
        role="region"
        aria-roledescription="karuzela"
        aria-labelledby={labelId}
      >
        <p id={labelId} className={styles.srOnly}>
          Galeria zdjęć: {label}
        </p>

        <div className={styles.stage}>
          <button
            type="button"
            className={styles.media}
            onClick={() => setLightbox(true)}
            aria-label={`Powiększ zdjęcie: ${current.alt}`}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={1200}
              height={900}
              sizes="(max-width: 720px) 100vw, 640px"
              className={styles.img}
              priority={index === 0}
            />
          </button>

          {total > 1 ? (
            <>
              <button
                type="button"
                className={`${styles.arrow} ${styles.prev}`}
                onClick={() => go(-1)}
                aria-label="Poprzednie zdjęcie"
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.arrow} ${styles.next}`}
                onClick={() => go(1)}
                aria-label="Następne zdjęcie"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {total > 1 ? (
          <div className={styles.bar}>
            <p className={styles.counter} aria-live="polite">
              {index + 1} / {total}
            </p>
            <div className={styles.dots} role="tablist" aria-label="Wybór zdjęcia">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Zdjęcie ${i + 1}`}
                  className={i === index ? styles.dotActive : styles.dot}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {lightbox ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Zamknij zdjęcie"
          >
            ×
          </button>

          {total > 1 ? (
            <>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.lightboxPrev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Poprzednie zdjęcie"
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.lightboxNext}`}
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Następne zdjęcie"
              >
                ›
              </button>
            </>
          ) : null}

          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className={styles.lightboxImg}
            />
            <p className={styles.lightboxCaption}>
              {current.alt}
              {total > 1 ? ` · ${index + 1}/${total}` : ""}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
