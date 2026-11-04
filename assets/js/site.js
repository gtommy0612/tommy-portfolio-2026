// Shared page behaviour for the E3 design system.
// - Mobile menu: [data-menu-btn] toggles #mobile-menu (full-screen sheet), locks page scroll, Esc closes.
// - In-page links glide with an ease-in-out curve and land the section heading 104px from the top.
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('[data-menu-btn]');
  var sheet = document.getElementById('mobile-menu');
  var header = document.querySelector('[data-bar]');
  var raf = 0;

  function setOpen(open) {
    if (!btn || !sheet) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    sheet.hidden = !open;
    root.style.overflow = open ? 'hidden' : '';
    if (header) header.classList.toggle('is-open', open);
  }
  function isOpen() { return btn && btn.getAttribute('aria-expanded') === 'true'; }

  if (btn) btn.addEventListener('click', function () { setOpen(!isOpen()); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); btn.focus(); }
  });
  // Closing the menu when the layout grows past the mobile breakpoint.
  var wide = window.matchMedia('(min-width: 721px)');
  var onWide = function () { if (wide.matches && isOpen()) setOpen(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide);
  if (sheet) sheet.addEventListener('click', function (e) {
    if (e.target.closest('a') && !e.target.closest('a[href^="#"]')) setOpen(false);
  });

  function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
  function glide(y) {
    stop();
    var from = window.scrollY, dist = y - from;
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || Math.abs(dist) < 2) { window.scrollTo(0, y); return; }
    var dur = Math.min(1200, Math.max(600, 420 + Math.abs(dist) * 0.22));
    var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var t0 = performance.now();
    var step = function (now) {
      var t = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, from + dist * ease(t));
      raf = t < 1 ? requestAnimationFrame(step) : 0;
    };
    raf = requestAnimationFrame(step);
  }
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var id = a.getAttribute('href').slice(1);
    var el = id ? document.getElementById(id) : null;
    if (id && !el) return;
    e.preventDefault();
    if (isOpen()) setOpen(false);
    var head = el ? (el.querySelector('h2') || el) : null;
    var y = head ? Math.max(0, head.getBoundingClientRect().top + window.scrollY - 104) : 0;
    glide(y);
    if (history.replaceState) history.replaceState(null, '', id ? '#' + id : location.pathname);
    if (head) { head.setAttribute('tabindex', '-1'); head.focus({ preventScroll: true }); }
  });
})();
