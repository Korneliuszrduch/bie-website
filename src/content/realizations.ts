export type RealizationGalleryImage = {
  src: string;
  alt: string;
};

export type RealizationPhoto = {
  src: string;
  alt: string;
  /** Display label on the page */
  location: string;
  /** Stable key for filtering on /lokalizacje/[slug] */
  locationKey: string;
  problem: string;
  solution: string;
  result?: string;
  /** Extra photos for the same case (one description, many images) */
  gallery?: RealizationGalleryImage[];
};

export type RealizationProject = {
  slug: string;
  title: string;
  lead: string;
  serviceHref: string;
  serviceLabel: string;
  photos: RealizationPhoto[];
};

/** Put the clicked photo first on /realizacje/[slug]?foto=… */
export function reorderPhotosBySrc(
  photos: RealizationPhoto[],
  fotoSrc?: string | null,
): RealizationPhoto[] {
  if (!fotoSrc) return photos;
  const decoded = (() => {
    try {
      return decodeURIComponent(fotoSrc);
    } catch {
      return fotoSrc;
    }
  })();
  const index = photos.findIndex(
    (p) => p.src === decoded || p.src.endsWith(decoded) || decoded.endsWith(p.src),
  );
  if (index <= 0) return photos;
  return [photos[index], ...photos.slice(0, index), ...photos.slice(index + 1)];
}

/**
 * Which realization locationKeys belong on a city page
 * (Pszczyna includes nearby Goczałkowice-Zdrój and Kozy).
 */
export const LOCATION_REALIZATION_KEYS: Record<string, string[]> = {
  pszczyna: ["pszczyna", "goczalkowice-zdroj", "kozy"],
  zabrze: ["zabrze"],
  "dabrowa-gornicza": ["dabrowa-gornicza"],
  sosnowiec: ["sosnowiec"],
  sosnicowice: ["sosnicowice"],
  gliwice: ["sosnicowice"],
  dankowice: ["dankowice"],
  katowice: ["katowice"],
};

/**
 * Zdjęcia: public/images/realizacje/kompensacja/
 * Opisy na podstawie realnych realizacji (bez wymyślonych ROI i cen przeglądu).
 */
export const REALIZATION_PROJECTS: RealizationProject[] = [
  {
    slug: "kompensacja-mocy-biernej",
    title: "Kompensacja mocy biernej",
    lead: "Wybrane instalacje kompensatorów mocy biernej na Śląsku. Przy każdym obiekcie: lokalizacja, problem klienta i wykonane rozwiązanie.",
    serviceHref: "/uslugi/kompensacja-mocy-biernej",
    serviceLabel: "Oferta: kompensacja mocy biernej",
    photos: [
      {
        src: "/images/realizacje/kompensacja/kompensator_katowice_agd_rtv.webp",
        alt: "Kompensator mocy biernej — Katowice, sklep AGD/RTV",
        location: "Katowice (sklep AGD/RTV)",
        locationKey: "katowice",
        problem:
          "Sklep AGD/RTV w Katowicach — klient płacił ok. 1500 zł netto miesięcznie za moc bierną, głównie pojemnościową.",
        solution:
          "Najpierw zweryfikowaliśmy fakturę, potem na miejscu wykonaliśmy oględziny i pomiary oraz ustaliliśmy z klientem zakres prac. Wymagania: cicha praca urządzenia (blisko strefy sprzedaży) oraz dostęp online. Kompensator zamontowaliśmy wspólnie ze współpracownikiem.",
        result:
          "Po montażu ogarnęliśmy także temat firmowego przeglądu elektrycznego. Klient ma cichy kompensator z dostępem online i kontrolę nad opłatami za moc bierną.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_panele_zabrze_.jpg",
        alt: "Kompensator mocy biernej przy panelach podłogowych — Zabrze",
        location: "Zabrze (panele podłogowe)",
        locationKey: "zabrze",
        problem:
          "Obiekt z panelami podłogowymi — klient płacił ok. 800 zł miesięcznie za energię bierną.",
        solution:
          "Po analizie faktury dobraliśmy i zamontowaliśmy kompensator 10 kvar.",
        result:
          "Moc bierna została w pełni skompensowana — klient nie ponosi już za nią opłat.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_zabrze.jpg",
        alt: "Kompensator mocy biernej — Zabrze",
        location: "Zabrze",
        locationKey: "zabrze",
        problem:
          "Klient płacił ok. 1500 zł netto co dwa miesiące za energię bierną.",
        solution:
          "Wykonaliśmy pomiary na obiekcie i dobraliśmy kompensator 10 kvar, który następnie zamontowaliśmy.",
        result: "Po uruchomieniu klient nie płaci już za moc bierną.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_dabrowa_gornicza.jpg",
        alt: "Kompensator mocy biernej zamontowany w Dąbrowie Górniczej",
        location: "Dąbrowa Górnicza",
        locationKey: "dabrowa-gornicza",
        problem:
          "U klienta wcześniej zastosowano kompensację mocy biernej pojemnościowej za pomocą dławików, jednak układ przestał prawidłowo pracować. Dodatkowo w zakładzie występowała moc bierna indukcyjna generowana przez pracujące maszyny i silniki oraz moc bierna pojemnościowa związana z instalacją fotowoltaiczną. Powodowało to naliczanie dodatkowych opłat za energię bierną.",
        solution:
          "Przeprowadziliśmy analizę parametrów sieci oraz pomiary jakości energii. Na podstawie zebranych danych dobraliśmy aktywny kompensator mocy biernej o mocy 15 kVAr. Po montażu wykonaliśmy zdalną konfigurację i optymalizację parametrów pracy urządzenia.",
        result:
          "Po pierwszym miesiącu eksploatacji pozostały jedynie niewielkie opłaty za moc bierną (około 80 zł miesięcznie). Po zdalnej korekcie ustawień całkowicie wyeliminowaliśmy naliczanie opłat za moc bierną.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensacja_sosnowiec.webp",
        alt: "Regeneracja kompensacji mocy biernej — Sosnowiec, zakład mięsny",
        location: "Sosnowiec (zakład mięsny)",
        locationKey: "sosnowiec",
        problem:
          "Klient płacił ponad 9000 zł za moc bierną. Zakład miał dwa kompensatory i był przekonany, że działają — po fakturach okazało się inaczej.",
        solution:
          "Wykonaliśmy pełną regenerację istniejących układów: nowe przekaźniki, styczniki, kondensatory oraz nowy sterownik.",
        result:
          "W zakładzie mięsnym całkowicie wyeliminowaliśmy opłaty za moc bierną.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_goczalkowice_zdroj.jpg",
        alt: "Kompensator mocy biernej — Goczałkowice-Zdrój",
        location: "Goczałkowice-Zdrój",
        locationKey: "goczalkowice-zdroj",
        problem:
          "Obiekt z fotowoltaiką i ładowaniem samochodów elektrycznych — potrzebna skuteczna kompensacja mocy biernej.",
        solution:
          "Wykonaliśmy pomiary i zamontowaliśmy kompensator dobrany do profilu obciążenia obiektu.",
        result:
          "Kompensator spełnia oczekiwania klienta — temat mocy biernej ogarnięty w 100%.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_pszczyna.webp",
        alt: "Kompensator mocy biernej — Pszczyna, sklep rybny",
        location: "Pszczyna (sklep rybny)",
        locationKey: "pszczyna",
        problem:
          "Sklep rybny — problem z mocą bierną indukcyjną generowaną przez chłodziarki.",
        solution:
          "Po analizie faktur dobraliśmy i zainstalowaliśmy kompensator mocy biernej.",
        result: "Temat mocy biernej został w 100% ogarnięty.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_pszczyna_browar.jpg",
        alt: "Kompensator mocy biernej — Browar Pszczyna",
        location: "Pszczyna (browar)",
        locationKey: "pszczyna",
        problem:
          "Problem z kompensacją — opłaty za moc bierną rzędu kilku tysięcy złotych co dwa miesiące.",
        solution:
          "Po wizycie i pomiarach zamontowaliśmy kompensator 15 kvar. Dodatkowo klient zlecił przegląd instalacji elektrycznej w całym budynku.",
        result: "Problem z mocą bierną zniknął po uruchomieniu kompensatora.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_kozy.jpg",
        alt: "Kompensator mocy biernej — Kozy",
        location: "Kozy",
        locationKey: "kozy",
        problem:
          "Producent wytworów z tworzyw sztucznych budował nową halę z maszynami. Wiedzieli, że po przeniesieniu urządzeń w nowym punkcie pojawią się opłaty za moc bierną i chcieli mieć to zabezpieczone od startu.",
        solution:
          "Wykonaliśmy pomiary i zamontowaliśmy kompensator 50 kvar. Po uruchomieniu dostrajaliśmy parametry w konfiguracji.",
        result:
          "Pomimo mocy biernej pojemnościowej i sporej mocy biernej indukcyjnej zredukowaliśmy moc bierną do zera dzięki kompensatorowi SVG.",
      },
    ],
  },
  {
    slug: "przeglady-instalacji-elektrycznych",
    title: "Przeglądy instalacji elektrycznych",
    lead: "Potwierdzone realizacje przeglądów instalacji elektrycznych z protokołem.",
    serviceHref: "/uslugi/przeglady-instalacji-elektrycznych",
    serviceLabel: "Oferta: przeglądy instalacji elektrycznych",
    photos: [
      {
        src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p15_01.jpg",
        alt: "Przegląd 5-letni instalacji — rozdzielnica, Dankowice",
        location: "Dankowice",
        locationKey: "dankowice",
        problem:
          "5-letni przegląd instalacji w obiekcie przemysłowo-biurowym (hala produkcyjna, środowisko zapylone, fotowoltaika). Stwierdzono m.in.: brak ciągłości przewodu PE lub zawyżone wartości w części urządzeń, obniżoną rezystancję izolacji na obwodach RCD, brak RCD przy części wyłączników nadprądowych, brak klapek ochronnych w gniazdach w zapyleniu oraz rozbieżność układu sieci (zasilanie TT / instalacja odbiorcza TN-C-S).",
        solution:
          "Wykonano okresową kontrolę z oględzinami i pomiarami (izolacja, ciągłość PE, RCD, uziemienie, impedancja pętli zwarcia) oraz sporządzono protokół zgodnie z art. 62 Prawa budowlanego.",
        result:
          "Nieprawidłowości zostały udokumentowane w protokole. Umówiliśmy się z klientem na naprawę i przywrócenie sieci do w pełni sprawnego, bezpiecznego stanu.",
        gallery: [
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p12_01.jpg",
            alt: "Rozdzielnica podczas przeglądu 5-letniego — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p11_01.jpg",
            alt: "Brak RCD przy wyłącznikach nadprądowych — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p16_01.jpg",
            alt: "Pomiary / rozdzielnica RCD — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p14_02.jpg",
            alt: "Obniżona izolacja na obwodzie RCD — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p12_02.jpg",
            alt: "Gniazda bez klapek ochronnych w zapyleniu — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p09_02.jpg",
            alt: "Kontrola ciągłości PE — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p04_01.jpg",
            alt: "Dokumentacja usterek PE — Dankowice",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/dankowice_protokol_p03_01.jpg",
            alt: "Maszyny produkcyjne objęte przeglądem instalacji — Dankowice",
          },
        ],
      },
      {
        src: "/images/realizacje/przeglady_elektryczne/jedlina_przeglad.webp",
        alt: "Przegląd elektryczny — Jedlina, dokumentacja usterek",
        location: "Jedlina",
        locationKey: "jedlina",
        problem:
          "Przegląd elektryczny wykazał m.in.: zawilgocenia i wodę w gniazdach, zbyt duże zabezpieczenia względem przekrojów przewodów, zabrudzony wlot falownika od strony wentylatora oraz niesprawne przyciski awaryjne.",
        solution:
          "Wszystkie niezgodności zostały udokumentowane w protokole przeglądu wraz ze zdjęciami z obiektu.",
        result:
          "Klient otrzymał wykaz usterek do naprawy (wilgoć w instalacji, zabezpieczenia, falownik, przyciski STOP).",
        gallery: [
          {
            src: "/images/realizacje/przeglady_elektryczne/jedlina_ozdzielnica.webp",
            alt: "Rozdzielnica — Jedlina, przegląd elektryczny",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/jedlina_gn3f_wilgoc.webp",
            alt: "Zawilgocenie przy instalacji — Jedlina",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/jedlina_gniazdo.webp",
            alt: "Gniazdo z wilgocią / wodą — Jedlina",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/jedlina_falownik.webp",
            alt: "Falownik — zabrudzony wlot od wentylatora, Jedlina",
          },
          {
            src: "/images/realizacje/przeglady_elektryczne/jedlina_przycisk.webp",
            alt: "Niesprawny przycisk awaryjny — Jedlina",
          },
        ],
      },
      {
        src: "/images/realizacje/przeglady_elektryczne/sosnicowice_przeglad_elektryczny_rozdzielnia.webp",
        alt: "Przegląd instalacji elektrycznej domu — Sośnicowice, rozdzielnia",
        location: "Sośnicowice (k. Gliwic)",
        locationKey: "sosnicowice",
        problem:
          "Przegląd instalacji elektrycznej w domu wykazał niezgodność układu sieci zasilającej: od dostawcy sieć była w układzie TNC, podczas gdy instalacja odbiorcza powinna pracować w układzie TT. Dodatkowo stwierdzono obniżoną izolację na 3 z 17 wyłączników RCD, brak RCD na kilku obwodach zabezpieczonych oraz obniżoną rezystancję uziomu.",
        solution:
          "Dostosowaliśmy sieć do prawidłowego układu pracy podczas pierwszej wizyty. Pozostałe niezgodności udokumentowaliśmy w protokole.",
        result:
          "Jesteśmy umówieni na naprawę pozostałych wykrytych usterek.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_pszczyna_browar.jpg",
        alt: "Przegląd instalacji elektrycznej — Browar Pszczyna",
        location: "Pszczyna (browar)",
        locationKey: "pszczyna",
        problem:
          "Przy okazji montażu kompensatora mocy biernej klient zlecił przegląd instalacji elektrycznej w całym budynku browaru.",
        solution:
          "Wykonaliśmy przegląd pomiarowy instalacji elektrycznej obiektu wraz z protokołem.",
        result:
          "Klient otrzymał dokumentację przeglądu instalacji w całym budynku.",
      },
    ],
  },
  {
    slug: "instalacje",
    title: "Instalacje elektryczne",
    lead: "Wybrane zdjęcia z wykonanych instalacji i rozdzielnic.",
    serviceHref: "/uslugi/przeglady-instalacji-elektrycznych",
    serviceLabel: "Oferta: przeglądy i instalacje",
    photos: [
      {
        src: "/images/realizacje/instalacje/bezpieczniki_w_rozdzielni.webp",
        alt: "Bezpieczniki w rozdzielni elektrycznej",
        location: "Rozdzielnica — bezpieczniki",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/instalacje/gotowa_rozdzielnica.webp",
        alt: "Gotowa rozdzielnica elektryczna",
        location: "Rozdzielnica",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/instalacje/rozdzielnia_i_przewody.webp",
        alt: "Rozdzielnia i przewody doprowadzające",
        location: "Rozdzielnia i zasilanie",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/instalacje/przeglad_pomiar_01.webp",
        alt: "Prace przy instalacji elektrycznej",
        location: "Instalacja",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/instalacje/przeglad_pomiar_02.webp",
        alt: "Instalacja elektryczna — realizacja",
        location: "Instalacja",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
    ],
  },
  {
    slug: "przerobki",
    title: "Przeróbki i modernizacje",
    lead: "Modernizacje rozdzielnic, poprawki instalacji i naprawy.",
    serviceHref: "/uslugi/modernizacja-rozdzielnic",
    serviceLabel: "Oferta: modernizacja rozdzielnic",
    photos: [
      {
        src: "/images/realizacje/przerobki/modernizacja_rozdzielnicy.webp",
        alt: "Modernizacja rozdzielnicy elektrycznej",
        location: "Modernizacja rozdzielnicy",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/przerobki/rozdzielnia_przed_i_po.webp",
        alt: "Rozdzielnia elektryczna — stan przed i po",
        location: "Rozdzielnia — przed i po",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/przerobki/poprawka_po_innym_elektryku.webp",
        alt: "Poprawka instalacji po innym elektryku",
        location: "Poprawka instalacji",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
      {
        src: "/images/realizacje/przerobki/naprawa_maszyny_elektrycznej.webp",
        alt: "Naprawa maszyny elektrycznej",
        location: "Maszyna elektryczna",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
    ],
  },
  {
    slug: "uziomy",
    title: "Uziomy",
    lead: "Wykonanie i podłączenie uziomów oraz przewodów ochronnych PE.",
    serviceHref: "/uslugi/pomiary-elektryczne",
    serviceLabel: "Oferta: pomiary elektryczne",
    photos: [
      {
        src: "/images/realizacje/uziomy/uziom_kabel_pe_rozdzielnia.webp",
        alt: "Uziom i kabel PE doprowadzony do rozdzielni",
        location: "Uziom i PE",
        locationKey: "general",
        problem: "",
        solution: "",
        result: "",
      },
    ],
  },
];

export function getRealizationBySlug(slug: string) {
  return REALIZATION_PROJECTS.find((p) => p.slug === slug);
}

export function photoHasCaseCopy(photo: RealizationPhoto) {
  return Boolean(
    photo.problem.trim() || photo.solution.trim() || photo.result?.trim(),
  );
}

export function getPhotosForLocationPage(pageSlug: string): RealizationPhoto[] {
  const keys = LOCATION_REALIZATION_KEYS[pageSlug];
  if (!keys?.length) return [];
  const keySet = new Set(keys);
  return REALIZATION_PROJECTS.flatMap((project) =>
    project.photos.filter((photo) => keySet.has(photo.locationKey)),
  );
}
