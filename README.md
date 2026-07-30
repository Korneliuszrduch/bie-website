# Bezpieczne Instalacje Elektryczne — strona Next.js

Nowa strona firmowa (App Router, TypeScript, SSG).  
Środowisko testowe: `https://nowa.bezpieczneinstalacjeelektryczne.pl`  
Obecny WordPress na domenie głównej **nie jest modyfikowany**.

## Etap 1 (obecny zakres)

- konfiguracja Next.js 16 + Tailwind + TypeScript
- layout, nawigacja, routing wszystkich zaplanowanych URL
- blokada indeksowania staging (`SITE_ENV=staging`)
- meta robots, `X-Robots-Tag`, `robots.txt`, pusta sitemap na staging
- Basic Auth (middleware) — włączane zmiennymi env
- bezpieczna blokada: host `nowa.*` zawsze traktowany jako staging
- bazowy design mobile-first

## Uruchomienie lokalne

```bash
cd c:\dev\bie-website
cp .env.example .env.local   # jeśli jeszcze nie ma
npm install
npm run dev
```

Otwórz: http://localhost:3000

W `.env.local` domyślnie `BASIC_AUTH_ENABLED=false` (wygodny lokalny dev).  
Na Vercel ustaw `BASIC_AUTH_ENABLED=true` oraz hasło.

## Build

```bash
npm run build
npm start
```

## Smoke SEO (staging)

```bash
npm run smoke:seo
```

(Skrypt sprawdza robots.txt, nagłówek X-Robots-Tag i meta — wymaga działającego serwera.)

## Zmienne środowiskowe

Zobacz `.env.example`. Sekrety (`CRM_API_KEY`, hasło Basic Auth) tylko w panelu hostingu / `.env.local` — nie w git.

## Kolejne etapy

2. Treści: home (pełna), usługi, lokalizacje, kontakt  
3. Realizacje, poradnik MDX, formularz + `/api/leads`  
4. Testy, `docs/staging-deployment.md`, `docs/migration-plan.md`
