# DESIGN.md: E3 cold-grey design system

Calm surfaces, real work, one accent.

This file is the source of truth for how every page looks.
- Tokens are defined in [`assets/js/tailwind-config.js`](assets/js/tailwind-config.js), and mirrored as CSS variables at the top of [`assets/css/e3.css`](assets/css/e3.css). Change both together.
- Component classes live in [`assets/css/e3.css`](assets/css/e3.css): plain CSS, because the Tailwind CDN can't `@apply` from a shared file.
- Shared behaviour is in [`assets/js/site.js`](assets/js/site.js).
- Reference pages: [`index.html`](index.html) and the case study [`us-state-gov-ai-bid-prototype.html`](us-state-gov-ai-bid-prototype.html).
- The exploration (boards E3 / E3 Cold grey and the two system boards) lives on the Claude Design canvas.

## Rules

1. **Real work is the only imagery.** No stock, no illustrations, and no logos, testimonials or awards that aren't on the resume. Every image is a case-study screen or a crop of one. Crops are listed in `assets/home/SOURCES.md`.
2. **One accent, one meaning.** `accent` marks results (proof numbers) and the focus ring. Never use it for a background or decoration.
3. **Two tones, not two weights.** Section headings pair an `ink` statement with a `quiet` follow-up at the same weight: `<h2 class="two-tone">About. <span>Five years, three domains.</span></h2>`.
4. **No small print.** Body text is 16px and the floor is 14px. Muted text keeps 4.5:1 contrast or better on every surface.
5. **Tokens only.** No raw hex in HTML. If a value is missing, add a token to the config and to this file.
6. **Cold grey only.** Every grey comes from the ramp below. Don't mix in warm greys or Tailwind's `gray-*` / `neutral-*`.

## Colour

| Token | Value | Use |
|---|---|---|
| `ink` | #1D1D1F | Text, primary pill, selection |
| `ink-hover` | #3A3A3C | Primary pill hover |
| `muted` | #6E6E73 | Supporting text, meta, captions (4.6:1 on `surface`, 5.1:1 on white) |
| `quiet` | #86868B | Second tone of large headings only (3.6:1, passes only at 24px+). Never body text |
| `page` | #FFFFFF | Page background, white pill |
| `surface` | #F4F4F4 | Hero, tiles, footer, mobile menu, tags |
| `surface-2` | #EDEDF0 | Grey pill, menu button. Use `ink` text on it, not `muted` (4.3:1 fails) |
| `surface-3` | #E2E2E6 | Hover on `surface-2` |
| `hair` | #E5E5EA | Hairline rules (experience rows, menu links) |
| `accent` | #1F4FD8 | Proof numbers, focus ring |

**Deprecated aliases.** Older pages still use these. Don't add new uses.

| Alias | Maps to |
|---|---|
| `text-primary`, `border-default` | `ink` |
| `text-secondary` | `quiet` |
| `text-tertiary` | `muted` |
| `surface-muted` | `surface` |
| `rounded-xs`, `rounded-sm` | `rounded-full` |

## Type

The only typeface is Geist, at weights 400, 500 and 600, with a fallback of `-apple-system, PingFang TC, sans-serif`.

Tracking gets tighter as size grows.

| Token | Size / line height | Weight | Tracking | Use |
|---|---|---|---|---|
| hero h1 | clamp(42–76) / 1.06 | 600 | −0.04em | Hero headline, max 20ch |
| `text-display` | 76 / 1.06 | 600 | −0.04em | Fixed-size display |
| `.two-tone` (h2) | clamp(32–48) / 1.1 | 600 | −0.035em | Section headings |
| `text-h3` | 24 / 1.2 | 600 | −0.025em | Case-study titles |
| `text-label` | 20 / 1.3 | 600 | −0.015em | Card titles, experience company, footer links (500) |
| `text-lead` | 20 / 1.5 | 400 | −0.01em | Hero sub, in `muted`, max 50ch |
| `text-body` | 16 / 1.6 | 400 | — | Body text |
| `text-caption` | 14 / 1.5 | 500 | — | Column labels ("Experience", "Contact"), in `muted` |

Headlines use `text-wrap: balance`.

## Shape and space

**Radius shrinks as the object shrinks.**

| Radius | Value | Use |
|---|---|---|
| `rounded-hero` | 32px | Hero showcase |
| `rounded-tile` | 28px | Tiles, cards |
| `rounded-sheet` | 24px | Large panels |
| `rounded-shot` | 12–14px | Screenshots inside tiles |
| `rounded-full` | 999px | Pills, tags, buttons |

**Spacing runs on 8.**
- Steps: 8 / 16 / 24 / 48 / 96.
- Gaps between sections:

  | Token | Value |
  |---|---|
  | `section-sm` | 48px |
  | `section` | 96px |
  | `section-lg` | 144px |
  | `section-xl` | 176px |

**Layout**
- Content max width is 1200px with a 24px gutter (`px-6`).
- Cards use `auto-fit` grids, so they collapse to one column without breakpoints.

## Components (`assets/css/e3.css`)

- **Pills**
  - `.pill` is 48px high, with 24px horizontal padding and weight 500.
  - Variants:

    | Class | Look |
    |---|---|
    | `.pill-ink` | Primary |
    | `.pill-white` | On `surface` |
    | `.pill-grey` | On white |
    | `.pill-sm` | 40px high |

  - Hover darkens by one step.
- **Nav bar**
  - `.bar` is sticky and 64px tall, with a near-transparent cold gradient and `saturate(180%) blur(20px)`.
  - The links are `muted`, plus a small ink Resume pill.
- **Mobile menu** (≤720px)
  - The links collapse into a 44px round `.menu-btn` on `surface-2`.
  - Opening it shows the full-screen `.sheet` below the bar, and the bar turns solid `surface`.
    - The icon changes to an X with a 90° rotation.
    - Links are 32px / 600 with an arrow and a hairline below, and they fade in 40ms apart.
    - Resume and email sit at the bottom.
    - Page scroll is locked while it's open. Escape closes it.
- **Inline screen chip**
  - `.chip` is 1.42 × 0.84em, sits inside the headline, and has a 1px ink/8% ring.
  - It's decorative (`aria-hidden`).
- **Tile**
  - `.tile` is a `surface` block with 28px radius.
  - Screens inside use `mix-blend-multiply`, so their white blends into the grey.
  - Linked tiles lift by 6px on hover (`.lift`).
- **Proof line**
  - A `muted` sentence with the number in `.proof` (accent, 600).
- **Experience row**
  - `.xp li` is a 120px year column, then a `text-label` company and a `muted` role, with hairlines above and below.
  - It stacks below `sm`.
- **Tags**
  - Each tag is a `surface` pill with 8px / 16px padding.
- **Footer link**
  - `.flink` is `text-label` 500 with an arrow that nudges up and right on hover, and an underline on hover.
- **Case study parts**
  - `.cs-hero` is the title area on `surface`: a `.cap` eyebrow (project · type · year), `.cs-title` at clamp(36–64), and `.cs-facts`, a `<dl>` of role / timeline / impact with a rule above each. Impact numbers use `.proof`.
  - `.cs-cover` is the 16:9 cover tile under the title.
  - `.cs-section` spaces sections 144px apart. Numbered headings put the number in the quiet tone: `<h2 class="two-tone"><span>01</span> Problem &amp; task</h2>`.
  - `.cs-sub` is a 24px subheading inside a section; `.prose` holds running text at 68ch, with `.lead-in` for list intros.
  - `.cards` is an auto-fit grid of `.card` (surface, 28px radius, `label` title, `muted` text) or `.stat` (caption, accent number, `muted` text). Use `.stat-num.is-word` (clamp(40–50)) when the result is words, not a number.
  - `.decide` is a `<dl>` for one design decision: rows of a `muted` 14px label (Problem N, What I changed, Instead of, Why this way, Trade-off) and the answer, with hairlines between rows. Bold the choice. Labels stack above answers below 640px.
  - `.shot` is a screenshot tile, 16:9 or `.is-free` for its natural height; `.shots` stacks several. Screens blend into the grey with multiply; add `.is-raw` for a full-bleed screenshot or composite that should keep its own white (it gets a `hair` edge instead).
  - `.to-top` is the back-to-top button: a 48px `ink` circle fixed bottom-right (24px in, 16px on phones). Add `<button class="to-top" data-to-top aria-label="Back to top">` before `site.js` on long pages; it appears after one screen of scroll.
  - Image zoom: on case-study pages every `figure img` (plus any `img[data-zoom]`) opens full screen in a `<dialog class="zoom">` on an 82% black veil; click outside, the close button or Esc returns to the page. Mark `data-no-zoom` on images under an overlay, such as video posters. Linked images never zoom.
  - `.cs-next` ends the page: an "All work" grey pill and the next case study.
- **Focus**
  - Every link and button shows a 2px `accent` outline, offset 4px, with 10px radius.

## Motion

- The easing curve is `ease-out-expo` = `cubic-bezier(.16,1,.3,1)`.
  - Hovers take 200ms and the tile lift takes 500ms.
  - The menu fades in over 350ms and its links over 500ms.
- In-page anchors glide (`site.js`).
  - The curve is ease-in-out cubic.
  - It lasts 600–1200ms depending on distance.
  - It lands the section's h2 104px from the top and moves focus to it.
  - Wheel or touch input cancels it.
- `prefers-reduced-motion` turns off every animation and makes anchors jump instantly.

## Applying this to a page

1. Load Geist, then the Tailwind CDN, then `assets/js/tailwind-config.js`.
2. Use the token classes (`text-ink`, `text-muted`, `bg-surface`, `rounded-tile`, `text-label`, and so on). Never use hex.
3. Link `assets/css/e3.css` after the config, then `<script src="assets/js/layout.js"></script>` (in `<head>`, no `defer`). Use its component classes. Put `<site-header></site-header>` at the top of `<body>` and `<site-footer></site-footer>` after `<main>`; add `home` to the header on `index.html` so its anchors stay in-page. Edit nav and footer content only in `layout.js`.
4. Add `<script src="assets/js/site.js"></script>` for the mobile menu and anchor glide. The markup hooks are `data-bar`, `data-menu-btn` and `#mobile-menu`.

**Status.** `index.html` and both case studies are fully on E3. `about.html` and `services/` use the E3 tokens and font but keep their older layouts and outlined nav.
