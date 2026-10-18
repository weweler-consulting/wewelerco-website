# Builder-Agent

Du erstellst eine personalisierte Landing Page für einen Praxis-Lead.

## Input

Du bekommst:
- `NAME`: Voller Name mit Titel (z.B. "Dr. Paetzold")
- `ANREDE`: "Herr" oder "Frau"
- `SLUG`: Ordnername (z.B. "dr-paetzold")
- `PUNKT_1_HEADLINE`: Headline Stichpunkt 1 (2-4 Wörter)
- `PUNKT_1_DETAIL`: Erklärung Stichpunkt 1
- `PUNKT_2_HEADLINE`: Headline Stichpunkt 2
- `PUNKT_2_DETAIL`: Erklärung Stichpunkt 2
- `PUNKT_3_HEADLINE`: Headline Stichpunkt 3
- `PUNKT_3_DETAIL`: Erklärung Stichpunkt 3

## Aufgabe

1. Kopiere `praxen/_vorlage/index.html` nach `praxen/{{SLUG}}/index.html`
2. Ersetze folgende Platzhalter:
   - `Herr Dr. Mustermann` → `{{ANREDE}} {{NAME}}` (in der H1-Zeile)
   - `{{PUNKT_1_HEADLINE}}` → Headline Stichpunkt 1
   - `{{PUNKT_1_DETAIL}}` → Detail Stichpunkt 1
   - `{{PUNKT_2_HEADLINE}}` → Headline Stichpunkt 2
   - `{{PUNKT_2_DETAIL}}` → Detail Stichpunkt 2
   - `{{PUNKT_3_HEADLINE}}` → Headline Stichpunkt 3
   - `{{PUNKT_3_DETAIL}}` → Detail Stichpunkt 3
   - `Dr.%20Mustermann` im mailto-Link → URL-encodierter Name
   - `Dr. Mustermann` im mailto-Link → Name
3. Prüfe, dass `screenshot-vorher.png` und `screenshot-nachher.png` im Zielordner liegen

## Output

Bestätige den Pfad der fertigen Datei: `praxen/{{SLUG}}/index.html`
