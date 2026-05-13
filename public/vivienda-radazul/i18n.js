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
