/* Richtung 2a · DIE GRENZE — Schweizer Sachlichkeit, Positionierung über die
   AGB-Grenzen des Wettbewerbs. Rot ausschließlich für Grenzwerte. */

const css = `
.d2a { background: #FFFFFF; color: #0F1113; font-family: 'IBM Plex Mono', ui-monospace, monospace; }

.d2a .lockup { display: flex; align-items: flex-end; gap: 22px; }
.d2a .word { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 190px; line-height: 0.82; letter-spacing: -0.055em; }
.d2a .abhier { color: #FF2D16; font-size: 15px; letter-spacing: 0.14em; padding-bottom: 10px; white-space: nowrap; }

.d2a .pnl-headline {
  font-family: 'Archivo', sans-serif;
  font-weight: 900;
  font-size: 64px;
  line-height: 1.02;
  letter-spacing: -0.035em;
  max-width: 900px;
}

.d2a .pnl-lede { font-family: 'Newsreader', Georgia, serif; font-size: 22px; line-height: 1.55; }

.d2a .pnl-cap { color: #6C7278; }

.d2a .tab { border-top: 1px solid #0F1113; }
.d2a .trow {
  display: grid;
  grid-template-columns: minmax(0, 340px) repeat(3, minmax(0, 1fr));
  gap: 20px;
  align-items: center;
  padding: 0 12px;
  min-height: 68px;
  border-bottom: 1px solid #D5D8DA;
  font-size: 15px;
  line-height: 1.35;
}
.d2a .trow.head {
  min-height: 46px;
  border-bottom: 1px solid #0F1113;
  font-size: 11.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #6C7278;
}
.d2a .trow.head .own { color: #FF2D16; }
.d2a .trow:last-child { border-bottom: 1px solid #0F1113; }
.d2a .krit { font-weight: 500; letter-spacing: 0.02em; }
.d2a .out { color: #9BA1A6; text-decoration: line-through; }
.d2a .own { color: #FF2D16; letter-spacing: 0.02em; }

.d2a .tile-neg { background: #0F1113; }
.d2a .tile-full { background: #FFFFFF; border: 1px solid #0F1113; }
.d2a .tile-icon { background: #FFFFFF; border: 1px solid #0F1113; }
.d2a .tile-word { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 66px; line-height: 0.82; letter-spacing: -0.055em; }
.d2a .tile-neg .tile-word { color: #FFFFFF; }
.d2a .tile-full .tile-word { color: #0F1113; }
.d2a .tile-lock { display: flex; align-items: flex-end; gap: 10px; }
.d2a .tile-abhier { color: #FF2D16; font-size: 10px; letter-spacing: 0.12em; padding-bottom: 6px; }

.d2a .signet { width: 132px; height: 132px; border: 1px solid #0F1113; display: flex; flex-direction: column; justify-content: center; gap: 0; }
.d2a .signet .s-word { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 40px; line-height: 1; letter-spacing: -0.05em; text-align: center; padding-bottom: 12px; }
.d2a .signet .s-line { height: 3px; background: #FF2D16; }
.d2a .signet .s-foot { font-size: 9px; letter-spacing: 0.16em; text-align: center; padding-top: 10px; color: #6C7278; }

.d2a .pnl-sw-block { border: 1px solid #0F1113; }
.d2a .sw-hex { font-size: 13px; letter-spacing: 0.06em; }
.d2a .sw-name { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6C7278; }

.d2a .type-row { display: flex; flex-direction: column; gap: 3px; }
.d2a .type-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6C7278; }
.d2a .type-sample { font-size: 26px; line-height: 1.2; }
.d2a .type-sample.a { font-family: 'Archivo', sans-serif; font-weight: 900; letter-spacing: -0.03em; }
.d2a .type-sample.b { font-family: 'IBM Plex Mono', monospace; }
.d2a .type-sample.c { font-family: 'Newsreader', Georgia, serif; }

.d2a .pnl-card { background: #FFFFFF; border: 1px solid #0F1113; }
.d2a .card-lines { font-size: 12px; line-height: 1.75; letter-spacing: 0.04em; }
.d2a .card-lines b { font-weight: 500; }
.d2a .card-lines .grenz { color: #FF2D16; }

.d2a .pnl-claimarea { background: #0F1113; color: #FFFFFF; }
.d2a .claim-a { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 46px; line-height: 1.04; letter-spacing: -0.035em; }
`;

const rows = [
  ['Bilanzsumme', 'max. 500 T€', 'max. 150 T€', 'ohne Grenze'],
  ['Beteiligungsebenen', 'nur direkte', 'max. 3', 'mehrstufig'],
  ['Depot · Immobilien · Darlehen', 'nicht vorgesehen', 'nicht vorgesehen', 'Kerngeschäft'],
  ['Einbringung §§ 20/22 UmwStG', '—', '—', '7 Jahre begleitet'],
];

const html = (d) => `
<div class="pnl-mark">
  <div class="lockup">
    <span class="word">YTP</span>
    <span class="abhier">↑ ab hier</span>
  </div>
</div>

<h2 class="pnl-headline">${d.headline}</h2>

<p class="pnl-lede">${d.lede}</p>

<div class="pnl-sig">
  <div class="tab">
    <div class="trow head">
      <span>Kriterium</span>
      <span>boring.tax</span>
      <span>Fideus Lite</span>
      <span class="own">YTP</span>
    </div>
    ${rows
      .map(
        ([k, a, b, c]) => `
    <div class="trow">
      <span class="krit">${k}</span>
      <span class="out">${a}</span>
      <span class="out">${b}</span>
      <span class="own">${c}</span>
    </div>`
      )
      .join('')}
  </div>
</div>

<div class="pnl-brandrow">
  <div class="pnl-field">
    <div class="pnl-tile tile-neg">
      <span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-abhier">↑ ab hier</span></span>
    </div>
    <p class="pnl-cap">Negativ</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-full">
      <span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-abhier">↑ ab hier</span></span>
    </div>
    <p class="pnl-cap">Vollton</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-icon">
      <div class="signet">
        <div class="s-word">YTP</div>
        <div class="s-line"></div>
        <div class="s-foot">GRENZE</div>
      </div>
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
      <span class="type-sample a">OHNE GRENZE</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[1]}</span>
      <span class="type-sample b">Bilanzsumme 0123456789</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[2]}</span>
      <span class="type-sample c">Ein Sachverhalt, kein Paket</span>
    </div>
  </div>
</div>

<div class="pnl-app">
  <div class="pnl-card">
    <span class="tile-lock"><span class="tile-word" style="font-size:58px">YTP</span><span class="tile-abhier">↑ ab hier</span></span>
    <div class="card-lines">
      <div><b>Your Tax Pal</b></div>
      <div>Steuerberatungsgesellschaft PartGmbB i. Gr.</div>
      <div>ytp.tax · <span class="grenz">ohne Grenze</span></div>
    </div>
  </div>
  <div class="pnl-claimarea">
    <p class="claim-a">${d.claims[0]}</p>
  </div>
</div>
`;

export default { id: '2a', css, html };
