import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tb: {
          blue: '#3273e6',
          'blue-dark': '#2b5fc7',
          'blue-light': '#e8f0fe',
          orange: '#f7941d',
          'orange-hover': '#e6850a',
          green: '#3ca350',
          'green-bg': '#e6f4ea',
          red: '#e84d55',
          navy: '#1c2742',
          'navy-light': '#3a4b6e',
          gray: {
            50: '#f5f7fa',
            100: '#eef1f5',
            200: '#dde3eb',
            300: '#bcc5d3',
            400: '#8290a3',
            500: '#627086',
            600: '#4c596b',
            700: '#3a4556',
            800: '#1c2742',
          },
        },
      },
      fontFamily: {
        sans: ['Roboto', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'tb': '0 1px 4px 0 rgba(60,60,100,.08), 0 2px 6px 0 rgba(60,60,100,.12)',
        'tb-md': '0 2px 8px 0 rgba(60,60,100,.10), 0 4px 12px 0 rgba(60,60,100,.14)',
        'tb-lg': '0 4px 16px 0 rgba(60,60,100,.12), 0 8px 24px 0 rgba(60,60,100,.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'logo-fade-in': 'logoFadeIn 0.5s ease-out',
        'logo-wipe-reveal': 'logoWipeReveal 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        logoFadeIn: {
          '0%': { transform: 'translateY(2px) scale(0.98)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        logoWipeReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)', opacity: '0', transform: 'translateX(-6px)' },
          '35%': { opacity: '1' },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
