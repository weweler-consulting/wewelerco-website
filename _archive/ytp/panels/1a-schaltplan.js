/* Richtung 1a · SCHALTPLAN — technisch, präzise, Ingenieursblick.
   Diese Datei enthält Auszeichnung und Gestaltung dieser einen Richtung.
   Texte kommen aus ../directions.js (Parameter d). */

const css = `
.d1a { background: #F4F4EF; color: #14141A; font-family: 'IBM Plex Mono', ui-monospace, monospace; }

.d1a .mark-svg text { font-family: 'Space Grotesk', sans-serif; font-weight: 700; fill: currentColor; letter-spacing: -6px; }
.d1a .mark-svg line { stroke: #1B3BFF; stroke-width: 1; }
.d1a .mark-svg rect.end { fill: #1B3BFF; }
.d1a .mark-svg rect.frame { fill: none; stroke: currentColor; stroke-width: 1; }

.d1a .pnl-headline {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 62px;
  line-height: 1.04;
  letter-spacing: -0.02em;
  max-width: 940px;
}

.d1a .pnl-lede {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 22px;
  line-height: 1.55;
  color: #14141A;
}

.d1a .pnl-cap { color: #14141A; opacity: 0.55; }

.d1a .sig-table { border-top: 1px solid #14141A; }

.d1a .sig-row {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr) 200px;
  align-items: center;
  gap: 20px;
  height: 62px;
  padding: 0 14px;
  border-bottom: 1px solid #14141A;
  font-size: 18px;
  letter-spacing: 0.01em;
}

.d1a .sig-row .num { font-size: 13px; letter-spacing: 0.14em; opacity: 0.55; }
.d1a .sig-row .mark { text-align: right; font-size: 13px; letter-spacing: 0.18em; }

.d1a .sig-row.human {
  background: #1B3BFF;
  color: #F4F4EF;
  border-bottom-color: #1B3BFF;
}

.d1a .sig-row.human .num { opacity: 0.8; }

.d1a .tile-neg { background: #14141A; color: #F4F4EF; }
.d1a .tile-neg .mark-svg line, .d1a .tile-neg .mark-svg rect.end { stroke: #1B3BFF; fill: #1B3BFF; }
.d1a .tile-full { background: #1B3BFF; color: #F4F4EF; }
.d1a .tile-full .mark-svg line { stroke: #F4F4EF; }
.d1a .tile-full .mark-svg rect.end { fill: #F4F4EF; }
.d1a .tile-icon { background: #F4F4EF; border: 1px solid #14141A; }

.d1a .pnl-sw-block { border: 1px solid #14141A; }
.d1a .sw-hex { font-size: 13px; letter-spacing: 0.06em; }
.d1a .sw-name { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.55; }

.d1a .type-row { display: flex; flex-direction: column; gap: 3px; }
.d1a .type-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.55; }
.d1a .type-sample { font-size: 26px; line-height: 1.2; }
.d1a .type-sample.a { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }
.d1a .type-sample.b { font-family: 'IBM Plex Mono', monospace; }
.d1a .type-sample.c { font-family: 'Newsreader', Georgia, serif; }

.d1a .pnl-card { background: #F4F4EF; border: 1px solid #14141A; }
.d1a .card-lines { font-size: 12px; line-height: 1.75; letter-spacing: 0.04em; }
.d1a .card-lines b { font-weight: 500; }

.d1a .pnl-claimarea { background: #14141A; color: #F4F4EF; }
.d1a .claim-a { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 40px; line-height: 1.1; letter-spacing: -0.01em; }
.d1a .claim-b { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 40px; line-height: 1.1; letter-spacing: -0.01em; color: #1B3BFF; }
`;

const bigMark = `
<svg class="mark-svg" viewBox="0 0 1036 200" width="1036" height="200" role="img" aria-label="Wortmarke YTP mit durchgehender Achslinie">
  <text x="0" y="170" font-size="200">YTP</text>
  <line x1="0" y1="100" x2="1036" y2="100"/>
  <rect class="end" x="0" y="95.5" width="9" height="9"/>
  <rect class="end" x="1027" y="95.5" width="9" height="9"/>
</svg>`;

const tileMark = (id) => `
<svg class="mark-svg" viewBox="0 0 220 100" width="200" height="91" role="img" aria-labelledby="d1a-${id}">
  <title id="d1a-${id}">Wortmarke YTP</title>
  <text x="16" y="76" font-size="80" letter-spacing="-2">YTP</text>
  <line x1="0" y1="48" x2="220" y2="48"/>
  <rect class="end" x="0" y="43.5" width="9" height="9"/>
  <rect class="end" x="211" y="43.5" width="9" height="9"/>
</svg>`;

const iconMark = `
<svg class="mark-svg" viewBox="0 0 132 132" width="120" height="120" role="img" aria-label="Signet YTP auf der Achse">
  <rect class="frame" x="14.5" y="14.5" width="103" height="103"/>
  <text x="66" y="78" font-size="42" letter-spacing="-1" text-anchor="middle">YTP</text>
  <line x1="0" y1="66" x2="132" y2="66"/>
  <rect class="end" x="0" y="61.5" width="9" height="9"/>
  <rect class="end" x="123" y="61.5" width="9" height="9"/>
</svg>`;

const steps = [
  ['01', 'Datenübernahme', ''],
  ['02', 'Konsolidierung Holding', ''],
  ['03', 'Plausibilitätsprüfung', ''],
  ['04', 'Freigabe Berufsträger', 'Mensch'],
  ['05', 'Versand Begleitdokumente', ''],
];

const html = (d) => `
<div class="pnl-mark">${bigMark}</div>

<h2 class="pnl-headline">${d.headline}</h2>

<p class="pnl-lede">${d.lede}</p>

<div class="pnl-sig">
  <p class="pnl-cap">Prozesskette</p>
  <div class="sig-table">
    ${steps
      .map(
        ([n, t, m]) => `
    <div class="sig-row${m ? ' human' : ''}">
      <span class="num">${n}</span>
      <span class="step">${t}</span>
      <span class="mark">${m}</span>
    </div>`
      )
      .join('')}
  </div>
</div>

<div class="pnl-brandrow">
  <div class="pnl-field">
    <div class="pnl-tile tile-neg">${tileMark('neg')}</div>
    <p class="pnl-cap">Negativ</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-full">${tileMark('full')}</div>
    <p class="pnl-cap">Vollton</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-icon">${iconMark}</div>
    <p class="pnl-cap">Icon</p>
  </div>
</div>

<div class="pnl-specs">
  <div class="pnl-pal">
    ${d.palette
      .map(
        (p) => `
    <div class="pnl-sw">
      <div class="pnl-sw-block" style="background:${p.hex}"></div>
      <span class="sw-hex">${p.hex}</span>
      <span class="sw-name">${p.name}</span>
    </div>`
      )
      .join('')}
  </div>
  <div class="pnl-type">
    <div class="type-row">
      <span class="type-lab">${d.fonts[0]}</span>
      <span class="type-sample a">Abschluss auf Achse</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[1]}</span>
      <span class="type-sample b">Bilanzsumme 0123456789</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[2]}</span>
      <span class="type-sample c">Holding, mehrstufig beteiligt</span>
    </div>
  </div>
</div>

<div class="pnl-app">
  <div class="pnl-card">
    ${tileMark('card')}
    <div class="card-lines">
      <div><b>Your Tax Pal</b></div>
      <div>Steuerberatungsgesellschaft PartGmbB i. Gr.</div>
      <div>ytp.tax</div>
    </div>
  </div>
  <div class="pnl-claimarea">
    <p class="claim-a">${d.claims[0]}</p>
    <p class="claim-b">${d.claims[1]}</p>
  </div>
</div>
`;

export default { id: '1a', css, html };
