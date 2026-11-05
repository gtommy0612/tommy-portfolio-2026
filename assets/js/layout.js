// Shared E3 header and footer, written once and used by every E3 page.
//
// Usage (load this in <head>, after e3.css, without defer/async so there's no flash):
//   <script src="assets/js/layout.js"></script>
//   ...
//   <site-header home></site-header>   <!-- `home` = on index.html: anchors stay in-page -->
//   <site-footer></site-footer>
//
// Optional `base` attribute for pages in a subfolder, e.g. <site-header base="../">.
// Each tag is replaced by plain <header>/<footer> markup, so e3.css and site.js
// see exactly the same DOM as before.
(function () {
  var EMAIL = 'gtommy0612@gmail.com';
  var arrow = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var out = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  function opts(el) {
    var base = el.getAttribute('base') || '';
    var home = el.hasAttribute('home');
    return { base: base, home: home, page: home ? '' : base + 'index.html' };
  }

  function header(o) {
    var brand = o.home
      ? '<a href="#" class="brand" aria-label="Tommy Chi, back to top">Tommy Chi</a>'
      : '<a href="' + o.page + '" class="brand" aria-label="Tommy Chi, home">Tommy Chi</a>';
    var links = [['works', 'Work'], ['about', 'About'], ['contact', 'Contact']];
    var href = function (id) { return id === 'contact' ? '#contact' : o.page + '#' + id; };
    var resume = o.base + 'assets/Resume_TommyChi.pdf';
    return '' +
      '<header class="bar" data-bar>' +
        '<div class="bar-in">' + brand +
          '<nav class="nav" aria-label="Main">' +
            links.map(function (l) { return '<a href="' + href(l[0]) + '" class="nav-link">' + l[1] + '</a>'; }).join('') +
            '<a href="' + resume + '" target="_blank" rel="noopener" class="pill pill-ink pill-sm">Resume</a>' +
          '</nav>' +
          '<button type="button" class="menu-btn" data-menu-btn aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">' +
            '<svg class="i-menu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>' +
            '<svg class="i-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div id="mobile-menu" class="sheet" hidden>' +
          '<nav class="sheet-in" aria-label="Mobile">' +
            links.map(function (l) { return '<a href="' + href(l[0]) + '" class="sheet-link">' + l[1] + ' ' + arrow + '</a>'; }).join('') +
            '<div class="sheet-foot">' +
              '<a href="' + resume + '" target="_blank" rel="noopener" class="pill pill-ink justify-center">Download resume</a>' +
              '<a href="mailto:' + EMAIL + '" class="sheet-mail">' + EMAIL + '</a>' +
            '</div>' +
          '</nav>' +
        '</div>' +
      '</header>';
  }

  function footer(o) {
    var item = function (href, label, ext) {
      return '<li><a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + ' class="flink">' + label + ' ' + out + '</a></li>';
    };
    return '' +
      '<footer id="contact" class="site-foot">' +
        '<div class="site-foot-in">' +
          '<div class="flex flex-wrap gap-12 justify-between items-start">' +
            '<div class="flex flex-col gap-7 items-start">' +
              '<h2 class="font-semibold leading-[1.02] tracking-[-0.04em] max-w-[13ch]" style="font-size: clamp(40px, 5vw, 64px)">Hiring a senior product designer?</h2>' +
              '<div class="flex flex-wrap gap-3">' +
                '<a href="mailto:' + EMAIL + '" class="pill pill-ink">Email me</a>' +
                '<a href="' + o.base + 'assets/Resume_TommyChi.pdf" target="_blank" rel="noopener" class="pill pill-white">Resume PDF</a>' +
              '</div>' +
            '</div>' +
            '<div class="flex flex-wrap gap-x-[72px] gap-y-10">' +
              '<div><h3 class="cap mb-3.5">Contact</h3><ul class="flex flex-col gap-3.5">' +
                item('mailto:' + EMAIL, EMAIL) +
              '</ul></div>' +
              '<div><h3 class="cap mb-3.5">Elsewhere</h3><ul class="flex flex-col gap-3.5">' +
                item('https://www.linkedin.com/in/tommychi', 'LinkedIn', true) +
                item('https://www.behance.net/godiswonderful', 'Behance', true) +
              '</ul></div>' +
            '</div>' +
          '</div>' +
          '<div class="mt-section flex flex-wrap items-baseline justify-between gap-3 text-caption text-muted">' +
            '<p>© 2026 Tommy Chi Design</p>' +
            '<a href="' + o.base + 'services/" target="_blank" rel="noopener" class="text-muted no-underline hover:text-ink">Freelance / 接案合作 ↗</a>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  function define(name, render) {
    if (customElements.get(name)) return;
    customElements.define(name, class extends HTMLElement {
      connectedCallback() {
        var tpl = document.createElement('template');
        tpl.innerHTML = render(opts(this));
        this.replaceWith(tpl.content);
      }
    });
  }

  define('site-header', header);
  define('site-footer', footer);
})();
