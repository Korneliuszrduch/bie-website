# SEO Fixes Stage 1 — Report

**Branch:** `seo-technical-fixes-stage-1`  
**Date:** 2026-07-31  
**Production deploy:** **not performed** (per instructions)

---

## 1. Changed files

### Code / config

| File | Change |
|------|--------|
| `src/lib/seo.ts` | Absolute titles; staging vs production thin `noindex,follow` |
| `src/app/sitemap.ts` | Drop thin services + `/poradnik` |
| `src/lib/jsonld.ts` | **New** — Organization, Electrician, WebSite, Service, FAQ, Breadcrumb |
| `src/components/JsonLd.tsx` | **New** — safe JSON-LD script renderer |
| `src/lib/analytics.ts` | **New** — PII-safe `dataLayer` helper |
| `src/components/ConversionTracker.tsx` | **New** — delegated click events |
| `src/app/layout.tsx` | Global JSON-LD + ConversionTracker |
| `src/components/Breadcrumbs.tsx` | BreadcrumbList JSON-LD |
| `src/components/ServicePageView.tsx` | Service + FAQ JSON-LD; CTA tracking attrs |
| `src/components/CtaBand.tsx` | `data-cta` / phone tracking |
| `src/components/Header.tsx` | tracking attrs |
| `src/components/Footer.tsx` | tracking attrs |
| `src/components/PageShell.tsx` | tracking attrs |
| `src/components/LeadForm.tsx` | `lead_form_success` (no PII) |
| `src/components/GoogleTagManager.tsx` | `useSyncExternalStore` (lint fix) |
| `src/app/page.tsx` | Shorter title; home FAQ JSON-LD; CTA attrs; stats → WebP |
| `src/app/poradnik/page.tsx` | Temporary `noIndex` + comment |
| `src/app/uslugi/page.tsx` | Shorter title |
| `src/app/kontakt/page.tsx` | Shorter title |
| `src/app/terminy/page.tsx` | Shorter title; calendar tracking |
| `src/app/o-firmie/page.tsx` | Title without pre-baked brand |
| `src/app/lokalizacje/pszczyna/page.tsx` | Title + FAQ JSON-LD |
| `src/app/realizacje/[slug]/page.tsx` | Title format |
| `src/content/services.ts` | Shorter `metaTitle` values |
| `src/content/locations-shared.tsx` | Shorter document titles (H1 unchanged) |
| `src/content/realizations.ts` | Image refs → WebP where optimized |
| `scripts/optimize-images.mjs` | **New** — report/write/update-refs |
| `scripts/optimize-images-report.json` | Generated report |
| `package.json` / `package-lock.json` | `sharp` + image scripts |
| `eslint.config.mjs` | Ignore `server.js`, `scripts/**` |
| `.gitignore` | Ignore `public/images/_originals/` |

### New WebP assets (originals backed up locally under `_originals/`, gitignored)

- `public/images/stats/stat-*.webp` (4)
- `public/images/realizacje/przeglady_elektryczne/*.webp` (7)
- `public/images/realizacje/kompensacja/{kompensator_katowice_agd_rtv,kompensator_pszczyna,kompensacja_sosnowiec}.webp`

---

## 2. Change descriptions

### 2.1 Titles (single brand)

- `buildPageMetadata` now sets `title: { absolute: fullTitle }`, so root `title.template` cannot append the company name a second time.
- OG/Twitter titles use the same single `fullTitle`.
- Page `metaTitle` / page titles shortened with keyword-first phrasing.

### 2.2 Sitemap

- Before: **32** URLs  
- After: **26** URLs  

**Removed:**

1. `/poradnik`
2. `/uslugi/analiza-jakosci-energii`
3. `/uslugi/modernizacja-rozdzielnic`
4. `/uslugi/ochrona-przeciwprzepieciowa`
5. `/uslugi/magazyny-energii`
6. `/uslugi/systemy-ems`

Thin locations (Tychy/Żory/Rybnik) were already excluded.

### 2.3 noindex behavior

| Context | robots |
|---------|--------|
| Staging / `nowa.*` / `!isIndexingAllowed()` | `noindex, nofollow, noarchive` |
| Production thin (`noIndex: true`) | `noindex, follow` |
| Production indexable | `index, follow` |

**Verified (build with `SITE_ENV=production`):**

| URL | robots |
|-----|--------|
| `/uslugi/magazyny-energii` | `noindex, follow` |
| `/uslugi/analiza-jakosci-energii` | `noindex, follow` |
| `/lokalizacje/tychy` | `noindex, follow` |
| `/poradnik` | `noindex, follow` |
| `/` and core service | `index, follow` |

### 2.4 JSON-LD

Global (layout): `Organization`, `Electrician`, `WebSite`  
Services: `Service` + `FAQPage` when FAQ exists  
Breadcrumbs component: `BreadcrumbList`  
Home + Pszczyna: `FAQPage` from visible FAQ HTML  

Serialization escapes `<` as `\u003c`.

### 2.5 Poradnik

- `noIndex: true` with code comment to re-enable after ≥3 articles  
- Removed from sitemap  
- Still in main nav  

### 2.6 Images

- Script: `npm run images:report` / `npm run images:optimize`  
- Backups: `public/images/_originals/` (gitignored)  
- WebP + max edge 1600px; docs keep higher quality  

### 2.7 Conversion events

| Event | Trigger |
|-------|---------|
| `phone_click` | `tel:` links (+ optional `data-cta`) |
| `email_click` | `mailto:` links |
| `calendar_click` | calendar URLs / `data-calendar` |
| `cta_click` | elements with `data-cta` |
| `lead_form_success` | successful LeadForm submit |

Params: `page_path`, `cta_location`, `service_name`, `link_url` (no PII).

---

## 3. Test results

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | **PASS** |
| `npm run lint` | **PASS** (after ignoring `server.js` / `scripts/**`; GTM lint fixed) |
| `next build --webpack` (Windows + `SITE_ENV=production`) | **PASS** (exit 0) |
| Titles — single brand | **PASS** (`brandx1` in built HTML) |
| Canonicals (prod env) | apex `https://bezpieczneinstalacjeelektryczne.pl…` |
| Meta robots thin vs index | **PASS** (see §2.3) |
| Sitemap count | **26** |
| JSON-LD present | home 4 scripts; service pages 6 (global + breadcrumbs + service/FAQ) |
| Content without JS | RSC HTML still contains H1/copy (SSR/SSG) |
| Automated unit tests | none in project |

**Note:** `package.json` `"build"` uses Unix `NODE_OPTIONS=…` which fails in cmd.exe on Windows; use PowerShell `$env:NODE_OPTIONS=…; npx next build --webpack` locally. Production Linux hosting is fine.

---

## 4. Title table (old → new)

Brand once: ` | Bezpieczne Instalacje Elektryczne` (~37 chars).

| URL | Old title (audit / live) | New title | Len |
|-----|--------------------------|-----------|-----|
| `/` | Przeglądy instalacji…, pomiary i kompensacja… \| BIE \| BIE (107) | Przeglądy instalacji elektrycznych i pomiary \| BIE | **80** |
| `/uslugi` | Usługi… kompensacja \| BIE \| BIE (128) | Usługi elektryczne – przeglądy i pomiary \| BIE | ~78 |
| `/uslugi/przeglady-instalacji-elektrycznych` | 5-letni… protokół i pomiary \| BIE \| BIE (138) | 5-letni przegląd instalacji elektrycznej \| BIE | **76** |
| `/uslugi/pomiary-elektryczne` | Pomiary… RCD, SWZ \| BIE \| BIE (126) | Pomiary elektryczne instalacji \| BIE | ~68 |
| `/uslugi/przeglady-elektryczne-domow` | Przegląd… protokół \| BIE \| BIE (123) | Przegląd elektryczny domu \| BIE | ~60 |
| `/uslugi/przeglady-elektryczne-firm` | Przeglądy firm i maszyn… \| BIE \| BIE (123) | Przeglądy elektryczne firm \| BIE | ~62 |
| `/uslugi/kompensacja-mocy-biernej` | Kompensacja… SVG \| BIE \| BIE (121) | Kompensacja mocy biernej \| BIE | ~60 |
| `/uslugi/analiza-jakosci-energii` | Analiza… zasilania \| BIE \| BIE (120) | Analiza jakości energii \| BIE | **59** |
| `/uslugi/modernizacja-rozdzielnic` | Modernizacja i montaż… \| BIE \| BIE (120) | Modernizacja rozdzielnic elektrycznych \| BIE | ~72 |
| `/uslugi/ochrona-przeciwprzepieciowa` | Ochrona… instalacji… \| BIE \| BIE (124) | Ochrona przeciwprzepięciowa \| BIE | ~62 |
| `/uslugi/magazyny-energii` | Magazyny… doradztwo… \| BIE \| BIE (116) | Magazyny energii \| BIE | **52** |
| `/uslugi/systemy-ems` | Systemy EMS – zarządzanie… \| BIE \| BIE (109) | Systemy EMS \| BIE | ~48 |
| `/lokalizacje/pszczyna` | Przeglądy i pomiary… Pszczynie \| BIE \| BIE (116) | Przeglądy elektryczne w Pszczynie \| BIE | ~68 |
| `/lokalizacje/tychy` | Usługi elektryczne w Tychach \| BIE \| BIE (101) | Przeglądy elektryczne – Tychy \| BIE | **65** |
| `/lokalizacje/katowice` (pattern) | long H1 \| BIE \| BIE | Przeglądy elektryczne – Katowice \| BIE | ~66 |
| `/poradnik` | Poradnik \| BIE \| BIE (80) | Poradnik \| BIE | **44** |
| `/kontakt` | Kontakt – umów przegląd lub wyślij fakturę \| BIE \| BIE | Kontakt – umów przegląd \| BIE | ~58 |
| `/terminy` | Umów termin przeglądu instalacji elektrycznej \| BIE \| BIE | Umów termin przeglądu instalacji \| BIE | ~68 |
| `/o-firmie` | O firmie – BIE \| BIE (82) | O firmie \| BIE | ~42 |
| `/realizacje/{slug}` | Realizacje: {title} \| BIE \| BIE | Realizacje – {title} \| BIE | varies |

---

## 5. Sitemap URLs

### Before (32)

Static 9 (incl. poradnik) + 10 services + 8 locations + 5 realizacje.

### After (26)

```
/
/uslugi
/realizacje
/lokalizacje
/o-firmie
/terminy
/kontakt
/polityka-prywatnosci
/uslugi/przeglady-instalacji-elektrycznych
/uslugi/pomiary-elektryczne
/uslugi/przeglady-elektryczne-domow
/uslugi/przeglady-elektryczne-firm
/uslugi/kompensacja-mocy-biernej
/lokalizacje/pszczyna
/lokalizacje/zabrze
/lokalizacje/dabrowa-gornicza
/lokalizacje/sosnowiec
/lokalizacje/sosnicowice
/lokalizacje/dankowice
/lokalizacje/katowice
/lokalizacje/gliwice
/realizacje/kompensacja-mocy-biernej
/realizacje/przeglady-instalacji-elektrycznych
/realizacje/instalacje
/realizacje/przerobki
/realizacje/uziomy
```

---

## 6. Example JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": "https://bezpieczneinstalacjeelektryczne.pl/#localbusiness",
  "name": "Bezpieczne Instalacje Elektryczne",
  "telephone": "+48730222105",
  "email": "przeglady@bezpieczneinstalacjeelektryczne.pl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Borowikowa 3E/4",
    "postalCode": "43-215",
    "addressLocality": "Jankowice",
    "addressCountry": "PL"
  },
  "areaServed": { "@type": "AdministrativeArea", "name": "Śląsk" }
}
```

Service pages also emit `Service` + optional `FAQPage`; breadcrumbs emit `BreadcrumbList`.

---

## 7. Image optimization report

| File (WebP) | Before (source) | After | Saved | Usage |
|-------------|-----------------|-------|-------|--------|
| `stats/stat-przeglady-v2.webp` | 1697.9 KB PNG | 59.9 KB | 96.5% | Home stats |
| `stats/stat-doswiadczenie-v2.webp` | 2385.4 KB | 168.0 KB | 93.0% | Home stats |
| `stats/stat-domy-firmy-v2.webp` | 2159.5 KB | 108.2 KB | 95.0% | Home stats |
| `stats/stat-protokol-v2.webp` | 2160.8 KB | 136.0 KB | 93.7% | Home stats |
| `…/jedlina_przeglad.webp` | 5556.8 KB | 365.7 KB | 93.4% | Realizacje przeglądy |
| `…/jedlina_ozdzielnica.webp` | 4884.8 KB | 186.7 KB | 96.2% | Realizacje |
| `…/sosnicowice_…rozdzielnia.webp` | 4622.9 KB | 83.8 KB | 98.2% | Realizacje |
| `…/kompensator_katowice_agd_rtv.webp` | 3635.8 KB | 51.7 KB | 98.6% | Home + realizacje |
| `…/jedlina_gn3f_wilgoc.webp` | 2228.7 KB | 221.1 KB | 90.1% | Realizacje |
| `…/jedlina_przycisk.webp` | 686.9 KB | 147.4 KB | 78.5% | Realizacje |
| `…/kompensator_pszczyna.webp` | 442.4 KB | 158.2 KB | 64.2% | Realizacje |
| `…/jedlina_falownik.webp` | 390.7 KB | 76.4 KB | 80.5% | Realizacje |
| `…/jedlina_gniazdo.webp` | 381.3 KB | 67.9 KB | 82.2% | Realizacje |
| `…/kompensacja_sosnowiec.webp` | 320.2 KB | 242.4 KB | 24.3% | Realizacje |

`hero-main.jpg` was already ~136 KB — left as JPG.  
Original JPG/PNG kept; backups in `_originals/` (not committed).

---

## 8. dataLayer events

- `phone_click` — Header/Footer/PageShell/home/CtaBand `tel:`  
- `email_click` — Footer `mailto:`  
- `cta_click` — Header CTA, CtaBand form CTA, home form CTA, service contact links  
- `calendar_click` — `/terminy` external appointments link (`data-calendar`)  
- `lead_form_success` — LeadForm success path  

Wire corresponding GTM tags/triggers in the container (not done in this stage).

---

## 9. Not fixed in this stage (by design)

- New location pages / articles  
- Consent Mode v2 / cookie banner  
- Security headers (CSP/HSTS)  
- Remaining JPG under 300 KB not converted  
- Doorway-risk unique copy for template cities  
- Expanding thin services before indexing  
- Windows-friendly `package.json` build script (`cross-env`)  

---

## 10. Risks before deploy

1. **Rebuild required on server** with production env so absolute titles / robots / sitemap bake correctly.  
2. **GTM:** create triggers for new event names or events won’t show in GA4.  
3. **WebP:** ensure hosting serves `image/webp` (LiteSpeed usually OK). Keep JPG fallbacks on disk.  
4. **Sitemap shrink** may show as “removed URLs” in GSC temporarily — expected.  
5. **`/poradnik` noindex** — confirm stakeholders OK until articles exist.  
6. Local `.env.local` staging can mask production robots during local builds — verify with `SITE_ENV=production`.  
7. **Local Lighthouse ≠ production CDN/cache** — lab scores below are from `next start` on localhost; real hosting, HTTP/2, and cold vs warm cache will differ (especially Performance / LCP / TBT).

---

## 11. Deploy / rollback

### Deploy

1. Merge/push branch `seo-technical-fixes-stage-1`.  
2. Upload changed code + new `.webp` files to `bie-website`.  
3. `npm ci` (or install) — includes `sharp` as devDependency (needed only for local image script; production runtime does not require sharp if WebP already generated).  
4. Ensure env: `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://bezpieczneinstalacjeelektryczne.pl`.  
5. `npm run build` + Restart Node app.  
6. Smoke: homepage title (one brand), `/sitemap.xml` = 26 URLs, thin page `noindex,follow`, view-source JSON-LD, Tag Assistant / dataLayer clicks.  
7. Resubmit sitemap in GSC optional.

### Rollback

1. Revert git branch / redeploy previous commit.  
2. Or restore previous `src/lib/seo.ts`, `sitemap.ts`, image path refs in `realizations.ts` / `page.tsx` and rebuild.  
3. WebP files can remain unused if refs rolled back to JPG.

---

## 12. Final QA (2026-07-31) — pre-commit polish

**Environment:** local `next build --webpack` + `next start -p 3012` with `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://bezpieczneinstalacjeelektryczne.pl`.  
**Production server:** not restarted, not deployed.

### 12.1 Final title table (rendered HTML)

Brand suffix (`| Bezpieczne Instalacje Elektryczne`) is **opt-in** via `includeBrand` — used only on `/kontakt` and `/o-firmie`. Home and service pages use query-focused titles without the full company name.

| URL | title | length |
|-----|-------|--------|
| `/` | Przeglądy instalacji elektrycznych – Śląsk | 42 |
| `/uslugi` | Usługi elektryczne – przeglądy i pomiary | 40 |
| `/uslugi/przeglady-instalacji-elektrycznych` | 5-letni przegląd instalacji elektrycznej | 40 |
| `/uslugi/pomiary-elektryczne` | Pomiary elektryczne instalacji – Śląsk | 38 |
| `/uslugi/przeglady-elektryczne-domow` | Przegląd instalacji elektrycznej w domu | 39 |
| `/uslugi/przeglady-elektryczne-firm` | Przeglądy elektryczne firm i zakładów | 37 |
| `/uslugi/kompensacja-mocy-biernej` | Kompensacja mocy biernej – dobór i montaż | 41 |
| `/uslugi/analiza-jakosci-energii` | Analiza jakości energii | 23 |
| `/uslugi/modernizacja-rozdzielnic` | Modernizacja rozdzielnic elektrycznych | 38 |
| `/uslugi/ochrona-przeciwprzepieciowa` | Ochrona przeciwprzepięciowa | 27 |
| `/uslugi/magazyny-energii` | Magazyny energii | 16 |
| `/uslugi/systemy-ems` | Systemy EMS | 11 |
| `/lokalizacje` | Lokalizacje – przeglądy na Śląsku | 33 |
| `/lokalizacje/pszczyna` | Przeglądy elektryczne Pszczyna | 30 |
| `/lokalizacje/tychy` | Przeglądy elektryczne Tychy | 27 |
| `/kontakt` | Kontakt – umów przegląd \| Bezpieczne Instalacje Elektryczne | 59 |
| `/o-firmie` | O firmie \| Bezpieczne Instalacje Elektryczne | 44 |
| `/poradnik` | Poradnik | 8 |
| `/realizacje` | Realizacje | 10 |
| `/realizacje/kompensacja-mocy-biernej` | Realizacje: Kompensacja mocy biernej | 36 |
| `/realizacje/przeglady-instalacji-elektrycznych` | Realizacje: Przeglądy instalacji elektrycznych | 46 |
| `/terminy` | Umów termin przeglądu instalacji | 32 |

Lengths counted as Unicode code points (Polish characters = 1). Core money pages sit ~37–42 chars (slightly under 45–65 band but keyword-clear and without brand spam). Kontakt/o-firmie keep full brand and stay readable (44–59).

### 12.2 JSON-LD graph

**Single business entity**

- `@type`: `["Electrician","LocalBusiness","Organization"]`
- `@id`: `https://bezpieczneinstalacjeelektryczne.pl/#business`
- Emitted once in root layout via `businessJsonLd()`
- `WebSite` `@id`: `…/#website`, `publisher`: `{ "@id": "…/#business" }`
- `Service.provider`: `{ "@id": "…/#business" }` on service pages
- `BreadcrumbList` / `FAQPage` as page-level nodes
- No separate duplicate Organization / Electrician nodes
- No `Review` / `AggregateRating`

**Validation:** `JSON.parse` of every `application/ld+json` block on `/`, przeglądy, kompensacja, `/kontakt` — **PASS**. Checks: `publisherOk`, `providersOk`, `singleBusiness`, `hasReview=false`.

### 12.3 Images (local production)

HTTP check of **24** unique `.webp` refs from home + realizacje pages: **all 200**, `BAD_COUNT=0`.  
Also OK: `kompensator_goczalkowice_zdroj.jpg`, `kompensator_panele_zabrze_.jpg`.

Checked surfaces: home stats, realizacje przeglądy, realizacje kompensacja, gallery/slider thumbs. No broken WebP refs in HTML. Alts come from existing content models (unchanged in this polish). Aspect ratios use existing `next/image` / CSS object-fit patterns — no stretch CSS added. Technical detail shots remain WebP with quality from optimize script (readable in prior stage).

### 12.4 Lighthouse (local lab)

Tool: `lighthouse@12.2.1`, Chrome headless, against `http://127.0.0.1:3012`.  
**Note:** local Node server ≠ production CDN; scores are indicative only.

#### Mobile (default form factor)

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|------|------|------|----|-----|-----|-----|-----|
| `/` | 56 | 96 | 100 | 100 | 3.6 s | 0 | 1,710 ms |
| `/uslugi/przeglady-instalacji-elektrycznych` | 71 | 100 | 100 | 100 | 2.2 s | 0.142 | 880 ms |
| `/uslugi/kompensacja-mocy-biernej` | 75 | 100 | 100 | 100 | 2.9 s | 0.001 | 760 ms |
| `/kontakt` | 74 | 100 | 100 | 100 | 2.2 s | 0.001 | 1,050 ms |

#### Desktop (`--preset=desktop`)

| Page | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|------|------|------|----|-----|-----|-----|-----|
| `/` | 87 | 96 | 100 | 100 | 1.1 s | 0.001 | 240 ms |
| `/uslugi/przeglady-instalacji-elektrycznych` | 96 | 100 | 100 | 100 | 0.9 s | 0.001 | 140 ms |
| `/uslugi/kompensacja-mocy-biernej` | 96 | 100 | 100 | 100 | 0.9 s | 0.001 | 130 ms |
| `/kontakt` | 60 | 100 | 100 | 100 | 1.2 s | 0.001 | 1,340 ms |

SEO category **100** on all four URLs in both modes. Performance variance (home mobile TBT/LCP, kontakt desktop TBT) should be re-checked on production after deploy — not blockers for stage-1 SEO ship.

### 12.5 Technical checks

| Check | Result |
|-------|--------|
| `npx tsc --noEmit` | PASS |
| `eslint` | PASS |
| `next build --webpack` (`SITE_ENV=production`) | PASS |
| HTML title / description / canonical / robots / H1 | Verified on key URLs via local prod HTML |
| JSON-LD in HTML | Present + parse OK |
| WebP refs | 24/24 HTTP 200 |

### 12.6 Git commit (this polish)

- **Message:** `SEO technical fixes stage 1`
- **Hash:** `bd5cd3b96900a9e41396e03c0c46f63fa0f81c86` (`bd5cd3b`)
- **Files in commit `bd5cd3b`:**
  - `SEO_FIXES_STAGE_1_REPORT.md`
  - `src/app/kontakt/page.tsx`
  - `src/app/layout.tsx`
  - `src/app/lokalizacje/page.tsx`
  - `src/app/lokalizacje/pszczyna/page.tsx`
  - `src/app/o-firmie/page.tsx`
  - `src/app/page.tsx`
  - `src/app/realizacje/[slug]/page.tsx`
  - `src/content/locations-shared.tsx`
  - `src/content/services.ts`
  - `src/lib/jsonld.ts`
  - `src/lib/seo.ts`
- **Excluded from commit:** `.env*`, `_originals/`, tokens, Lighthouse JSON temp, QA scratch scripts
- **Merge to main:** not done  
- **Production changed:** **NO**

---

## 13. Summary checklist for requester

1. **Git branch:** `seo-technical-fixes-stage-1`  
2. **Ready to deploy:** yes (after host rebuild + smoke)  
3. **Build / lint / tsc:** PASS  
4. **Commit created:** yes (see §12.6)  
5. **Deployed to production:** **NO**  
6. **Report path:** `c:\dev\bie-website\SEO_FIXES_STAGE_1_REPORT.md`
