/* Richtung 2b · KOLLEGE — AI-first als benannte Belegschaft, warm, redaktionell. */

const css = `
.d2b { background: #EFE3D2; color: #0E3B3E; font-family: 'Familjen Grotesk', system-ui, sans-serif; }

.d2b .lockup { display: flex; align-items: baseline; gap: 26px; }
.d2b .word { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 172px; line-height: 0.86; letter-spacing: -0.04em; }
.d2b .sub { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 52px; line-height: 1; }

.d2b .pnl-headline {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 68px;
  line-height: 1.06;
  letter-spacing: -0.01em;
  max-width: 900px;
}

.d2b .pnl-lede { font-size: 21px; line-height: 1.6; max-width: 860px; }

.d2b .pnl-cap { color: #0E3B3E; opacity: 0.6; }

.d2b .crew { display: flex; flex-direction: column; gap: 10px; }
.d2b .crew-row {
  display: grid;
  grid-template-columns: 62px minmax(0, 280px) minmax(0, 1fr) 96px;
  align-items: center;
  gap: 22px;
  padding: 12px 16px;
  border: 1px solid #C9B79B;
}
.d2b .crew-row.human { background: #0E3B3E; border-color: #0E3B3E; color: #EFE3D2; }

.d2b .init {
  width: 56px; height: 56px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 26px;
  border: 1px solid #0E3B3E;
}
.d2b .crew-row.human .init { background: #EFE3D2; color: #0E3B3E; border-color: #EFE3D2; }

.d2b .who { display: flex; flex-direction: column; gap: 2px; }
.d2b .who b { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; font-size: 30px; line-height: 1.1; letter-spacing: 0.01em; }
.d2b .who span { font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.75; }
.d2b .task { font-size: 16px; line-height: 1.35; }
.d2b .badge { justify-self: end; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; padding: 6px 10px; border: 1px solid #0E3B3E; }
.d2b .crew-row.human .badge { border-color: #F2A33C; color: #F2A33C; }

.d2b .hinweis { font-size: 15px; line-height: 1.5; opacity: 0.8; }

.d2b .quote { border-left: 4px solid #F2A33C; padding: 4px 0 4px 20px; }
.d2b .quote p { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 30px; line-height: 1.28; }

.d2b .tile-neg { background: #0E3B3E; color: #EFE3D2; }
.d2b .tile-full { background: #F2A33C; color: #0E3B3E; }
.d2b .tile-icon { background: #EFE3D2; border: 1px solid #0E3B3E; }
.d2b .tile-lock { display: flex; align-items: baseline; gap: 10px; }
.d2b .tile-word { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 62px; line-height: 0.9; letter-spacing: -0.04em; }
.d2b .tile-sub { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 22px; }
.d2b .signet { width: 120px; height: 120px; background: #0E3B3E; color: #EFE3D2; display: flex; align-items: center; justify-content: center; font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; font-size: 40px; letter-spacing: -0.03em; }

.d2b .pnl-sw-block { border: 1px solid #0E3B3E; }
.d2b .sw-hex { font-family: 'Familjen Grotesk', sans-serif; font-size: 13px; letter-spacing: 0.06em; }
.d2b .sw-name { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }

.d2b .type-row { display: flex; flex-direction: column; gap: 3px; }
.d2b .type-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }
.d2b .type-sample { font-size: 27px; line-height: 1.2; }
.d2b .type-sample.a { font-family: 'Instrument Serif', Georgia, serif; }
.d2b .type-sample.b { font-family: 'Familjen Grotesk', sans-serif; font-weight: 700; }
.d2b .type-sample.c { font-family: 'Familjen Grotesk', sans-serif; font-weight: 400; }

.d2b .pnl-card { background: #EFE3D2; border: 1px solid #0E3B3E; }
.d2b .card-lines { font-size: 13px; line-height: 1.7; letter-spacing: 0.02em; }
.d2b .card-lines b { font-weight: 700; }

.d2b .pnl-claimarea { background: #0E3B3E; color: #EFE3D2; }
.d2b .claim-a { font-family: 'Instrument Serif', Georgia, serif; font-size: 44px; line-height: 1.12; }
`;

const crew = [
  ['T', 'Tobias', 'Steuerberater', 'zeichnet · haftet · entscheidet', 'Mensch', true],
  ['H', 'Helga', 'Belegwesen', 'Belege, Kontierung, Rückfragen', 'KI', false],
  ['K', 'Konrad', 'Konsolidierung', 'Beteiligungen, § 8b KStG', 'KI', false],
  ['F', 'Frieda', 'Fristen', 'Offenlegung, Versand', 'KI', false],
];

const html = (d) => `
<div class="pnl-mark">
  <div class="lockup">
    <span class="word">YTP</span>
    <span class="sub">your tax pal</span>
  </div>
</div>

<h2 class="pnl-headline">${d.headline}</h2>

<p class="pnl-lede">${d.lede}</p>

<div class="pnl-sig">
  <div class="crew">
    ${crew
      .map(
        ([i, name, rolle, task, badge, human]) => `
    <div class="crew-row${human ? ' human' : ''}">
      <span class="init">${i}</span>
      <span class="who"><b>${name}</b><span>${rolle}</span></span>
      <span class="task">${task}</span>
      <span class="badge">${badge}</span>
    </div>`
      )
      .join('')}
  </div>
  <p class="hinweis">Gedächtnis und Personalakte liegen bei uns — Server in Frankfurt, nicht in einem Tool.</p>
  <div class="quote">
    <p>„KI räumt auf, was auf den Keks geht. Menschliche Beziehungen reduziert sie nie.“</p>
  </div>
</div>

<div class="pnl-brandrow">
  <div class="pnl-field">
    <div class="pnl-tile tile-neg"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-sub">your tax pal</span></span></div>
    <p class="pnl-cap">Negativ</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-full"><span class="tile-lock"><span class="tile-word">YTP</span><span class="tile-sub">your tax pal</span></span></div>
    <p class="pnl-cap">Vollton</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-icon"><span class="signet">YTP</span></div>
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
      <span class="type-sample a">Einer davon schläft</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[1]}</span>
      <span class="type-sample b">Bilanzsumme 0123456789</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[2]}</span>
      <span class="type-sample c">Eine Belegschaft, ein Ansprechpartner</span>
    </div>
  </div>
</div>

<div class="pnl-app">
  <div class="pnl-card">
    <span class="tile-lock"><span class="tile-word" style="font-size:54px">YTP</span><span class="tile-sub">your tax pal</span></span>
    <div class="card-lines">
      <div><b>Tobias · Steuerberater</b></div>
      <div>Steuerberatungsgesellschaft PartGmbB i. Gr.</div>
      <div>ytp.tax</div>
    </div>
  </div>
  <div class="pnl-claimarea">
    <p class="claim-a">${d.claims[0]}</p>
  </div>
</div>
`;

export default { id: '2b', css, html };
