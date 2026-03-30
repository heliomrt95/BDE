import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    /* ────────────────────────────────────────────
     * SPACING SYSTEM — 4 px base, golden stops
     * ──────────────────────────────────────────── */
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '2px',
      1: '4px',
      1.5: '6px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      3.5: '14px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      28: '112px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
    },

    extend: {
      /* ── PALETTE ── */
      colors: {
        brand: {
          dark:   '#43245c',   // main background
          mid:    '#6f348b',   // primary UI
          light:  '#dfd8e6',   // secondary bg / text
          white:  '#ffffff',
          accent: '#ffd60a',   // yellow highlight
        },
        surface: {
          DEFAULT: '#43245c',
          raised:  '#522d6e',  // slightly lighter for cards
          overlay: 'rgba(67,36,92,0.92)',
        },
        text: {
          primary:   '#ffffff',
          secondary: '#dfd8e6',
          muted:     'rgba(223,216,230,0.55)',
          inverse:   '#43245c',
        },
        border: {
          DEFAULT:  'rgba(111,52,139,0.4)',
          strong:   '#6f348b',
          accent:   '#ffd60a',
        },
      },

      /* ── TYPOGRAPHY ── */
      fontFamily: {
        body:     ['Tonos', 'system-ui', 'sans-serif'],
        display:  ['"P22 Cusp"', 'Georgia', 'serif'],
        pixel:    ['"Argent Pixel CF"', 'monospace'],
      },

      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)',  { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 4rem)',  { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)',{ lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        'heading':    ['1.5rem',                      { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'subheading': ['1.125rem',                    { lineHeight: '1.35', letterSpacing: '0' }],
        'body':       ['1rem',                        { lineHeight: '1.6',  letterSpacing: '0.005em' }],
        'small':      ['0.875rem',                    { lineHeight: '1.5',  letterSpacing: '0.01em' }],
        'caption':    ['0.75rem',                     { lineHeight: '1.4',  letterSpacing: '0.02em' }],
        'pixel-xl':   ['1.5rem',                      { lineHeight: '1.2',  letterSpacing: '0.08em' }],
        'pixel-md':   ['1rem',                        { lineHeight: '1.3',  letterSpacing: '0.06em' }],
        'pixel-sm':   ['0.75rem',                     { lineHeight: '1.3',  letterSpacing: '0.05em' }],
      },

      /* ── BORDER RADIUS ── */
      borderRadius: {
        'sm':   '6px',
        'md':   '10px',
        'lg':   '16px',
        'xl':   '24px',
        'pill': '9999px',
      },

      /* ── SHADOWS & GLOWS ── */
      boxShadow: {
        'card':          '0 2px 16px rgba(67,36,92,0.35)',
        'card-hover':    '0 8px 32px rgba(67,36,92,0.50)',
        'glow-purple':   '0 0 20px rgba(111,52,139,0.5), 0 0 60px rgba(111,52,139,0.2)',
        'glow-accent':   '0 0 20px rgba(255,214,10,0.35), 0 0 60px rgba(255,214,10,0.15)',
        'glow-soft':     '0 0 40px rgba(111,52,139,0.25)',
        'inner-glow':    'inset 0 1px 0 rgba(255,255,255,0.06)',
      },

      /* ── BACKGROUNDS / GRADIENTS ── */
      backgroundImage: {
        'gradient-brand':     'linear-gradient(135deg, #43245c 0%, #6f348b 100%)',
        'gradient-accent':    'linear-gradient(135deg, #ffd60a 0%, #ffed4a 100%)',
        'gradient-glass':     'linear-gradient(135deg, rgba(111,52,139,0.15) 0%, rgba(67,36,92,0.05) 100%)',
        'gradient-hero':      'radial-gradient(ellipse at 30% 20%, rgba(111,52,139,0.4) 0%, rgba(67,36,92,0) 70%)',
        'gradient-card':      'linear-gradient(180deg, rgba(111,52,139,0.12) 0%, rgba(67,36,92,0) 100%)',
        'noise':              "url('/textures/noise.svg')",
      },

      /* ── ANIMATIONS ── */
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(111,52,139,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(111,52,139,0.6)' },
        },
        'shimmer': {
          from: { backgroundPosition: '-200% 0' },
          to:   { backgroundPosition: '200% 0' },
        },
        'pixel-glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%':      { transform: 'translate(-2px, 1px)' },
          '40%':      { transform: 'translate(2px, -1px)' },
          '60%':      { transform: 'translate(-1px, 2px)' },
          '80%':      { transform: 'translate(1px, -2px)' },
        },
      },
      animation: {
        'fade-in':      'fade-in 0.4s ease-out both',
        'fade-up':      'fade-up 0.5s ease-out both',
        'scale-in':     'scale-in 0.3s ease-out both',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'pixel-glitch': 'pixel-glitch 0.3s steps(1) both',
      },

      /* ── TRANSITIONS ── */
      transitionDuration: {
        DEFAULT: '200ms',
        fast:    '120ms',
        normal:  '200ms',
        slow:    '400ms',
      },
      transitionTimingFunction: {
        'smooth':  'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'snappy':  'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },

  plugins: [
    /* ── CUSTOM UTILITIES ── */
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Glass morphism */
        '.glass': {
          background: 'rgba(67,36,92,0.45)',
          backdropFilter: 'blur(16px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
          border: '1px solid rgba(111,52,139,0.25)',
        },
        '.glass-light': {
          background: 'rgba(223,216,230,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(223,216,230,0.12)',
        },
        /* Pixel-art rendering (for Argent Pixel CF elements) */
        '.pixel-render': {
          imageRendering: 'pixelated',
          fontSmooth: 'never',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'unset',
        },
        /* Noise overlay (apply on ::after) */
        '.noise-overlay': {
          position: 'relative',
          isolation: 'isolate',
        },
        /* Focus visible ring — accessible + branded */
        '.focus-brand': {
          outline: 'none',
        },
        '.focus-brand:focus-visible': {
          boxShadow: '0 0 0 2px #43245c, 0 0 0 4px #ffd60a',
        },
        /* Accent underline for creative headings */
        '.accent-underline': {
          textDecorationLine: 'underline',
          textDecorationColor: '#ffd60a',
          textDecorationThickness: '3px',
          textUnderlineOffset: '6px',
        },
      });
    }),
  ],
};

export default config;
