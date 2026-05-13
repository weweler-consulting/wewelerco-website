# Vivienda Radazul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static long-stay (1–3 months) seasonal rental page for the Benndorf-owned apartment in Radazul, deployed at `weweler.co/vivienda-radazul/`. Targets winter residents, remote workers, and sabbatical guests via direct WhatsApp inquiry — no booking platforms.

**Architecture:** Static HTML/CSS/JS following the existing `wohnung-pankow` pattern. One `index.html` (sections via semantic `<section>` blocks), one `style.css` (CSS variable system, scoped to this page), one `i18n.js` (Pankow's exact runtime logic, translation map rewritten for this page). DE/EN switch persisted in `localStorage`. No build step, no framework.

**Tech Stack:** HTML5, CSS3 with custom properties, vanilla JS, Google Fonts (Newsreader + Inter + JetBrains Mono). 16 JPEG images already in `public/vivienda-radazul/images/`.

**Spec reference:** `docs/superpowers/specs/2026-05-13-vivienda-radazul-design.md`

---

## File Structure

```
public/vivienda-radazul/
├── index.html       (CREATE — semantic HTML, all sections, data-i18n attributes)
├── style.css        (CREATE — variables + section styles, ~600 lines)
├── i18n.js          (CREATE — DE/EN translations + applyI18n/setLang logic)
└── images/          (EXISTS — 16 JPEGs IMG_5494..IMG_5516)
```

**Color palette (CSS variables, mediterranean accent):**
- `--bg: #faf9f6` (warm off-white)
- `--bg-deep: #f2efea`
- `--ink: #1a1f24`
- `--ink-soft: #3a4651`
- `--ink-mute: #6a7480`
- `--rule: #e0dbd1`
- `--rule-soft: #ece8de`
- `--accent: #4a8a8a` (mosaic teal, replaces Pankow's terracotta)
- `--accent-deep: #2f6a6a`
- `--accent-tint: #d8e8e6`

**WhatsApp URL (used in every CTA):**
```
https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!
```

**Mailto URL:**
```
mailto:justus@weweler.co?subject=Anfrage%20Vivienda%20Radazul&body=Hola%2C%0A%0Aich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%0A%0AZeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%0AGrund%20des%20Aufenthalts%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D%0APersonen%3A%20%5BAnzahl%5D%0A%0ADanke%21
```

**Testing approach:** No automated tests (static page). Each task ends with a manual browser-verification step: load `public/vivienda-radazul/index.html` directly in Safari/Chrome (file:// URL works), visually verify the section renders correctly, click any CTAs to confirm links work.

---

## Task 1: Setup — directory structure, empty files, Pankow i18n.js logic copied

**Files:**
- Create: `public/vivienda-radazul/index.html`
- Create: `public/vivienda-radazul/style.css`
- Create: `public/vivienda-radazul/i18n.js`
- Verify: `public/vivienda-radazul/images/` exists with 16 JPEGs

- [ ] **Step 1: Verify images directory**

Run:
```bash
ls public/vivienda-radazul/images/ | wc -l
```

Expected: `16`

- [ ] **Step 2: Create empty `style.css` with header comment only**

```css
/* =============================================================
   Vivienda Radazul — Long-Stay Seasonal Rental
   Editorial layout, mediterranean accent, DE/EN i18n
   ============================================================= */
```

- [ ] **Step 3: Create `i18n.js` — copy runtime logic from Pankow, empty translation map**

Use the exact `applyI18n`, `detectInitialLang`, `setLang` functions from `public/wohnung-pankow/i18n.js` (lines 430–493). The `window.I18N` object should be:

```javascript
window.I18N = {
  de: {},
  en: {}
};
```

Translations get filled in subsequent tasks. The skeleton of `i18n.js`:

```javascript
/* =====================================================
   i18n — DE / EN
   Vivienda Radazul translations.
   ===================================================== */
window.I18N = {
  de: {},
  en: {}
};

/* =====================================================
   Apply translation to all [data-i18n] / [data-i18n-attr]
   nodes, plus <html lang>, <title>, meta tags.
   ===================================================== */
window.applyI18n = function(lang) {
  const dict = window.I18N[lang] || window.I18N.de;
  const root = document.documentElement;

  root.setAttribute('lang', lang);

  if (dict["html.title"]) document.title = dict["html.title"];

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const spec = el.getAttribute('data-i18n-attr');
    spec.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key && dict[key] !== undefined) {
        el.setAttribute(attr, dict[key].replace(/<[^>]*>/g, ''));
      }
    });
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll('[data-lang-set]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-set') === lang);
  });
};

window.detectInitialLang = function() {
  try {
    const u = new URL(window.location.href);
    const q = u.searchParams.get('lang');
    if (q === 'de' || q === 'en') return q;
  } catch (e) {}
  try {
    const s = localStorage.getItem('lang');
    if (s === 'de' || s === 'en') return s;
  } catch (e) {}
  const nav = (navigator.language || 'de').toLowerCase();
  if (nav.startsWith('de')) return 'de';
  return 'en';
};

window.setLang = function(lang) {
  if (lang !== 'de' && lang !== 'en') return;
  try { localStorage.setItem('lang', lang); } catch (e) {}
  try {
    const u = new URL(window.location.href);
    u.searchParams.set('lang', lang);
    window.history.replaceState(null, '', u.toString());
  } catch (e) {}
  window.applyI18n(lang);
};
```

- [ ] **Step 4: Create `index.html` — minimal skeleton with head + empty body**

```html
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title data-i18n="html.title">Vivienda Radazul — Saisonmiete 1–3 Monate · Teneriffa</title>
<meta name="description" data-i18n-attr="content:meta.description" content="95 m² mit Meerblick in Radazul, Teneriffa. Saisonmiete 1–3 Monate für Überwinterer, Remote Worker und Sabbaticals. Direkt vom Eigentümer, ab 01.07.2026." />

<meta property="og:type" content="website" />
<meta property="og:title" data-i18n-attr="content:og.title" content="Vivienda Radazul — Saisonmiete 1–3 Monate" />
<meta property="og:description" data-i18n-attr="content:og.description" content="95 m² Meerblick · 3 SZ · 25 m zum Atlantik · ab 01.07.2026" />
<meta property="og:image" content="https://weweler.co/vivienda-radazul/images/IMG_5494.jpeg" />
<meta property="og:url" content="https://weweler.co/vivienda-radazul/" />
<link rel="canonical" href="https://weweler.co/vivienda-radazul/" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

<link rel="stylesheet" href="style.css" />

<script src="i18n.js"></script>
</head>
<body>
<main id="top">
  <!-- Sections will be added in subsequent tasks -->
</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const lang = window.detectInitialLang();
    window.applyI18n(lang);

    document.querySelectorAll('[data-lang-set]').forEach(el => {
      el.addEventListener('click', function() {
        window.setLang(el.getAttribute('data-lang-set'));
      });
    });
  });
</script>
</body>
</html>
```

- [ ] **Step 5: Verify the page loads in browser without console errors**

Run:
```bash
open public/vivienda-radazul/index.html
```

Open browser console. Expected:
- Page loads (mostly blank, just title in tab)
- No JS errors in console
- `<html lang="de">` after JS runs

- [ ] **Step 6: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "scaffold vivienda-radazul page: skeleton HTML + Pankow i18n runtime"
```

---

## Task 2: Base CSS — variables, typography, layout primitives

**Files:**
- Modify: `public/vivienda-radazul/style.css`

- [ ] **Step 1: Append CSS variables and base styles to `style.css`**

Append to the end of `style.css`:

```css
:root {
  /* Palette — warm off-white base, deep ink, mediterranean teal accent */
  --bg: #faf9f6;
  --bg-deep: #f2efea;
  --ink: #1a1f24;
  --ink-soft: #3a4651;
  --ink-mute: #6a7480;
  --rule: #e0dbd1;
  --rule-soft: #ece8de;

  /* Accent — Mediterranean teal (from kitchen mosaic tiles) */
  --accent: #4a8a8a;
  --accent-deep: #2f6a6a;
  --accent-tint: #d8e8e6;

  /* Secondary accent — warm wood */
  --wood: #c9a87a;
  --wood-deep: #9b7f53;

  /* Type */
  --serif: "Newsreader", "Source Serif 4", Georgia, serif;
  --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Layout */
  --maxw: 1240px;
  --col: 760px;
  --gutter: clamp(20px, 4vw, 56px);

  /* WhatsApp brand */
  --wa: #25d366;
  --wa-deep: #128c7e;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

img { display: block; max-width: 100%; height: auto; }

a {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  transition: border-color .2s, color .2s;
}
a:hover { border-color: var(--accent); color: var(--accent); }

::selection { background: var(--accent); color: var(--bg); }

/* =============================================================
   Typography
   ============================================================= */
.serif { font-family: var(--serif); font-weight: 400; }
.mono  { font-family: var(--mono); font-weight: 400; letter-spacing: -.01em; }

h1, h2, h3, h4 {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -.015em;
  line-height: 1.05;
  margin: 0;
  color: var(--ink);
  text-wrap: balance;
}

h1 { font-size: clamp(40px, 6.4vw, 84px); line-height: 1.02; letter-spacing: -.025em; }
h2 { font-size: clamp(30px, 3.8vw, 52px); line-height: 1.08; letter-spacing: -.02em; }
h3 { font-size: clamp(22px, 2.2vw, 28px); line-height: 1.2; }
h4 { font-size: 18px; font-family: var(--sans); font-weight: 600; letter-spacing: -.01em; }

p { margin: 0 0 1em; }
p.lead {
  font-family: var(--serif);
  font-size: clamp(20px, 1.9vw, 24px);
  line-height: 1.45;
  color: var(--ink-soft);
  letter-spacing: -.005em;
}

em { font-style: italic; }

.eyebrow {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

/* =============================================================
   Layout primitives
   ============================================================= */
main { display: block; }

section {
  padding: clamp(60px, 8vw, 120px) var(--gutter);
  max-width: var(--maxw);
  margin: 0 auto;
}

.column {
  max-width: var(--col);
  margin: 0 auto;
}

.section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: clamp(20px, 3vw, 40px);
  margin-bottom: clamp(40px, 5vw, 64px);
  align-items: start;
}
.section-head .num {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(28px, 3vw, 40px);
  color: var(--accent);
  line-height: 1;
}
.section-head .title { margin-bottom: 12px; }
.section-head .lead { margin: 0; max-width: 640px; }

.hr-section {
  border: 0;
  height: 1px;
  background: var(--rule);
  max-width: var(--maxw);
  margin: 0 auto;
}

/* =============================================================
   Buttons / CTAs
   ============================================================= */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--sans);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -.005em;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  transition: background .2s, transform .15s;
}
.btn:hover { background: var(--accent-deep); transform: translateY(-1px); }
.btn .arrow { transition: transform .2s; }
.btn:hover .arrow { transform: translateX(3px); }

.btn-wa {
  background: var(--wa);
  color: white;
}
.btn-wa:hover { background: var(--wa-deep); }

.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--rule);
}
.btn-ghost:hover { background: var(--bg-deep); border-color: var(--accent); }

/* =============================================================
   Responsive base
   ============================================================= */
@media (max-width: 768px) {
  body { font-size: 16px; }
  .section-head {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .section-head .num { font-size: 22px; }
}
```

- [ ] **Step 2: Verify in browser**

Reload the page in browser. Expected:
- Background is warm off-white `#faf9f6`
- Fonts loaded (DevTools → Network → confirm Newsreader, Inter, JetBrains Mono CSS files loaded with 200 status)
- No CSS errors in console

- [ ] **Step 3: Commit**

```bash
git add public/vivienda-radazul/style.css
git commit -m "vivienda-radazul: base CSS variables, typography, layout primitives"
```

---

## Task 3: Topbar — sticky header with brand, availability, language switch, WhatsApp CTA

**Files:**
- Modify: `public/vivienda-radazul/index.html` (insert `<header class="topbar">` before `<main>`)
- Modify: `public/vivienda-radazul/style.css` (append topbar styles)
- Modify: `public/vivienda-radazul/i18n.js` (add topbar keys in `de` and `en`)

- [ ] **Step 1: Add HTML — insert this `<header>` directly before `<main id="top">` in `index.html`**

```html
<header class="topbar">
  <div class="topbar-inner">
    <a class="topbar-mark" href="#top">
      Vivienda Radazul <em data-i18n="topbar.mark.suffix">· Saisonmiete</em>
    </a>
    <div class="topbar-meta">
      <span><span class="dot"></span><span data-i18n="topbar.available">Frei ab 01.07.2026</span></span>
      <span data-i18n="topbar.duration">1–3 Monate · Direkt vom Eigentümer</span>
    </div>
    <div class="topbar-right">
      <div class="lang-switch" role="group" aria-label="Language">
        <button type="button" data-lang-set="de" data-i18n="topbar.lang.de">DE</button>
        <span class="lang-sep">/</span>
        <button type="button" data-lang-set="en" data-i18n="topbar.lang.en">EN</button>
      </div>
      <a class="topbar-cta" href="https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!" target="_blank" rel="noopener" data-i18n="topbar.cta">Anfrage per WhatsApp</a>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Topbar (sticky)
   ============================================================= */
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250, 249, 246, .92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
}
.topbar-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 14px var(--gutter);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
}
.topbar-mark {
  font-family: var(--serif);
  font-size: 18px;
  color: var(--ink);
  border-bottom: 0;
  letter-spacing: -.01em;
}
.topbar-mark em { color: var(--ink-mute); font-style: italic; }

.topbar-meta {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: var(--ink-soft);
  justify-content: center;
}
.topbar-meta .dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 8px;
  vertical-align: middle;
}

.topbar-right {
  display: flex;
  gap: 18px;
  align-items: center;
}
.lang-switch {
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
}
.lang-switch button {
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--ink-mute);
  font: inherit;
  padding: 4px 2px;
  letter-spacing: .05em;
}
.lang-switch button.active { color: var(--ink); }
.lang-switch button:hover { color: var(--accent); }
.lang-switch .lang-sep { color: var(--rule); }

.topbar-cta {
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 0;
  transition: background .2s;
}
.topbar-cta:hover {
  background: var(--accent-deep);
  color: white;
  border-bottom: 0;
}

@media (max-width: 900px) {
  .topbar-meta { display: none; }
  .topbar-inner { grid-template-columns: auto 1fr; }
}
@media (max-width: 540px) {
  .topbar-cta { display: none; }
  .topbar-inner { padding: 12px 16px; }
}
```

- [ ] **Step 3: Add i18n keys — extend the `de` and `en` objects in `i18n.js`**

In `i18n.js`, replace `de: {}` and `en: {}` with:

```javascript
  de: {
    "html.title": "Vivienda Radazul — Saisonmiete 1–3 Monate · Teneriffa",
    "meta.description": "95 m² mit Meerblick in Radazul, Teneriffa. Saisonmiete 1–3 Monate für Überwinterer, Remote Worker und Sabbaticals. Direkt vom Eigentümer, ab 01.07.2026.",
    "og.title": "Vivienda Radazul — Saisonmiete 1–3 Monate",
    "og.description": "95 m² Meerblick · 3 SZ · 25 m zum Atlantik · ab 01.07.2026",

    "topbar.mark.suffix": "· Saisonmiete",
    "topbar.available": "Frei ab 01.07.2026",
    "topbar.duration": "1–3 Monate · Direkt vom Eigentümer",
    "topbar.cta": "Anfrage per WhatsApp",
    "topbar.lang.de": "DE",
    "topbar.lang.en": "EN"
  },
  en: {
    "html.title": "Vivienda Radazul — Seasonal rental 1–3 months · Tenerife",
    "meta.description": "95 m² apartment with sea view in Radazul, Tenerife. Seasonal rental 1–3 months for winter residents, remote workers and sabbaticals. Directly from the owners, available 1 July 2026.",
    "og.title": "Vivienda Radazul — Seasonal rental 1–3 months",
    "og.description": "95 m² sea view · 3 bedrooms · 25 m to the Atlantic · available 1 July 2026",

    "topbar.mark.suffix": "· Seasonal rental",
    "topbar.available": "Available 1 July 2026",
    "topbar.duration": "1–3 months · Direct from the owners",
    "topbar.cta": "Inquire via WhatsApp",
    "topbar.lang.de": "DE",
    "topbar.lang.en": "EN"
  }
```

- [ ] **Step 4: Browser verification**

Reload `public/vivienda-radazul/index.html`. Expected:
- Sticky topbar at top: `Vivienda Radazul · Saisonmiete` (left), `Frei ab 01.07.2026 / 1–3 Monate · Direkt vom Eigentümer` (middle), `DE / EN` + WhatsApp button (right)
- Click `EN` → middle text changes to English, `EN` becomes active
- Click `DE` → reverts
- Click WhatsApp CTA → opens `wa.me/34689575062...` (new tab)
- Reload after switching to EN → still EN (localStorage works)

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: sticky topbar with brand, availability, lang switch, WhatsApp CTA"
```

---

## Task 4: Hero section — Balkon image + headline + sub + facts + CTA

**Files:**
- Modify: `public/vivienda-radazul/index.html` (insert hero section inside `<main id="top">`)
- Modify: `public/vivienda-radazul/style.css` (append hero styles)
- Modify: `public/vivienda-radazul/i18n.js` (add hero keys)

- [ ] **Step 1: Add HTML — insert inside `<main id="top">`**

```html
<!-- 1. Hero -->
<section class="hero">
  <div class="hero-grid">
    <div class="hero-text">
      <div class="hero-meta-line">
        <span data-i18n="hero.meta.1">Radazul · Teneriffa</span>
        <span class="sep"></span>
        <span data-i18n="hero.meta.2">Direkt vom Eigentümer</span>
      </div>

      <h1 class="serif" data-i18n="hero.h1">Wohnen auf <em>Zeit</em> am Atlantik.</h1>

      <p class="hero-sub" data-i18n="hero.sub">95 m² mit Meerblick. 1, 2 oder 3 Monate. Für Überwinterer, Remote Worker und Sabbaticals — direkt vom Eigentümer, mit Mietvertrag, ohne Plattform.</p>

      <dl class="hero-facts">
        <div><dt data-i18n="hero.fact.size.k">Größe</dt><dd data-i18n="hero.fact.size.v">95 m² + 20 m² Balkon</dd></div>
        <div><dt data-i18n="hero.fact.rooms.k">Räume</dt><dd data-i18n="hero.fact.rooms.v">3 SZ · 2 Bad</dd></div>
        <div><dt data-i18n="hero.fact.floor.k">Lage</dt><dd data-i18n="hero.fact.floor.v">1. OG · Süd</dd></div>
        <div><dt data-i18n="hero.fact.avail.k">Frei ab</dt><dd data-i18n="hero.fact.avail.v">01.07.2026</dd></div>
      </dl>

      <a href="https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!" target="_blank" rel="noopener" class="btn btn-wa" data-i18n="hero.cta">Anfrage per WhatsApp <span class="arrow">→</span></a>
    </div>

    <figure class="hero-image">
      <img src="images/IMG_5494.jpeg" alt="Blick vom Balkon der Vivienda Radazul über den Esstisch auf den Atlantik und den Hafen Radazul" />
    </figure>
  </div>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Hero
   ============================================================= */
.hero {
  padding-top: clamp(40px, 5vw, 80px);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
.hero-text { display: flex; flex-direction: column; }

.hero-meta-line {
  display: flex;
  gap: 12px;
  align-items: center;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-bottom: clamp(24px, 3vw, 40px);
}
.hero-meta-line .sep {
  display: inline-block;
  width: 24px;
  height: 1px;
  background: var(--rule);
}

.hero h1 {
  margin-bottom: clamp(20px, 2.5vw, 32px);
}
.hero h1 em {
  color: var(--accent);
  font-style: italic;
}

.hero-sub {
  font-family: var(--serif);
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.5;
  color: var(--ink-soft);
  max-width: 540px;
  margin-bottom: clamp(28px, 3vw, 40px);
}

.hero-facts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 32px;
  margin: 0 0 clamp(32px, 4vw, 48px);
  padding: 24px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  max-width: 540px;
}
.hero-facts > div { display: flex; flex-direction: column; gap: 4px; }
.hero-facts dt {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.hero-facts dd {
  margin: 0;
  font-size: 16px;
  color: var(--ink);
  font-weight: 500;
}

.hero-image {
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 3/4;
}
.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-image { aspect-ratio: 4/3; order: -1; }
  .hero-facts { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .hero-facts { grid-template-columns: 1fr 1fr; gap: 14px 20px; }
}
```

- [ ] **Step 3: Add i18n keys — extend `de` and `en` in `i18n.js`** (insert after the `topbar.*` keys)

```javascript
    "hero.meta.1": "Radazul · Teneriffa",
    "hero.meta.2": "Direkt vom Eigentümer",
    "hero.h1": "Wohnen auf <em>Zeit</em> am Atlantik.",
    "hero.sub": "95 m² mit Meerblick. 1, 2 oder 3 Monate. Für Überwinterer, Remote Worker und Sabbaticals — direkt vom Eigentümer, mit Mietvertrag, ohne Plattform.",
    "hero.fact.size.k": "Größe",
    "hero.fact.size.v": "95 m² + 20 m² Balkon",
    "hero.fact.rooms.k": "Räume",
    "hero.fact.rooms.v": "3 SZ · 2 Bad",
    "hero.fact.floor.k": "Lage",
    "hero.fact.floor.v": "1. OG · Süd",
    "hero.fact.avail.k": "Frei ab",
    "hero.fact.avail.v": "01.07.2026",
    "hero.cta": "Anfrage per WhatsApp <span class=\"arrow\">→</span>",
```

And for English:

```javascript
    "hero.meta.1": "Radazul · Tenerife",
    "hero.meta.2": "Direct from the owners",
    "hero.h1": "Living by the Atlantic, <em>on time</em>.",
    "hero.sub": "95 m² with sea view. 1, 2 or 3 months. For winter residents, remote workers and sabbaticals — direct from the owners, with a rental contract, no platforms in between.",
    "hero.fact.size.k": "Size",
    "hero.fact.size.v": "95 m² + 20 m² balcony",
    "hero.fact.rooms.k": "Rooms",
    "hero.fact.rooms.v": "3 BR · 2 bath",
    "hero.fact.floor.k": "Floor",
    "hero.fact.floor.v": "1st · South",
    "hero.fact.avail.k": "Available",
    "hero.fact.avail.v": "1 July 2026",
    "hero.cta": "Inquire via WhatsApp <span class=\"arrow\">→</span>",
```

- [ ] **Step 4: Browser verification**

Reload page. Expected:
- Hero fills viewport, headline reads "Wohnen auf *Zeit* am Atlantik." with teal italic on "Zeit"
- Balcony photo loads to the right (or above on mobile)
- 4 facts in a 2x2 grid (Größe / Räume / Lage / Frei ab)
- WhatsApp button is teal/green, clicking opens wa.me link
- EN switch translates everything correctly

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: hero section with balcony image, headline, facts, WA CTA"
```

---

## Task 5: Hook + Audience tiles — owner-to-tenant narrative + 3 target-group cards

**Files:**
- Modify: all three files (HTML, CSS, i18n.js)

- [ ] **Step 1: Add HTML — append after the hero `</section>`**

```html
<!-- 2. Hook -->
<section class="hook">
  <div class="column">
    <div class="hook-text">
      <p data-i18n="hook.p1">Wir sind die Eigentümer der Wohnung — keine Agentur, keine Plattform. Wir vermieten die Vivienda direkt an Menschen, die für eine bestimmte Zeit auf Teneriffa leben wollen.</p>
      <p data-i18n="hook.p2">Saisonmiete heißt: ein, zwei oder drei Monate, mit zweisprachigem Mietvertrag und klarem Anfang- und Ende-Datum. Wir vermieten ausdrücklich keine Ferienwohnung — du buchst hier nicht zwei Wochen Strandurlaub. Du ziehst hier ein, packst aus, lebst.</p>
      <p data-i18n="hook.p3"><em>Wir suchen ruhige, längere Aufenthalte. Überwinterer, Remote Worker, Sabbatical-Reisende. Keine wechselnden Wochenend-Gäste.</em></p>
    </div>
  </div>
</section>

<hr class="hr-section" />

<!-- 3. Audience — for whom -->
<section id="zielgruppe">
  <header class="section-head">
    <div class="num">I.</div>
    <div>
      <h2 class="title" data-i18n="aud.title">Für wen die Wohnung <em>gemacht ist</em>.</h2>
      <p class="lead" data-i18n="aud.lead">Drei Profile, für die diese Wohnung über 1–3 Monate richtig funktioniert.</p>
    </div>
  </header>

  <div class="audience-grid">
    <article class="audience-card">
      <div class="audience-icon">❄️</div>
      <h3 class="audience-h" data-i18n="aud.1.h">Überwinterer<br/><span class="audience-sub">November bis März</span></h3>
      <p data-i18n="aud.1.p">Dem nassen Norden für 2–3 Monate entkommen. 20 °C, blauer Himmel, ruhige Wohngegend mit Supermarkt um die Ecke. Die Hauptsaison auf Teneriffa für Überwinterer.</p>
    </article>
    <article class="audience-card">
      <div class="audience-icon">💻</div>
      <h3 class="audience-h" data-i18n="aud.2.h">Remote Worker<br/><span class="audience-sub">1–3 Monate</span></h3>
      <p data-i18n="aud.2.p">300 Mbit Glasfaser, ruhiger Schreibtisch, Pool unter dir, Atlantik vor der Tür. Voll möbliert, du brauchst nur deinen Laptop.</p>
    </article>
    <article class="audience-card">
      <div class="audience-icon">🌿</div>
      <h3 class="audience-h" data-i18n="aud.3.h">Sabbatical<br/><span class="audience-sub">2–3 Monate</span></h3>
      <p data-i18n="aud.3.p">Genug Zeit, um wirklich anzukommen. Schwimmen am Atlantik direkt vor der Tür, Wandern im Anaga-Gebirge eine halbe Stunde entfernt. Voll möbliert, du brauchst nur deinen Koffer.</p>
    </article>
  </div>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Hook
   ============================================================= */
.hook {
  padding-top: clamp(40px, 5vw, 64px);
  padding-bottom: clamp(40px, 5vw, 64px);
}
.hook-text p {
  font-family: var(--serif);
  font-size: clamp(20px, 1.9vw, 24px);
  line-height: 1.55;
  color: var(--ink-soft);
  letter-spacing: -.005em;
  margin-bottom: 1.2em;
}
.hook-text p:last-child em {
  color: var(--accent);
}

/* =============================================================
   Audience tiles
   ============================================================= */
.audience-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 2.5vw, 32px);
}
.audience-card {
  padding: clamp(28px, 3vw, 40px);
  background: var(--bg-deep);
  border-radius: 6px;
  border: 1px solid var(--rule-soft);
}
.audience-icon {
  font-size: 32px;
  margin-bottom: 20px;
}
.audience-h {
  font-family: var(--serif);
  font-size: clamp(22px, 2vw, 28px);
  line-height: 1.15;
  margin-bottom: 16px;
  color: var(--ink);
}
.audience-sub {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-block;
  margin-top: 6px;
}
.audience-card p {
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin: 0;
}

@media (max-width: 900px) {
  .audience-grid { grid-template-columns: 1fr; gap: 16px; }
  .audience-card { padding: 24px; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "hook.p1": "Wir sind die Eigentümer der Wohnung — keine Agentur, keine Plattform. Wir vermieten die Vivienda direkt an Menschen, die für eine bestimmte Zeit auf Teneriffa leben wollen.",
    "hook.p2": "Saisonmiete heißt: ein, zwei oder drei Monate, mit zweisprachigem Mietvertrag und klarem Anfang- und Ende-Datum. Wir vermieten ausdrücklich keine Ferienwohnung — du buchst hier nicht zwei Wochen Strandurlaub. Du ziehst hier ein, packst aus, lebst.",
    "hook.p3": "<em>Wir suchen ruhige, längere Aufenthalte. Überwinterer, Remote Worker, Sabbatical-Reisende. Keine wechselnden Wochenend-Gäste.</em>",

    "aud.title": "Für wen die Wohnung <em>gemacht ist</em>.",
    "aud.lead": "Drei Profile, für die diese Wohnung über 1–3 Monate richtig funktioniert.",
    "aud.1.h": "Überwinterer<br/><span class=\"audience-sub\">November bis März</span>",
    "aud.1.p": "Dem nassen Norden für 2–3 Monate entkommen. 20 °C, blauer Himmel, ruhige Wohngegend mit Supermarkt um die Ecke. Die Hauptsaison auf Teneriffa für Überwinterer.",
    "aud.2.h": "Remote Worker<br/><span class=\"audience-sub\">1–3 Monate</span>",
    "aud.2.p": "300 Mbit Glasfaser, ruhiger Schreibtisch, Pool unter dir, Atlantik vor der Tür. Voll möbliert, du brauchst nur deinen Laptop.",
    "aud.3.h": "Sabbatical<br/><span class=\"audience-sub\">2–3 Monate</span>",
    "aud.3.p": "Genug Zeit, um wirklich anzukommen. Schwimmen am Atlantik direkt vor der Tür, Wandern im Anaga-Gebirge eine halbe Stunde entfernt. Voll möbliert, du brauchst nur deinen Koffer.",
```

And for `en`:

```javascript
    "hook.p1": "We are the owners of the apartment — not an agency, not a platform. We rent the Vivienda directly to people who want to live in Tenerife for a defined period of time.",
    "hook.p2": "Seasonal rental means: one, two or three months, with a bilingual rental contract and a clear start and end date. We are explicitly not a holiday rental — you don't book two weeks of beach holiday here. You move in, unpack, and live.",
    "hook.p3": "<em>We're looking for quiet, longer stays. Winter residents, remote workers, sabbatical travellers. Not weekend-to-weekend guests.</em>",

    "aud.title": "Who the apartment is <em>made for</em>.",
    "aud.lead": "Three profiles for whom this apartment works well over 1–3 months.",
    "aud.1.h": "Winter residents<br/><span class=\"audience-sub\">November to March</span>",
    "aud.1.p": "Escape the wet northern winter for 2–3 months. 20 °C, blue skies, quiet residential area with a supermarket around the corner. Tenerife's peak season for winter residents.",
    "aud.2.h": "Remote workers<br/><span class=\"audience-sub\">1–3 months</span>",
    "aud.2.p": "300 Mbit fibre, a quiet desk, pool below you, Atlantic at the doorstep. Fully furnished — you only need your laptop.",
    "aud.3.h": "Sabbatical<br/><span class=\"audience-sub\">2–3 months</span>",
    "aud.3.p": "Enough time to truly arrive. Swim in the Atlantic right at the doorstep, hike the Anaga mountains half an hour away. Fully furnished — you only need your suitcase.",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- Hook section with 3 paragraphs in Newsreader serif, last paragraph italic with teal accent
- Horizontal rule separator
- Audience section: Roman numeral "I." in teal, title "Für wen die Wohnung gemacht ist."
- 3 cards in a row (desktop) / stacked (mobile): Überwinterer / Remote Worker / Sabbatical
- Each card has icon + title + subtitle in teal mono + paragraph
- EN switch translates correctly

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: hook section + audience tiles (Überwinterer/Remote/Sabbatical)"
```

---

## Task 6: Eckdaten table — key facts

**Files:** modify all three files.

- [ ] **Step 1: Add HTML — append after audience `</section>`**

```html
<hr class="hr-section" />

<!-- 4. Eckdaten -->
<section id="eckdaten">
  <header class="section-head">
    <div class="num">II.</div>
    <div>
      <h2 class="title" data-i18n="eck.title">Eckdaten <em>auf einen Blick</em>.</h2>
      <p class="lead" data-i18n="eck.lead">Die wichtigsten Zahlen ohne Marketing-Sprech.</p>
    </div>
  </header>

  <div class="facts-table">
    <dl>
      <div class="row"><dt data-i18n="eck.size.k">Größe</dt><dd data-i18n="eck.size.v">95 m² Wohnfläche + 20 m² Balkon</dd></div>
      <div class="row"><dt data-i18n="eck.rooms.k">Räume</dt><dd data-i18n="eck.rooms.v">3 Schlafzimmer (5 Schlafplätze) · 2 Bäder · offene Küche · Wohnzimmer</dd></div>
      <div class="row"><dt data-i18n="eck.floor.k">Lage</dt><dd data-i18n="eck.floor.v">1. Stock · Südausrichtung · Meerblick</dd></div>
      <div class="row"><dt data-i18n="eck.dist.k">Distanzen</dt><dd data-i18n="eck.dist.v">25 m zum Atlantik · Gemeinschaftspool im Haus · Spielplätze, Restaurants, Supermarkt fußläufig</dd></div>
      <div class="row"><dt data-i18n="eck.transit.k">Anbindung</dt><dd data-i18n="eck.transit.v">20 Min Santa Cruz · 40 Min Flughafen TFS</dd></div>
      <div class="row"><dt data-i18n="eck.net.k">Internet</dt><dd data-i18n="eck.net.v">Glasfaser 300 Mbit</dd></div>
      <div class="row"><dt data-i18n="eck.parking.k">Parkplatz</dt><dd data-i18n="eck.parking.v">1 Stellplatz inklusive</dd></div>
      <div class="row"><dt data-i18n="eck.duration.k">Mietdauer</dt><dd data-i18n="eck.duration.v">1, 2 oder 3 Monate <span class="small">Mindestaufenthalt 30 Tage</span></dd></div>
      <div class="row"><dt data-i18n="eck.contract.k">Vertragsform</dt><dd data-i18n="eck.contract.v">arrendamiento de temporada <span class="small">Zweisprachiger Mietvertrag DE/ES</span></dd></div>
      <div class="row highlight"><dt data-i18n="eck.avail.k">Verfügbar ab</dt><dd data-i18n="eck.avail.v">01.07.2026</dd></div>
      <div class="row highlight"><dt data-i18n="eck.price.k">Miete</dt><dd data-i18n="eck.price.v">Auf Anfrage <span class="small">Hochsaison Nov–März, Juli/August · Nebensaison Apr–Juni, Sept/Oktober</span></dd></div>
    </dl>
  </div>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Eckdaten table
   ============================================================= */
.facts-table {
  max-width: var(--maxw);
  border-top: 1px solid var(--rule);
}
.facts-table dl { margin: 0; }
.facts-table .row {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: clamp(20px, 3vw, 40px);
  padding: 20px 0;
  border-bottom: 1px solid var(--rule);
  align-items: baseline;
}
.facts-table dt {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.facts-table dd {
  margin: 0;
  font-size: 16px;
  color: var(--ink);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.facts-table .small {
  font-size: 13px;
  color: var(--ink-mute);
  font-family: var(--sans);
  margin-top: 2px;
}
.facts-table .row.highlight dd {
  font-weight: 500;
  color: var(--accent-deep);
  font-size: 18px;
}
.facts-table .row.highlight .small { color: var(--ink-mute); font-weight: 400; font-size: 13px; }

@media (max-width: 700px) {
  .facts-table .row { grid-template-columns: 1fr; gap: 4px; padding: 16px 0; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "eck.title": "Eckdaten <em>auf einen Blick</em>.",
    "eck.lead": "Die wichtigsten Zahlen ohne Marketing-Sprech.",
    "eck.size.k": "Größe",
    "eck.size.v": "95 m² Wohnfläche + 20 m² Balkon",
    "eck.rooms.k": "Räume",
    "eck.rooms.v": "3 Schlafzimmer (5 Schlafplätze) · 2 Bäder · offene Küche · Wohnzimmer",
    "eck.floor.k": "Lage",
    "eck.floor.v": "1. Stock · Südausrichtung · Meerblick",
    "eck.dist.k": "Distanzen",
    "eck.dist.v": "25 m zum Atlantik · Gemeinschaftspool im Haus · Spielplätze, Restaurants, Supermarkt fußläufig",
    "eck.transit.k": "Anbindung",
    "eck.transit.v": "20 Min Santa Cruz · 40 Min Flughafen TFS",
    "eck.net.k": "Internet",
    "eck.net.v": "Glasfaser 300 Mbit",
    "eck.parking.k": "Parkplatz",
    "eck.parking.v": "1 Stellplatz inklusive",
    "eck.duration.k": "Mietdauer",
    "eck.duration.v": "1, 2 oder 3 Monate <span class=\"small\">Mindestaufenthalt 30 Tage</span>",
    "eck.contract.k": "Vertragsform",
    "eck.contract.v": "arrendamiento de temporada <span class=\"small\">Zweisprachiger Mietvertrag DE/ES</span>",
    "eck.avail.k": "Verfügbar ab",
    "eck.avail.v": "01.07.2026",
    "eck.price.k": "Miete",
    "eck.price.v": "Auf Anfrage <span class=\"small\">Hochsaison Nov–März, Juli/August · Nebensaison Apr–Juni, Sept/Oktober</span>",
```

And `en`:

```javascript
    "eck.title": "Key facts <em>at a glance</em>.",
    "eck.lead": "The numbers that matter, no marketing spin.",
    "eck.size.k": "Size",
    "eck.size.v": "95 m² living space + 20 m² balcony",
    "eck.rooms.k": "Rooms",
    "eck.rooms.v": "3 bedrooms (5 sleeping spaces) · 2 bathrooms · open kitchen · living room",
    "eck.floor.k": "Floor",
    "eck.floor.v": "1st floor · south-facing · sea view",
    "eck.dist.k": "Distances",
    "eck.dist.v": "25 m to the Atlantic · shared pool in the building · playgrounds, restaurants, supermarket within walking distance",
    "eck.transit.k": "Access",
    "eck.transit.v": "20 min to Santa Cruz · 40 min to Tenerife South airport (TFS)",
    "eck.net.k": "Internet",
    "eck.net.v": "Fibre 300 Mbit",
    "eck.parking.k": "Parking",
    "eck.parking.v": "1 dedicated parking spot included",
    "eck.duration.k": "Rental duration",
    "eck.duration.v": "1, 2 or 3 months <span class=\"small\">Minimum stay 30 days</span>",
    "eck.contract.k": "Contract type",
    "eck.contract.v": "arrendamiento de temporada <span class=\"small\">Bilingual rental contract DE/ES</span>",
    "eck.avail.k": "Available from",
    "eck.avail.v": "1 July 2026",
    "eck.price.k": "Rent",
    "eck.price.v": "On request <span class=\"small\">High season Nov–March, Jul/Aug · Low season Apr–Jun, Sept/Oct</span>",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- "II. Eckdaten auf einen Blick." section
- Two-column table with 11 rows, monospace keys left, content right
- Last two rows (Verfügbar ab, Miete) highlighted in teal `--accent-deep`
- Sub-text under "Mietdauer", "Vertragsform", "Miete" in muted color
- EN switch translates correctly

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: eckdaten facts table with highlighted Verfügbar/Miete rows"
```

---

## Task 7: Gallery I — Living, kitchen, pool, outside (horizontal scroll)

**Files:** modify all three files.

- [ ] **Step 1: Add HTML — append after eckdaten `</section>`**

```html
<!-- 5. Gallery I — Wohnen, Außen -->
<section id="galerie-1">
  <header class="section-head">
    <div class="num">III.</div>
    <div>
      <h2 class="title" data-i18n="gal1.title">Die Wohnung, <em>von innen</em>.</h2>
      <p class="lead" data-i18n="gal1.lead">Wohnzimmer, offene Küche, Balkon mit Atlantikblick, Gemeinschaftspool.</p>
    </div>
  </header>

  <div class="gallery">
    <div class="gallery-head">
      <span class="scroll-hint" data-i18n="gal.scroll">Seitwärts scrollen →</span>
    </div>
    <div class="gallery-scroll">
      <div class="gallery-rail">
        <figure class="gallery-item gi-wide"><div class="frame"><img src="images/IMG_5494.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap1">Balkon · Atlantikblick</span><span class="num">01</span></figcaption></figure>
        <figure class="gallery-item gi-square"><div class="frame"><img src="images/IMG_5497.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap2">Gemeinschaftspool</span><span class="num">02</span></figcaption></figure>
        <figure class="gallery-item gi-tall"><div class="frame"><img src="images/IMG_5498.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap3">Wohnzimmer · Palmen-Prints</span><span class="num">03</span></figcaption></figure>
        <figure class="gallery-item gi-wide"><div class="frame"><img src="images/IMG_5502.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap4">Wohn-Essbereich</span><span class="num">04</span></figcaption></figure>
        <figure class="gallery-item gi-tall"><div class="frame"><img src="images/IMG_5499.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap5">Sofa · Bergblick</span><span class="num">05</span></figcaption></figure>
        <figure class="gallery-item gi-square"><div class="frame"><img src="images/IMG_5500.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap6">Durchreiche · Barhocker</span><span class="num">06</span></figcaption></figure>
        <figure class="gallery-item gi-tall"><div class="frame"><img src="images/IMG_5503.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap7">Küche · Mosaik-Fliesen</span><span class="num">07</span></figcaption></figure>
        <figure class="gallery-item gi-wide"><div class="frame"><img src="images/IMG_5504.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap8">Küche · Komplett ausgestattet</span><span class="num">08</span></figcaption></figure>
        <figure class="gallery-item gi-square"><div class="frame"><img src="images/IMG_5501.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal1.cap9">Wohnbereich · Strand-Print</span><span class="num">09</span></figcaption></figure>
      </div>
    </div>

    <div class="gallery-foot">
      <span data-i18n="gal1.foot">Galerie I · 9 Bilder</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Gallery (horizontal scroll)
   ============================================================= */
.gallery {
  position: relative;
  margin-top: clamp(20px, 3vw, 32px);
}
.gallery-head {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}
.scroll-hint {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.gallery-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--rule) transparent;
  margin: 0 calc(-1 * var(--gutter));
  padding: 0 var(--gutter) 24px;
  scroll-snap-type: x mandatory;
}
.gallery-scroll::-webkit-scrollbar { height: 6px; }
.gallery-scroll::-webkit-scrollbar-track { background: transparent; }
.gallery-scroll::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 3px; }

.gallery-rail {
  display: flex;
  gap: clamp(12px, 1.5vw, 20px);
  width: max-content;
}

.gallery-item {
  margin: 0;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.gallery-item .frame {
  overflow: hidden;
  border-radius: 4px;
  background: var(--bg-deep);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .5s ease;
}
.gallery-item:hover img { transform: scale(1.02); }

.gi-wide .frame  { width: clamp(360px, 50vw, 640px); aspect-ratio: 4/3; }
.gi-tall .frame  { width: clamp(280px, 32vw, 400px); aspect-ratio: 3/4; }
.gi-square .frame { width: clamp(320px, 38vw, 480px); aspect-ratio: 1/1; }

.caption {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.caption .num { color: var(--accent); }

.gallery-foot {
  margin-top: 16px;
  text-align: right;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

@media (max-width: 480px) {
  .gi-wide .frame  { width: 280px; }
  .gi-tall .frame  { width: 220px; }
  .gi-square .frame { width: 260px; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "gal.scroll": "Seitwärts scrollen →",
    "gal1.title": "Die Wohnung, <em>von innen</em>.",
    "gal1.lead": "Wohnzimmer, offene Küche, Balkon mit Atlantikblick, Gemeinschaftspool.",
    "gal1.cap1": "Balkon · Atlantikblick",
    "gal1.cap2": "Gemeinschaftspool",
    "gal1.cap3": "Wohnzimmer · Palmen-Prints",
    "gal1.cap4": "Wohn-Essbereich",
    "gal1.cap5": "Sofa · Bergblick",
    "gal1.cap6": "Durchreiche · Barhocker",
    "gal1.cap7": "Küche · Mosaik-Fliesen",
    "gal1.cap8": "Küche · Komplett ausgestattet",
    "gal1.cap9": "Wohnbereich · Strand-Print",
    "gal1.foot": "Galerie I · 9 Bilder",
```

And `en`:

```javascript
    "gal.scroll": "Scroll sideways →",
    "gal1.title": "The apartment, <em>from inside</em>.",
    "gal1.lead": "Living room, open kitchen, balcony with Atlantic view, shared pool.",
    "gal1.cap1": "Balcony · Atlantic view",
    "gal1.cap2": "Shared pool",
    "gal1.cap3": "Living room · Palm prints",
    "gal1.cap4": "Living-dining area",
    "gal1.cap5": "Sofa · Mountain view",
    "gal1.cap6": "Pass-through · Barstools",
    "gal1.cap7": "Kitchen · Mosaic tiles",
    "gal1.cap8": "Kitchen · Fully equipped",
    "gal1.cap9": "Living area · Beach print",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- "III. Die Wohnung, von innen." with horizontal scrollable gallery, 9 images
- Mix of wide / tall / square frames, captions below with numbered (01-09)
- Horizontal scrollbar at bottom
- Lazy-loading: only images currently visible should be loaded (DevTools → Network)
- EN translates captions

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: gallery I (living/kitchen/pool/outside, 9 images)"
```

---

## Task 8: Season & inquiry block — high/low season + on-request CTA

**Files:** modify all three.

- [ ] **Step 1: Add HTML — append after gallery I `</section>`**

```html
<hr class="hr-section" />

<!-- 6. Season & Inquiry -->
<section id="saison">
  <header class="section-head">
    <div class="num">IV.</div>
    <div>
      <h2 class="title" data-i18n="sea.title">Saison & <em>Anfrage</em>.</h2>
      <p class="lead" data-i18n="sea.lead">Die Miete richtet sich nach Saison, Mietdauer und Aufenthaltsgrund. Wir machen dir ein konkretes Angebot.</p>
    </div>
  </header>

  <div class="season-grid">
    <div class="season-col">
      <h3 class="season-h" data-i18n="sea.high.h">Hochsaison</h3>
      <p class="season-period" data-i18n="sea.high.p">November bis März<br/>Juli und August</p>
      <p class="season-desc" data-i18n="sea.high.desc">Überwinterer-Saison und europäischer Sommer. Höhere Nachfrage, früher anfragen.</p>
    </div>
    <div class="season-col">
      <h3 class="season-h" data-i18n="sea.low.h">Nebensaison</h3>
      <p class="season-period" data-i18n="sea.low.p">April bis Juni<br/>September und Oktober</p>
      <p class="season-desc" data-i18n="sea.low.desc">Mildes Klima, weniger Andrang, günstigere Konditionen.</p>
    </div>
    <div class="season-cta">
      <h3 class="season-h" data-i18n="sea.cta.h">So bekommst du ein Angebot.</h3>
      <p class="season-desc" data-i18n="sea.cta.p">Schreib uns per WhatsApp mit deinem Wunsch-Zeitraum und dem Anlass deines Aufenthalts (Überwintern, Remote Work, Sabbatical, Genesung). Wir antworten innerhalb von 24 Stunden mit einem konkreten Mietangebot.</p>
      <a href="https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!" target="_blank" rel="noopener" class="btn btn-wa" data-i18n="sea.cta.btn">Anfrage stellen <span class="arrow">→</span></a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Season & inquiry
   ============================================================= */
.season-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
}
.season-col {
  padding: clamp(24px, 3vw, 32px);
  background: var(--bg-deep);
  border-radius: 6px;
  border: 1px solid var(--rule-soft);
}
.season-cta {
  padding: clamp(24px, 3vw, 32px);
  background: var(--accent);
  color: var(--bg);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.season-cta * { color: var(--bg) !important; }
.season-cta .season-h { color: var(--bg); margin-bottom: 12px; }
.season-h {
  font-family: var(--serif);
  font-size: clamp(20px, 1.8vw, 24px);
  margin-bottom: 12px;
}
.season-period {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: .04em;
  color: var(--accent-deep);
  line-height: 1.6;
  margin-bottom: 16px;
}
.season-desc {
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin-bottom: 16px;
}
.season-cta .btn-wa {
  align-self: flex-start;
  margin-top: 8px;
  background: white;
  color: var(--accent-deep) !important;
}
.season-cta .btn-wa:hover { background: var(--bg); color: var(--ink) !important; }

@media (max-width: 900px) {
  .season-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "sea.title": "Saison & <em>Anfrage</em>.",
    "sea.lead": "Die Miete richtet sich nach Saison, Mietdauer und Aufenthaltsgrund. Wir machen dir ein konkretes Angebot.",
    "sea.high.h": "Hochsaison",
    "sea.high.p": "November bis März<br/>Juli und August",
    "sea.high.desc": "Überwinterer-Saison und europäischer Sommer. Höhere Nachfrage, früher anfragen.",
    "sea.low.h": "Nebensaison",
    "sea.low.p": "April bis Juni<br/>September und Oktober",
    "sea.low.desc": "Mildes Klima, weniger Andrang, günstigere Konditionen.",
    "sea.cta.h": "So bekommst du ein Angebot.",
    "sea.cta.p": "Schreib uns per WhatsApp mit deinem Wunsch-Zeitraum und dem Anlass deines Aufenthalts (Überwintern, Remote Work, Sabbatical, Genesung). Wir antworten innerhalb von 24 Stunden mit einem konkreten Mietangebot.",
    "sea.cta.btn": "Anfrage stellen <span class=\"arrow\">→</span>",
```

And `en`:

```javascript
    "sea.title": "Season & <em>inquiry</em>.",
    "sea.lead": "Rent depends on season, duration, and purpose of stay. We make you a concrete offer.",
    "sea.high.h": "High season",
    "sea.high.p": "November to March<br/>July and August",
    "sea.high.desc": "Winter-resident season and European summer. Higher demand — inquire early.",
    "sea.low.h": "Low season",
    "sea.low.p": "April to June<br/>September and October",
    "sea.low.desc": "Mild climate, fewer travellers, better rates.",
    "sea.cta.h": "How to get an offer.",
    "sea.cta.p": "Write us on WhatsApp with your desired dates and the purpose of your stay (overwintering, remote work, sabbatical, recovery). We reply within 24 hours with a concrete offer.",
    "sea.cta.btn": "Send inquiry <span class=\"arrow\">→</span>",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- "IV. Saison & Anfrage." section with 3-column grid
- Left: Hochsaison (off-white card), Middle: Nebensaison (off-white card), Right: Inquiry CTA (teal background, white text)
- White WhatsApp button on teal CTA card
- Mobile: stacks to single column

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: season block (high/low) + inquiry CTA card"
```

---

## Task 9: Gallery II — Bedrooms & bathroom

**Files:** modify all three.

- [ ] **Step 1: Add HTML — append after season `</section>`**

```html
<!-- 7. Gallery II — Schlafen, Bäder -->
<section id="galerie-2">
  <header class="section-head">
    <div class="num">V.</div>
    <div>
      <h2 class="title" data-i18n="gal2.title">Schlafen, <em>baden</em>.</h2>
      <p class="lead" data-i18n="gal2.lead">Drei Schlafzimmer, fünf Schlafplätze, zwei Bäder. Lattenkopfteile aus Holz, helle Wände, Palmen-Kissen.</p>
    </div>
  </header>

  <div class="gallery">
    <div class="gallery-head">
      <span class="scroll-hint" data-i18n="gal.scroll">Seitwärts scrollen →</span>
    </div>
    <div class="gallery-scroll">
      <div class="gallery-rail">
        <figure class="gallery-item gi-wide"><div class="frame"><img src="images/IMG_5514.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap1">Master · Doppelbett</span><span class="num">01</span></figcaption></figure>
        <figure class="gallery-item gi-square"><div class="frame"><img src="images/IMG_5516.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap2">Master · Detail</span><span class="num">02</span></figcaption></figure>
        <figure class="gallery-item gi-tall"><div class="frame"><img src="images/IMG_5508.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap3">Zweites Schlafzimmer</span><span class="num">03</span></figcaption></figure>
        <figure class="gallery-item gi-tall"><div class="frame"><img src="images/IMG_5511.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap4">Drittes Schlafzimmer · Schminktisch</span><span class="num">04</span></figcaption></figure>
        <figure class="gallery-item gi-square"><div class="frame"><img src="images/IMG_5507.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap5">Lattenkopfteil · Detail</span><span class="num">05</span></figcaption></figure>
        <figure class="gallery-item gi-tall"><div class="frame"><img src="images/IMG_5510.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap6">Badezimmer</span><span class="num">06</span></figcaption></figure>
        <figure class="gallery-item gi-square"><div class="frame"><img src="images/IMG_5515.jpeg" alt="" loading="lazy" /></div><figcaption class="caption"><span data-i18n="gal2.cap7">Sessel-Ecke</span><span class="num">07</span></figcaption></figure>
      </div>
    </div>

    <div class="gallery-foot">
      <span data-i18n="gal2.foot">Galerie II · 7 Bilder</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: No new CSS needed** (gallery styles from Task 7 are reused)

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "gal2.title": "Schlafen, <em>baden</em>.",
    "gal2.lead": "Drei Schlafzimmer, fünf Schlafplätze, zwei Bäder. Lattenkopfteile aus Holz, helle Wände, Palmen-Kissen.",
    "gal2.cap1": "Master · Doppelbett",
    "gal2.cap2": "Master · Detail",
    "gal2.cap3": "Zweites Schlafzimmer",
    "gal2.cap4": "Drittes Schlafzimmer · Schminktisch",
    "gal2.cap5": "Lattenkopfteil · Detail",
    "gal2.cap6": "Badezimmer",
    "gal2.cap7": "Sessel-Ecke",
    "gal2.foot": "Galerie II · 7 Bilder",
```

And `en`:

```javascript
    "gal2.title": "Sleeping, <em>bathing</em>.",
    "gal2.lead": "Three bedrooms, five sleeping spaces, two bathrooms. Wooden slat headboards, white walls, palm-print pillows.",
    "gal2.cap1": "Master · Double bed",
    "gal2.cap2": "Master · Detail",
    "gal2.cap3": "Second bedroom",
    "gal2.cap4": "Third bedroom · Vanity desk",
    "gal2.cap5": "Slat headboard · Detail",
    "gal2.cap6": "Bathroom",
    "gal2.cap7": "Armchair corner",
    "gal2.foot": "Gallery II · 7 images",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- "V. Schlafen, baden." gallery with 7 bedroom/bathroom images
- Same scroll/layout behaviour as gallery I

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: gallery II (bedrooms + bathroom, 7 images)"
```

---

## Task 10: Lage — Radazul context & distances

**Files:** modify all three.

- [ ] **Step 1: Add HTML — append after gallery II `</section>`**

```html
<hr class="hr-section" />

<!-- 8. Lage -->
<section id="lage">
  <header class="section-head">
    <div class="num">VI.</div>
    <div>
      <h2 class="title" data-i18n="lage.title">Radazul, <em>Teneriffa-Ost</em>.</h2>
      <p class="lead" data-i18n="lage.lead">Ruhiger Küstenort in der Gemeinde El Rosario. Mehr Spanier als Touristen, kleiner Hafen, schwarzer Sandstrand. Alles Wichtige fußläufig.</p>
    </div>
  </header>

  <div class="lage-grid">
    <div class="lage-text">
      <p data-i18n="lage.p1">Vor der Tür liegt das Hafenbecken — Schwimmen direkt am Felsen, mit Leiter ins Wasser. Wer Sandstrand will, geht 5 Minuten nördlich zur Playa de Radazul.</p>
      <p data-i18n="lage.p2">Restaurants, Supermarkt (Hiperdino) und Spielplätze sind in 3–8 Minuten zu Fuß erreichbar. Die TF-1 Autobahn liegt 2 Minuten weg, die Anbindung in alle Richtungen ist schnell.</p>
      <a class="lage-maps" href="https://maps.google.com/?q=Radazul+Tenerife" target="_blank" rel="noopener" data-i18n="lage.gmaps">In Google Maps öffnen →</a>
    </div>

    <div class="lage-distances">
      <h4 class="lage-dist-h" data-i18n="lage.dist.h">Distanzen</h4>
      <ul>
        <li><span data-i18n="lage.dist.1k">Zum Atlantik</span> <span class="dist" data-i18n="lage.dist.1v">25 m</span></li>
        <li><span data-i18n="lage.dist.2k">Zum Gemeinschaftspool</span> <span class="dist" data-i18n="lage.dist.2v">im Haus</span></li>
        <li><span data-i18n="lage.dist.3k">Zum Supermarkt</span> <span class="dist" data-i18n="lage.dist.3v">5 Min zu Fuß</span></li>
        <li><span data-i18n="lage.dist.4k">Restaurants</span> <span class="dist" data-i18n="lage.dist.4v">3–8 Min zu Fuß</span></li>
        <li><span data-i18n="lage.dist.5k">Spielplatz</span> <span class="dist" data-i18n="lage.dist.5v">5 Min zu Fuß</span></li>
        <li><span data-i18n="lage.dist.6k">Santa Cruz (Hauptstadt)</span> <span class="dist" data-i18n="lage.dist.6v">20 Min mit Auto</span></li>
        <li><span data-i18n="lage.dist.7k">Flughafen Tenerife Süd (TFS)</span> <span class="dist" data-i18n="lage.dist.7v">40 Min mit Auto</span></li>
        <li><span data-i18n="lage.dist.8k">Anaga-Gebirge (Wandern)</span> <span class="dist" data-i18n="lage.dist.8v">30 Min mit Auto</span></li>
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Lage
   ============================================================= */
.lage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
}
.lage-text p {
  font-family: var(--serif);
  font-size: clamp(18px, 1.5vw, 22px);
  line-height: 1.55;
  color: var(--ink-soft);
  margin-bottom: 1.2em;
}
.lage-maps {
  display: inline-block;
  margin-top: 12px;
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: .04em;
  color: var(--accent);
  border-bottom: 1px solid var(--accent-tint);
}
.lage-maps:hover { color: var(--accent-deep); border-color: var(--accent); }

.lage-distances {
  background: var(--bg-deep);
  padding: clamp(24px, 3vw, 36px);
  border-radius: 6px;
  border: 1px solid var(--rule-soft);
}
.lage-dist-h {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-bottom: 20px;
}
.lage-distances ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.lage-distances li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid var(--rule-soft);
  font-size: 15px;
}
.lage-distances li:last-child { border-bottom: 0; }
.lage-distances .dist {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent-deep);
  letter-spacing: -.01em;
}

@media (max-width: 900px) {
  .lage-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "lage.title": "Radazul, <em>Teneriffa-Ost</em>.",
    "lage.lead": "Ruhiger Küstenort in der Gemeinde El Rosario. Mehr Spanier als Touristen, kleiner Hafen, schwarzer Sandstrand. Alles Wichtige fußläufig.",
    "lage.p1": "Vor der Tür liegt das Hafenbecken — Schwimmen direkt am Felsen, mit Leiter ins Wasser. Wer Sandstrand will, geht 5 Minuten nördlich zur Playa de Radazul.",
    "lage.p2": "Restaurants, Supermarkt (Hiperdino) und Spielplätze sind in 3–8 Minuten zu Fuß erreichbar. Die TF-1 Autobahn liegt 2 Minuten weg, die Anbindung in alle Richtungen ist schnell.",
    "lage.gmaps": "In Google Maps öffnen →",
    "lage.dist.h": "Distanzen",
    "lage.dist.1k": "Zum Atlantik",
    "lage.dist.1v": "25 m",
    "lage.dist.2k": "Zum Gemeinschaftspool",
    "lage.dist.2v": "im Haus",
    "lage.dist.3k": "Zum Supermarkt",
    "lage.dist.3v": "5 Min zu Fuß",
    "lage.dist.4k": "Restaurants",
    "lage.dist.4v": "3–8 Min zu Fuß",
    "lage.dist.5k": "Spielplatz",
    "lage.dist.5v": "5 Min zu Fuß",
    "lage.dist.6k": "Santa Cruz (Hauptstadt)",
    "lage.dist.6v": "20 Min mit Auto",
    "lage.dist.7k": "Flughafen Tenerife Süd (TFS)",
    "lage.dist.7v": "40 Min mit Auto",
    "lage.dist.8k": "Anaga-Gebirge (Wandern)",
    "lage.dist.8v": "30 Min mit Auto",
```

And `en`:

```javascript
    "lage.title": "Radazul, <em>east Tenerife</em>.",
    "lage.lead": "Quiet coastal village in the El Rosario municipality. More Spaniards than tourists, a small marina, a black-sand beach. Everything within walking distance.",
    "lage.p1": "The marina is right at the doorstep — swim straight off the rocks, with a ladder into the water. For sand, walk 5 minutes north to Playa de Radazul.",
    "lage.p2": "Restaurants, supermarket (Hiperdino) and playgrounds are within 3–8 minutes on foot. The TF-1 motorway is 2 minutes away — quick access in every direction.",
    "lage.gmaps": "Open in Google Maps →",
    "lage.dist.h": "Distances",
    "lage.dist.1k": "To the Atlantic",
    "lage.dist.1v": "25 m",
    "lage.dist.2k": "To the shared pool",
    "lage.dist.2v": "in the building",
    "lage.dist.3k": "To the supermarket",
    "lage.dist.3v": "5 min on foot",
    "lage.dist.4k": "Restaurants",
    "lage.dist.4v": "3–8 min on foot",
    "lage.dist.5k": "Playground",
    "lage.dist.5v": "5 min on foot",
    "lage.dist.6k": "Santa Cruz (capital)",
    "lage.dist.6v": "20 min by car",
    "lage.dist.7k": "Tenerife South airport (TFS)",
    "lage.dist.7v": "40 min by car",
    "lage.dist.8k": "Anaga mountains (hiking)",
    "lage.dist.8v": "30 min by car",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- "VI. Radazul, Teneriffa-Ost." section, two columns
- Left: 2 paragraphs in Newsreader serif + Google Maps link in teal mono
- Right: Distances list in off-white card, 8 distances, monospace values in teal
- Click Google Maps link → opens new tab to maps.google.com query "Radazul Tenerife"

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: Lage section with Radazul context + distances list"
```

---

## Task 11: Inquiry process — 5 steps explaining how a rental works

**Files:** modify all three.

- [ ] **Step 1: Add HTML — append after lage `</section>`**

```html
<hr class="hr-section" />

<!-- 9. Process — How an inquiry works -->
<section id="prozess">
  <header class="section-head">
    <div class="num">VII.</div>
    <div>
      <h2 class="title" data-i18n="proc.title">So läuft eine <em>Anfrage</em>.</h2>
      <p class="lead" data-i18n="proc.lead">Direkt von uns Eigentümern, mit Mietvertrag. Keine Online-Buchung, keine Plattform-Gebühren.</p>
    </div>
  </header>

  <ol class="process-list">
    <li>
      <span class="process-num">01</span>
      <div class="process-body">
        <h3 class="process-h" data-i18n="proc.1.h">Du schreibst uns</h3>
        <p data-i18n="proc.1.p">Per WhatsApp oder E-Mail mit deinem Wunsch-Zeitraum und dem Anlass deines Aufenthalts (Überwintern, Remote Work, Sabbatical, Genesung).</p>
      </div>
    </li>
    <li>
      <span class="process-num">02</span>
      <div class="process-body">
        <h3 class="process-h" data-i18n="proc.2.h">Wir antworten innerhalb 24 Stunden</h3>
        <p data-i18n="proc.2.p">Mit einem konkreten Mietangebot, dem zweisprachigen Mietvertrag (Deutsch/Spanisch) und der Inventarliste.</p>
      </div>
    </li>
    <li>
      <span class="process-num">03</span>
      <div class="process-body">
        <h3 class="process-h" data-i18n="proc.3.h">Vertrag wird unterzeichnet</h3>
        <p data-i18n="proc.3.p">Digital oder per Post. Du legitimierst dich mit Personalausweis und einem kurzen Nachweis deines Hauptwohnsitzes im Heimatland.</p>
      </div>
    </li>
    <li>
      <span class="process-num">04</span>
      <div class="process-body">
        <h3 class="process-h" data-i18n="proc.4.h">Kaution wird überwiesen</h3>
        <p data-i18n="proc.4.p">Ein bis zwei Monatsmieten, vor Mietbeginn. Wird nach Auszug zurückerstattet, abzüglich eventueller Schäden.</p>
      </div>
    </li>
    <li>
      <span class="process-num">05</span>
      <div class="process-body">
        <h3 class="process-h" data-i18n="proc.5.h">Schlüsselübergabe vor Ort</h3>
        <p data-i18n="proc.5.p">In Radazul, gemeinsames Übergabeprotokoll mit Fotos, ab dann ist die Wohnung deine.</p>
      </div>
    </li>
  </ol>

  <p class="process-foot" data-i18n="proc.foot"><em>Keine Online-Buchung. Keine Plattform-Gebühren. Direkter Draht zu den Eigentümern.</em></p>
</section>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Process list (5 steps)
   ============================================================= */
.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 880px;
}
.process-list li {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: clamp(20px, 3vw, 40px);
  padding: 28px 0;
  border-bottom: 1px solid var(--rule);
  align-items: start;
}
.process-list li:last-child { border-bottom: 0; }
.process-num {
  font-family: var(--mono);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .04em;
  color: var(--accent);
  padding-top: 4px;
}
.process-h {
  font-family: var(--serif);
  font-size: clamp(20px, 2vw, 26px);
  line-height: 1.2;
  margin-bottom: 8px;
}
.process-body p {
  font-size: 16px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin: 0;
  max-width: 640px;
}
.process-foot {
  margin-top: clamp(32px, 4vw, 48px);
  text-align: center;
  font-family: var(--serif);
  font-size: clamp(18px, 1.6vw, 22px);
  color: var(--accent-deep);
}

@media (max-width: 600px) {
  .process-list li { grid-template-columns: 1fr; gap: 8px; }
  .process-num { padding-top: 0; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "proc.title": "So läuft eine <em>Anfrage</em>.",
    "proc.lead": "Direkt von uns Eigentümern, mit Mietvertrag. Keine Online-Buchung, keine Plattform-Gebühren.",
    "proc.1.h": "Du schreibst uns",
    "proc.1.p": "Per WhatsApp oder E-Mail mit deinem Wunsch-Zeitraum und dem Anlass deines Aufenthalts (Überwintern, Remote Work, Sabbatical, Genesung).",
    "proc.2.h": "Wir antworten innerhalb 24 Stunden",
    "proc.2.p": "Mit einem konkreten Mietangebot, dem zweisprachigen Mietvertrag (Deutsch/Spanisch) und der Inventarliste.",
    "proc.3.h": "Vertrag wird unterzeichnet",
    "proc.3.p": "Digital oder per Post. Du legitimierst dich mit Personalausweis und einem kurzen Nachweis deines Hauptwohnsitzes im Heimatland.",
    "proc.4.h": "Kaution wird überwiesen",
    "proc.4.p": "Ein bis zwei Monatsmieten, vor Mietbeginn. Wird nach Auszug zurückerstattet, abzüglich eventueller Schäden.",
    "proc.5.h": "Schlüsselübergabe vor Ort",
    "proc.5.p": "In Radazul, gemeinsames Übergabeprotokoll mit Fotos, ab dann ist die Wohnung deine.",
    "proc.foot": "<em>Keine Online-Buchung. Keine Plattform-Gebühren. Direkter Draht zu den Eigentümern.</em>",
```

And `en`:

```javascript
    "proc.title": "How an <em>inquiry</em> works.",
    "proc.lead": "Direct from us, the owners, with a rental contract. No online booking, no platform fees.",
    "proc.1.h": "You write to us",
    "proc.1.p": "By WhatsApp or email with your desired dates and the purpose of your stay (overwintering, remote work, sabbatical, recovery).",
    "proc.2.h": "We reply within 24 hours",
    "proc.2.p": "With a concrete offer, the bilingual rental contract (German/Spanish) and the inventory list.",
    "proc.3.h": "Contract gets signed",
    "proc.3.p": "Digitally or by post. You identify yourself with a national ID and a brief proof of your primary residence in your home country.",
    "proc.4.h": "Deposit is transferred",
    "proc.4.p": "One to two months' rent, before your move-in. Refunded after move-out, minus any damages.",
    "proc.5.h": "Key handover on site",
    "proc.5.p": "In Radazul, joint handover protocol with photos, and from there the apartment is yours.",
    "proc.foot": "<em>No online booking. No platform fees. A direct line to the owners.</em>",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- "VII. So läuft eine Anfrage." section, 5 numbered steps with monospace numbers in teal
- Each step has serif title + sans body
- Italic closing line in teal serif
- EN translates correctly

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: 5-step inquiry process (trust block)"
```

---

## Task 12: Closing CTA + Footer

**Files:** modify all three.

- [ ] **Step 1: Add HTML — append after process `</section>`**

```html
<!-- 10. Closing CTA -->
<section class="closing-cta">
  <div class="column closing-inner">
    <h2 class="closing-h" data-i18n="cls.h">Bereit für 1–3 Monate <em>Atlantik</em>?</h2>
    <p class="closing-p" data-i18n="cls.p">Schreib uns. Wir antworten persönlich, innerhalb von 24 Stunden.</p>
    <div class="closing-buttons">
      <a href="https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!" target="_blank" rel="noopener" class="btn btn-wa" data-i18n="cls.wa">Anfrage per WhatsApp <span class="arrow">→</span></a>
      <a href="mailto:justus@weweler.co?subject=Anfrage%20Vivienda%20Radazul&body=Hola%2C%0A%0Aich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%0A%0AZeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%0AGrund%20des%20Aufenthalts%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D%0APersonen%3A%20%5BAnzahl%5D%0A%0ADanke%21" class="btn btn-ghost" data-i18n="cls.mail">E-Mail an justus@weweler.co</a>
    </div>
  </div>
</section>

</main>

<footer class="footer">
  <div class="footer-inner">
    <p class="footer-legal" data-i18n="ftr.legal">Vermietung als <em>arrendamiento de temporada</em> nach LAU Art. 3. Mindestaufenthalt 30 Tage. Keine touristische Vermietung.</p>
    <nav class="footer-nav">
      <a href="/impressum.html" data-i18n="ftr.imprint">Impressum</a>
      <a href="/datenschutz.html" data-i18n="ftr.privacy">Datenschutz</a>
    </nav>
    <p class="footer-copy" data-i18n="ftr.copy">© 2026 · Steffen & Ulrike Benndorf · Privat angeboten</p>
  </div>
</footer>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Closing CTA
   ============================================================= */
.closing-cta {
  background: var(--ink);
  color: var(--bg);
  max-width: none;
  margin: 0;
  padding: clamp(80px, 10vw, 140px) var(--gutter);
}
.closing-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.closing-h {
  font-family: var(--serif);
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.1;
  color: var(--bg);
  letter-spacing: -.02em;
}
.closing-h em { color: var(--accent); font-style: italic; }
.closing-p {
  font-family: var(--serif);
  font-size: clamp(18px, 1.6vw, 22px);
  color: var(--rule);
  margin: 0;
  max-width: 540px;
}
.closing-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
}
.closing-cta .btn-ghost {
  color: var(--bg);
  border-color: rgba(255, 255, 255, 0.2);
}
.closing-cta .btn-ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--bg);
  border-color: var(--accent);
}

/* =============================================================
   Footer
   ============================================================= */
.footer {
  background: var(--ink);
  color: var(--ink-mute);
  padding: 32px var(--gutter);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.footer-inner {
  max-width: var(--maxw);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  font-size: 12px;
}
.footer-legal {
  margin: 0;
  max-width: 540px;
  line-height: 1.5;
}
.footer-legal em { font-style: italic; color: var(--rule); }
.footer-nav {
  display: flex;
  gap: 20px;
}
.footer-nav a {
  color: var(--ink-mute);
  border-bottom: 0;
}
.footer-nav a:hover { color: var(--accent); }
.footer-copy {
  margin: 0;
  font-size: 11px;
  color: var(--ink-mute);
}

@media (max-width: 700px) {
  .footer-inner { flex-direction: column; align-items: flex-start; }
}
```

- [ ] **Step 3: Add i18n keys — append to `de`**

```javascript
    "cls.h": "Bereit für 1–3 Monate <em>Atlantik</em>?",
    "cls.p": "Schreib uns. Wir antworten persönlich, innerhalb von 24 Stunden.",
    "cls.wa": "Anfrage per WhatsApp <span class=\"arrow\">→</span>",
    "cls.mail": "E-Mail an justus@weweler.co",

    "ftr.legal": "Vermietung als <em>arrendamiento de temporada</em> nach LAU Art. 3. Mindestaufenthalt 30 Tage. Keine touristische Vermietung.",
    "ftr.imprint": "Impressum",
    "ftr.privacy": "Datenschutz",
    "ftr.copy": "© 2026 · Steffen & Ulrike Benndorf · Privat angeboten"
```

(Note: this is the last entry in `de`, so remove trailing comma on previous entry if present.)

And `en`:

```javascript
    "cls.h": "Ready for 1–3 months on the <em>Atlantic</em>?",
    "cls.p": "Write to us. We reply personally, within 24 hours.",
    "cls.wa": "Inquire via WhatsApp <span class=\"arrow\">→</span>",
    "cls.mail": "Email justus@weweler.co",

    "ftr.legal": "Rental as <em>arrendamiento de temporada</em> under LAU Art. 3. Minimum stay 30 days. Not a tourist rental.",
    "ftr.imprint": "Imprint",
    "ftr.privacy": "Privacy",
    "ftr.copy": "© 2026 · Steffen & Ulrike Benndorf · Offered privately"
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- Dark closing section (dark `--ink` background) with "Bereit für 1–3 Monate Atlantik?" headline, teal italic on "Atlantik"
- Two CTAs: green WhatsApp + outlined ghost email
- Dark footer with legal text, Impressum/Datenschutz nav, copyright line
- Click WhatsApp → opens wa.me. Click email → opens mailto.

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: closing CTA + footer with legal disclaimer"
```

---

## Task 13: Sticky WhatsApp floating button

**Files:** modify `index.html` (add button before `</body>`) and `style.css` (append).

- [ ] **Step 1: Add HTML — insert before `</body>`**

```html
<!-- Sticky WhatsApp floating button -->
<a href="https://wa.me/34689575062?text=Hola%2C%20ich%20interessiere%20mich%20f%C3%BCr%20die%20Vivienda%20Radazul.%20Mein%20Wunsch-Zeitraum%3A%20%5BDatum%5D%20bis%20%5BDatum%5D%2C%20Grund%3A%20%5B%C3%9Cberwintern%20%2F%20Remote%20Work%20%2F%20Sabbatical%5D.%20Danke!" target="_blank" rel="noopener" class="wa-float" aria-label="WhatsApp" data-i18n-attr="aria-label:wa.float.label">
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

- [ ] **Step 2: Add CSS — append to `style.css`**

```css
/* =============================================================
   Floating WhatsApp button
   ============================================================= */
.wa-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  background: var(--wa);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35), 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-bottom: 0;
  transition: transform .2s, box-shadow .2s;
}
.wa-float:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45), 0 6px 12px rgba(0, 0, 0, 0.12);
  color: white;
  border-bottom: 0;
}
.wa-float svg {
  display: block;
}

@media (max-width: 540px) {
  .wa-float {
    bottom: 16px;
    right: 16px;
    width: 54px;
    height: 54px;
  }
  .wa-float svg { width: 26px; height: 26px; }
}
```

- [ ] **Step 3: Add accessibility label keys — append to `de` and `en` in i18n.js**

`de`:
```javascript
    "wa.float.label": "Anfrage per WhatsApp",
```

`en`:
```javascript
    "wa.float.label": "Inquire via WhatsApp",
```

- [ ] **Step 4: Browser verification**

Reload. Expected:
- Green circular WhatsApp button fixed at bottom-right
- Visible on all sections including hero (above the fold)
- Hover: lifts slightly with bigger shadow
- Click → opens wa.me with prefilled message
- Mobile: slightly smaller, still in same corner

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/index.html public/vivienda-radazul/style.css public/vivienda-radazul/i18n.js
git commit -m "vivienda-radazul: sticky WhatsApp floating button (mobile + desktop)"
```

---

## Task 14: Mobile polish + cross-browser check + image optimization

**Files:** `style.css`, possibly compress hero image.

- [ ] **Step 1: Check hero image size**

Run:
```bash
ls -lh public/vivienda-radazul/images/IMG_5494.jpeg
```

If size > 200 KB: compress using sips (macOS built-in):
```bash
sips -s format jpeg -s formatOptions 75 public/vivienda-radazul/images/IMG_5494.jpeg --out public/vivienda-radazul/images/IMG_5494.jpeg
```

Expected: file size reduced to ~150–200 KB without visible quality loss.

- [ ] **Step 2: Test mobile viewport in DevTools**

Open page in Chrome → DevTools → Toggle device toolbar → test at 375px (iPhone SE), 414px (iPhone 12 Pro), 768px (iPad).

Verify each section renders correctly:
- Topbar: meta line hides at <900px, CTA button hides at <540px
- Hero: image moves above text on mobile
- Audience tiles stack vertically <900px
- Galleries: scroll horizontally smoothly
- Eckdaten: keys stack above values at <700px
- Season grid: 3 cols → 1 col at <900px
- Lage grid: 2 cols → 1 col at <900px
- Closing CTA buttons wrap on narrow screens
- Footer: stacks vertically <700px
- WhatsApp float: visible, no overlap

- [ ] **Step 3: Add print stylesheet (optional, prevents broken print preview)**

Append to `style.css`:

```css
/* =============================================================
   Print
   ============================================================= */
@media print {
  .topbar, .wa-float, .closing-cta { display: none; }
  body { background: white; color: black; }
  .gallery-scroll { overflow: visible; }
  .gallery-rail { flex-wrap: wrap; }
}
```

- [ ] **Step 4: Cross-browser test**

Open in:
- Safari (macOS) — verify backdrop-filter works on topbar, fonts render correctly
- Chrome — verify everything works
- (If available) Firefox — verify scroll behavior in galleries

Document any browser-specific issues. Common fixes:
- Safari: `-webkit-backdrop-filter` already in place
- Safari: scroll-snap may be jumpier, acceptable

- [ ] **Step 5: Commit**

```bash
git add public/vivienda-radazul/style.css public/vivienda-radazul/images/IMG_5494.jpeg
git commit -m "vivienda-radazul: mobile polish, print styles, hero image compression"
```

---

## Task 15: Final review — Lighthouse, HTML validation, content audit

**Files:** none modified unless issues found.

- [ ] **Step 1: Lighthouse audit**

Open Chrome DevTools → Lighthouse → Mobile + Performance/Accessibility/Best Practices/SEO → Generate report.

Expected:
- Performance ≥ 85 (with image lazy-load, this should be reachable; aim 90+)
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 95

Common fixes if score is low:
- Performance: compress more images (`sips -s formatOptions 70`); add `width`/`height` attributes to `<img>` tags
- Accessibility: ensure all images have `alt` (most are decorative, `alt=""` is correct for these)
- SEO: confirm meta description present in HTML

- [ ] **Step 2: Content audit — search for forbidden vocabulary**

Run:
```bash
grep -iE 'ferienwohnung|vacation|buchen|book now|holiday rental|tagesweise|airbnb' public/vivienda-radazul/index.html public/vivienda-radazul/i18n.js
```

Expected: no results. If any match, replace with appropriate seasonal-rental language.

- [ ] **Step 3: HTML validation**

Run:
```bash
curl -s -F 'out=text' -F 'content=@public/vivienda-radazul/index.html' https://validator.w3.org/nu/?out=text
```

Expected: "The document validates" or only minor warnings (e.g., trailing slashes on void elements).

If there are real errors (unclosed tags, invalid attributes), fix them.

- [ ] **Step 4: Verify all 16 images are used**

Run:
```bash
for img in public/vivienda-radazul/images/*.jpeg; do
  basename="$(basename "$img")"
  if ! grep -q "$basename" public/vivienda-radazul/index.html; then
    echo "UNUSED: $basename"
  fi
done
```

Expected: no output (all 16 images referenced).

- [ ] **Step 5: Functional click-through test**

Open page in browser. Click in this order:
1. EN switch → all text translates
2. DE switch → reverts
3. Topbar WhatsApp CTA → opens wa.me link in new tab
4. Hero WhatsApp button → opens wa.me link
5. Season block CTA → opens wa.me link
6. Closing WhatsApp button → opens wa.me link
7. Closing email button → opens mailto
8. Lage Google Maps link → opens maps
9. Sticky WhatsApp float → opens wa.me link
10. Impressum + Datenschutz links → resolve to existing pages (`/impressum.html`, `/datenschutz.html`)

All should work without console errors.

- [ ] **Step 6: Final commit (if any fixes applied) and tag a milestone**

If changes were made:
```bash
git add public/vivienda-radazul/
git commit -m "vivienda-radazul: final polish from Lighthouse + content audit"
```

Otherwise just verify the branch is clean:
```bash
git status
```

Expected: `nothing to commit, working tree clean`

---

## Self-Review (checklist before handoff)

**Spec coverage:**
- ✅ Section 6.1 Topbar → Task 3
- ✅ Section 6.2 Hero → Task 4
- ✅ Section 6.3 Hook → Task 5
- ✅ Section 6.4 Audience tiles → Task 5
- ✅ Section 6.5 Eckdaten → Task 6
- ✅ Section 6.6 Gallery I → Task 7
- ✅ Section 6.7 Saison & Anfrage → Task 8
- ✅ Section 6.8 Gallery II → Task 9
- ✅ Section 6.9 Lage → Task 10
- ✅ Section 6.10 5-step process → Task 11
- ✅ Section 6.11 Closing CTA + Footer → Task 12
- ✅ Section 6.12 Sticky WhatsApp → Task 13
- ✅ Section 7 Technical architecture (file structure, i18n.js, fonts, meta) → Tasks 1–4
- ✅ Section 8 Compliance footer hint → Task 12
- ✅ Section 9 Acceptance criteria → Tasks 14 + 15

**Placeholder scan:** No TBDs, no "implement later", no "similar to Task X". Each step has complete content.

**Type/key consistency:** i18n keys are namespaced (topbar.*, hero.*, hook.*, aud.*, eck.*, gal1.*, sea.*, gal2.*, lage.*, proc.*, cls.*, ftr.*, wa.*) — no overlaps, consistent across DE and EN.
