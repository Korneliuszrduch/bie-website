export type FaqItem = { question: string; answer: string };

export type ServiceContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  problem: string;
  scope: string[];
  process: string[];
  benefits: string[];
  objects: string[];
  faq: FaqItem[];
  relatedServiceSlugs: string[];
  ctaTitle: string;
  ctaText: string;
  /** Thin pages without a full CRM offer behind them. */
  thinContent?: boolean;
  legalNote?: string;
  valuationNeeds?: string[];
  pricingNote?: string;
};

/**
 * Treści oparte na ofertach CRM / mailach:
 * - sent_offer_electrical_inspection.php
 * - sent_mail_data_for_valuation._electical_inspection.php
 * - sent_mail_data_for_valuation._power_compensators.php
 * - email_templates.json (przegląd maszyn)
 * - sampleCallScriptPrzeglad.js
 * Bez wymyślonych cen przeglądu instalacji, ROI ani fikcyjnych realizacji.
 */
export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "przeglady-instalacji-elektrycznych": {
    slug: "przeglady-instalacji-elektrycznych",
    title: "Przeglądy instalacji elektrycznych",
    metaTitle: "5-letni przegląd instalacji elektrycznej – protokół i pomiary",
    metaDescription:
      "5-letni przegląd instalacji elektrycznej z pomiarami i protokołem. Zakres jak w ofercie: izolacja, uziemienie, RCD, SWZ. Śląsk.",
    h1: "5-letni przegląd instalacji elektrycznej",
    lead: "Przegląd pomiarowy, który zapewnia bezpieczeństwo i zgodność z obowiązującymi przepisami — z protokołem wyników i zaleceń.",
    problem:
      "Części nieprawidłowości instalacji nie widać podczas normalnego użytkowania. Wizualne „sprawdzenie” albo sam papier bez pomiarów nie dają realnej informacji o stanie zabezpieczeń, izolacji i uziemienia. Przegląd bywa też wymagany przez ubezpieczyciela nieruchomości.",
    scope: [
      "Oględziny instalacji i rozdzielnic",
      "Pomiary rezystancji izolacji (Up 500 V DC)",
      "Sprawdzenie ciągłości przewodów ochronnych",
      "Pomiary uziemienia",
      "Weryfikacja SWZ (impedancja L-N, L-PE)",
      "Test działania wyłączników RCD",
      "Sprawdzenie kolejności faz",
      "Pomiary fotowoltaiki (jeśli dotyczy)",
      "Pomiary instalacji odgromowej (jeśli dotyczy)",
    ],
    process: [
      "Kontakt i zebranie danych o instalacji (gniazdka, RCD, rozdzielnice, odgromowa, zdjęcia rozdzielnicy).",
      "Indywidualna wycena — cena ustalana pod konkretny obiekt (brak cennika „z półki”).",
      "Umówienie terminu przeglądu.",
      "Pomiary na obiekcie — nie tylko oględziny.",
      "Protokół z wynikami i zaleceniami.",
    ],
    benefits: [
      "Pomiary faktyczne, a nie sam „papier”",
      "Protokół z wynikami i konkretnymi zaleceniami",
      "Wsparcie przy wymogach ubezpieczyciela",
      "Wczesne wykrycie usterek zanim dojdzie do awarii",
      "Oferta ważna 12 miesięcy (jak w mailu ofertowym)",
    ],
    objects: [
      "Domy jednorodzinne",
      "Lokale mieszkalne",
      "Firmy i biura",
      "Obiekty usługowe",
      "Zakłady i hale",
      "Wspólnoty",
    ],
    faq: [
      {
        question: "Czy przegląd to tylko oględziny?",
        answer:
          "Nie. Przegląd wykonuję pomiarowo: izolacja, uziemienie, ciągłość PE, SWZ, RCD i pozostałe elementy z zakresu oferty. Na końcu otrzymujesz protokół oraz informację, co jest prawidłowe, a co wymaga poprawy.",
      },
      {
        question: "Jaka jest podstawa prawna?",
        answer:
          "Obowiązek okresowej kontroli instalacji elektrycznej wynika m.in. z art. 62 ust. 1 pkt 2 ustawy – Prawo budowlane (jak w ofercie wysyłanej do klientów).",
      },
      {
        question: "Ile kosztuje przegląd?",
        answer:
          "Cena jest indywidualna. Do wyceny potrzebuję m.in. liczby gniazdek, RCD, rozdzielnic, informacji o odgromowej oraz — najlepiej — zdjęć rozdzielnicy.",
      },
      {
        question: "Co dostaję po przeglądzie?",
        answer:
          "Protokół z wynikami pomiarów i zaleceniami. To dokument, który możesz przedstawić m.in. ubezpieczycielowi.",
      },
      {
        question: "Ile trwa przegląd instalacji elektrycznej?",
        answer:
          "Czas przeglądu zależy od wielkości i rodzaju obiektu. W przypadku domu jednorodzinnego kontrola najczęściej trwa od 2 do 4 godzin. Po zakończeniu pomiarów przygotowujemy protokół z wynikami oraz zaleceniami.",
      },
      {
        question: "Ile kosztuje przegląd instalacji elektrycznej?",
        answer:
          "Cena zależy od wielkości obiektu, liczby rozdzielnic, obwodów i punktów pomiarowych. Przed rozpoczęciem prac przygotowujemy bezpłatną wycenę, dlatego klient zna koszt usługi z wyprzedzeniem.",
      },
      {
        question: "Czy po przeglądzie otrzymam protokół?",
        answer:
          "Tak. Każdy przegląd kończy się przygotowaniem protokołu z wynikami pomiarów, opisem stanu instalacji oraz wykazem ewentualnych usterek i zaleceń.",
      },
      {
        question: "Jak często należy wykonywać przegląd instalacji elektrycznej?",
        answer:
          "W większości budynków okresową kontrolę instalacji elektrycznej wykonuje się co najmniej raz na 5 lat. W niektórych obiektach, szczególnie narażonych na trudne warunki środowiskowe, kontrole mogą być wymagane częściej.",
      },
      {
        question: "Czy przegląd instalacji elektrycznej jest obowiązkowy?",
        answer:
          "Tak. Obowiązek okresowej kontroli instalacji elektrycznej wynika z art. 62 ust. 1 pkt 2 ustawy Prawo budowlane. Regularne przeglądy pomagają również wykrywać usterki, zanim doprowadzą do awarii lub zagrożenia.",
      },
      {
        question: "Czy wykonujecie przeglądy dla firm i zakładów produkcyjnych?",
        answer:
          "Tak. Wykonujemy przeglądy w domach, biurach, wspólnotach mieszkaniowych, magazynach, halach produkcyjnych, zakładach przemysłowych oraz innych obiektach komercyjnych.",
      },
      {
        question: "Czy podczas przeglądu trzeba wyłączyć prąd?",
        answer:
          "Przy części pomiarów może być konieczne krótkotrwałe wyłączenie zasilania. Zakres i czas przerw ustalamy wcześniej z klientem i staramy się ograniczyć je do niezbędnego minimum.",
      },
      {
        question: "Czy można zamówić tylko pomiary elektryczne?",
        answer:
          "Tak. Wykonujemy również wybrane pomiary ochronne, pomiary do odbioru instalacji, pomiary wymagane przez ubezpieczyciela oraz kontrole wskazanych obwodów lub urządzeń.",
      },
      {
        question: "Czy pomiary są wykonywane zgodnie z obowiązującymi przepisami?",
        answer:
          "Tak. Pomiary wykonujemy zgodnie z obowiązującymi przepisami i odpowiednimi normami, przy użyciu profesjonalnych mierników z aktualnymi świadectwami wzorcowania.",
      },
      {
        question: "Na jakim obszarze działacie?",
        answer:
          "Obsługujemy klientów na terenie województwa śląskiego oraz w okolicznych miejscowościach. Dokładny termin i koszt dojazdu ustalamy podczas wyceny.",
      },
    ],
    relatedServiceSlugs: [
      "pomiary-elektryczne",
      "przeglady-elektryczne-domow",
      "przeglady-elektryczne-firm",
    ],
    ctaTitle: "Umów przegląd instalacji",
    ctaText:
      "Napisz lub zadzwoń — przygotuję wycenę pod Twój obiekt i ustalimy termin.",
    legalNote:
      "Podstawa prawna obowiązku wykonania przeglądu: art. 62 ust. 1 pkt 2 ustawy – Prawo budowlane.",
    valuationNeeds: [
      "Orientacyjna liczba gniazdek elektrycznych",
      "Liczba wyłączników różnicowoprądowych (RCD)",
      "Liczba rozdzielnic elektrycznych",
      "Inne istotne elementy (np. oświetlenie awaryjne, urządzenia specjalne)",
      "Informacja o instalacji odgromowej",
      "Zdjęcia rozdzielnicy lub dokumentacji instalacji",
    ],
    pricingNote:
      "Cena usługi jest ustalana indywidualnie i podawana w ofercie. Oferta ważna 12 miesięcy.",
  },

  "pomiary-elektryczne": {
    slug: "pomiary-elektryczne",
    title: "Pomiary elektryczne",
    metaTitle: "Pomiary elektryczne – izolacja, uziemienie, RCD, SWZ",
    metaDescription:
      "Pomiary elektryczne instalacji: rezystancja izolacji, uziemienie, ciągłość PE, SWZ, test RCD. Protokół z wynikami. Śląsk.",
    h1: "Pomiary elektryczne instalacji",
    lead: "Pomiary ochronne i kontrolne zgodne z zakresem stosowanym przy przeglądach — z dokumentacją wyników.",
    problem:
      "Bez pomiarów trudno potwierdzić, że zabezpieczenia, izolacja i uziemienie działają prawidłowo. To szczególnie ważne przy odbiorach, po modernizacji oraz przy okresowej kontroli instalacji.",
    scope: [
      "Pomiary rezystancji izolacji (Up 500 V DC)",
      "Ciągłość przewodów ochronnych",
      "Pomiary uziemienia",
      "Weryfikacja SWZ (impedancja L-N, L-PE)",
      "Test wyłączników RCD",
      "Sprawdzenie kolejności faz",
      "Pomiary PV / odgromowej — jeśli dotyczy obiektu",
    ],
    process: [
      "Ustalenie celu pomiarów (przegląd okresowy, odbiór, modernizacja).",
      "Pomiary na obiekcie.",
      "Protokół i zalecenia.",
    ],
    benefits: [
      "Wyniki pomiarowe, nie tylko opis wizualny",
      "Dokumentacja do dalszych decyzji / ubezpieczyciela",
      "Wykrycie ukrytych nieprawidłowości",
    ],
    objects: ["Domy", "Firmy", "Zakłady", "Obiekty z PV lub odgromową"],
    faq: [
      {
        question: "Czy pomiary wchodzą w przegląd 5-letni?",
        answer:
          "Tak — standardowy zakres oferty przeglądu obejmuje wymienione pomiary oraz oględziny instalacji i rozdzielnic.",
      },
    ],
    relatedServiceSlugs: [
      "przeglady-instalacji-elektrycznych",
      "przeglady-elektryczne-firm",
    ],
    ctaTitle: "Zamów pomiary",
    ctaText: "Opisz obiekt — przygotuję zakres i wycenę.",
  },

  "przeglady-elektryczne-domow": {
    slug: "przeglady-elektryczne-domow",
    title: "Przeglądy elektryczne domów",
    metaTitle: "Przegląd elektryczny domu – pomiary i protokół",
    metaDescription:
      "5-letni przegląd instalacji elektrycznej w domu: pomiary, protokół, zalecenia. Dla właścicieli domów na Śląsku.",
    h1: "Przeglądy elektryczne domów",
    lead: "Okresowa kontrola instalacji w domu jednorodzinnym lub lokalu — pomiarowo, z protokołem.",
    problem:
      "W domu instalacja „działa latami”, ale bez pomiarów nie wiadomo, czy RCD, izolacja i uziemienie są w normie. Ubezpieczyciel często oczekuje aktualnego przeglądu.",
    scope: [
      "Oględziny instalacji i rozdzielnicy",
      "Pomiary izolacji, uziemienia, ciągłości PE",
      "SWZ oraz test RCD",
      "Kolejność faz",
      "PV i odgromowa — jeśli są w obiekcie",
    ],
    process: [
      "Krótki wywiad o instalacji (gniazdka, RCD, rozdzielnice, zmiany: PV, pompa ciepła, remont).",
      "Wycena indywidualna.",
      "Termin u Ciebie w domu.",
      "Protokół po pomiarach.",
    ],
    benefits: [
      "Spokój, że instalacja jest sprawdzona pomiarowo",
      "Dokument pod ubezpieczenie",
      "Konkretne zalecenia zamiast ogólnych haseł",
    ],
    objects: ["Domy jednorodzinne", "Lokale mieszkalne", "Dom z PV / pompą ciepła"],
    faq: [
      {
        question: "Czy po montażu fotowoltaiki warto zrobić przegląd?",
        answer:
          "Tak — w zakresie oferty są też pomiary fotowoltaiki, jeśli dotyczy instalacji. Po zmianach w instalacji sens mają aktualne pomiary.",
      },
    ],
    relatedServiceSlugs: [
      "przeglady-instalacji-elektrycznych",
      "pomiary-elektryczne",
    ],
    ctaTitle: "Umów przegląd domu",
    ctaText: "Zadzwoń lub napisz — ustalimy termin i wycenę.",
    valuationNeeds: [
      "Liczba gniazdek, RCD i rozdzielnic",
      "Czy jest instalacja odgromowa / PV",
      "Zdjęcia rozdzielnicy",
    ],
  },

  "przeglady-elektryczne-firm": {
    slug: "przeglady-elektryczne-firm",
    title: "Przeglądy elektryczne firm",
    metaTitle: "Przeglądy elektryczne firm i maszyn – protokół",
    metaDescription:
      "Przeglądy instalacji w firmach oraz przegląd elektryczny maszyn z protokołem. Pomiary, zabezpieczenia, dokumentacja.",
    h1: "Przeglądy elektryczne firm",
    lead: "Kontrola instalacji w obiektach firmowych oraz — osobno — przegląd elektryczny maszyn z indywidualnym protokołem.",
    problem:
      "W firmie liczy się ciągłość pracy i dokumentacja. Potrzebujesz protokołu z pomiarów instalacji albo przeglądu maszyn z oznaczeniem urządzenia — bez odkładania tematu „na później”.",
    scope: [
      "Przegląd / pomiary instalacji obiektu (jak w ofercie 5-letniej)",
      "Przegląd elektryczny maszyn: oględziny instalacji maszyny",
      "Pomiary: rezystancja izolacji, ochrona przeciwporażeniowa, ciągłość PE",
      "Kontrola zabezpieczeń i wyłączników awaryjnych",
      "Weryfikacja układu sterowania",
      "Oznaczenie urządzenia naklejką",
      "Indywidualny protokół",
    ],
    process: [
      "Ustalenie, czy chodzi o instalację budynku, maszyny, czy oba.",
      "Wycena (instalacja i maszyny — indywidualnie, wg zakresu).",
      "Realizacja na obiekcie.",
      "Protokoły i oznaczenia.",
    ],
    benefits: [
      "Dokumentacja pod BHP / ubezpieczenie / audyty",
      "Pomiary, nie tylko wizyta „na oko”",
      "Możliwość przeglądu wielu maszyn w serii",
    ],
    objects: [
      "Biura i sklepy",
      "Zakłady produkcyjne",
      "Hale",
      "Wspólnoty i obiekty usługowe",
    ],
    faq: [
      {
        question: "Ile kosztuje przegląd maszyny?",
        answer:
          "Cena jest indywidualna — zależy od typu urządzenia i zakresu. Proste maszyny wyceniamy inaczej niż urządzenia z własną rozdzielnią. Napisz lub zadzwoń, przygotuję ofertę.",
      },
      {
        question: "Czy przegląd instalacji firmowej ma stałą cenę?",
        answer:
          "Nie — wycena instalacji obiektu jest indywidualna, na podstawie zakresu i danych o instalacji.",
      },
    ],
    relatedServiceSlugs: [
      "przeglady-instalacji-elektrycznych",
      "kompensacja-mocy-biernej",
      "modernizacja-rozdzielnic",
    ],
    ctaTitle: "Zapytaj o przegląd firmowy",
    ctaText:
      "Napisz, czy dotyczy instalacji budynku czy maszyn — przygotuję ofertę.",
    pricingNote:
      "Ceny przeglądów firmowych i maszyn ustalane są indywidualnie w ofercie. Na stronie nie publikujemy cennika.",
  },

  "kompensacja-mocy-biernej": {
    slug: "kompensacja-mocy-biernej",
    title: "Kompensacja mocy biernej",
    metaTitle: "Kompensacja mocy biernej – analiza faktur i SVG",
    metaDescription:
      "Analiza faktur za energię pod kątem mocy biernej i dobór kompensatora SVG. W wielu przypadkach można wyeliminować ten koszt. Śląsk.",
    h1: "Kompensacja mocy biernej",
    lead: "Najpierw analiza faktur — potem konkretna rekomendacja. W wielu przypadkach opłatę za moc bierną można wyeliminować montażem kompensatora SVG.",
    problem:
      "Na fakturze za energię pojawia się koszt mocy biernej. To pozycja, którą da się ograniczyć lub — w wielu przypadkach — całkowicie wyeliminować poprzez dobór i montaż kompensatora.",
    scope: [
      "Analiza 3 ostatnich faktur (przy sezonowości — 12 miesięcy)",
      "Ocena, czy występuje moc bierna i w jakiej ilości",
      "Dobór rozwiązania (m.in. kompensator dynamiczny SVG)",
      "Oferta obejmująca dostawę, montaż wewnątrz budynku i uruchomienie",
      "Opcjonalnie zdalny monitoring parametrów (usługa dodatkowa)",
    ],
    process: [
      "Rozmowa / zgłoszenie — CTA „Wyślij fakturę do analizy”.",
      "Przesłanie 3 (lub 12) faktur za energię.",
      "Analiza i ewentualne pomiary.",
      "Indywidualna oferta z ceną urządzenia i montażu.",
      "Montaż, uruchomienie, konfiguracja.",
    ],
    benefits: [
      "Redukcja lub eliminacja opłat za moc bierną (w wielu przypadkach)",
      "Kompensator pracuje autonomicznie — do samej kompensacji nie wymaga Internetu",
      "Gwarancja urządzenia wg oferty (typowo 24 miesiące w ofertach SVG)",
      "Wycena na realnych fakturach, nie „na oko”",
    ],
    objects: [
      "Firmy i zakłady",
      "Hale produkcyjne",
      "Obiekty usługowe z istotnym zużyciem energii",
    ],
    faq: [
      {
        question: "Jakie dokumenty są potrzebne do wyceny?",
        answer:
          "3 ostatnie faktury za energię elektryczną. Przy sezonowości zużycia — faktury z ostatnich 12 miesięcy.",
      },
      {
        question: "Czy podajecie stałą cenę kompensatora na stronie?",
        answer:
          "Nie. Cena zależy od mocy, producenta i zakresu montażu — jest w indywidualnej ofercie po analizie faktur.",
      },
      {
        question: "Czy kompensator wymaga stałego Internetu?",
        answer:
          "Do samej kompensacji nie. Zdalny monitoring parametrów to opcja dodatkowa.",
      },
    ],
    relatedServiceSlugs: [
      "analiza-jakosci-energii",
      "przeglady-elektryczne-firm",
    ],
    ctaTitle: "Wyślij fakturę do analizy",
    ctaText:
      "Prześlij 3 ostatnie faktury — sprawdzę, czy i w jakiej ilości występuje moc bierna.",
    pricingNote:
      "Cena kompensacji jest zawsze indywidualna (po analizie faktur / pomiarach). Na stronie nie publikujemy przykładowych kwot z ofert klientów.",
  },

  "analiza-jakosci-energii": {
    slug: "analiza-jakosci-energii",
    title: "Analiza jakości energii",
    metaTitle: "Analiza jakości energii i parametrów zasilania",
    metaDescription:
      "Analiza parametrów energii i faktur — wsparcie przy problemach z mocą bierną i doborze kompensacji.",
    h1: "Analiza jakości energii",
    lead: "Ocena parametrów zasilania i kosztów na fakturach — punkt wyjścia do decyzji o kompensacji lub dalszych pomiarach.",
    problem:
      "Zakłócenia, nietypowe koszty na fakturze albo podejrzenie mocy biernej wymagają analizy danych, a nie domysłów.",
    scope: [
      "Analiza faktur za energię",
      "Ocena występowania mocy biernej",
      "Wsparcie przy doborze dalszych działań (np. SVG)",
    ],
    process: [
      "Przesłanie faktur",
      "Analiza",
      "Rekomendacja kolejnych kroków",
    ],
    benefits: [
      "Decyzja oparta na danych z faktur",
      "Jasna ścieżka do oferty kompensacji, jeśli ma sens",
    ],
    objects: ["Firmy", "Zakłady", "Obiekty z wysokim zużyciem energii"],
    faq: [
      {
        question: "Czy analiza faktur coś kosztuje na start?",
        answer:
          "Standardowy pierwszy krok to przesłanie faktur do oceny występowania mocy biernej — skontaktuj się, aby ustalić szczegóły.",
      },
    ],
    relatedServiceSlugs: ["kompensacja-mocy-biernej"],
    ctaTitle: "Wyślij faktury do analizy",
    ctaText: "3 ostatnie faktury (lub 12 przy sezonowości).",
    thinContent: true,
  },

  "modernizacja-rozdzielnic": {
    slug: "modernizacja-rozdzielnic",
    title: "Modernizacja rozdzielnic",
    metaTitle: "Modernizacja i montaż rozdzielnic elektrycznych",
    metaDescription:
      "Montaż i modernizacja rozdzielni elektrycznych — bezpieczeństwo, porządek instalacji, przygotowanie pod pomiary i rozbudowę.",
    h1: "Modernizacja rozdzielnic elektrycznych",
    lead: "Montaż i modernizacja rozdzielni — element zakresu prac elektrycznych firmy, często powiązany z przeglądem i bezpieczeństwem instalacji.",
    problem:
      "Przepełniona, nieczytelna lub przestarzała rozdzielnica utrudnia bezpieczną eksploatację i kolejne pomiary. Po remoncie, PV lub rozbudowie instalacji często wymaga uporządkowania.",
    scope: [
      "Montaż i podłączenie rozdzielni elektrycznej",
      "Modernizacja istniejącej rozdzielnicy",
      "Uporządkowanie zabezpieczeń pod kątem bezpiecznej eksploatacji",
    ],
    process: [
      "Ocena stanu (najlepiej ze zdjęciami rozdzielnicy)",
      "Wycena",
      "Wykonanie i uruchomienie",
      "Opcjonalnie pomiary / przegląd po modernizacji",
    ],
    benefits: [
      "Bezpieczniejsza i czytelniejsza instalacja",
      "Lepsze warunki do kolejnych przeglądów pomiarowych",
    ],
    objects: ["Domy", "Firmy", "Obiekty po remoncie / z PV"],
    faq: [],
    relatedServiceSlugs: [
      "przeglady-instalacji-elektrycznych",
      "ochrona-przeciwprzepieciowa",
    ],
    ctaTitle: "Zapytaj o modernizację rozdzielnicy",
    ctaText: "Wyślij zdjęcia rozdzielnicy — ocenię zakres.",
    thinContent: true,
  },

  "ochrona-przeciwprzepieciowa": {
    slug: "ochrona-przeciwprzepieciowa",
    title: "Ochrona przeciwprzepięciowa",
    metaTitle: "Ochrona przeciwprzepięciowa instalacji elektrycznej",
    metaDescription:
      "Dobór i montaż ochrony przeciwprzepięciowej w instalacji — w powiązaniu z przeglądem i modernizacją rozdzielnicy.",
    h1: "Ochrona przeciwprzepięciowa",
    lead: "Dobór i montaż zabezpieczeń przeciwprzepięciowych jako element bezpiecznej instalacji.",
    problem:
      "Przepięcia mogą uszkodzić urządzenia i instalację. Przy modernizacji rozdzielnicy lub przeglądzie warto zweryfikować stan ochrony.",
    scope: [
      "Ocena potrzeby ochrony w obiekcie",
      "Dobór i montaż zabezpieczeń w rozdzielnicy",
    ],
    process: ["Konsultacja", "Wycena", "Montaż"],
    benefits: ["Lepsza ochrona urządzeń wrażliwych", "Uzupełnienie bezpiecznej rozdzielnicy"],
    objects: ["Domy", "Firmy", "Obiekty z elektroniką / PV"],
    faq: [],
    relatedServiceSlugs: [
      "modernizacja-rozdzielnic",
      "przeglady-instalacji-elektrycznych",
    ],
    ctaTitle: "Zapytaj o ochronę przeciwprzepięciową",
    ctaText: "Opisz obiekt lub wyślij zdjęcie rozdzielnicy.",
    thinContent: true,
  },

  "magazyny-energii": {
    slug: "magazyny-energii",
    title: "Magazyny energii",
    metaTitle: "Magazyny energii – doradztwo i wykonawstwo",
    metaDescription:
      "Doradztwo w zakresie magazynów energii dla obiektów. Szczegółowy zakres oferty — po kontakcie.",
    h1: "Magazyny energii",
    lead: "Temat powiązany z instalacjami i zarządzaniem energią. Szczegółową ofertę przygotowujemy indywidualnie po kontakcie.",
    problem:
      "Dobór magazynu zależy od profilu zużycia, instalacji i celów inwestora — nie od uniwersalnego cennika.",
    scope: ["Konsultacja potrzeb", "Indywidualna wycena zakresu"],
    process: ["Kontakt", "Analiza potrzeb", "Oferta"],
    benefits: ["Dopasowanie do konkretnego obiektu"],
    objects: ["Domy", "Firmy"],
    faq: [],
    relatedServiceSlugs: ["systemy-ems", "kompensacja-mocy-biernej"],
    ctaTitle: "Zapytaj o magazyn energii",
    ctaText: "Opisz obiekt — wrócimy z pytaniami do wyceny.",
    thinContent: true,
  },

  "systemy-ems": {
    slug: "systemy-ems",
    title: "Systemy EMS",
    metaTitle: "Systemy EMS – zarządzanie energią",
    metaDescription:
      "Systemy zarządzania energią (EMS) — monitoring i optymalizacja. Oferta indywidualna.",
    h1: "Systemy EMS",
    lead: "Monitoring i zarządzanie energią jako uzupełnienie tematów kompensacji i jakości zasilania. Zakres oferty ustalany indywidualnie.",
    problem:
      "Bez pomiarów i monitoringu trudno optymalizować koszty energii w obiekcie firmowym.",
    scope: ["Konsultacja", "Indywidualna propozycja zakresu"],
    process: ["Kontakt", "Ustalenie potrzeb", "Oferta"],
    benefits: ["Lepszy wgląd w zużycie i koszty energii"],
    objects: ["Firmy", "Zakłady"],
    faq: [],
    relatedServiceSlugs: ["kompensacja-mocy-biernej", "analiza-jakosci-energii"],
    ctaTitle: "Zapytaj o EMS",
    ctaText: "Napisz, jaki obiekt chcesz objąć monitoringiem.",
    thinContent: true,
  },
};

export function getService(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT[slug];
}

export function getAllServices(): ServiceContent[] {
  return Object.values(SERVICE_CONTENT);
}
