# SEO / Technical Audit — bezpieczneinstalacjeelektryczne.pl

**Data audytu:** 2026-07-31  
**Źródła:** kod `c:\dev\bie-website`, odpowiedzi HTTP z produkcji, HTML wygenerowany na żywo  
**Zakres zmian w kodzie podczas audytu:** żadnych (read-only)  
**Lighthouse / lab CWV:** nie uruchomiono — wyniki Performance/LCP/CLS/INP **nie są wymyślane**

---

## 1. Informacje o projekcie

### Fakty

| Pole | Wartość | Dowód |
|------|---------|--------|
| Technologia | **Next.js 16.2.12** (App Router) + React 19.2.4 + TypeScript + Tailwind CSS 4 | `package.json` |
| WordPress | **Nie** (migracja z WP zakończona; legacy URL-e w redirectach/410) | `docs/migration-cutover.md`, `src/lib/legacyRedirects.ts` |
| Motyw / wtyczki WP | **Brak** — własny frontend Next | — |
| Hosting | Node.js (CloudLinux / Aderlo), entry `server.js`, katalog `bie-website` | `server.js`, `docs/migration-cutover.md` |
| Generowanie HTML | **RSC / SSG przy buildzie** (`x-nextjs-prerender: 1`, `x-nextjs-cache: HIT` na produkcji) | nagłówki HTTP homepage 2026-07-31 |
| Treść bez JS | **Tak** — treść usług/lokalizacji/realizacji w HTML z serwera; JS dla GTM, formularza, sliderów | `src/app/**/page.tsx`, `"use client"` tylko w wybranych komponentach |
| SEO w kodzie | `buildPageMetadata()` w `src/lib/seo.ts`; `robots.ts`; `sitemap.ts`; middleware staging | pliki jak wyżej |

**Fragment konfiguracji SEO (metadata):**

```60:80:src/lib/seo.ts
export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage,
}: PageSeoInput): Metadata {
  const company = getCompanyConfig();
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes(company.name)
    ? title
    : `${title} | ${company.name}`;
  const blockIndexing = isStaging() || noIndex || !isIndexingAllowed();

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: blockIndexing
      ? stagingRobotsMeta()
      : productionRobotsMeta(noIndex),
```

**Root title template (powoduje podwójną nazwę firmy w title — patrz §3):**

```104:111:src/lib/seo.ts
export function defaultRootMetadata(): Metadata {
  const company = getCompanyConfig();
  return {
    metadataBase: rootMetadataBase(),
    title: {
      default: `${company.name} – przeglądy, pomiary, kompensacja mocy biernej`,
      template: `%s | ${company.name}`,
    },
```

---

## 2. Indeksowanie przez Google

### robots.txt (produkcja)

```
User-Agent: *
Allow: /
Disallow: /api/

Host: bezpieczneinstalacjeelektryczne.pl
Sitemap: https://bezpieczneinstalacjeelektryczne.pl/sitemap.xml
```

Źródło: `GET https://bezpieczneinstalacjeelektryczne.pl/robots.txt` + generator `src/app/robots.ts`.

**Brak** przypadkowego `Disallow: /` na produkcji. Staging (`nowa.*` / `SITE_ENV!=production`) generuje `Disallow: /` i pustą sitemapę (`robots.ts`, `sitemap.ts`, `middleware.ts`).

### noindex / X-Robots-Tag

| Środowisko | Zachowanie | Dowód |
|------------|------------|--------|
| Produkcja (apex) | Brak `X-Robots-Tag` na homepage (sprawdzone w odpowiedziach 200) | `curl -sI` homepage |
| Staging | `X-Robots-Tag: noindex, nofollow, noarchive` | `middleware.ts`, `next.config.ts`, `X_ROBOTS_TAG_STAGING` |
| Thin services + thin locations | Meta `robots: noindex, nofollow, noarchive` | HTML na żywo (np. `/uslugi/magazyny-energii`, `/lokalizacje/tychy`) |

**Uwaga implementacyjna:** przy `noIndex: true` w `buildPageMetadata` używane jest `stagingRobotsMeta()` (także `nofollow` + `noarchive`), a nie `productionRobotsMeta(true)` (`index:false, follow:true`). Kod: `blockIndexing = … \|\| noIndex` → zawsze gałąź staging przy thin pages.

### Mapa witryny

- **URL:** `https://bezpieczneinstalacjeelektryczne.pl/sitemap.xml`
- **Liczba `<loc>`:** **32** (pomiar 2026-07-31)
- **lastmod:** timestamp buildu (`new Date()` w `sitemap.ts`) — nie daty treści
- GSC: wcześniej status Sukces, 32 wykryte strony (kontekst operacyjny)

**Zawartość (kategorie):**

- 9 ścieżek statycznych (home, uslugi, realizacje, poradnik, lokalizacje, o-firmie, terminy, kontakt, polityka)
- **10/10 usług** (w tym 5 z `thinContent` / noindex w HTML)
- 8 lokalizacji z `hasUniqueContent: true` (bez Tychy/Żory/Rybnik)
- 5 realizacji

**Problem:** sitemap **zawiera URL-e z meta noindex** (5 thin services). To mieszany sygnał dla Google.

**Nie w sitemap:** Tychy, Żory, Rybnik (celowo); artykuły poradnika (0); `/api/*`.

### Kody HTTP / przekierowania (produkcja)

| URL | Wynik |
|-----|--------|
| `https://…/` | 200 |
| kluczowe usługi / lokalizacje / realizacje / kontakt | 200 |
| `https://www.…/` | **301** → apex bez www |
| `http://…/` | **301** → https |
| `/blog` | 308 → `/poradnik` → 200 |
| `/5-letni-przeglad-elektryczny/` | 308 → bez `/` → 308 → `/uslugi/przeglady-instalacji-elektrycznych` → 200 (łańcuch 2×308) |
| `/kontakt/` | 308 → `/kontakt` → 200 |
| `/sklep/` | 308 → `/sklep` → **410 Gone** |
| Pętli przekierowań | nie wykryto na testowanych URL |

Redirecty WP: `src/lib/legacyRedirects.ts` + `next.config.ts` `redirects()`.  
410: `middleware.ts` + `isLegacyGonePath`.

### www / HTTPS / trailing slash / parametry

- Preferowany host: **bez www**, HTTPS — OK (301).
- Trailing slash: Next **308** na wersję bez `/` (permanent).
- Parametr `?foto=` na realizacjach — możliwe warianty URL; canonical na slug projektu (sprawdzić w GSC jako potencjalne soft-duplikaty).
- `?temat=` na kontakcie — parametry CTA.

### Wniosek indeksowania

**TAK — robot Google może wejść na stronę, odczytać treść HTML kluczowych podstron i indeksować istotne URL-e.**

Warunki spełnione: `Allow: /`, sitemap, 200 na content pages, treść w HTML, meta `index,follow` na core pages, legacy 301/308/410.

**Zastrzeżenia (nie blokują całości, ale obniżają jakość indeksowania):**

1. Sitemap reklamuje strony noindex (thin services).
2. Część lokalizacji indexowalnych ma treść szablonową (ryzyko doorway).
3. `/poradnik` jest indexowany mimo 0 artykułów.
4. 5 usług świadomie noindex (thin) — poprawne jako ochrona, ale URL-e istnieją w nawigacji i sitemapie.

---

## 3. Meta tagi

### Metodologia

Dane z HTML produkcji (regex na `<title>`, meta description, canonical, robots, og:*, `<h1>`).  
Długości = liczba znaków w stringu z HTML (z podwójnym brandem w title).

### Tabela — kluczowe URL

| URL | title (skrót) | len | meta description (skrót) | len | H1 # | H1 | canonical | robots | OG title |
|-----|---------------|-----|--------------------------|-----|------|-----|-----------|--------|----------|
| `/` | Przeglądy instalacji… \| BIE | 107 | 5-letni przegląd… na Śląsku | 103 | 1 | Przeglądy instalacji… protokół… | `https://…pl` (bez trailing `/`) | index, follow | = title |
| `/uslugi` | Usługi elektryczne… \| BIE \| BIE | 128 | Przeglądy… CRM | 127 | 1 | Usługi elektryczne | …/uslugi | index, follow | bez 2. BIE* |
| `/uslugi/przeglady-instalacji-elektrycznych` | 5-letni przegląd… \| BIE \| BIE | 138 | 5-letni przegląd… Śląsk | 131 | 1 | 5-letni przegląd instalacji elektrycznej | …/przeglady-… | index, follow | 1× BIE |
| `/uslugi/pomiary-elektryczne` | Pomiary… \| BIE \| BIE | 126 | Pomiary… Śląsk | 129 | 1 | Pomiary elektryczne instalacji | OK | index, follow | 1× |
| `/uslugi/przeglady-elektryczne-domow` | Przegląd… domu… \| BIE \| BIE | 123 | 5-letni… domy | 119 | 1 | Przeglądy elektryczne domów | OK | index, follow | 1× |
| `/uslugi/przeglady-elektryczne-firm` | Przeglądy firm… \| BIE \| BIE | 123 | Firmy i maszyny | 119 | 1 | Przeglądy elektryczne firm | OK | index, follow | 1× |
| `/uslugi/kompensacja-mocy-biernej` | Kompensacja… \| BIE \| BIE | 121 | Analiza faktur… SVG | 138 | 1 | Kompensacja mocy biernej | OK | index, follow | 1× |
| `/uslugi/analiza-jakosci-energii` | Analiza… \| BIE \| BIE | 120 | Analiza parametrów… | 104 | 1 | Analiza jakości energii | OK | **noindex, nofollow, noarchive** | 1× |
| `/uslugi/modernizacja-rozdzielnic` | Modernizacja… \| BIE \| BIE | 120 | Montaż… | 130 | 1 | Modernizacja rozdzielnic… | OK | noindex… | 1× |
| `/uslugi/ochrona-przeciwprzepieciowa` | Ochrona… \| BIE \| BIE | 124 | Dobór SPD… | 121 | 1 | Ochrona przeciwprzepięciowa | OK | noindex… | 1× |
| `/uslugi/magazyny-energii` | Magazyny… \| BIE \| BIE | 116 | Doradztwo… | 100 | 1 | Magazyny energii | OK | noindex… | 1× |
| `/uslugi/systemy-ems` | Systemy EMS… \| BIE \| BIE | 109 | EMS… | 88 | 1 | Systemy EMS | OK | noindex… | 1× |
| `/lokalizacje` | Lokalizacje… \| BIE \| BIE | 106 | Pszczyna… Śląsk | 117 | 1 | Lokalizacje | OK | index, follow | 1× |
| `/lokalizacje/pszczyna` | …Pszczynie \| BIE \| BIE | 116 | Realizacje lokalne… | 143 | 1 | Przeglądy… w Pszczynie | OK | index, follow | 1× |
| `/lokalizacje/katowice` | …Katowicach \| BIE \| BIE | 122 | …Katowice… | 95 | 1 | Kompensacja… Katowicach | OK | index, follow | 1× |
| `/lokalizacje/gliwice` | …Gliwicach \| BIE \| BIE | 116 | …Gliwice… | 94 | 1 | Przeglądy… Gliwicach | OK | index, follow | 1× |
| `/lokalizacje/zabrze` | …Zabrzu \| BIE \| BIE | 118 | …Zabrze… | 93 | 1 | Kompensacja… Zabrzu | OK | index, follow | 1× |
| `/lokalizacje/tychy` | …Tychach \| BIE \| BIE | 101 | …Tychy… | 92 | 1 | Usługi… Tychach | OK | **noindex…** | 1× |
| `/lokalizacje/zory` | …Żorach… | 101 | …Żory… | 92 | 1 | Usługi… Żorach | OK | noindex… | 1× |
| `/lokalizacje/rybnik` | …Rybniku… | 101 | …Rybnik… | 93 | 1 | Usługi… Rybniku | OK | noindex… | 1× |
| `/realizacje` | Realizacje \| BIE \| BIE | 82 | Realizacje… Śląsk | 97 | 1 | Realizacje | OK | index, follow | 1× |
| `/realizacje/kompensacja-mocy-biernej` | Realizacje: Kompensacja… \| BIE \| BIE | 108 | Wybrane instalacje… | 136 | 1 | Kompensacja mocy biernej | OK | index, follow | 1× |
| `/realizacje/przeglady-instalacji-elektrycznych` | Realizacje: Przeglądy… \| BIE \| BIE | 119 | Potwierdzone realizacje… | **76** | 1 | Przeglądy instalacji… | OK | index, follow | 1× |
| `/poradnik` | Poradnik \| BIE \| BIE | 80 | Praktyczne informacje… | 100 | 1 | Poradnik | OK | index, follow | 1× |
| `/kontakt` | Kontakt… \| BIE \| BIE | 120 | Umów przegląd… | 95 | 1 | Kontakt | OK | index, follow | 1× |
| `/o-firmie` | O firmie – BIE \| BIE | 82 | mgr inż.… | 163 | 1 | O firmie | OK | index, follow | 1× |
| `/terminy` | Umów termin… \| BIE \| BIE | 119 | Kalendarz… | 111 | 1 | Umów przegląd instalacji | OK | index, follow | 1× |
| `/polityka-prywatnosci` | Polityka… \| BIE \| BIE | 93 | RODO… | 104 | 1 | Polityka prywatności | OK | index, follow | 1× |

\*OG często bez drugiego sufiksu — template title wpływa głównie na `<title>`.

Dodatkowo sprawdzone w sitemap (HTTP 200 zakładane / części w menu):  
`/lokalizacje/dabrowa-gornicza`, `/sosnowiec`, `/sosnicowice`, `/dankowice`, `/realizacje/instalacje`, `/przerobki`, `/uziomy` — ten sam wzorzec metadata przez shared factory / projekty.

### Wskazane problemy meta

| Problem | Dowód |
|---------|--------|
| **Podwójna nazwa firmy w `<title>`** | Prawie wszystkie podstrony: `… \| Bezpieczne Instalacje Elektryczne \| Bezpieczne Instalacje Elektryczne` — konflikt `buildPageMetadata` (dopina brand) + `title.template` w `defaultRootMetadata` |
| Title zbyt długie (>60, często >120) | np. przeglądy 138 znaków — ucięcie w SERP |
| Brakujące title | **nie** na sprawdzonych URL |
| Zduplikowane title między URL | nie identyczne 1:1; lokalizacje thin mają bardzo podobne wzorce „Usługi elektryczne w {Miasto}” |
| Brakujące meta description | **nie** |
| Krótki description | realizacje przeglądów **76** znaków; EMS **88** |
| Długi description | o-firmie **163**; kompensacja **138**; pszczyna **143** |
| Canonicale | spójne z apex HTTPS; home bez trailing slash |
| Strony bez H1 | **nie** (wszystkie sprawdzone: 1× H1) |
| Więcej niż 1 H1 | **nie** na sprawdzonych |
| noindex thin | zamierzone dla 5 usług + 3 lokalizacji |

---

## 4. Struktura nagłówków i treści

### Fakty

- **H1:** jeden na stronę (PageShell / ServicePageView / home).
- Hierarchia: H1 → H2 w sekcjach (usługi: problem/zakres/proces/FAQ; footer też używa H2 — możliwe „spłaszczenie” semantyki w stopce).
- Treść usług w **HTML serwerowym** z `src/content/services.ts` — nie ukryta za CSR.
- FAQ: `<details>` / accordion — treść w DOM (Google zwykle czyta).
- Slider realizacji: `CaseImageSlider` (client) — opisy case’ów są w HTML wokół galerii; obrazy mogą być lazy.
- **Poradnik:** brak artykułów — hub linkuje do 3 usług + kontakt (`src/app/poradnik/page.tsx`); `[slug]` zawsze `notFound()`.
- **Unikalność:** 5 usług core — bogate; 5 thin — krótkie; lokalizacje poza Pszczyną — szablon `locations-shared.tsx`.

### Ocena intencji (nie tylko words)

| Intencja | URL | Ocena |
|----------|-----|--------|
| Przegląd 5-letni | `/uslugi/przeglady-instalacji-elektrycznych` | Silna — zakres, protokół, FAQ, CTA |
| Pomiary | `/uslugi/pomiary-elektryczne` | Silna |
| Kompensacja | `/uslugi/kompensacja-mocy-biernej` | Silna + realizacje |
| Magazyny / EMS / SPD / rozdzielnice | thin URLs | Słaba — świadomy noindex |
| Lokalnie Pszczyna | `/lokalizacje/pszczyna` | Dobra (unikalna + case’y) |
| Lokalnie Katowice/Gliwice/… | template | Częściowa — ryzyko cienkiej/powtarzalnej treści |
| Wiedza / blog | `/poradnik` | Słaba (brak artykułów) |

---

## 5. Ważne usługi

Źródło treści: `src/content/services.ts`. Indexowalność z HTML produkcji.

| Usługa (zapytanie) | URL | title (logiczny) | H1 | Treść | Index | Linki wew. | CTA | Kontakt | Realizacje | Braki |
|--------------------|-----|------------------|----|-------|-------|------------|-----|---------|------------|-------|
| Przeglądy instalacji | `/uslugi/przeglady-instalacji-elektrycznych` | 5-letni przegląd… | 5-letni przegląd… | bogata (scope/FAQ) | **tak** | nav, footer, related, home | tak | tel/form w layout | `/realizacje/przeglady-…` | title double-brand |
| Przeglądy 5-letnie | ten sam URL (+ 301 ze starego `/5-letni-przeglad-elektryczny`) | j.w. | j.w. | j.w. | tak | tak | tak | tak | tak | osobny URL niepotrzebny |
| Pomiary elektryczne | `/uslugi/pomiary-elektryczne` | Pomiary… | Pomiary elektryczne instalacji | bogata | tak | tak | tak | tak | częściowo | — |
| Pomiary ochronne | **brak osobnego URL** — w treści pomiarów | — | — | w scope pomiarów | — | — | — | — | — | osobna landing page nie istnieje |
| Kompensacja mocy biernej | `/uslugi/kompensacja-mocy-biernej` | Kompensacja… | Kompensacja mocy biernej | bogata | tak | tak | faktury | tak | silne case’y | — |
| Dobór kompensatora | w treści kompensacji (SVG/dobór) | — | — | w procesie | tak (ta sama strona) | — | — | — | — | brak osobnego URL |
| Montaż kompensatorów | j.w. + realizacje | — | — | tak | tak | — | — | — | tak | — |
| Analiza parametrów sieci / jakość energii | `/uslugi/analiza-jakosci-energii` | Analiza… | Analiza jakości energii | **thin** | **nie** (noindex) | nav | tak | tak | słabe | rozbudowa treści przed index |
| Pomiary jakości energii | mapowane na analizę jakości | thin | — | thin | nie | — | — | — | — | brak osobnej pełnej strony |
| Instalacje fotowoltaiczne | **brak osobnej usługi** | — | — | wzmianki w FAQ/form/realizacjach | — | — | — | — | — | brak landing page PV |
| Magazyny energii | `/uslugi/magazyny-energii` | Magazyny… | Magazyny energii | thin | **nie** | nav | tak | tak | nie | treść + case’y |
| Automatyka budynkowa / EMS | `/uslugi/systemy-ems` | Systemy EMS | Systemy EMS | thin | **nie** | nav | tak | tak | nie | treść |

---

## 6. Lokalne SEO

### Obszar — obecność w kodzie/treści

| Miasto / obszar | Podstrona lokalna | Status |
|-----------------|-------------------|--------|
| Pszczyna | `/lokalizacje/pszczyna` | unikalna treść, index |
| Rybnik | `/lokalizacje/rybnik` | template, **noindex**, poza sitemap |
| Żory | `/lokalizacje/zory` | template, **noindex** |
| Jastrzębie-Zdrój | **brak** | — |
| Bielsko-Biała | **brak** | — |
| Tychy | `/lokalizacje/tychy` | template, **noindex** |
| Katowice | `/lokalizacje/katowice` | template + realizacje, **index** |
| woj. śląskie / Śląsk | `NEXT_PUBLIC_SERVICE_AREA` default „Śląsk”; teksty na całym serwisie | OK |
| Zabrze, Dąbrowa, Sosnowiec, Gliwice, Sośnicowice, Dankowice | lokalizacje index (hasUniqueContent true) | głównie szablon |

### NAP / dane firmy

| Element | Wartość / lokalizacja |
|---------|----------------------|
| Nazwa | Bezpieczne Instalacje Elektryczne — `env.ts` / Footer / Header |
| Adres | ul. Borowikowa 3E/4, 43-215 Jankowice — Footer, MapEmbed |
| Telefon | 730 222 105 — `tel:+48730222105` Header/Footer/form CTA |
| E-mail | przeglady@bezpieczneinstalacjeelektryczne.pl |
| NIP / firma | K&J Solutions Sp. z o.o., NIP 6381853954 — Footer |
| Mapa | `MapEmbed.tsx` (iframe Google Maps) — kontakt / lokalne |
| GBP | linki `g.page/r/CdxehSpgWU54EAE` (opinie / maps) |
| LocalBusiness schema | **brak** |

### Doorway pages

- **Pszczyna:** wartościowa (custom page).
- **Indexowalne miasta na `makeLocationPage`:** podwyższone ryzyko doorway — ten sam szkielet, zmiana miasta w H1/meta; częściowa dywersyfikacja przez `RelatedRealizations`.
- **Tychy/Żory/Rybnik:** ryzyka doorway zredukowane przez noindex + wyłączenie z sitemapy — dobra praktyka.

---

## 7. Dane strukturalne Schema.org

### Fakt

**Brak jakiegokolwiek JSON-LD / Microdata / RDFa w `src/`** (wyszukiwanie `application/ld+json`, `schema.org`, `@context` — 0 trafień).

| Typ | Status |
|-----|--------|
| Organization / LocalBusiness / Electrician | brak |
| Service | brak |
| BreadcrumbList | brak (UI breadcrumbs bez schema — `Breadcrumbs.tsx`) |
| FAQPage | brak (FAQ tylko HTML `<details>`) |
| Article / BlogPosting | brak (0 artykułów) |
| WebSite / WebPage | brak |
| ImageObject / VideoObject | brak |
| Review / AggregateRating | brak — **nie rekomendować** bez widocznych, własnych opinii ze schemą (opinie Google są linkowane, nie osadzone jako schema) |

---

## 8. Zdjęcia

### Konfiguracja

```15:19:next.config.ts
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
```

`unoptimized: true` = brak optymalizacji Next Image na hostingu (pliki serwowane jak z `public/`).

### Pliki w `public/images` (pomiar lokalny repo)

| Metryka | Wartość |
|---------|---------|
| Wszystkie pliki obrazów | **58** |
| > 300 KB | **18** |
| > 1 MB | **10** |
| Najcięższe | `jedlina_przeglad.jpg` ~5.6 MB; kolejne JPG przeglądów 3–5 MB; PNG stats 1.7–2.4 MB |

### Homepage (HTML na żywo)

| Metryka | Wartość |
|---------|---------|
| Tagów `<img>` | 11 |
| z alt | 11 |
| pusty alt | 0 |
| brak alt | 0 |

Komponenty: `next/image` z alt w home, o-firmie, RealizationGallery, CaseImageSlider.  
Formaty: mix JPG/PNG/WebP; AVIF nie wymuszony przez unoptimized.  
Lazy: `loading="lazy"` na części statów; hero z preload w HTML.  
width/height: ustawiane na `next/image`.  
Google Images: możliwe, ale ciężkie pliki + brak ImageObject schema.

---

## 9. Wydajność i Core Web Vitals

### Co wynika z kodu (bez Lighthouse)

| Temat | Stan | Dowód |
|-------|------|--------|
| Lighthouse | **nie uruchomiono** | — |
| LCP ryzyko | **wysokie** — hero JPG + ogromne zdjęcia realizacji; brak image optimizer | `public/images`, `unoptimized: true` |
| CLS | width/height na img pomagają; slidery/galeria mogą wpływać | CaseImageSlider |
| INP | LeadForm + GTM + slider — umiarkowane ryzyko | client components |
| Render-blocking | CSS chunki Next; font `next/font` IBM Plex (swap) | layout.tsx |
| Zewnętrzne skrypty | GTM (+ GA4/Ads z kontenera) | GoogleTagManager.tsx |
| Preload | hero image preload w HTML produkcji | homepage HTML |
| Cache | `Cache-Control: s-maxage=31536000`, `x-nextjs-cache: HIT` | nagłówki homepage |
| Kompresja | LiteSpeed (serwer); Accept-Encoding vary | nagłówki |
| Security headers (CSP/HSTS w Next) | brak w `next.config.ts` | next.config.ts |
| DOM | umiarkowany jak na landing | — |

**Wyniki Lighthouse Performance / Accessibility / Best Practices / SEO / LCP / CLS / INP / Speed Index:**  
**NIE DOSTĘPNE — test nie był uruchamiany. Nie podaję liczb.**

---

## 10. Wersja mobilna

### Fakty z kodu / HTML

| Element | Stan |
|---------|------|
| viewport | `width=device-width, initial-scale=1` — obecny w HTML |
| Responsywność | CSS modules + layout flex; menu w Header (osobne style mobilne w projekcie) |
| `tel:` CTA | Header, Footer, home — one-tap call |
| Formularz | LeadForm — pola standardowe, checkbox zgody |
| Cookie banner | **brak** w kodzie |
| Elementy zasłaniające | StagingBanner tylko na staging |

**Nie wykonano** ręcznego przeglądu UI na urządzeniu w tym audycie poza HTML/CSS wnioskami. Rekomendacja: PageSpeed Insights / GSC mobile usability po wdrożeniach.

---

## 11. Linkowanie wewnętrzne

### Fakty

- **Główna nawigacja:** `MAIN_NAV` w `src/content/site.ts` — Usługi (10 children), Realizacje, Poradnik, Lokalizacje (11), O firmie, Terminy, Kontakt.
- **Footer:** do 6 usług + wszystkie lokalizacje + nawigacja (`Footer.tsx`).
- **ServicePageView:** related services, CTA → kontakt/terminy.
- **Realizacje ↔ usługi:** projekty powiązane tematycznie; lokalizacje pokazują related realizations.
- **Breadcrumbs:** komponent UI (bez schema).
- **Poradnik → usługi:** hub linkuje do 3 usług.
- Orphan risk: niskie dla stron w nav/footer; artykułów brak.
- Thin services i noindex locations **nadal linkowane** z menu/footer (crawlable, noindex) — OK technicznie, rozważenie `nofollow` nie jest konieczne.
- Anchory: nazwy usług/miast — dobre; unikać „kliknij tutaj” — nie zaobserwowano masowo.

Dokładne zliczenie grafu wszystkich linków (każdy edge) nie było automatyzowane w tym przebiegu — powyższe to mapa strukturalna z kodu.

---

## 12. Blog i realizacje

| Metryka | Wartość | Dowód |
|---------|---------|--------|
| Artykuły poradnika | **0** | `poradnik/[slug]` → always notFound; brak content posts |
| Hub `/poradnik` | indexowalny, cienki | HTML + page.tsx |
| Kategorie / tagi / autorzy blog | brak | — |
| Projekty realizacji | **5** slugów | `REALIZATION_PROJECTS` |
| Case’y ze zdjęciami | ~24 primary + galerie | `realizations.ts` |
| Daty publikacji | **brak** w modelu | — |
| Opisy case | lokalizacja, problem, rozwiązanie — tak (szczególnie kompensacja) | realizations.ts |
| Alt zdjęć realizacji | pole `alt` w danych | RealizationGallery / CaseImageSlider |
| Archiwa WP `/category/*`, `/author/*` | **410** | middleware |

---

## 13. Bezpieczeństwo i jakość techniczna

| Temat | Stan |
|-------|------|
| HTTPS | tak; HTTP→HTTPS 301 |
| Mixed content | nie badano pełnego DOM wszystkich podstron; assety lokalne `/images` |
| Security headers w Next | brak CSP/HSTS/XFO/XCTO/Referrer-Policy w `next.config.ts` |
| `poweredByHeader` | `false` |
| Debug publiczny | nie stwierdzono |
| Sekrety | W `.env.example` historycznie bywały tokeny CRM/Netsendo — **traktować jako ryzyko**: sekrety wyłącznie w panelu Node / `.env.local` (nie commitować). W raporcie **nie powielam wartości sekretów**. |
| Pliki weryfikacji GSC | `public/google5f9066fcefd14baa.html` — OK |
| Directory listing | nie stwierdzono w teście |
| Wersje frameworka | Next 16 w package.json (nie eksponowane jako meta generator WP) |

---

## 14. Formularze i konwersja

| Element | Stan | Plik |
|---------|------|------|
| Formularz lead | LeadForm — imię, tel, email, miasto, temat, uwagi, zgoda | `LeadForm.tsx` |
| Walidacja | client-side required + consent | LeadForm |
| Antyspam | honeypot `website` + rate limit API | `api/leads/route.ts` |
| Zgoda RODO | checkbox + link polityka | LeadForm |
| `tel:` / `mailto:` | tak | Header/Footer |
| Kalendarz | `/terminy` + Google Appointments embed | terminy page, env |
| GTM dataLayer events (phone/form/email/calendar) | **brak w kodzie aplikacji** — tylko bootstrap GTM | GoogleTagManager.tsx |

**Mierzalność dziś:** pageviews przez GA4 w GTM — tak (po wdrożeniu GTM).  
**Zdarzenia konwersji w kodzie Next:** nie. Możliwe wyłącznie jeśli zdefiniowane w kontenerze GTM (Click triggers) — nie weryfikowano konfiguracji kontenera GTM w tym audycie.

---

## 15. Analityka

| Narzędzie | Stan | Miejsce |
|-----------|------|---------|
| GTM | wdrożony (client, afterInteractive) | `src/components/GoogleTagManager.tsx`, montaż w `layout.tsx` |
| GA4 | przez GTM (Tag Assistant wcześniej potwierdził obecność) | kontener GTM, nie bezpośredni gtag w kodzie |
| Google Ads | przez GTM | kontener |
| Search Console | usługa + sitemap (operacyjnie) | weryfikacja HTML w `public/` |
| Consent Mode v2 | **nie znaleziono w kodzie** | — |
| Banner cookies | **brak** | — |
| Staging | GTM wyłączony na `nowa.*` / localhost | GoogleTagManager.tsx |

Identyfikatory nie są powielane w tym raporcie jako sekrety; są publiczne w źródle strony po wdrożeniu.

---

## 16. Raport końcowy

### A. Podsumowanie wykonanych elementów

- Next.js App Router, HTML z serwera, treść czytelna dla bota
- `robots.txt` Allow + sitemap na produkcji
- Staging hard-lock noindex (`middleware` / `nowa.*`)
- Canonical + Open Graph + Twitter card przez `buildPageMetadata`
- Jedno H1 na stronę (sprawdzone URL-e)
- Core usługi (przeglądy, pomiary, kompensacja, domy, firmy) z treścią
- Thin content świadomie noindex
- Thin lokalizacje Tychy/Żory/Rybnik noindex + poza sitemapą
- 301 www→apex, http→https
- Legacy WP redirecty + 410 sklep/śmieci
- NAP w stopce, mapa, linki GBP, tel one-tap
- GTM na produkcji
- GSC verification file + sitemap submitted (kontekst)
- Formularz + honeypot + zgoda
- Alt na obrazach homepage

### B. Elementy częściowo wdrożone

- Title SEO — obecne, ale **podwójny brand** i zbyt długie
- Lokalne SEO — Pszczyna mocna; reszta index miast szablonowa
- Realizacje — dobre case’y kompensacji; inne projekty cieńsze
- Obrazy — alt OK, ale rozmiary plików bardzo duże + `unoptimized`
- Redirecty — działają, czasem łańcuch 2×308
- Analityka — GTM/GA4 są; brak eventów konwersji w kodzie i Consent Mode
- FAQ — treść OK, brak FAQPage schema
- Breadcrumbs — UI OK, brak BreadcrumbList schema

### C. Elementy niewdrożone

- Całe Schema.org JSON-LD
- Artykuły poradnika (0)
- Landing pages: PV, osobne pomiary ochronne, Jastrzębie, Bielsko
- Consent Mode v2 + cookie banner
- Security headers (CSP/HSTS/…)
- Optymalizacja obrazów (WebP/AVIF pipeline / kompresja źródłowa)
- daty publikacji realizacji
- Lighthouse CI / monitoring CWV w repo

### D. Błędy krytyczne

1. **Brak krytycznego bloku indeksowania core** — nie stwierdzono.  
2. **Krytyczne dla jakości SEO / performance / compliance:**
   - Sitemap zawiera URL-e noindex (mylący sygnał).
   - Title z podwójną nazwą firmy + długość >120 znaków.
   - Obrazy multi-MB serwowane bez optymalizacji (`unoptimized: true`) — ryzyko LCP.
   - Indexowalne lokalizacje szablonowe — ryzyko doorway / duplicate.
   - Brak Consent Mode przy GTM/Ads (ryzyko prawne / jakości danych) — nie blokuje crawla.
   - Sekrety nie powinny być w plikach commitowanych (patrz §13).

### E. Priorytety

#### P0 — natychmiast

| # | Problem | URL / miejsce | Plik | Poprawka | Wpływ SEO | Trudność |
|---|---------|---------------|------|----------|-----------|----------|
| P0-1 | Title template dokleja drugi brand | wszystkie podstrony | `src/lib/seo.ts` (`defaultRootMetadata` template vs `buildPageMetadata`) | użyć `title.absolute` lub nie dopinać brandu dwa razy; skrócić title do ~50–60 znaków | wysoki (CTR SERP) | niska |
| P0-2 | Olbrzymie obrazy LCP/realizacje | `/`, realizacje | `public/images/**`, `next.config.ts` | skompresować źródła (<300 KB hero/stat; WebP); rozważyć re-enable optimizer lub CDN | wysoki (CWV/ranking) | średnia |

#### P1 — ważne SEO

| # | Problem | Miejsce | Plik | Poprawka | Wpływ | Trudność |
|---|---------|---------|------|----------|-------|----------|
| P1-1 | Sitemap listuje noindex services | sitemap.xml | `src/app/sitemap.ts` | filtrować `!thinContent` jak lokalizacje | średni/wysoki | niska |
| P1-2 | noIndex → nofollow (stagingRobotsMeta) | thin pages | `src/lib/seo.ts` | przy samym `noIndex` użyć `productionRobotsMeta(true)` | średni (PageRank flow) | niska |
| P1-3 | Brak JSON-LD LocalBusiness / Organization / Service / FAQ / Breadcrumb | cały serwis | nowy moduł np. `src/lib/jsonld.ts` + layout/pages | dodać poprawny JSON-LD | wysoki | średnia |
| P1-4 | Szablonowe lokalizacje index | Katowice, Gliwice, Zabrze… | `locations-shared.tsx` | unikalne akapity/case per miasto albo noindex do czasu treści | wysoki (jakość lokalna) | średnia/wysoka |
| P1-5 | `/poradnik` pusty a index | `/poradnik` | `poradnik/page.tsx` | noindex hub do czasu artykułów LUB dodać 3–5 artykułów | średni | niska–średnia |
| P1-6 | Consent Mode + banner | cały tracking | GTM + nowy komponent | Consent Mode v2 przed tagami | compliance / dane | średnia |

#### P2 — średni

| # | Problem | Poprawka | Trudność |
|---|---------|----------|----------|
| P2-1 | Thin services w nav mimo noindex | rozbudować treść przed index lub ukryć z main nav | średnia |
| P2-2 | Brak PV / Bielsko / Jastrzębie landing | nowe strony tylko z unikalną treścią | wysoka |
| P2-3 | Eventy konwersji (tel, form, terminy) | dataLayer w LeadForm/Header lub triggery GTM | niska–średnia |
| P2-4 | Łańcuchy 308 (trailing + rename) | skrócić do jednego hop gdzie możliwe | niska |
| P2-5 | Krótkie meta description (realizacje przeglądów) | dopisać 120–155 znaków | niska |
| P2-6 | Security headers | HSTS/XCTO/Referrer-Policy w next.config / panel | niska |
| P2-7 | `?foto=` soft duplicates | canonical już na slug — monitor GSC; ewentualnie noindex parametrów | niska |

#### P3 — dodatkowe

| # | Problem | Poprawka |
|---|---------|----------|
| P3-1 | lastmod = now w sitemap | prawdziwe daty treści |
| P3-2 | Brak dat na realizacjach | pole published w content |
| P3-3 | OG image per page | dodać ogImage w metadata |
| P3-4 | Lighthouse CI | automatyzacja pomiarów |
| P3-5 | H2 w footer vs semantyka | zamiana na p/div styled |

### F. Ocena punktowa (0–100)

| Obszar | Ocena | Komentarz |
|--------|-------|-----------|
| Indeksowanie | **82** | Core otwarty; sitemap/noindex mismatch; thin lokalizacje |
| SEO techniczne | **68** | Title bug, brak schema, redirect chains OK-ish |
| Treści | **70** | Core usługi mocne; poradnik 0; thin oferty |
| Lokalne SEO | **62** | Pszczyna + NAP OK; doorway risk; brak Bielsko/Jastrzębie |
| Dane strukturalne | **15** | praktycznie brak |
| Wydajność | **40** | ocena ryzykowa bez Lighthouse; ciężkie media + unoptimized |
| Wersja mobilna | **72** | viewport/tel/form OK; brak testu lab/UI device |
| Linkowanie wewnętrzne | **78** | silne nav/footer/related |
| Konwersja | **74** | form+tel+terminy; brak eventów/consent |
| **Gotowość do pozycjonowania** | **66** | gotowa do crawl/index core; wymaga poprawek title/schema/treści lokalnych/CWV przed skalowaniem |

### G. Lista sprawdzonych adresów

| URL | HTTP | title (skrót) | H1 | canonical | Index meta |
|-----|------|---------------|-----|-----------|------------|
| `/` | 200 | Przeglądy… \| BIE (107) | Przeglądy instalacji… | `https://bezpieczneinstalacjeelektryczne.pl` | index |
| `/uslugi` | 200 | Usługi… \| BIE \| BIE | Usługi elektryczne | …/uslugi | index |
| `/uslugi/przeglady-instalacji-elektrycznych` | 200 | 5-letni… \| BIE \| BIE | 5-letni przegląd… | self | index |
| `/uslugi/pomiary-elektryczne` | 200 | Pomiary… \| BIE \| BIE | Pomiary elektryczne instalacji | self | index |
| `/uslugi/przeglady-elektryczne-domow` | 200 | … | Przeglądy elektryczne domów | self | index |
| `/uslugi/przeglady-elektryczne-firm` | 200 | … | Przeglądy elektryczne firm | self | index |
| `/uslugi/kompensacja-mocy-biernej` | 200 | … | Kompensacja mocy biernej | self | index |
| `/uslugi/analiza-jakosci-energii` | 200 | … | Analiza jakości energii | self | **noindex** |
| `/uslugi/modernizacja-rozdzielnic` | 200 | … | Modernizacja rozdzielnic… | self | **noindex** |
| `/uslugi/ochrona-przeciwprzepieciowa` | 200 | … | Ochrona przeciwprzepięciowa | self | **noindex** |
| `/uslugi/magazyny-energii` | 200 | … | Magazyny energii | self | **noindex** |
| `/uslugi/systemy-ems` | 200 | … | Systemy EMS | self | **noindex** |
| `/lokalizacje` | 200 | … | Lokalizacje | self | index |
| `/lokalizacje/pszczyna` | 200 | … | …Pszczynie | self | index |
| `/lokalizacje/katowice` | 200 | … | …Katowicach | self | index |
| `/lokalizacje/gliwice` | 200 | … | …Gliwicach | self | index |
| `/lokalizacje/zabrze` | 200 | … | …Zabrzu | self | index |
| `/lokalizacje/tychy` | 200 | … | …Tychach | self | **noindex** |
| `/lokalizacje/zory` | 200 | … | …Żorach | self | **noindex** |
| `/lokalizacje/rybnik` | 200 | … | …Rybniku | self | **noindex** |
| `/realizacje` | 200 | Realizacje \| BIE \| BIE | Realizacje | self | index |
| `/realizacje/kompensacja-mocy-biernej` | 200 | … | Kompensacja mocy biernej | self | index |
| `/realizacje/przeglady-instalacji-elektrycznych` | 200 | … | Przeglądy instalacji… | self | index |
| `/poradnik` | 200 | Poradnik \| BIE \| BIE | Poradnik | self | index |
| `/kontakt` | 200 | Kontakt… | Kontakt | self | index |
| `/o-firmie` | 200 | O firmie… | O firmie | self | index |
| `/terminy` | 200 | Umów termin… | Umów przegląd instalacji | self | index |
| `/polityka-prywatnosci` | 200 | Polityka… | Polityka prywatności | self | index |
| `https://www.…/` | 301→apex | — | — | — | — |
| `http://…/` | 301→https | — | — | — | — |
| `/blog` | 308→`/poradnik` 200 | — | — | — | — |
| `/5-letni-przeglad-elektryczny/` | 308→308→usługa 200 | — | — | — | — |
| `/sklep/` | 308→410 | — | — | — | — |
| `/robots.txt` | 200 | — | — | — | Allow:/ |
| `/sitemap.xml` | 200 | 32 URL | — | — | — |

**W sitemap, nie rozpakowane osobno w tabeli meta powyżej (ten sam wzorzec lokalizacji/realizacji):**  
`/lokalizacje/dabrowa-gornicza`, `/sosnowiec`, `/sosnicowice`, `/dankowice`, `/realizacje/instalacje`, `/przerobki`, `/uziomy`.

---

## Załącznik — kluczowe pliki

| Obszar | Ścieżka |
|--------|---------|
| Metadata | `src/lib/seo.ts` |
| Robots | `src/app/robots.ts` |
| Sitemap | `src/app/sitemap.ts` |
| Middleware | `src/middleware.ts` |
| Redirects | `src/lib/legacyRedirects.ts`, `next.config.ts` |
| Usługi | `src/content/services.ts`, `src/content/site.ts` |
| Lokalizacje | `src/content/locations-shared.tsx`, `src/app/lokalizacje/**` |
| Realizacje | `src/content/realizations.ts` |
| GTM | `src/components/GoogleTagManager.tsx` |
| Form | `src/components/LeadForm.tsx`, `src/app/api/leads/route.ts` |
| Env NAP | `src/lib/env.ts` |

---

*Koniec raportu. Brak zmian w kodzie aplikacji — utworzono wyłącznie ten plik raportu.*
