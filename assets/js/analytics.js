// Shared analytics: GA4 (numbers, funnels, sources) + Microsoft Clarity (heatmaps, recordings).
// Spec and how to read the data: docs/analytics-plan.md
//
// Usage: <script src="assets/js/analytics.js" defer></script> in every page's <head>
// (../assets/... from services/, ../../assets/... from services/zh/).
//
// No per-link setup needed: clicks are classified from the link's href and where it sits
// (nav / mobile_nav / footer / section id). Override with data-location="..." or
// data-section="..." on an element when the inferred name is wrong.
//
// Switches (add to any URL):
//   ?notrack   stop tracking this browser for good (use it on your own devices)
//   ?track     undo ?notrack
//   ?forcetrack  track on localhost too, in GA4 debug mode, and log every event to the console
(function () {
  // Fill these in once the GA4 property and Clarity project exist. Empty = load nothing.
  var GA_ID = 'G-VD4KN3MC9Z';       // e.g. 'G-ABC123XYZ'
  var CLARITY_ID = 'z8pcgek1j1';  // e.g. 'abcd1234ef'

  var READ_SECONDS = 60;               // case_study_read fires after this much visible time
  var PROGRESS_STEPS = [25, 50, 75, 100];

  // ---- Switches -------------------------------------------------------------
  var qs = new URLSearchParams(location.search);
  var store = function (kind) { try { return window[kind]; } catch (e) { return null; } };
  var ls = store('localStorage'), ss = store('sessionStorage');
  var get = function (s, k) { try { return s && s.getItem(k); } catch (e) { return null; } };
  var put = function (s, k, v) { try { if (!s) return; v == null ? s.removeItem(k) : s.setItem(k, v); } catch (e) {} };

  if (qs.has('notrack')) put(ls, 'tc_notrack', '1');
  if (qs.has('track')) put(ls, 'tc_notrack', null);
  if (qs.has('forcetrack')) put(ss, 'tc_forcetrack', '1');

  var local = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname) || /\.(localhost|test)$/.test(location.hostname);
  var force = get(ss, 'tc_forcetrack') === '1';
  var debug = force || qs.has('debug');
  if (get(ls, 'tc_notrack') === '1' || (local && !force)) return;

  // ---- Page context ---------------------------------------------------------
  var path = location.pathname;
  var file = (path.split('/').pop() || 'index.html').replace(/\.html$/, '');
  var isServices = /\/services\//.test(path);
  var isCaseStudy = !isServices && /^(us-state-gov-|b2c-)/.test(file);
  var pageType = isServices ? 'services' : isCaseStudy ? 'case_study' : file === 'index' ? 'home' : file;
  var ctx = {
    page_type: pageType,
    audience: isServices ? 'services' : 'portfolio',
    content_lang: (document.documentElement.lang || 'en').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en'
  };
  if (isCaseStudy) ctx.case_study = file;

  // ---- Loaders --------------------------------------------------------------
  window.dataLayer = window.dataLayer || [];
  var gtag = window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (/^G-[A-Z0-9]+$/.test(GA_ID)) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('set', ctx);
    gtag('config', GA_ID, debug ? { debug_mode: true } : {});
  }

  var clarity = function () {};
  if (/^[a-z0-9]+$/i.test(CLARITY_ID)) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
    clarity = window.clarity;
    Object.keys(ctx).forEach(function (k) { clarity('set', k, ctx[k]); });
  }

  // Events that Clarity also records, so recordings can be filtered by them.
  var CLARITY_EVENTS = { resume_download: 1, contact_click: 1, case_study_click: 1, case_study_read: 1, language_switch: 1 };

  function track(name, params) {
    params = params || {};
    gtag('event', name, params);
    if (CLARITY_EVENTS[name]) clarity('event', name);
    if (debug && window.console) console.info('[analytics]', name, params);
  }
  window.tcTrack = track;

  // ---- Naming helpers -------------------------------------------------------
  function sectionName(el, i) {
    if (el.dataset.section) return el.dataset.section;
    if (el.id) return el.id;
    var lb = el.getAttribute('aria-labelledby');
    if (lb) return lb.replace(/-h$/, '');
    return i === 0 ? 'hero' : 'section_' + (i + 1);
  }
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section, footer#contact'))
    .filter(function (el) { return !el.parentElement.closest('section'); });
  var names = new Map();
  sections.forEach(function (el, i) { names.set(el, sectionName(el, i)); });

  function locationOf(a) {
    var tagged = a.closest('[data-location]');
    if (tagged) return tagged.dataset.location;
    if (a.closest('.cs-next-card')) return 'next_project';
    if (a.closest('#mobile-menu')) return 'mobile_nav';
    if (a.closest('header')) return 'nav';
    if (a.closest('footer')) return 'footer';
    for (var el = a.parentElement; el; el = el.parentElement) {
      if (names.has(el)) return names.get(el);
    }
    return 'other';
  }

  // ---- Clicks ---------------------------------------------------------------
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    var where = locationOf(a);
    var m;

    if (/Resume_TommyChi\.pdf/i.test(href)) {
      track('resume_download', { location: where });
    } else if (/^mailto:/i.test(href)) {
      track('contact_click', { method: 'email', location: where });
    } else if (/cal\.com\//i.test(href)) {
      track('contact_click', { method: 'cal', location: where });
    } else if (/linkedin\.com\//i.test(href)) {
      track('contact_click', { method: 'linkedin', location: where });
    } else if (/behance\.net\//i.test(href)) {
      track('contact_click', { method: 'behance', location: where });
    } else if (a.hasAttribute('hreflang')) {
      track('language_switch', { to_lang: a.getAttribute('hreflang').indexOf('zh') === 0 ? 'zh' : 'en', location: where });
    } else if ((m = href.match(/(?:^|\/)((?:us-state-gov-|b2c-)[a-z0-9-]+)\.html/)) && m[1] !== file) {
      track('case_study_click', { case_study: m[1], location: where });
    }
  }, true);

  // ---- Section views --------------------------------------------------------
  if ('IntersectionObserver' in window && sections.length) {
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var name = names.get(en.target);
        // Tall sections never reach 50% visible, so also count "fills half the viewport".
        var enough = en.intersectionRatio >= 0.5 || en.intersectionRect.height >= window.innerHeight * 0.5;
        if (!en.isIntersecting || !enough || seen.has(name)) return;
        seen.add(name);
        track('section_view', { section: name });
        io.unobserve(en.target);
      });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach(function (el) { io.observe(el); });
  }

  // ---- Case study depth and read time ---------------------------------------
  if (isCaseStudy) {
    var sent = {}, ticking = false;
    var check = function () {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max <= 0 ? 100 : (window.scrollY / max) * 100;
      PROGRESS_STEPS.forEach(function (p) {
        if (!sent[p] && pct >= (p === 100 ? 98 : p)) {
          sent[p] = 1;
          track('case_study_progress', { case_study: file, percent: p });
        }
      });
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    }, { passive: true });

    var visible = 0, read = false;
    var timer = setInterval(function () {
      if (document.visibilityState !== 'visible') return;
      visible += 1;
      if (!read && visible >= READ_SECONDS) {
        read = true;
        clearInterval(timer);
        track('case_study_read', { case_study: file, seconds: READ_SECONDS });
      }
    }, 1000);
  }
})();
