# /ytp — YTP · Your Tax Pal, sechs Designrichtungen

Internes Präsentations-Tool zum Durchklicken und Abstimmen. Statisch, kein
Backend, keine Anmeldung. Nicht indexiert: `<meta name="robots">` in der Seite,
`Disallow: /ytp/` in `public/robots.txt`, `X-Robots-Tag` über `public/.htaccess`.
Kein Sitemap-Eintrag (die Site führt keine Sitemap).

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Hülle: Kopf, Navigationsleiste, Bühne, Fußleiste, Feedback-Spalte. Lädt alle Schriften in **einem** Google-Fonts-Request. |
| `directions.js` | Alle Textinhalte zentral: `id`, `nummer`, `name`, `akzent`, `these`, `headline`, `lede`, `palette`, `fonts`, `claims`. Die Reihenfolge dieser Liste bestimmt Navigation, Zahlentasten 1–6 und Druckreihenfolge. |
| `app.js` | Navigation, Umschalten, Hash, Tastatur, Swipe, Skalierung, Direktvergleich, Feedback, Markdown-Export. Kennt keine Gestaltung. |
| `style.css` | Hülle plus geteiltes **Panel-Skelett** (nur Maße und Reihenfolge der sieben Blöcke) plus Druckregeln. |
| `panels/<id>-<name>.js` | Eine Datei je Richtung: Auszeichnung und komplette Gestaltung. Export: `{ id, css, html(d) }`. |

## Eine Richtung ändern

Text ändern → `directions.js`. Gestaltung ändern → die eine Datei unter
`panels/`. Die sechs Panels teilen sich nur die Layoutklassen `.pnl*` aus
`style.css`; alle Farben, Schriften, Linien und Flächen setzt jedes Panel
selbst unter seinem eigenen Präfix (`.d1a`, `.d1b`, …). Eine Richtung anfassen
berührt die anderen fünf nicht.

## Panel-Aufbau

Jedes Panel ist fix 1180 × 2000 px und wird per `transform: scale()` auf die
Breite der Bühne skaliert (`--s` setzt `app.js`, im Druck überschreibt
`style.css` auf 0,52 = eine A4-Seite je Richtung). Reihenfolge der Blöcke:

1. Wortmarke YTP
2. Headline
3. Erklärabsatz
4. Signature-Element der Richtung
5. Marken-Zeile: Negativ / Vollton / Icon
6. Palette + Schriftspiegel
7. Anwendung: Visitenkarte 400 × 232 + Claim-Fläche

## Bedienung

- Klick auf die Navigation, Pfeiltasten ← →, Zahlen 1–6, Swipe auf Touch.
- Aktive Richtung steht als Hash in der URL (`#1a` … `#2c`) und wird beim Laden
  respektiert — einzelne Richtung ist damit verlinkbar.
- „Alle 6 nebeneinander“ schaltet auf sechs skalierte Vorschauen; jede Vorschau
  springt per Klick in die Einzelansicht.
- Feedback-Spalte (Default eingeklappt): Daumen hoch/runter und Notiz je
  Richtung, gespeichert in `localStorage` unter `ytp-feedback-v1` — pro Browser,
  nicht geteilt. „Notizen als Markdown exportieren“ lädt alle sechs Bewertungen
  als `.md` herunter.
- Strg/Cmd+P druckt alle sechs Richtungen hintereinander, je Richtung eine
  A4-Seite, ohne Navigation und Feedback-Spalte.

## Regeln des Entwurfs

Keine abgerundeten Ecken (Ausnahme: das Kreissiegel in 2c), keine Schatten in
den Panels, keine Gradients, keine Icon-Libraries, keine Emoji. Flächen, Linien,
Typografie. Layout durchgängig flex/grid mit `gap`.
