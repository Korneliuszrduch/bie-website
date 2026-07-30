export type RealizationPhoto = {
  src: string;
  alt: string;
  location: string;
  /**
   * Co było problemem u klienta (opłaty za moc bierną, cos φ, kary z faktury itd.).
   * Wpisz unikalny, prawdziwy opis — puste pole nie wyświetla się na stronie.
   */
  problem: string;
  /**
   * Co zrobiliście (pomiar / analiza faktury / montaż kompensatora / typ rozwiązania).
   */
  solution: string;
  /**
   * Efekt, jeśli znany (spadek opłat, poprawa współczynnika mocy…). Opcjonalne.
   */
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
        problem:
          "Klient płacił ok. 1500 zł netto co dwa miesiące za energię bierną.",
        solution:
          "Wykonaliśmy pomiary na obiekcie i dobraliśmy kompensator 10 kvar, który następnie zamontowaliśmy.",
        result: "Po uruchomieniu klient nie płaci już za moc bierną.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensator_dabrowa_gornicza.jpg",
        alt: "Kompensator mocy biernej — Dąbrowa Górnicza",
        location: "Dąbrowa Górnicza",
        problem:
          "Dotychczasowe dławiki przestały działać. Klient miał jednocześnie problemy z mocą bierną pojemnościową i indukcyjną oraz instalację fotowoltaiczną.",
        solution:
          "Pomiary wskazały na kompensator 15 kvar. Po montażu dostrajaliśmy parametry zdalnie (konfiguracja online).",
        result:
          "Po miesiącu została jeszcze część opłat za moc bierną (ok. 80 zł). Po korekcie konfiguracji online skompensowaliśmy moc bierną do zera.",
      },
      {
        src: "/images/realizacje/kompensacja/kompensacja_sosnowiec.jpg",
        alt: "Regeneracja kompensacji mocy biernej — Sosnowiec, zakład mięsny",
        location: "Sosnowiec (zakład mięsny)",
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
        problem:
          "Producent choinek sztucznych budował nową halę z maszynami. Wiedzieli, że po przeniesieniu urządzeń w nowym punkcie pojawią się opłaty za moc bierną i chcieli mieć to zabezpieczone od startu.",
        solution:
          "Wykonaliśmy pomiary i zamontowaliśmy kompensator 50 kvar. Po uruchomieniu dostrajaliśmy parametry w konfiguracji.",
        result:
          "Przy dużych mocach pojawiło się chwilowe niedokompensowanie (ok. 80 zł miesięcznie) — start nowych maszyn się opóźnił. Po korekcie konfiguracji moc bierną wyeliminowaliśmy w 100%.",
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
