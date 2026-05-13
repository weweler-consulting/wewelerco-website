# Vivienda Radazul — Long-Stay-Saisonvermietungs-Seite

**Datum:** 2026-05-13
**Status:** Approved (User-Review pending)
**Eigentümer:** Steffen & Ulrike Benndorf (Berlin), operativ Justus Weweler
**Ziel-URL:** `https://weweler.co/vivienda-radazul/`

---

## 1. Kontext

Die Eigentümer (Familie Benndorf) besitzen seit Januar 2026 eine 95 m² Wohnung in der Wohnanlage "Costamar" in Radazul (Gemeinde El Rosario, Teneriffa). Die Wohnung soll als **Saisonmiete** (*arrendamiento de temporada* nach LAU Art. 3) für Aufenthalte von **1, 2 oder 3 Monaten** vermietet werden — ausdrücklich **keine** Ferienvermietung.

Rechtlicher Rahmen (vollständige Analyse: `/Users/justus/Developer/radazul-analyse/`):

- Touristische Vermietung (*vivienda vacacional*) ist in El Rosario aktuell nicht lizenzierbar (kein PGO mit zulässiger touristischer Bodennutzung).
- Vermarktung über Airbnb/Booking/Vrbo ist nicht zulässig — würde NRUA-Pflicht aktivieren und operative Nähe zur illegalen Ferienvermietung schaffen.
- Saisonmiete erfordert: Hauptwohnsitz des Mieters im Heimatland + dokumentierbare *causa* (Beruf, Sabbatical, Überwinterung, Genesung).
- Keine touristischen Zusatzleistungen (keine Reinigung während Aufenthalt, kein Frühstück, kein Bettwäschewechsel).
- Direktvermarktung über eigene Webseite ohne Online-Buchungs-Funktion bleibt NRUA-frei.

Die Seite ist somit ein **Direktvermarktungs-Kanal** für gezielte Long-Stay-Anfragen, keine Buchungsplattform.

## 2. Ziele

**Primär:** Anfragen per WhatsApp generieren von der richtigen Zielgruppe (Long-Stay, dokumentierbare *causa*, zahlungskräftig).

**Sekundär:**
- Vertrauenssignale gegenüber 60+-Überwinterern aufbauen (Direktvermietung mit Mietvertrag wirkt seriöser als Airbnb).
- SEO-Anker für Begriffe wie "Überwintern Teneriffa", "Saisonmiete Radazul", "Workation Tenerife 3 Monate".
- Visueller Beweis der Wohnqualität — die Wohnung ist hell, mediterran, fast Boutique-Hotel-Look.

**Anti-Ziele (was die Seite NICHT tun darf):**
- ❌ "Ferienwohnung", "Urlaub", "vacation", "buchen", "Übernachtung"-Vokabular
- ❌ Online-Buchungs-Widget, Verfügbarkeitskalender mit Tages-Preisen
- ❌ Airbnb-Optik, Gäste-Bewertungen, "Superhost"-Signale
- ❌ Familienurlaub-Framing
- ❌ Touristische Aktivitäten verlinken/empfehlen
- ❌ Spanisch (Zielgruppe hat Hauptwohnsitz im Heimatland, nicht in ES)
- ❌ Mehrere parallele WhatsApp-Nummern (eine zentrale Anlaufstelle)

## 3. Zielgruppe

Primär (in Reihenfolge der Marktattraktivität laut Rechtsanalyse):

1. **Skandinavische / mitteleuropäische Überwinterer (60+)** — Nov–März, 2–3 Monate. Rentner mit Hauptwohnsitz im Heimatland. Sehr hohe Erreichbarkeit (etablierte Community auf Teneriffa).
2. **Deutsche / europäische Remote Worker** — 1–3 Monate. Heimat-Anstellung, brauchen verlässliches Internet + ruhigen Schreibtisch.
3. **Sabbatical / Auszeit-Aufenthalt** — 2–3 Monate. Eigenerklärung zur Saisonnutzung reicht.
4. **Genesungsaufenthalt** — 1–2 Monate. Selten, aber rechtlich sauber dokumentierbar.

**Bewusst ausgeschlossen:** Klassische Touristen, wechselnde Kurzzeitmieter, Familien für 1–2 Wochen Strandurlaub.

## 4. Sprachen

- **Deutsch** (primär — Hauptmarkt, deutsche Community auf Teneriffa ist groß und zahlungskräftig)
- **Englisch** (sekundär — Skandinavier, Niederländer, internationale Remote Worker)
- **Spanisch wird NICHT angeboten** — Mieter müssen Hauptwohnsitz außerhalb Spaniens halten, ES-Sprachfassung würde falsches Signal senden und ist marketingseitig nicht ROI-positiv.

Technische Umsetzung: `i18n.js`-Pattern wie in `wohnung-pankow` — `data-i18n` Attribute, Sprach-Switch in der Topbar, Default DE.

## 5. Look & Feel

**Schwester-Design zu `wohnung-pankow`**, mit drei deliberaten Abweichungen für Wärme:

| Element | Pankow | Vivienda Radazul |
|---|---|---|
| Hintergrund | Reines Weiß | Off-White, leicht warmer Ton (`#faf9f6`) |
| Akzentfarbe | Dunkles Marineblau, sachlich | **Türkis-Tiefseegrün `#4a8a8a`** (aus den Mosaik-Küchenfliesen der Wohnung) |
| Tonalität | Editorial, sachlich, fast Magazin | Editorial, aber wärmer — Eigentümer-spricht-direkt-mit-Mieter |
| Bild-Anteil | Mittel | Höher — Wohnung soll atmosphärisch wirken |

**Typografie (identisch zu Pankow):**
- Display: Newsreader (Google Fonts) — Serif, variabel
- Body: Inter — Sans-Serif
- Monospace (für Datumsangaben/Eckdaten): JetBrains Mono

**Farbpalette:**
- Background: `#faf9f6` (warmes Off-White)
- Text primary: `#1a1f24`
- Text muted: `#5a6470`
- Accent: `#4a8a8a` (Türkis-Tiefseegrün, Mosaik-Inspiration)
- Accent secondary: `#c9a87a` (warmes Holzbraun für sekundäre Highlights)
- Border / divider: `#e8e4dc`

## 6. Section-Struktur

Sequenziell von oben nach unten (10 Sections):

### 6.1 Topbar (sticky)
- Links: `Vivienda Radazul · Saisonmiete 1–3 Monate`
- Mitte: `Verfügbar ab 01.07.2026`
- Rechts: DE / EN Sprach-Switch · WhatsApp-Icon-Button (CTA #1)

### 6.2 Hero (above the fold)
- Bild: `IMG_5494` (Balkon-Blick über Esstisch auf Atlantik + Hafen Radazul) — Hochformat-Hero rechts, Text links
- Meta-Zeile: `Radazul · Teneriffa · Direkt vom Eigentümer`
- H1: *"Wohnen auf Zeit am Atlantik."* (Newsreader, Italic für "Zeit")
- Sub: *"95 m² mit Meerblick. 1, 2 oder 3 Monate. Für Überwinterer, Remote Worker und Sabbaticals — direkt vom Eigentümer, mit Mietvertrag, ohne Plattform."*
- Hero-Facts (4 inline): Größe `95 m²` · Räume `3 SZ · 2 Bad` · Lage `1. OG · Süd` · Frei ab `01.07.2026`
- CTA: `Anfrage per WhatsApp →` (öffnet wa.me-Link mit vorgefüllter Nachricht)

### 6.3 Hook (kurzer Fließtext)
Eine Passage Eigentümer-zu-Mieter-Wording. Macht klar:
- Wir sind die Eigentümer, kein Vermittler.
- Wir vermieten direkt, mit zweisprachigem Mietvertrag.
- Wir suchen ruhige, längere Aufenthalte — keine Wochenende-Pendler.

### 6.4 Für wen die Wohnung gemacht ist (drei Kacheln)
Drei nebeneinander stehende Profile mit Icon/Symbol:
1. **Überwinterer (Nov–März)** — Dem nassen Norden für 2–3 Monate entkommen. 20 °C, blauer Himmel, ruhige Wohngegend.
2. **Remote Worker (1–3 Monate)** — 300 Mbit Glasfaser, ruhiger Schreibtisch, Pool unter dir, Atlantik vor der Tür.
3. **Sabbatical / Auszeit (2–3 Monate)** — Genug Zeit, um anzukommen. Voll möbliert, du brauchst nur deinen Koffer.

### 6.5 Eckdaten (Tabelle)
Im Stil der Pankow-Eckdaten-Tabelle:

| Größe | 95 m² Wohnfläche + 20 m² Balkon |
| Räume | 3 Schlafzimmer (5 Schlafplätze) · 2 Bäder · offene Küche · Wohnzimmer |
| Lage | 1. Stock · Südausrichtung · Meerblick |
| Distanzen | 25 m zum Atlantik · Gemeinschaftspool im Haus · Spielplätze, Restaurants, Supermarkt fußläufig |
| Anbindung | 20 Min Santa Cruz · 40 Min Flughafen TFS |
| Internet | Glasfaser 300 Mbit |
| Parkplatz | 1 Stellplatz inklusive |
| Mietdauer | 1, 2 oder 3 Monate (Mindestaufenthalt 30 Tage) |
| Vertragsform | *arrendamiento de temporada* — zweisprachiger Mietvertrag DE/ES |
| Verfügbar ab | **01.07.2026** |
| Miete | Auf Anfrage — Hochsaison (Nov–März, Juli/August) und Nebensaison (Apr–Juni, Sept–Okt) unterscheiden sich |

### 6.6 Galerie I — Wohnen, Küche, Pool, Außen (scrollbar)
Horizontal scrollende Galerie wie in Pankow, gemischte Formate (wide / tall / square):
- `IMG_5494` Balkon mit Atlantik-Blick (wide)
- `IMG_5497` Pool mit Bergpanorama (square)
- `IMG_5498` Wohnzimmer mit Palmen-Prints (tall)
- `IMG_5502` Wohnzimmer aus anderem Winkel (wide)
- `IMG_5499` Sofa mit Fensterblick (tall)
- `IMG_5500` Küche mit Durchreiche + Barhocker (square)
- `IMG_5503` Küche Mosaik-Fliesen (tall)
- `IMG_5504` Küche komplett (wide)
- `IMG_5501` Wohnbereich mit Strand-Print (square)

### 6.7 Saison & Anfrage (Preis-Block, OHNE konkrete Zahlen)
Zwei-Spalten-Block:

**Linke Spalte — Saisonen:**
- **Hochsaison** — November bis März, Juli/August
- **Nebensaison** — April bis Juni, September/Oktober

**Rechte Spalte — Anfrage-Hinweis:**
> Die Miete richtet sich nach Saison, Mietdauer und Aufenthaltsgrund. Wir machen dir ein konkretes Angebot, sobald wir deinen Zeitraum kennen.
>
> Schreib uns per WhatsApp — du bekommst eine Antwort innerhalb von 24 Stunden.

CTA: `Anfrage stellen → WhatsApp`

### 6.8 Galerie II — Schlafzimmer & Bäder
- `IMG_5514` Master mit Doppelbett + Palmen-Kissen (wide)
- `IMG_5516` Master Detail (square)
- `IMG_5508` Zweites Schlafzimmer mit zwei Einzelbetten (tall)
- `IMG_5511` Drittes Schlafzimmer mit Bett + Schminktisch (tall)
- `IMG_5507` Lattenkopfteil-Detail (square)
- `IMG_5510` Badezimmer (tall)
- `IMG_5515` Sessel-Ecke (square)

### 6.9 Lage Radazul
Text + optional einfache Karte (statisches Bild ist akzeptabel, kein interaktives Embed):
- Radazul gehört zur Gemeinde El Rosario, Teneriffa-Ost
- Hafenbecken vor der Tür, Schwimmen direkt am Felsen
- Restaurants, Supermarkt, Spielplätze fußläufig (3–8 Min)
- 20 Min nach Santa Cruz de Tenerife (Hauptstadt)
- 40 Min nach Flughafen Tenerife Süd (TFS)
- Ruhige Wohngegend, mediterran, mehr Spanier als Touristen

### 6.10 So läuft eine Anfrage (Vertrauens-Block, 5 Schritte)
Nummerierte Liste, signalisiert Seriosität und Abgrenzung zu Airbnb:

1. **Du schreibst uns** per WhatsApp oder E-Mail mit Zeitraum und Anlass deines Aufenthalts (Überwintern, Remote Work, Sabbatical, Genesung).
2. **Wir antworten innerhalb 24 h** mit einem konkreten Mietangebot, dem zweisprachigen Mietvertrag (Deutsch/Spanisch) und der Inventarliste.
3. **Vertrag wird unterzeichnet** (digital oder per Post). Du legitimierst dich mit Personalausweis und kurzem Nachweis deines Hauptwohnsitzes.
4. **Kaution** (1–2 Monatsmieten) wird vor Mietbeginn überwiesen.
5. **Schlüsselübergabe vor Ort** in Radazul, gemeinsames Übergabeprotokoll, ab dann ist die Wohnung deine.

Schließsatz: *"Keine Online-Buchung. Keine Plattform-Gebühren. Direkter Draht zu den Eigentümern."*

### 6.11 CTA-Schluss-Block + Footer
- Großer schließender Block: *"Bereit für 1–3 Monate Atlantik?"*
- Zwei CTAs: `Anfrage per WhatsApp →` (primär) und `E-Mail an justus@weweler.co →` (sekundär)
- Footer: Impressum + Datenschutz-Links

### 6.12 Sticky WhatsApp-Button (mobile + desktop)
Floating Button rechts unten, immer sichtbar. Öffnet `wa.me/34689575062` mit vorgefüllter Nachricht:
> *"Hola, ich interessiere mich für die Vivienda Radazul. Mein Wunsch-Zeitraum: [Datum] bis [Datum], Grund: [Überwintern / Remote Work / Sabbatical]. Danke!"*

## 7. Technische Architektur

**Dateistruktur** (folgt dem Pankow-Pattern):
```
public/vivienda-radazul/
├── index.html
├── style.css
├── i18n.js
└── images/
    └── IMG_5494.jpeg ... IMG_5516.jpeg (16 Bilder, bereits vorhanden)
```

**Stack:** Statisches HTML/CSS/JS — kein Build-Step, kein Framework, kein Node-Server. Deployment durch einfaches Hochladen der Dateien (gleiche Methode wie `wohnung-pankow`).

**i18n.js:** Übernehme das Pattern aus `wohnung-pankow/i18n.js`. Default-Sprache Deutsch, persistiere Auswahl in `localStorage`.

**Fonts:** Google Fonts via `<link>`-Preconnect (wie Pankow):
- Newsreader (`ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400`)
- Inter (`wght@400;500;600`)
- JetBrains Mono (`wght@400;500`)

**SEO/Meta:**
- `<title>`: "Vivienda Radazul — Saisonmiete 1–3 Monate · Teneriffa"
- `<meta name="description">`: "95 m² mit Meerblick in Radazul, Teneriffa. Saisonmiete 1–3 Monate für Überwinterer, Remote Worker und Sabbaticals. Direkt vom Eigentümer, ab 01.07.2026."
- Open Graph: `og:image` auf `IMG_5494.jpeg` (Hero-Bild)
- `canonical` auf `https://weweler.co/vivienda-radazul/`
- `lang="de"` Default, JS togglet zu `lang="en"` bei Sprach-Switch

**WhatsApp-Link (DE-Default):**
```
https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!
```

**E-Mail-Link:**
```
mailto:justus@weweler.co?subject=Anfrage%20Vivienda%20Radazul&body=Hola%2C%0A%0Aich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%0A%0AZeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%0AGrund%20des%20Aufenthalts%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D%0APersonen%3A%20%5BAnzahl%5D%0A%0ADanke%21
```

## 8. Compliance-Hinweise auf der Seite (sehr knapp im Footer)

Keine prominenten Disclaimer, aber:
- **Footer-Text:** "Vermietung als *arrendamiento de temporada* nach LAU Art. 3. Mindestaufenthalt 30 Tage. Keine touristische Vermietung."
- **In Section 6.10 Schritt 1** explizit nach Anlass des Aufenthalts fragen — das dokumentiert die *causa* von Anfang an.

## 9. Akzeptanz-Kriterien

Die Seite ist fertig, wenn:
- [ ] DE-Version vollständig, EN-Version vollständig (über i18n)
- [ ] Mobil + Desktop sauber (Breakpoint ≤ 768 px)
- [ ] Hero-Bild lädt < 200 ms (Bildoptimierung erforderlich — Original-JPEGs sind groß)
- [ ] WhatsApp-Link öffnet auf Mobile direkt die App, auf Desktop wa.me-Web
- [ ] Sticky WhatsApp-Button auf allen Bildschirmgrößen sichtbar
- [ ] Kein "Buchen"/"Book"/"Reservar"-Wording auf der Seite
- [ ] Kein Tagespreis, kein Verfügbarkeitskalender
- [ ] Alle 16 Bilder verwendet, keines fehlt
- [ ] Lighthouse Performance ≥ 90 (statische Seite, sollte easy)
- [ ] Validates HTML (W3C)

## 10. Nächste Schritte nach Spec-Approval

1. `writing-plans`-Skill aufrufen → Implementation-Plan
2. Implementation in dieser Reihenfolge:
   - Bild-Audit und Optimierung (16 JPEGs prüfen, ggf. komprimieren)
   - HTML-Skelett mit `data-i18n`-Markern
   - CSS (Variablen-System wie Pankow, dann section-spezifische Styles)
   - i18n.js mit DE+EN-Mappings
   - Lokales Testen + Lighthouse + Mobile-Check
3. Commit + Deployment (Methode wie bei Pankow — vermutlich GitHub Pages oder via existierende Pipeline)
