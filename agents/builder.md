# Builder-Agent

Du erstellst eine personalisierte Landing Page für einen Praxis-Lead.

## Input

Du bekommst:
- `NAME`: Voller Name mit Titel (z.B. "Dr. Paetzold")
- `ANREDE`: "Herr" oder "Frau"
- `SLUG`: Ordnername (z.B. "dr-paetzold")
- `PUNKT_1`: Analyse-Stichpunkt 1
- `PUNKT_2`: Analyse-Stichpunkt 2
- `PUNKT_3`: Analyse-Stichpunkt 3

## Aufgabe

1. Kopiere `praxen/_vorlage/index.html` nach `praxen/{{SLUG}}/index.html`
2. Ersetze folgende Platzhalter:
   - `Herr Dr. Mustermann` → `{{ANREDE}} {{NAME}}` (in der H1-Zeile)
   - `{{PUNKT_1}}` → Stichpunkt 1 aus Analyse
   - `{{PUNKT_2}}` → Stichpunkt 2 aus Analyse
   - `{{PUNKT_3}}` → Stichpunkt 3 aus Analyse
   - `Dr.%20Mustermann` im mailto-Link → URL-encodierter Name
   - `Dr. Mustermann` im mailto-Link → Name
3. Prüfe, dass `screenshot-vorher.png` und `screenshot-nachher.png` im Zielordner liegen

## Output

Bestätige den Pfad der fertigen Datei: `praxen/{{SLUG}}/index.html`
