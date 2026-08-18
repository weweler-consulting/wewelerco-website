/* Zentrale Textinhalte aller sechs Richtungen.
   Die Panels lesen ausschließlich hieraus — Reihenfolge dieser Liste
   bestimmt Navigation, Zahlentasten 1–6 und Druckreihenfolge. */

export const directions = [
  {
    id: '1a',
    nummer: 1,
    name: 'SCHALTPLAN',
    akzent: '#1B3BFF',
    these:
      'Der Abschluss ist ein Lauf mit fester Reihenfolge — die Marke zeichnet diesen Lauf als Schaltplan, mit einer durchgehenden Achse und einem einzigen menschlichen Knoten.',
    headline: 'Der Jahresabschluss ist ein Systemlauf, keine Handarbeit.',
    lede:
      'YTP erstellt Jahresabschlüsse für Holdinggesellschaften mit Sonderfällen: mehrstufige Beteiligungen, Depot, Immobilien, Darlehen, Umwandlungsvorgänge nach §§ 20/21/22 UmwStG. Jeder Abschluss läuft über dieselbe Kette definierter Schritte, in derselben Reihenfolge, mit denselben Prüfungen. Freigegeben wird von einem Berufsträger.',
    palette: [
      { hex: '#F4F4EF', name: 'Papier' },
      { hex: '#14141A', name: 'Graphit' },
      { hex: '#1B3BFF', name: 'Achse' },
    ],
    fonts: ['Space Grotesk 700', 'IBM Plex Mono', 'Newsreader'],
    claims: ['Abschluss auf Achse.', 'Fristen sind Physik.'],
  },
  {
    id: '1b',
    nummer: 2,
    name: 'PAL',
    akzent: '#FF4D14',
    these:
      'Die Marke tritt als Gegenentwurf zur Kanzlei auf: laut, direkt, in der Sprache des Mandanten — und behält die Berufsträgerschaft als Pointe.',
    headline: 'Ihr Steuerberater ruft nicht zurück. Wir sind schon fertig.',
    lede:
      'Bilanzsumme über 500 T€, mehrstufige Beteiligungen, Umwandlungsvorgänge: die Fälle, für die anderswo eine Rückrufliste geführt wird. Wir arbeiten AI-first, der Abschluss läuft über das Geschäftsjahr mit. Gezeichnet wird trotzdem von einem Berufsträger.',
    palette: [
      { hex: '#FFF3E6', name: 'Kalk' },
      { hex: '#14100D', name: 'Ruß' },
      { hex: '#FF4D14', name: 'Signal' },
    ],
    fonts: ['Archivo Black', 'IBM Plex Mono', 'Newsreader kursiv'],
    claims: ['Pal, nicht Papiertiger.'],
  },
  {
    id: '1c',
    nummer: 3,
    name: 'MASCHINE',
    akzent: '#00E5A0',
    these:
      'Die Marke zeigt den Abschluss als laufenden Prozess in einem Terminal — sichtbare Schritte, sichtbare Laufzeiten, und am Ende eine Unterschrift, die nicht automatisiert wird.',
    headline: 'Der erste Abschluss, den ein Agent schreibt und ein Berufsträger unterschreibt.',
    lede:
      'Der Lauf beginnt mit der Datenübernahme und endet mit der Freigabe. Dazwischen konsolidiert, prüft und dokumentiert ein Agent: mehrstufige Beteiligungen, Depot, Immobilien, Darlehen, Einbringungen nach §§ 20/21/22 UmwStG. Unterschrieben wird von einem Steuerberater — § 50 StBerG ist die Grenze der Automatisierung.',
    palette: [
      { hex: '#08090A', name: 'Void' },
      { hex: '#00E5A0', name: 'Lauf' },
      { hex: '#EAF2EE', name: 'Kreide' },
    ],
    fonts: ['Chivo Mono 700', 'Chivo Mono 400', 'Newsreader'],
    claims: ['Wir haben den Abschluss automatisiert. Die Verantwortung nicht.'],
  },
  {
    id: '2a',
    nummer: 4,
    name: 'DIE GRENZE',
    akzent: '#FF2D16',
    these:
      'Die Marke positioniert sich über die AGB-Grenzen des Wettbewerbs: Rot markiert ausschließlich Grenzwerte, alles andere bleibt schwarz auf weiß.',
    headline: 'Die Fälle, die eine Plattform ablehnen muss.',
    lede:
      'Plattformen ziehen ihre Grenzen in den AGB: Bilanzsumme, Beteiligungsebenen, Depot, Immobilien, Darlehen, Umwandlungsvorgänge. Was darüber liegt, wird abgelehnt oder weitergereicht. Genau dort beginnt das Mandat von YTP.',
    palette: [
      { hex: '#FFFFFF', name: 'Weiß' },
      { hex: '#0F1113', name: 'Ink' },
      { hex: '#FF2D16', name: 'Grenze' },
    ],
    fonts: ['Archivo 900', 'IBM Plex Mono', 'Newsreader'],
    claims: ['Kein Paket. Ein Sachverhalt.'],
  },
  {
    id: '2b',
    nummer: 5,
    name: 'KOLLEGE',
    akzent: '#F2A33C',
    these:
      'AI-first wird als benannte Belegschaft geführt: jeder Kollege hat eine Zuständigkeit, drei davon sind KI, einer zeichnet und haftet.',
    headline: 'Sechs Kollegen arbeiten an Ihrem Abschluss. Einer davon schläft.',
    lede:
      'An einem Abschluss arbeitet bei uns eine benannte Belegschaft: ein Steuerberater, der zeichnet, haftet und entscheidet, dazu KI-Kollegen für Belegwesen, Konsolidierung und Fristen. Jeder Kollege hat eine Zuständigkeit, ein Gedächtnis und eine Personalakte. Der Mandant hat einen Ansprechpartner.',
    palette: [
      { hex: '#0E3B3E', name: 'Petrol' },
      { hex: '#F2A33C', name: 'Bernstein' },
      { hex: '#EFE3D2', name: 'Sand' },
    ],
    fonts: ['Instrument Serif', 'Familjen Grotesk 700', 'Familjen Grotesk 400'],
    claims: ['Ein Ansprechpartner. Eine Belegschaft, die nie Urlaub nimmt.'],
  },
  {
    id: '2c',
    nummer: 6,
    name: 'SIEBEN JAHRE',
    akzent: '#C2703D',
    these:
      'Haftung und Frist werden zur Marke: die siebenjährige Sperrfrist der Einbringung ist Gliederung, Zeichen und Versprechen zugleich.',
    headline: 'Wer die Einbringung begleitet, hält das Mandat bis 2033.',
    lede:
      'Eine Einbringung nach §§ 20/21 UmwStG bindet sieben Jahre: Sperrfrist, jährlicher Nachweis nach § 22 UmwStG, Dokumentation bis zum Ablauf. Wer sie begleitet, übernimmt keinen Auftrag, sondern eine Frist. YTP führt diese Frist als Akte.',
    palette: [
      { hex: '#0F3A2E', name: 'Akte' },
      { hex: '#C2703D', name: 'Frist' },
      { hex: '#E9E3D6', name: 'Büttenpapier' },
    ],
    fonts: ['DM Serif Display', 'Chivo Mono', 'Newsreader'],
    claims: ['Sieben Jahre bewacht.'],
  },
];

export const byId = Object.fromEntries(directions.map((d) => [d.id, d]));
