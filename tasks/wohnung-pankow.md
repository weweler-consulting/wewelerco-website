# Wohnung Berlin-Pankow — Stand der Dinge

Stand: 29.04.2026 · Live unter **https://weweler.co/wohnung-pankow/**

---

## Was die Seite ist

Editorial OnePager für die private Nachmieter-Suche. Genossenschaftswohnung in Berlin-Pankow-Rosenthal, 4 Zi · 115 m² · 2. Stock Süd, frei ab 01.09.2026. Wir geben sie ab, weil wir nach Spanien gezogen sind.

**Bewerbungsschluss: 11.05.2026.** Danach übergibt die Hausverwaltung den Prozess.

## Wichtige Daten der Wohnung (Single Source of Truth: die Seite)

| | |
|---|---|
| Adresse | Mittelstraße 2, 13158 Berlin-Pankow (Rosenthal) |
| Größe | 115,07 m² · 4 Zimmer · 2. Stock Süd |
| Genossenschaft | Wohnungsbaugenossenschaft DPF eG |
| Kaltmiete | 1.841,12 € |
| Warmmiete | 2.243,87 € |
| Warmmiete + Stellplatz | 2.338,87 € / Monat (E-Auto: 2.366 €) |
| Einmalig an Genossenschaft | 5.854 € (5.704 € rückzahlbar) |
| Pflicht-Paket Einbauten | 6.200 € (verhandelbar, geht in Eigentum) |
| Einmalig gesamt | 12.054 € (5.704 € rückzahlbar) |
| Effektiv ausgegeben | 6.350 € |
| Bewerbungsschluss | **11.05.2026** |
| Einzug | 01.09.2026 |

## Files

```
public/wohnung-pankow/
├── index.html      Editorial OnePager mit i18n-Markup
├── style.css       Styling (Newsreader Serif + Inter + JetBrains Mono)
├── i18n.js         DE/EN Strings + Boot-Logik (~170 Keys)
└── images/         20 JPGs · 17 verwendet · img-18/19/20 ungenutzt im Ordner
```

Außerhalb des Repos:

- `~/Desktop/wohnung-pankow-kleinanzeigen.md` — Kleinanzeigen-Inserat DE + EN-Summary
- `public/images-flat/` (untracked) — Roh-iPhone-Fotos, ~16 MB, Duplikat zu `images/`

## Design-Charakter

- **Stil:** Editorial × persönlich × wohnlich · kein Maklerlook
- **Schrift:** Newsreader (Serif) für Headlines, Inter (Sans) für Fließtext, JetBrains Mono für Mono-Akzente
- **Farben:** Off-White Bg `#F2EDE4` · Anthrazit-Text · ein Akzent: **Terrakotta** `#B5572E`
- **Layout-Module:** Hero-Split, römisch nummerierte Section-Header, zwei horizontal scrollende Galerien mit Drag-Scroll + Fade-Edge, Eckdaten-Tabelle als Definition-List, Timeline, Fillout-Form-Section

## Inhaltliche Sektionen (Reihenfolge)

1. Topbar (Brand · Meta · Lang-Switch · Bewerben-CTA)
2. Hero (Bild + H1 + Subline + Eckdaten + CTA)
3. Hook (3-Absatz Editorial-Text)
4. Eckdaten-Tabelle (I.)
5. Galerie I — Wohnung von innen, 7 Bilder (II.)
6. Detail — Innen/Außen Listen (III.)
7. Galerie II — Schlafen/Bad/Außen, 9 Bilder (IV.)
8. Lage mit OpenStreetMap-Iframe (V.)
9. Was kostet einmalig (VI.)
10. Pflicht-Paket Einbauten, 8 Posten inkl. FRITZ!Box + UniFi-Mesh (VII.)
11. Optional dazu (VIII.)
12. Laufende Mietkonditionen (IX.)
13. Was wir bei euch sehen wollen (X.)
14. Zeitplan / Timeline (XI.)
15. Wer wir sind (XII.)
16. Bewerbungsformular (Fillout)
17. Footer

## Bewerbungsformular (Fillout)

- **Anbieter:** Fillout (https://fillout.com)
- **Form-ID:** `wYxAwPhhe8us`
- **Form-URL:** https://weweler.fillout.com/t/wYxAwPhhe8us
- **Embed:** Standard-Embed mit `data-fillout-dynamic-resize` in der Sektion `id="bewerbung"`
- **Felder:** mehrseitig — Wer seid ihr / Eure Situation / Finanzen (mit Datei-Uploads) / Übernahme / Über euch / Abschluss

## i18n

- DE Default · EN über `?lang=en` oder Browser-Detection
- Persistierung in `localStorage` (`lang`)
- Toggle oben rechts in der Topbar
- Strings in `i18n.js`, Keys mit `data-i18n="..."` (innerHTML) und `data-i18n-attr="attr:key"` (Attribute)

## Deployment

Push auf `main` → automatisches Deployment via GitHub Actions auf Cloudron Surfer (`.github/workflows/deploy-surfer.yml`). Branch-Previews unter `/preview/<branch>/`. Sekunden bis Minuten Latenz.

## Offene Punkte / Open Loop

- [ ] **Fillout-Settings verifizieren:** E-Mail-Notification an justus@kideon.de, Datei-Upload-Limits (HEIC + große PDFs), Submit-Thank-You-Text, Datenschutz-Link im Footer
- [ ] **Energieausweis kWh-Wert** raussuchen (Pflichtangabe für Kleinanzeigen, optional auf der Seite)
- [ ] **`public/images-flat/`** entscheiden: löschen, gitignoren oder committen (~16 MB Roh-Fotos)
- [ ] **3 ungenutzte Bilder** (`img-18-flur-kinder.jpg`, `img-19-flur.jpg`, `img-20-flur-blau.jpg`) — entweder in Galerie 2 ergänzen oder aus `images/` löschen
- [ ] **OG-Preview testen:** Link in WhatsApp/Slack ziehen, prüfen ob Hero-Bild + Titel sauber rendern
- [ ] **Mobile-QA:** echtes Handy-Test (iOS + Android) — Galerie-Drag, Form-Embed, Topbar-Layout
- [ ] **Nach 11.05.2026:** Seite deaktivieren oder Status auf "Vermietet" setzen, Fillout-Form schließen, eingegangene Bewerberdaten DSGVO-konform löschen

## Wenn du später weiterarbeitest

1. **Live prüfen:** `https://weweler.co/wohnung-pankow/`
2. **Lokal öffnen:** `open public/wohnung-pankow/index.html` — kein Dev-Server, kein Build-Step
3. **Inhalt ändern:** Texte stehen im HTML als Default UND in `i18n.js` (DE + EN). Beide updaten — sonst verliert man die Sprach-Symmetrie
4. **Style anpassen:** alle CSS-Variablen oben in `style.css` (`:root`), Akzentfarbe ändert sich an einer Stelle
5. **Bilder ergänzen:** ins `images/`-Verzeichnis legen, mit `img-XX-name.jpg` Namensschema, dann im HTML einfügen + Caption in `i18n.js` ergänzen
6. **Form ändern:** über fillout.com/login (Form-ID `wYxAwPhhe8us`)
7. **Deployen:** `git push origin main` → Auto-Deploy

## Letzte relevante Commits

```
7f6afa1  Merge PR #1: Add WiFi equipment to Pflicht-Paket (FRITZ!Box + UniFi)
0af1f36  Make gallery sideways-scroll affordance obvious
31025e3  Wire up Impressum/Datenschutz links, move to bottom-right, update email
f16a0ae  Polish Pankow page: nav styling, Eckdaten rows, copy
d2816de  Add Pankow apartment takeover one-pager (Mittelstraße 2)
```
