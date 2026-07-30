/**
 * Opinie z wizytówki Google (zrzut 2026-07-30).
 * Źródło: Google Business Profile — 5/5 z 9 opinii.
 * Nie uzupełniamy fikcyjnymi treściami.
 */
export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** np. "Opinia z Google" */
  sourceLabel: string;
};

export const GOOGLE_RATING_SUMMARY = {
  rating: 5,
  count: 9,
} as const;

export const REVIEWS: Review[] = [
  {
    author: "Małgorzata Kamola",
    rating: 5,
    text: "Przegląd instalacji elektrycznej wykonany profesjonalnie. Wszystkie wykryte usterki zostały usunięte w trakcie przeglądu. Polecam serdecznie",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Marcin Mrozek",
    rating: 5,
    text: "Wszystko szybko i sprawnie. Naprawdę polecam.",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Józef Kajta: Promabi.pl",
    rating: 5,
    text: "Szybko i sprawnie. Polecam",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Paweł Maruszczyk",
    rating: 5,
    text: "Serdecznie polecam. Przegląd instalacji w moim domu został wykonany bardzo dokładnie i bez ściemy. Wszystko odbyło się o zaplanowanym czasie i w miłej atmosferze.",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Adrian Swierkowski",
    rating: 5,
    text: "Uczciwy fachowiec, polecam w 100%",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Zbigniew Matros",
    rating: 5,
    text: "Wszystko sprawdzone szybko , sprawnie i dokładnie.",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Łukasz Grochowski",
    rating: 5,
    text: "Pełen profesjonalizm. Super podejście do klienta. Zdecydowanie polecam",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Artur",
    rating: 5,
    text: "Świetna robota, sprawny kontakt, raport na drugi dzień po wykonaniu usługi. Przegląd staranny, z wyjaśnianiem wykonywanych czynności. Przystępna cena. Znalezione usterki w instalacji wykonywane od razu. Polecam",
    sourceLabel: "Opinia z Google",
  },
  {
    author: "Marcelina Hörlin",
    rating: 5,
    text: "Pan Korneliusz jest fachowcem godnym polecenia. Przyjechał na czas, wykonał usługę profesjonalnie. Cena również adekwatna. Polecam serdecznie",
    sourceLabel: "Opinia z Google",
  },
];
