// Shared Tailwind CDN config for every page. Load right after https://cdn.tailwindcss.com
// E3 cold-grey design system. DESIGN.md is the source of truth: change tokens there and here together.
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'PingFang TC', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        ink: '#1D1D1F',        // text, primary pill
        'ink-hover': '#3A3A3C', // primary pill hover
        muted: '#6E6E73',      // supporting text, 4.5:1+ on white and surface
        quiet: '#86868B',      // second tone of large headings only, never body text
        surface: {
          DEFAULT: '#F4F4F4',  // hero, tiles, footer, mobile menu
          2: '#EDEDF0',        // grey pill, menu button
          3: '#E2E2E6',        // hover on surface-2
          muted: '#F4F4F4',    // DEPRECATED alias for surface
        },
        hair: '#E5E5EA',       // hairline rules
        accent: '#1F4FD8',     // proof numbers and focus ring only
        page: '#FFFFFF',

        // DEPRECATED aliases kept so older pages pick up the new tones. Use the tokens above in new work.
        border: { default: '#1D1D1F' },  // -> ink
        text: {
          primary: '#1D1D1F',            // -> ink
          secondary: '#86868B',          // -> quiet
          tertiary: '#6E6E73',           // -> muted
        },
      },
      // Type scale. Body is 16px; nothing renders below 14px.
      fontSize: {
        'display': ['76px', { lineHeight: '1.06', letterSpacing: '-0.04em', fontWeight: '600' }],
        'h2': ['48px', { lineHeight: '1.1', letterSpacing: '-0.035em', fontWeight: '600' }],
        'h3': ['24px', { lineHeight: '1.2', letterSpacing: '-0.025em', fontWeight: '600' }],
        'label': ['20px', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        'lead': ['20px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'caption': ['14px', { lineHeight: '1.5' }],
      },
      // Radius shrinks as the object shrinks.
      borderRadius: {
        'hero': '32px',  // hero showcase
        'tile': '28px',  // tiles, cards
        'sheet': '24px', // sheets, large panels
        'shot': '14px',  // screenshots inside tiles
        'xs': '9999px',  // DEPRECATED alias -> rounded-full (pills)
        'sm': '9999px',  // DEPRECATED alias -> rounded-full
      },
      // Spacing runs on 8. Section gaps keep each block reading on its own.
      spacing: {
        'section-sm': '48px',
        'section': '96px',
        'section-lg': '144px',
        'section-xl': '176px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
};
