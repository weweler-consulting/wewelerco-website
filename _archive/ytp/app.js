/* Hülle: Navigation, Bühne, Fußleiste, Feedback-Spalte, Direktvergleich.
   Panels werden nur eingehängt — Gestaltung liegt in panels/<id>-<name>.js. */

import { directions } from './directions.js';
import p1a from './panels/1a-schaltplan.js';
import p1b from './panels/1b-pal.js';
import p1c from './panels/1c-maschine.js';
import p2a from './panels/2a-die-grenze.js';
import p2b from './panels/2b-kollege.js';
import p2c from './panels/2c-sieben-jahre.js';

const panels = Object.fromEntries(
  [p1a, p1b, p1c, p2a, p2b, p2c].map((p) => [p.id, p])
);

const STORE = 'ytp-feedback-v1';
const PANEL_W = 1180;

const $ = (sel) => document.querySelector(sel);

const stage = $('#stage');
const navEl = $('#nav');
const footEl = $('#dirfoot');
const fbEl = $('#fb');
const fbList = $('#fb-list');
const fbToggle = $('#fb-toggle');
const cmpToggle = $('#cmp-toggle');
const fbStatus = $('#fb-status');

let active = directions[0].id;
let feedback = loadFeedback();

/* --- Speicher ------------------------------------------------------------ */

function loadFeedback() {
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveFeedback() {
  try {
    localStorage.setItem(STORE, JSON.stringify(feedback));
    fbStatus.textContent = 'Gespeichert in diesem Browser.';
  } catch (e) {
    fbStatus.textContent = 'Konnte nicht gespeichert werden.';
  }
}

function entry(id) {
  if (!feedback[id]) feedback[id] = { vote: null, note: '' };
  return feedback[id];
}

/* --- Aufbau -------------------------------------------------------------- */

function mountStyles() {
  const style = document.createElement('style');
  style.textContent = directions.map((d) => panels[d.id].css).join('\n');
  document.head.appendChild(style);
}

function mountPanels() {
  stage.innerHTML = directions
    .map(
      (d) => `
<div class="slot" data-id="${d.id}" style="--nav-accent:${d.akzent}">
  <span class="slot-tag">${d.nummer} · ${d.name}</span>
  <button class="slot-open" type="button" data-open="${d.id}">
    <span class="vh">Richtung ${d.nummer}, ${d.name}, einzeln ansehen</span>
  </button>
  <div class="scaler">
    <article class="pnl d${d.id}" data-dir="${d.id}" aria-label="Designrichtung ${d.nummer}: ${d.name}">
      ${panels[d.id].html(d)}
    </article>
  </div>
</div>`
    )
    .join('');
}

function mountNav() {
  navEl.innerHTML = directions
    .map(
      (d) => `
<button class="navbtn" type="button" data-go="${d.id}" style="--nav-accent:${d.akzent}" aria-current="false">
  <span class="navbtn-head">
    <span class="navbtn-dot" aria-hidden="true"></span>
    <span class="navbtn-num">${d.nummer}</span>
    <span class="navbtn-name">${d.name}</span>
  </span>
  <span class="navbtn-claim">${d.claims[0]}</span>
</button>`
    )
    .join('');
}

function mountFeedback() {
  fbList.innerHTML = directions
    .map(
      (d) => `
<div class="fb-item" data-item="${d.id}" style="--item-accent:${d.akzent}">
  <p class="fb-item-head">${d.nummer} · ${d.name} <span>#${d.id}</span></p>
  <div class="fb-votes">
    <button class="vote" type="button" data-vote="up" data-for="${d.id}" aria-pressed="false">Daumen hoch</button>
    <button class="vote" type="button" data-vote="down" data-for="${d.id}" aria-pressed="false">Daumen runter</button>
  </div>
  <label class="vh" for="note-${d.id}">Notiz zu Richtung ${d.nummer}, ${d.name}</label>
  <textarea class="fb-text" id="note-${d.id}" data-note="${d.id}" placeholder="Notiz"></textarea>
</div>`
    )
    .join('');
  syncFeedbackUI();
}

/* --- Zustand ------------------------------------------------------------- */

function renderFoot(d) {
  footEl.innerHTML = `
<div class="foot-block">
  <p class="foot-lab">Kernthese</p>
  <p class="foot-these">${d.these}</p>
</div>
<div class="foot-block">
  <p class="foot-lab">Palette</p>
  <div class="foot-pal">
    ${d.palette
      .map(
        (p) => `
    <span class="foot-pal-item">
      <span class="foot-sw" style="background:${p.hex}"></span>
      <span class="foot-hex">${p.hex}</span>
    </span>`
      )
      .join('')}
  </div>
</div>
<div class="foot-block">
  <p class="foot-lab">Schriften</p>
  <p class="foot-fonts">${d.fonts.join('<br>')}</p>
</div>`;
}

function select(id, opts = {}) {
  const d = directions.find((x) => x.id === id);
  if (!d) return;
  active = id;

  stage.querySelectorAll('.slot').forEach((s) => {
    s.dataset.active = String(s.dataset.id === id);
    s.setAttribute('aria-hidden', s.dataset.id === id ? 'false' : 'true');
  });

  navEl.querySelectorAll('.navbtn').forEach((b) => {
    b.setAttribute('aria-current', String(b.dataset.go === id));
  });

  // aktive Schaltfläche in der schmalen, scrollbaren Leiste sichtbar halten
  const cur = navEl.querySelector('[aria-current="true"]');
  const rail = navEl.parentElement;
  if (cur && rail.scrollWidth > rail.clientWidth) {
    rail.scrollLeft = Math.max(0, cur.offsetLeft - (rail.clientWidth - cur.clientWidth) / 2);
  }

  fbList.querySelectorAll('.fb-item').forEach((i) => {
    i.dataset.active = String(i.dataset.item === id);
  });

  renderFoot(d);

  if (!opts.fromHash && location.hash.slice(1) !== id) {
    location.hash = id;
  }
}

function step(delta) {
  const i = directions.findIndex((d) => d.id === active);
  const next = (i + delta + directions.length) % directions.length;
  setCompare(false);
  select(directions[next].id);
}

function setCompare(on) {
  stage.dataset.mode = on ? 'compare' : 'single';
  cmpToggle.setAttribute('aria-pressed', String(on));
  measure();
}

function setFeedbackOpen(on) {
  fbEl.hidden = !on;
  fbToggle.setAttribute('aria-expanded', String(on));
  measure();
}

/* --- Skalierung ---------------------------------------------------------- */

function measure() {
  const slot = stage.querySelector('.slot');
  if (!slot) return;
  const w = slot.clientWidth;
  if (!w) return;
  const s = w / PANEL_W;
  const cur = parseFloat(stage.style.getPropertyValue('--s')) || 0;
  if (Math.abs(cur - s) > 0.0005) stage.style.setProperty('--s', String(s));
}

/* --- Feedback ------------------------------------------------------------ */

function syncFeedbackUI() {
  directions.forEach((d) => {
    const e = entry(d.id);
    fbList
      .querySelectorAll(`[data-for="${d.id}"]`)
      .forEach((b) => b.setAttribute('aria-pressed', String(e.vote === b.dataset.vote)));
    const t = fbList.querySelector(`[data-note="${d.id}"]`);
    if (t && t.value !== e.note) t.value = e.note;
  });
}

function voteLabel(v) {
  if (v === 'up') return 'Daumen hoch';
  if (v === 'down') return 'Daumen runter';
  return 'keine Bewertung';
}

function exportMarkdown() {
  const stamp = new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const body = directions
    .map((d) => {
      const e = entry(d.id);
      return [
        `## ${d.nummer} · ${d.name} (#${d.id})`,
        '',
        `- Bewertung: ${voteLabel(e.vote)}`,
        `- Kernthese: ${d.these}`,
        `- Palette: ${d.palette.map((p) => `${p.hex} ${p.name}`).join(' · ')}`,
        `- Schriften: ${d.fonts.join(' · ')}`,
        '',
        '**Notiz**',
        '',
        e.note.trim() ? e.note.trim() : '_keine Notiz_',
      ].join('\n');
    })
    .join('\n\n');

  const md = [
    '# YTP — Your Tax Pal · Rückmeldung zu sechs Designrichtungen',
    '',
    `Stand: ${stamp}`,
    '',
    body,
    '',
  ].join('\n');

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ytp-designrichtungen-notizen.md';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  fbStatus.textContent = 'Markdown-Datei erzeugt.';
}

/* --- Ereignisse ---------------------------------------------------------- */

function wire() {
  navEl.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-go]');
    if (!b) return;
    setCompare(false);
    select(b.dataset.go);
  });

  stage.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-open]');
    if (!b) return;
    setCompare(false);
    select(b.dataset.open);
  });

  cmpToggle.addEventListener('click', () => {
    setCompare(stage.dataset.mode !== 'compare');
  });

  fbToggle.addEventListener('click', () => {
    setFeedbackOpen(fbEl.hidden);
  });

  $('#fb-export').addEventListener('click', exportMarkdown);

  $('#fb-close').addEventListener('click', () => {
    setFeedbackOpen(false);
    fbToggle.focus();
  });

  fbList.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-vote]');
    if (!b) return;
    const e = entry(b.dataset.for);
    e.vote = e.vote === b.dataset.vote ? null : b.dataset.vote;
    saveFeedback();
    syncFeedbackUI();
  });

  fbList.addEventListener('input', (ev) => {
    const t = ev.target.closest('[data-note]');
    if (!t) return;
    entry(t.dataset.note).note = t.value;
    saveFeedback();
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const t = ev.target;
    if (t && (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT')) return;

    if (ev.key === 'ArrowRight') {
      ev.preventDefault();
      step(1);
    } else if (ev.key === 'ArrowLeft') {
      ev.preventDefault();
      step(-1);
    } else if (/^[1-6]$/.test(ev.key)) {
      ev.preventDefault();
      setCompare(false);
      select(directions[Number(ev.key) - 1].id);
    }
  });

  let tx = 0;
  let ty = 0;
  stage.addEventListener(
    'touchstart',
    (ev) => {
      if (stage.dataset.mode !== 'single') return;
      tx = ev.changedTouches[0].clientX;
      ty = ev.changedTouches[0].clientY;
    },
    { passive: true }
  );

  stage.addEventListener(
    'touchend',
    (ev) => {
      if (stage.dataset.mode !== 'single') return;
      const dx = ev.changedTouches[0].clientX - tx;
      const dy = ev.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 60 && Math.abs(dy) < 70) step(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (directions.some((d) => d.id === id) && id !== active) {
      setCompare(false);
      select(id, { fromHash: true });
    }
  });

  window.addEventListener('resize', measure);

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(measure);
    ro.observe(stage.querySelector('.slot'));
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }
}

/* --- Start --------------------------------------------------------------- */

mountStyles();
mountPanels();
mountNav();
mountFeedback();
wire();

const initial = location.hash.slice(1);
select(directions.some((d) => d.id === initial) ? initial : directions[0].id, {
  fromHash: true,
});
measure();
