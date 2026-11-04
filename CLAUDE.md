# CLAUDE.md

Tommy Chi's portfolio. Static HTML + Tailwind CDN, no build step. See README.md for structure and PRODUCT.md for audience and positioning.

## Before any UI edit
- Read [DESIGN.md](DESIGN.md). It's the E3 cold-grey design system, and its rules are binding.
- Use tokens from `assets/js/tailwind-config.js` (mirrored as CSS variables in `assets/css/e3.css`) only: `ink`, `muted`, `quiet`, `surface`, `surface-2`, `surface-3`, `hair`, `accent`, plus the type, radius and spacing tokens.
  - No raw hex in HTML.
  - No Tailwind `gray-*` / `neutral-*`.
  - No warm greys.
- `accent` (#1F4FD8) goes on proof numbers and the focus ring only.
- Body text is 16px; nothing renders below 14px. Muted text must keep 4.5:1 contrast.
- Reuse the component classes in `assets/css/e3.css` (pill, chip, tile, two-tone, proof, xp, flink, and the case-study `cs-*`, card, stat, shot) and `assets/js/site.js` for the mobile menu and anchor glide.
- If a new token or component is needed, add it to the config and to DESIGN.md in the same change.

## Content
- Only resume-backed claims (`assets/Resume_TommyChi.md`). Never invent testimonials, logos, awards or metrics.
- Real work is the only imagery. Record the source of any new crop in `assets/home/SOURCES.md`.
- The homepage stays in English. Chinese copy lives only in `services/zh/`.
- Keep the shared URLs in README.md unchanged.

## Check
- Run `python3 -m http.server 8000` and look at 1440px, 768px and 375px.
