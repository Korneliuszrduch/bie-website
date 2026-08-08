import { getCompanyConfig } from "@/lib/env";

/** Shared privacy policy body — used on /polityka-prywatnosci and in the form modal. */
export function PrivacyPolicyContent() {
  const company = getCompanyConfig();
  const legalName = company.legalName || "K&J Solutions Sp. z o.o.";
  const address = company.address || "ul. Borowikowa 3E/4, 43-215 Jankowice";
  const nip = company.nip || "6381853954";

  return (
    <>
      <p>
        Administratorem danych osobowych jest <strong>{legalName}</strong>,{" "}
        {address}, NIP: <strong>{nip}</strong>, dalej jako „Administrator”.
      </p>

      <h2>1. Jakie dane przetwarzamy?</h2>
      <p>
        W zależności od sposobu kontaktu oraz rodzaju realizowanej usługi możemy
        przetwarzać w szczególności:
      </p>
      <ul>
        <li>imię i nazwisko,</li>
        <li>numer telefonu,</li>
        <li>adres e-mail,</li>
        <li>nazwę firmy i NIP,</li>
        <li>adres wykonania usługi,</li>
        <li>
          dane potrzebne do przygotowania oferty, realizacji usługi, sporządzenia
          protokołu, dokumentacji technicznej lub faktury,
        </li>
        <li>historię kontaktu i ustaleń dotyczących usługi.</li>
      </ul>

      <h2>2. W jakim celu przetwarzamy dane?</h2>
      <p>Dane osobowe przetwarzamy w celu:</p>
      <ul>
        <li>
          odpowiedzi na zapytania przesłane przez formularz kontaktowy, telefon
          lub e-mail,
        </li>
        <li>przygotowania oferty i wyceny,</li>
        <li>umawiania terminów,</li>
        <li>realizacji usług elektrycznych,</li>
        <li>wykonywania przeglądów i pomiarów instalacji elektrycznych,</li>
        <li>przygotowywania protokołów oraz dokumentacji technicznej,</li>
        <li>
          realizacji usług związanych m.in. z modernizacją instalacji,
          kompensacją mocy biernej, fotowoltaiką, magazynami energii i
          automatyką,
        </li>
        <li>wystawiania faktur i realizacji obowiązków księgowych,</li>
        <li>dochodzenia lub obrony przed ewentualnymi roszczeniami,</li>
        <li>
          prowadzenia marketingu własnych usług, jeżeli jest to zgodne z
          obowiązującymi przepisami.
        </li>
      </ul>
      <p>
        Podstawą przetwarzania danych może być w szczególności wykonanie umowy,
        podjęcie działań przed jej zawarciem, obowiązek prawny, prawnie
        uzasadniony interes Administratora lub zgoda użytkownika.
      </p>

      <h2>3. Formularz kontaktowy</h2>
      <p>
        Podanie danych w formularzu kontaktowym jest dobrowolne, ale może być
        konieczne do udzielenia odpowiedzi, przygotowania oferty lub umówienia
        usługi.
      </p>
      <p>
        Dane przekazane w formularzu wykorzystujemy wyłącznie w zakresie
        niezbędnym do obsługi zgłoszenia oraz dalszego kontaktu dotyczącego
        usługi.
      </p>

      <h2>4. Komu możemy przekazywać dane?</h2>
      <p>
        Dane mogą być przekazywane podmiotom wspierającym nas w prowadzeniu
        działalności, w szczególności:
      </p>
      <ul>
        <li>biuru księgowemu,</li>
        <li>dostawcom hostingu i poczty elektronicznej,</li>
        <li>dostawcom systemów CRM,</li>
        <li>dostawcom usług informatycznych,</li>
        <li>operatorom systemów do umawiania terminów,</li>
        <li>podwykonawcom uczestniczącym w realizacji usługi,</li>
        <li>
          producentom lub serwisom urządzeń, jeżeli jest to konieczne np. do
          realizacji gwarancji,
        </li>
        <li>bankom i operatorom płatności,</li>
        <li>kancelariom prawnym,</li>
        <li>
          organom publicznym, jeżeli obowiązek przekazania danych wynika z
          przepisów prawa.
        </li>
      </ul>
      <p>Nie sprzedajemy danych osobowych innym podmiotom.</p>

      <h2>5. Jak długo przechowujemy dane?</h2>
      <p>
        Dane przechowujemy przez okres niezbędny do realizacji celu, dla którego
        zostały zebrane.
      </p>
      <p>
        Dane związane z wykonaniem usługi mogą być przechowywane również po jej
        zakończeniu przez okres wymagany przepisami podatkowymi, rachunkowymi
        oraz przez okres przedawnienia ewentualnych roszczeń.
      </p>
      <p>
        Dane wykorzystywane na podstawie zgody przechowujemy do momentu jej
        cofnięcia, o ile nie istnieje inna podstawa prawna dalszego
        przetwarzania.
      </p>

      <h2>6. Twoje prawa</h2>
      <p>Masz prawo do:</p>
      <ul>
        <li>dostępu do swoich danych,</li>
        <li>sprostowania danych,</li>
        <li>usunięcia danych,</li>
        <li>ograniczenia ich przetwarzania,</li>
        <li>przenoszenia danych w przypadkach przewidzianych przepisami,</li>
        <li>wniesienia sprzeciwu wobec przetwarzania,</li>
        <li>cofnięcia udzielonej zgody.</li>
      </ul>
      <p>
        Cofnięcie zgody nie wpływa na zgodność z prawem przetwarzania dokonanego
        przed jej cofnięciem.
      </p>
      <p>
        Jeżeli uważasz, że dane są przetwarzane niezgodnie z prawem, możesz
        złożyć skargę do{" "}
        <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong>.
      </p>

      <h2>7. Pliki cookies</h2>
      <p>
        Strona internetowa może korzystać z plików cookies niezbędnych do jej
        działania oraz – po uzyskaniu odpowiedniej zgody – z plików
        analitycznych lub marketingowych.
      </p>
      <p>Cookies mogą służyć m.in. do:</p>
      <ul>
        <li>zapewnienia prawidłowego działania strony,</li>
        <li>poprawy bezpieczeństwa,</li>
        <li>prowadzenia statystyk odwiedzin,</li>
        <li>analizy skuteczności działań reklamowych.</li>
      </ul>
      <p>
        Użytkownik może zarządzać plikami cookies za pomocą ustawień
        przeglądarki oraz mechanizmu zgody dostępnego na stronie.
      </p>

      <h2>8. Narzędzia zewnętrzne</h2>
      <p>
        W związku z funkcjonowaniem strony możemy korzystać z usług zewnętrznych
        dostawców, np. usług hostingowych, pocztowych, analitycznych,
        reklamowych lub systemów służących do obsługi klientów i umawiania
        terminów.
      </p>
      <p>
        Jeżeli korzystanie z określonego narzędzia wymaga zgody użytkownika,
        zostanie ono uruchomione dopiero po jej udzieleniu.
      </p>

      <h2>9. Bezpieczeństwo danych</h2>
      <p>
        Stosujemy odpowiednie środki techniczne i organizacyjne służące ochronie
        danych przed utratą, nieuprawnionym dostępem, zmianą lub ujawnieniem.
      </p>

      <h2>10. Kontakt</h2>
      <p>
        W sprawach dotyczących danych osobowych możesz skontaktować się z nami
        poprzez dane kontaktowe wskazane na stronie internetowej {legalName}
        {company.email ? (
          <>
            {" "}
            — e-mail:{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </>
        ) : null}
        .
      </p>

      <h2>11. Zmiany polityki prywatności</h2>
      <p>
        Polityka prywatności może być aktualizowana w szczególności w przypadku
        zmiany przepisów, zakresu działalności firmy lub wykorzystywanych na
        stronie narzędzi.
      </p>
      <p>
        Aktualna wersja polityki jest publikowana na stronie internetowej
        Administratora.
      </p>
    </>
  );
}
