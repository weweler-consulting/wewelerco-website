/* Richtung 1b · PAL — laut, frech, menschlich, Anti-Kanzlei. */

const css = `
.d1b { background: #FFF3E6; color: #14100D; font-family: 'IBM Plex Mono', ui-monospace, monospace; }

.d1b .lockup { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
.d1b .word {
  font-family: 'Archivo Black', sans-serif;
  font-size: 300px;
  line-height: 0.78;
  letter-spacing: -0.045em;
}
.d1b .sub {
  background: #FF4D14;
  color: #14100D;
  font-family: 'Archivo Black', sans-serif;
  font-size: 34px;
  letter-spacing: 0.22em;
  line-height: 1;
  padding: 12px 16px 14px;
}

.d1b .pnl-headline {
  font-family: 'Archivo Black', sans-serif;
  font-size: 58px;
  line-height: 1.02;
  letter-spacing: -0.025em;
  max-width: 980px;
}

.d1b .pnl-lede { font-family: 'Newsreader', Georgia, serif; font-size: 22px; line-height: 1.55; }

.d1b .pnl-cap { opacity: 0.6; }

.d1b .sig-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.d1b .sig-box {
  height: 196px;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.d1b .sig-box.alt { background: #14100D; color: #FFF3E6; }
.d1b .sig-box.neu { background: #FF4D14; color: #14100D; }
.d1b .sig-lab { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.75; }
.d1b .sig-quote { font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 34px; line-height: 1.2; }

.d1b .band {
  background: #14100D;
  color: #FFF3E6;
  padding: 20px 26px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
}
.d1b .band-loud { font-family: 'Archivo Black', sans-serif; font-size: 34px; letter-spacing: 0.1em; }
.d1b .band-soft { font-family: 'Newsreader', Georgia, serif; font-style: italic; font-size: 24px; color: #FF4D14; }

.d1b .tile-neg { background: #14100D; }
.d1b .tile-full { background: #FF4D14; }
.d1b .tile-icon { background: #FFF3E6; border: 1px solid #14100D; }

.d1b .tile-lockup { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.d1b .tile-word { font-family: 'Archivo Black', sans-serif; font-size: 74px; line-height: 0.8; letter-spacing: -0.045em; }
.d1b .tile-sub { font-family: 'Archivo Black', sans-serif; font-size: 12px; letter-spacing: 0.18em; line-height: 1; padding: 5px 8px 6px; }

.d1b .tile-neg .tile-word { color: #FFF3E6; }
.d1b .tile-neg .tile-sub { background: #FF4D14; color: #14100D; }
.d1b .tile-full .tile-word { color: #14100D; }
.d1b .tile-icon .tile-word { color: #14100D; font-size: 56px; }
.d1b .tile-icon .tile-sub { background: #FF4D14; color: #14100D; }

.d1b .pnl-sw-block { border: 1px solid #14100D; }
.d1b .sw-hex { font-size: 13px; letter-spacing: 0.06em; }
.d1b .sw-name { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }

.d1b .type-row { display: flex; flex-direction: column; gap: 3px; }
.d1b .type-lab { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.6; }
.d1b .type-sample { font-size: 26px; line-height: 1.2; }
.d1b .type-sample.a { font-family: 'Archivo Black', sans-serif; letter-spacing: -0.02em; }
.d1b .type-sample.b { font-family: 'IBM Plex Mono', monospace; }
.d1b .type-sample.c { font-family: 'Newsreader', Georgia, serif; font-style: italic; }

.d1b .pnl-card { background: #14100D; color: #FFF3E6; }
.d1b .card-lines { font-size: 12px; line-height: 1.75; letter-spacing: 0.04em; }
.d1b .card-lines b { color: #FF4D14; font-weight: 500; }

.d1b .pnl-claimarea { background: #FF4D14; color: #14100D; }
.d1b .claim-a { font-family: 'Archivo Black', sans-serif; font-size: 52px; line-height: 1.02; letter-spacing: -0.03em; }
`;

const tile = (variant) => `
<div class="tile-lockup">
  <div class="tile-word">YTP</div>
  ${variant === 'full' ? '' : '<div class="tile-sub">YOUR TAX PAL</div>'}
</div>`;

const html = (d) => `
<div class="pnl-mark">
  <div class="lockup">
    <div class="word">YTP</div>
    <div class="sub">YOUR TAX PAL</div>
  </div>
</div>

<h2 class="pnl-headline">${d.headline}</h2>

<p class="pnl-lede">${d.lede}</p>

<div class="pnl-sig">
  <div class="sig-pair">
    <div class="sig-box alt">
      <span class="sig-lab">Alt</span>
      <p class="sig-quote">„Wir melden uns nächste Woche.“</p>
    </div>
    <div class="sig-box neu">
      <span class="sig-lab">Neu</span>
      <p class="sig-quote">„Freigabe liegt bei Ihnen. Seit heute morgen.“</p>
    </div>
  </div>
  <div class="band">
    <span class="band-loud">LAUT · ANDERS · SCHNELL</span>
    <span class="band-soft">und trotzdem Berufsträger.</span>
  </div>
</div>

<div class="pnl-brandrow">
  <div class="pnl-field">
    <div class="pnl-tile tile-neg">${tile('neg')}</div>
    <p class="pnl-cap">Negativ</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-full">${tile('full')}</div>
    <p class="pnl-cap">Vollton</p>
  </div>
  <div class="pnl-field">
    <div class="pnl-tile tile-icon">${tile('icon')}</div>
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
      <span class="type-sample a">SCHON FERTIG</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[1]}</span>
      <span class="type-sample b">Bilanzsumme 0123456789</span>
    </div>
    <div class="type-row">
      <span class="type-lab">${d.fonts[2]}</span>
      <span class="type-sample c">und trotzdem Berufsträger</span>
    </div>
  </div>
</div>

<div class="pnl-app">
  <div class="pnl-card">
    <div class="tile-lockup" style="align-items:flex-start">
      <div class="tile-word" style="color:#FFF3E6;font-size:64px">YTP</div>
      <div class="tile-sub" style="background:#FF4D14;color:#14100D">YOUR TAX PAL</div>
    </div>
    <div class="card-lines">
      <div><b>ytp.tax</b></div>
      <div>Steuerberatungsgesellschaft PartGmbB i. Gr.</div>
    </div>
  </div>
  <div class="pnl-claimarea">
    <p class="claim-a">${d.claims[0]}</p>
  </div>
</div>
`;

export default { id: '1b', css, html };
