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
};

export type RealizationProject = {
  slug: string;
  title: string;
  lead: string;
  serviceHref: string;
  serviceLabel: string;
  photos: RealizationPhoto[];
};

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
        src: "/images/realizacje/kompensacja/kompensator_panele_zabrze_.jpg",
        alt: "Kompensator mocy biernej przy ogrzewaniu panelami — Zabrze",
        location: "Zabrze (panele grzewcze)",
        locationKey: "zabrze",
        problem:
          "Obiekt z panelami grzewczymi podłogowymi — klient płacił ok. 800 zł miesięcznie za energię bierną.",
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
        src: "/images/realizacje/kompensacja/kompensacja_sosnowiec.jpg",
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
        src: "/images/realizacje/kompensacja/kompensator_goczałkowice_zdroj.jpg",
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
        src: "/images/realizacje/kompensacja/kompensator_pszczyna.jpg",
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
          "Producent choinek sztucznych budował nową halę z maszynami. Wiedzieli, że po przeniesieniu urządzeń w nowym punkcie pojawią się opłaty za moc bierną i chcieli mieć to zabezpieczone od startu.",
        solution:
          "Wykonaliśmy pomiary i zamontowaliśmy kompensator 50 kvar. Po uruchomieniu dostrajaliśmy parametry w konfiguracji.",
        result:
          "Przy dużych mocach pojawiło się chwilowe niedokompensowanie (ok. 80 zł miesięcznie) — start nowych maszyn się opóźnił. Po korekcie konfiguracji moc bierną wyeliminowaliśmy w 100%.",
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
        src: "/images/realizacje/przeglady_elektryczne/sosnicowice_przeglad_elektryczny_rozdzielnia.jpg",
        alt: "Przegląd instalacji elektrycznej domu — Sośnicowice, rozdzielnia",
        location: "Sośnicowice (k. Gliwic)",
        locationKey: "sosnicowice",
        problem:
          "Przegląd instalacji elektrycznej w domu wykazał niezgodność układu sieci zasilającej: od dostawcy energia była w układzie TNC, podczas gdy instalacja odbiorcza powinna pracować w układzie TT. Dodatkowo stwierdzono obniżoną izolację na 3 z 17 wyłączników RCD, brak RCD na kilku obwodach zabezpieczonych oraz obniżoną rezystancję uziomu.",
        solution:
          "Dostosowaliśmy sieć do prawidłowego układu pracy oraz udokumentowaliśmy wszystkie niezgodności w protokole przeglądu.",
        result:
          "Jesteśmy umówieni na naprawę wykrytych usterek (RCD, izolacja, uziom).",
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
    lead: "Wybrane zdjęcia z wykonanych instalacji i rozdzielnic. Opisy lokalizacji uzupełnimy po potwierdzeniu obiektów.",
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
    lead: "Modernizacje rozdzielnic, poprawki instalacji i naprawy. Opisy case’ów uzupełnimy tam, gdzie mamy dane obiektu.",
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
