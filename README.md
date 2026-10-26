# weweler.co

Website der Weweler Consulting S.L.

- `public/` – alles, was online ist. Push auf `main` deployt automatisch (Cloudron Surfer),
  PRs bekommen eine Vorschau unter `/preview/<branch>/`.
  - `index.html` – KI-Transformation (Startseite)
  - `unternehmen.html`, `impressum.html`, `datenschutz.html`
  - `en/` – englische Fassung (`index.html`, `company.html`, `imprint.html`, `privacy.html`).
    Jede Seite hat oben einen DE/EN-Umschalter und `hreflang`-Verweise auf ihr Gegenstück.
    Textänderungen immer in beiden Sprachen machen.
  - `vivienda-radazul/` – Wohnen auf Zeit
- `docs/` – Pläne und Specs
- `_archive/` – offline genommene Seiten und alte Werkzeuge, wird nicht deployt (siehe `_archive/README.md`)

Statische Seiten ohne Build. Pfade relativ halten, damit die PR-Vorschau funktioniert.
