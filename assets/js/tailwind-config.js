// Shared Tailwind CDN config for every page. Load right after https://cdn.tailwindcss.com
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        border: { default: '#1b1c1e' },
        text: {
          primary: '#1d1d1f',   // Apple primary text
          secondary: '#86868b', // Apple secondary text
          tertiary: '#515154',  // Apple tertiary text
        },
        surface: { muted: '#f5f5f7' },
      },
      // Semantic font-size tokens: text-caption / text-body / text-lead
      fontSize: {
        'caption': ['13px', { lineHeight: '1.38', letterSpacing: '0em' }],
        'body': ['17px', { lineHeight: '1.52', letterSpacing: '-0.01em' }],
        'lead': ['21px', { lineHeight: '1.48', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        'xs': '50px',
        'sm': '80px',
      },
      // Semantic spacing tokens (do not override Tailwind defaults)
      spacing: {
        'section-sm': '40px',
        'section': '80px',
        'section-lg': '108px',
      },
    },
  },
};
