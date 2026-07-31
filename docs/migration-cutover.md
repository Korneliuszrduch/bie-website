# Cutover: WordPress → Next.js

## Co jest w kodzie

- **`/terminy`** — Google Calendar Appointment Scheduling (ten sam schedule co WP).
- **301** — [`src/lib/legacyRedirects.ts`](../src/lib/legacyRedirects.ts) + `next.config.ts` `redirects()`.
- **410** — śmieciowe URL-e WP w `middleware.ts` (`isLegacyGonePath`).
- PDF-y lokalnie: `/images/uprawnienia/uprawnienia-elektryczne-d1-e1.pdf`, `swiadectwo-wzorcowania.pdf`.

## Mapa 301 (skrót)

| Stary WP | Nowy |
|----------|------|
| `/kwalifikacje/` | `/o-firmie` |
| `/5-letni-przeglad-elektryczny/` | `/uslugi/przeglady-instalacji-elektrycznych` |
| `/realizacje-kompensacja-mocy-biernej/` | `/realizacje/kompensacja-mocy-biernej` |
| `/blog/` | `/poradnik` |
| `/form` | `/kontakt` |
| `/terminy/` | `/terminy` (strona żywa) |
| WP PDF wzorcowania / D1_E1 | `/images/uprawnienia/...` |

## 410 Gone

Sklep (`/sklep`, `/koszyk`, …), blog o terminalach płatniczych, `/author/*`, `/category/*`.

## Env produkcja (apex, nie `nowa.*`)

```
NEXT_PUBLIC_SITE_URL=https://bezpieczneinstalacjeelektryczne.pl
SITE_ENV=production
BASIC_AUTH_ENABLED=false
CRM_LEADS_ENABLED=true
NEXT_PUBLIC_CALIBRATION_PDF_URL=/images/uprawnienia/swiadectwo-wzorcowania.pdf
NEXT_PUBLIC_GOOGLE_APPOINTMENTS_URL=https://calendar.google.com/calendar/appointments/schedules/AcZssZ2t_FM-bXLzPEfvgexpL9hIh0fAwY-_OL3CsQXyq4-sE5hh-KXS7Uzxe5Gpf5xheXLJV10Ili6d?gv=true
```

`nowa.*` zostaje stagingiem (hard-lock noindex w middleware).

## Aderlo / DirectAdmin — Setup Node.js App

| Pole | Wartość |
|------|---------|
| Wersja Node.js | **20.x** jeśli jest na liście (Next 16); unikaj samej 18 |
| Tryb aplikacji | **Production** |
| Katalog główny | `bie-website` (**nie** `public_html`) |
| URL aplikacji | `bezpieczneinstalacjeelektryczne.pl/` (puste pole ścieżki) |
| Plik startowy | `server.js` |

Zmienne: `NEXT_PUBLIC_SITE_URL`, `SITE_ENV=production`, `BASIC_AUTH_ENABLED=false`, CRM/Netsendo jak w `.env.example`.

Po CREATE: wgraj projekt do `bie-website` → Terminal: `npm ci` && `npm run build` → **Restart** w panelu Node.

URL = apex przejmuje domenę od WP — najpierw backup `public_html`.

## Kolejność cutoveru

1. Backup WP (pliki + DB).
2. Setup Node.js App + upload + build + restart.
3. Smoke: `/`, `/terminy`, `/kontakt`, lead → CRM, PDF-y, stare 301.
4. GSC sitemap + GBP.
5. WP w `public_html` → rename do backupu.

## Smoke lokalnie

```bash
npm run build && npm start
curl -sI http://127.0.0.1:3000/terminy
curl -sI http://127.0.0.1:3000/5-letni-przeglad-elektryczny/
curl -sI http://127.0.0.1:3000/sklep/
```
