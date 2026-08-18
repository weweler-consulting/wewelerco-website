/* Richtung 2c · SIEBEN JAHRE — Haftung und Frist als Marke, Aktencharakter. */

const css = `
.d2c { background: #E9E3D6; color: #0F3A2E; font-family: 'Chivo Mono', ui-monospace, monospace; }

.d2c .lockup { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.d2c .word { font-family: 'DM Serif Display', Georgia, serif; font-size: 190px; line-height: 0.9; letter-spacing: -0.01em; }
.d2c .frist-box {
  width: 132px; height: 132px;
  border: 2px solid #C2703D;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  flex: none;
}
.d2c .frist-box .vii { font-family: 'DM Serif Display', Georgia, serif; font-size: 44px; line-height: 1; color: #C2703D; }
.d2c .frist-box .lab { font-size: 10px; letter-spacing: 0.16em; text-align: center; color: #C2703D; }

.d2c .pnl-headline {
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 66px;
  line-height: 1.08;
  letter-spacing: -0.005em;
  max-width: 920px;
}

.d2c .pnl-lede { font-family: 'Newsreader', Georgia, serif; font-size: 22px; line-height: 1.55; }

.d2c .pnl-cap { color: #0F3A2E; opacity: 0.6; }

.d2c .akte { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
.d2c .jahr {
  height: 246px;
  padding: 16px 12px;
  display: flex; flex-direction: column; justify-content: space-between;
  border: 1px solid #C8BFAC;
}
.d2c .jahr .rom { font-family: 'DM Serif Display', Georgia, serif; font-size: 42px; line-height: 1; }
.d2c .jahr .y { font-size: 18px; letter-spacing: 0.06em; }
.d2c .jahr .st { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
.d2c .jahr.done { background: #0F3A2E; border-color: #0F3A2E; color: #E9E3D6; }
.d2c .jahr.now { background: #C2703D; border-color: #C2703D; color: #E9E3D6; }
.d2c .jahr.plan { background: #F2EDE3; color: #0F3A2E; }
.d2c .jahr.end { background: #F2EDE3; border: 2px solid #0F3A2E; }
.d2c .jahr.plan .st { opacity: 0.6; }

.d2c .tile-neg { background: #0F3A2E; color: #E9E3D6; }
.d2c .tile-full { background: #C2703D; color: #E9E3D6; }
.d2c .tile-icon { background: #E9E3D6; border: 1px solid #0F3A2E; }
.d2c .tile-lock { display: flex; align-items: center; gap: 14px; }
.d2c .tile-word { font-family: 'DM Serif Display', Georgia, serif; font-size: 66px; line-height: 0.9; }
.d2c .tile-sq { width: 46px; height: 46px; border: 2px solid currentColor; display: flex; align-items: center; justify-content: center; font-family: 'DM Serif Display', Georgia, serif; font-size: 18px; }
.d2c .tile-neg .tile-sq { border-color: #C2703D; color: #C2703D; }

.d2c .siegel {
  width: 132px; height: 132px;
  border-radius: 50%;
  border: 2px solid #C2703D;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  color: #0F3A2E;
}
.d2c .siegel .s-word { font-family: 'DM Serif Display', Georgia, serif; font-size: 38px; line-height: 1; }
.d2c .siegel .s-sub { font-size: 10px; letter-spacing: 0.18em; color: #C2703D; }

.d2c .pnl-sw-block { border: 1px solid #0F3A2E; }
.d2c .sw-hex { font-size: 13px; letter-spacing: 0.06em; }
.d2c .sw-name { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }

.d2c .type-row { display: flex; flex-direction: column; gap: 3px; }
.d2c .type-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }
.d2c .type-sample { font-size: 27px; line-height: 1.2; }
.d2c .type-sample.a { font-family: 'DM Serif Display', Georgia, serif; }
.d2c .type-sample.b { font-family: 'Chivo Mono', monospace; }
.d2c .type-sample.c { font-family: 'Newsreader', Georgia, serif; }

.d2c .pnl-card { background: #E9E3D6; border: 1px solid #0F3A2E; }
.d2c .card-lines { font-size: 12px; line-height: 1.75; letter-spacing: 0.04em; }
.d2c .card-lines b { color: #C2703D; }

.d2c .pnl-claimarea { background: #0F3A2E; color: #E9E3D6; }
.d2c .claim-a { font-family: 'DM Serif Display', Georgia, serif; font-size: 52px; line-height: 1.1; }
`;

const jahre = [
  ['I', '2026', 'Einbringung', 'done'],
  ['II', '2027', 'Nachweis', 'done'],
  ['III', '2028', 'läuft', 'now'],
  ['IV', '2029', 'geplant', 'plan'],
  ['V', '2030', 'geplant', 'plan'],
  ['VI', '2031', 'geplant', 'plan'],
  ['VII', '2032', 'Ablauf', 'end'],
];

const html = (d) => `
<div class="pnl-mark">
  <div class="lockup">
    <span class="word">YTP</span>
    <span class="frist-box">
      <span class="vii">VII</span>
      <span class="lab">JAHRE FRIST</span>
    </span>
  </div>
</div>

<h2 class="pnl-headline">${d.headline}</h2>

<p class="pnl-lede">${d.lede}</p>

<div class="pnl-sig">
  <p class="pnl-cap">Fristenakte · Sperrfrist §§ 20/22 UmwStG</p>
  <div class="akte">
    ${jahre
      .map(
        ([r, y, st, cls]) => `
    <div class="jahr ${cls}">
      <span class="rom">${r}</span>
      <span class="y">${y}</span>
      <span class="st">${st}</span>
    </div>`
      )
      .join('')}
  </div>
</div>

<div class="pnl-brandrow">
  <div class="pnl-field">
    <div class="pnl-tile tile-neg"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-sq">VII</span></span></div>
    <p class="pnl-cap">Negativ</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-full"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-sq">VII</span></span></div>
    <p class="pnl-cap">Vollton</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-icon">
      <span class="siegel"><span class="s-word">YTP</span><span class="s-sub">VII · 2033</span></span>
    </div>
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
      <span class="type-sample a">Sieben Jahre bewacht</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[1]}</span>
      <span class="type-sample b">Bilanzsumme 0123456789</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[2]}</span>
      <span class="type-sample c">Sperrfrist bis 2033</span>
    </div>
  </div>
</div>

<div class="pnl-app">
  <div class="pnl-card">
    <span class="tile-lock"><span class="tile-word" style="font-size:56px">YTP</span><span class="tile-sq" style="border-color:#C2703D;color:#C2703D">VII</span></span>
    <div class="card-lines">
      <div><b>Your Tax Pal</b></div>
      <div>Steuerberatungsgesellschaft PartGmbB i. Gr.</div>
      <div>ytp.tax</div>
    </div>
  </div>
  <div class="pnl-claimarea">
    <p class="claim-a">${d.claims[0]}</p>
  </div>
</div>
`;

export default { id: '2c', css, html };
