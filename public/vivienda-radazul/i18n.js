/* =====================================================
   i18n — DE / EN
   Vivienda Radazul translations.
   ===================================================== */
window.I18N = {
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
    "topbar.lang.en": "EN",

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
    "hero.cta": "Anfrage per WhatsApp <span class=\"arrow\">→</span>"
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
    "topbar.lang.en": "EN",

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
    "hero.cta": "Inquire via WhatsApp <span class=\"arrow\">→</span>"
  }
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
