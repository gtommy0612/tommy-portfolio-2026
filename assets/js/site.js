// Shared page behaviour for the E3 design system.
// - Mobile menu: [data-menu-btn] toggles #mobile-menu (full-screen sheet), locks page scroll, Esc closes.
// - In-page links glide with an ease-in-out curve and land the section heading 104px from the top.
// - Back to top: a [data-to-top] button appears after one screen of scroll.
// - Image zoom: figure images open full screen; click outside, the close button or Esc closes.
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

  // Back to top: [data-to-top] shows after one screen of scroll, glides to 0 and returns focus to the top.
  var up = document.querySelector('[data-to-top]');
  if (up) {
    var onScroll = function () { up.classList.toggle('is-on', window.scrollY > window.innerHeight); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    up.addEventListener('click', function () {
      glide(0);
      var top = document.querySelector('[data-bar] a') || document.body;
      top.focus({ preventScroll: true });
    });
  }

  // Image zoom: figure images (and img[data-zoom]) open in a full-screen <dialog>.
  // Skip linked images and anything marked data-no-zoom (e.g. video posters with an overlay).
  var shots = [].slice.call(document.querySelectorAll('main figure img, img[data-zoom]')).filter(function (img) {
    return !img.closest('a') && !img.hasAttribute('data-no-zoom');
  });
  if (shots.length && window.HTMLDialogElement) {
    var box = document.createElement('dialog');
    box.className = 'zoom';
    box.setAttribute('aria-label', 'Enlarged image');
    box.innerHTML = '<button type="button" class="zoom-close" aria-label="Close enlarged image">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button><img alt="">';
    document.body.appendChild(box);
    var big = box.querySelector('img');
    var shut = function () { if (box.open) box.close(); };
    box.addEventListener('click', function (e) { if (e.target !== big) shut(); });
    box.addEventListener('close', function () { root.style.overflow = ''; big.removeAttribute('src'); });
    var openZoom = function (img) {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      root.style.overflow = 'hidden';
      box.showModal();
    };
    shots.forEach(function (img) {
      img.classList.add('zoomable');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Enlarge image: ' + (img.alt || 'screenshot'));
      img.addEventListener('click', function () { openZoom(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openZoom(img); }
      });
    });
  }
})();
