# Tommy Chi — Portfolio 2026

Static HTML + Tailwind CSS (CDN). No build step.

## Structure

```
/
├─ index.html                                  # Portfolio home (for recruiters)
├─ about.html                                  # Draft, not linked from nav
├─ us-state-gov-public-records-redesign.html   # Case study (URL is shared — don't rename)
├─ us-state-gov-ai-bid-prototype.html          # Case study (URL is shared — don't rename)
├─ b2c-music-app-feature-design.html           # Case study, hidden from home for now
├─ services/
│  ├─ index.html                               # Freelance services page (EN)
│  └─ zh/index.html                            # Freelance services page (繁體中文)
└─ assets/
   ├─ js/tailwind-config.js                    # Shared Tailwind theme, loaded by every page
   ├─ Resume_TommyChi.pdf                      # URL is shared — keep this path
   └─ <case-study-slug>/                       # Images per case study
```

## Two audiences

- **Portfolio** (`/`, case studies): for hiring teams. English only. CTAs: resume, email.
- **Services** (`/services/`, `/services/zh/`): for freelance clients. English + Traditional Chinese, with a language switch in the header. CTAs: book a call (cal.com), email. The portfolio links to it only from a small footer link, not the main nav.

The services pages reuse the case-study pages as proof — they link to `../us-state-gov-*.html`.

## Conventions

- Use **relative** paths for links and images (`assets/...`, `../assets/...` from `services/`), so pages work both on the host and locally.
- Image filenames: lowercase, hyphenated, no spaces.
- Design tokens (colors, font sizes, radii, spacing) live in `assets/js/tailwind-config.js`. Each page keeps its own `<style type="text/tailwindcss">` block because the Tailwind CDN needs it inline.
- A future Chinese portfolio can live under `/zh/` without changing existing URLs.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. A server is needed for `services/` (directory URLs) to resolve.
