# /kanzlei — interne Entwurfsvorlage

Statische Präsentationsseite für zwei Namens- und Designrichtungen einer
Neugründung. Rein HTML und CSS, kein Framework, kein Build, keine Analytics,
keine Anmeldung. Das einzige Skript ist ein Theme-Umschalter (hell/dunkel) von
rund zwanzig Zeilen, inline in jeder Seite.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | Einordnung, drei Einstiegskarten, „Worum es bei der Entscheidung geht“ |
| `werkbank.html` | Richtung 1: YTP und XOLVED in derselben nüchternen Farbwelt |
| `nacht-karbon.html` | Richtung 2: YTP in Nacht & Champagner, XOLVED in Karbon & Signal |
| `radikal.html` | Richtung 3: YTP als Aktenzeichen, XOLVED als Strike |
| `style.css` | Die einzige Stylesheet-Datei für alle vier Seiten |
| `../robots.txt` | Muss im Wurzelverzeichnis der Domain liegen |
| `../.htaccess` | Optional, nur für Apache — setzt `X-Robots-Tag` für `/kanzlei` |

Die Übersicht zeigt alle drei Richtungen gleichrangig als Karten, jede mit
beiden Wortmarken in ihrer eigenen Farbwelt. Jede Karte führt auf ihre Seite.

Richtung 3 bricht bewusst mit den beiden anderen: zwei Panels mit festen
Innenmaßen (1180 px), eigene Schriften, eigene Paletten, keine Rundungen, keine
Icons, keine Verläufe. Anker `#3a` (Aktenzeichen, YTP) und `#3b` (Strike,
XOLVED). Sie folgt nicht der Gliederung der Richtungen 1 und 2, sondern ihrer
eigenen — Hero, Claim, Marken-Mechanik, Palette, Satz, Anwendung.

Richtung 1 und 2 enthalten je Namensvorstellung in dieser Reihenfolge: Kernidee mit Claim,
Wortmarke in zwei Varianten (positiv und negativ), Farbpalette mit Hexwerten,
Rollen und Kontrasttabelle, Typografie mit Schnitten und Größenskala,
Website-Hero, Briefkopf im DIN-A4-Verhältnis und einen Absatz zur Abgrenzung.

## Deploy

Statisches Hosting genügt — es wird nichts kompiliert und nichts serverseitig
ausgeführt.

1. Den Ordner `kanzlei/` unverändert in das Wurzelverzeichnis der Domain legen,
   sodass die Seite unter `https://weweler.co/kanzlei/` erreichbar ist.
2. `robots.txt` gehört in das **Wurzelverzeichnis**, nicht in `/kanzlei`:

   ```
   User-agent: *
   Disallow: /kanzlei/
   ```

3. Optional `.htaccess` ebenfalls ins Wurzelverzeichnis. Sie setzt für alle
   Pfade unter `/kanzlei` den Header `X-Robots-Tag: noindex, nofollow`. Das
   wirkt nur auf Apache-Servern mit `mod_headers`, `mod_setenvif` und erlaubtem
   `AllowOverride`. Andere Hostings (nginx, Cloudron/Surfer, Netlify, S3)
   ignorieren die Datei — der Schutz liegt dann bei `robots.txt` und dem
   `<meta name="robots">`-Tag, der in jeder Seite steht.

In diesem Repository ist `public/` das Wurzelverzeichnis der Domain; die
Dateien liegen bereits richtig. Achtung beim Deploy-Schritt der GitHub Action:
`surfer put public/* …` erfasst keine Dateien, die mit einem Punkt beginnen.
`public/.htaccess` muss deshalb, falls gewünscht, ausdrücklich mit übertragen
werden.

## Nicht indexieren — drei Ebenen

1. `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` in
   jedem `<head>`. Wirkt überall, unabhängig vom Hosting.
2. `/robots.txt` mit `Disallow: /kanzlei/`.
3. `X-Robots-Tag` per `.htaccess`, wo Apache das zulässt.

Die Seiten enthalten zusätzlich `<meta name="referrer" content="no-referrer">`,
damit die URL beim Klick auf einen externen Link nicht weitergereicht wird.
Verlinkt wird von außen nichts — die Adresse wird direkt weitergegeben.

## Schriften

Über Google Fonts, ein Stylesheet-Link je Seite: IBM Plex Sans, IBM Plex Mono,
Source Serif 4, Sora, Newsreader, Space Grotesk, Chivo, JetBrains Mono. Für
Richtung 3 kommen auf `radikal.html` Archivo Black, Archivo 400/900 und Space
Mono 400/700 dazu, Newsreader dort zusätzlich kursiv; `index.html` lädt dieselbe
Liste, weil die dritte Einstiegskarte die Wortmarken vorwegnimmt. Ohne
Netzverbindung greifen die Systemschriften als Ersatz; die Seite bleibt lesbar,
die Wortmarken verlieren aber ihre Form.

## Technische Hinweise

- Ab 900 px zweispaltig, darunter einspaltig gestapelt. Die Einstiegskarten auf
  der Übersicht stehen ab 900 px zu dritt nebeneinander.
- Die beiden Panels der Richtung 3 haben feste Innenmaße und werden auf schmalen
  Viewports über gestufte `zoom`-Werte proportional verkleinert — sie brechen
  nicht um, sie werden nur kleiner. Fehlt `zoom` (Firefox vor 126), bleibt der
  Streifen bei 1180 px und lässt sich waagerecht scrollen.
- Die Wortmarken sind Inline-SVG mit `<text>`, keine gezeichneten Pfade. Sie
  erben ihre Farben aus der jeweiligen Palette (CSS-Variablen) und lassen sich
  daher unverändert in jede Farbwelt setzen.
- Der Theme-Umschalter betrifft nur den Rahmen der Präsentation. Die Muster —
  Wortmarken, Hero, Briefkopf — zeigen ihre helle und dunkle Fassung immer
  beide, unabhängig vom eingestellten Theme.
- Website-Hero und Briefkopf skalieren über Container-Anfragen (`cqw`). Für
  ältere Browser ohne `container-type` liegt ein Fallback mit festen Größen im
  Stylesheet.
- Alle angegebenen Kontrastwerte sind gerechnet, nicht geschätzt. Jede
  Text-auf-Fläche-Kombination der drei Paletten erfüllt mindestens WCAG AA;
  Kombinationen, die das nicht tun, stehen in den Tabellen ausdrücklich als
  unzulässig mit der jeweiligen Ersatzfarbe.

## Inhalt

Alle Angaben sind Beispielmaterial: Anschriften, Registernummern, Bankdaten,
Mandatsnummern und Daten sind erfunden. Rechtsform im Beispiel ist die GmbH.
