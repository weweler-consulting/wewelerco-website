/* Richtung 1c · MASCHINE — KI-Lauf, Terminal, dunkel, dynamisch. */

const css = `
.d1c { background: #08090A; color: #EAF2EE; font-family: 'Chivo Mono', ui-monospace, monospace; }
.d1c > * { position: relative; z-index: 1; }
.d1c .raster { position: absolute; inset: 0; z-index: 0; }

.d1c .lockup { display: flex; align-items: center; gap: 26px; height: 200px; }
.d1c .word { font-family: 'Chivo Mono', monospace; font-weight: 700; font-size: 180px; line-height: 0.8; letter-spacing: -0.04em; }
.d1c .caret { width: 62px; height: 116px; background: #00E5A0; animation: d1c-blink 1.05s step-end infinite; }

@keyframes d1c-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes d1c-run { 0% { width: 8%; } 100% { width: 92%; } }

.d1c .pnl-headline {
  font-family: 'Chivo Mono', monospace;
  font-weight: 700;
  font-size: 46px;
  line-height: 1.16;
  letter-spacing: -0.02em;
  max-width: 960px;
}

.d1c .pnl-lede { font-family: 'Newsreader', Georgia, serif; font-size: 22px; line-height: 1.55; color: #C9D6D0; }

.d1c .pnl-cap { color: #6F817A; }

.d1c .run { border: 1px solid #1E2A26; }
.d1c .run-head {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #1E2A26;
  font-size: 14px; letter-spacing: 0.06em; color: #00E5A0;
}
.d1c .live { width: 10px; height: 10px; background: #00E5A0; animation: d1c-blink 1.6s step-end infinite; }
.d1c .run-head .meta { margin-left: auto; color: #6F817A; letter-spacing: 0.1em; font-size: 12px; }

.d1c .run-row {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) 92px;
  align-items: center;
  gap: 16px;
  padding: 13px 20px;
  border-bottom: 1px solid #121917;
  font-size: 16px;
}
.d1c .run-row .st { color: #00E5A0; }
.d1c .run-row .ms { text-align: right; color: #6F817A; font-size: 13px; }
.d1c .run-row.busy .st { color: #EAF2EE; }
.d1c .run-row.wait { border-bottom: 0; color: #EAF2EE; }
.d1c .run-row.wait .ms { color: #00E5A0; }

.d1c .bar { height: 8px; background: #121917; margin: 10px 20px 16px; }
.d1c .bar i { display: block; height: 8px; width: 62%; background: #00E5A0; animation: d1c-run 3.4s linear infinite alternate; }

.d1c .komp { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #1E2A26; border: 1px solid #1E2A26; }
.d1c .komp div { background: #08090A; padding: 16px 18px; display: flex; flex-direction: column; gap: 6px; }
.d1c .komp b { font-weight: 700; font-size: 15px; letter-spacing: 0.02em; }
.d1c .komp span { font-size: 12.5px; color: #6F817A; letter-spacing: 0.04em; }

.d1c .tile-neg { background: #08090A; border: 1px solid #1E2A26; }
.d1c .tile-full { background: #00E5A0; }
.d1c .tile-icon { background: #08090A; border: 1px solid #EAF2EE; }
.d1c .tile-lock { display: flex; align-items: center; gap: 10px; }
.d1c .tile-word { font-weight: 700; font-size: 62px; line-height: 0.8; letter-spacing: -0.04em; }
.d1c .tile-caret { width: 22px; height: 42px; }
.d1c .tile-neg .tile-word { color: #EAF2EE; }
.d1c .tile-neg .tile-caret { background: #00E5A0; }
.d1c .tile-full .tile-word { color: #08090A; }
.d1c .tile-full .tile-caret { background: #08090A; }
.d1c .tile-icon .tile-word { color: #EAF2EE; font-size: 44px; }
.d1c .tile-icon .tile-caret { background: #00E5A0; width: 16px; height: 30px; }

.d1c .pnl-sw-block { border: 1px solid #1E2A26; }
.d1c .sw-hex { font-size: 13px; letter-spacing: 0.06em; }
.d1c .sw-name { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6F817A; }

.d1c .type-row { display: flex; flex-direction: column; gap: 3px; }
.d1c .type-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6F817A; }
.d1c .type-sample { font-size: 25px; line-height: 1.2; }
.d1c .type-sample.a { font-weight: 700; }
.d1c .type-sample.b { font-weight: 400; }
.d1c .type-sample.c { font-family: 'Newsreader', Georgia, serif; }

.d1c .pnl-card { background: #08090A; border: 1px solid #00E5A0; }
.d1c .card-lines { font-size: 12px; line-height: 1.8; letter-spacing: 0.05em; color: #C9D6D0; }
.d1c .card-lines b { color: #00E5A0; font-weight: 700; }

.d1c .pnl-claimarea { background: #00E5A0; color: #08090A; }
.d1c .claim-a { font-weight: 700; font-size: 38px; line-height: 1.12; letter-spacing: -0.02em; }

@media (prefers-reduced-motion: reduce) {
  .d1c .caret, .d1c .live { animation: none; }
  .d1c .bar i { animation: none; }
}

@media print {
  .d1c .caret, .d1c .live { animation: none; opacity: 1; }
  .d1c .bar i { animation: none; }
}
`;

const raster = `
<svg class="raster" width="1180" height="2000" viewBox="0 0 1180 2000" aria-hidden="true" focusable="false">
  <defs>
    <pattern id="d1c-raster" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0 L0 0 0 60" fill="none" stroke="#141618" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1180" height="2000" fill="url(#d1c-raster)"/>
</svg>`;

const done = [
  ['datenübernahme', '0.4s'],
  ['konsolidierung holding', '1.9s'],
  ['plausibilitätsprüfung', '3.2s'],
];

const html = (d) => `
${raster}

<div class="pnl-mark">
  <div class="lockup">
    <span class="word">YTP</span>
    <span class="caret" aria-hidden="true"></span>
  </div>
</div>

<h2 class="pnl-headline">${d.headline}</h2>

<p class="pnl-lede">${d.lede}</p>

<div class="pnl-sig">
  <div class="run">
    <div class="run-head">
      <span class="live" aria-hidden="true"></span>
      <span>run / holding-2026</span>
      <span class="meta">agent v1 · läuft</span>
    </div>
    ${done
      .map(
        ([t, ms]) => `
    <div class="run-row">
      <span class="st">ok</span>
      <span>${t}</span>
      <span class="ms">${ms}</span>
    </div>`
      )
      .join('')}
    <div class="run-row busy">
      <span class="st">··</span>
      <span>begleitdokumente</span>
      <span class="ms">läuft</span>
    </div>
    <div class="bar"><i></i></div>
    <div class="run-row wait">
      <span class="st">—</span>
      <span>Freigabe Steuerberater</span>
      <span class="ms">wartet</span>
    </div>
  </div>
  <div class="komp">
    <div><b>Steuerberater</b><span>zeichnet · haftet</span></div>
    <div><b>Betriebswirt · Volkswirt</b><span>liest die Zahlen</span></div>
    <div><b>Informatiker</b><span>baut den Lauf · § 50 StBerG</span></div>
  </div>
</div>

<div class="pnl-brandrow">
  <div class="pnl-field">
    <div class="pnl-tile tile-neg"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-caret" aria-hidden="true"></span></span></div>
    <p class="pnl-cap">Negativ</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-full"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-caret" aria-hidden="true"></span></span></div>
    <p class="pnl-cap">Vollton</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-icon"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-caret" aria-hidden="true"></span></span></div>
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
      <span class="type-sample a">run / holding-2026</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[1]}</span>
      <span class="type-sample b">Bilanzsumme 0123456789</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[2]}</span>
      <span class="type-sample c">Ein Berufsträger unterschreibt</span>
    </div>
  </div>
</div>

<div class="pnl-app">
  <div class="pnl-card">
    <span class="tile-lock"><span class="tile-word" style="font-size:56px">YTP</span><span class="tile-caret" style="background:#00E5A0;width:18px;height:36px"></span></span>
    <div class="card-lines">
      <div><b>ytp.tax</b></div>
      <div>Your Tax Pal</div>
      <div>Steuerberatungsgesellschaft PartGmbB i. Gr.</div>
    </div>
  </div>
  <div class="pnl-claimarea">
    <p class="claim-a">${d.claims[0]}</p>
  </div>
</div>
`;

export default { id: '1c', css, html };
