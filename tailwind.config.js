/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0E11',
        panel: '#11151A',
        line: '#1E2228',
        paper: '#EDEDE8',
        muted: '#9AA1AC',
        slate: '#8590A0',
        copper: '#C9803D',
        'copper-bright': '#E0A05E',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        blink: 'blink 1.1s steps(2, start) infinite',
        rise: 'rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        fade: 'fade 0.15s ease-out both',
        pop: 'pop 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'packet-x': 'packet-x 1.8s ease-in-out infinite',
        'packet-y': 'packet-y 1.8s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          to: { visibility: 'hidden' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pop: {
          from: { opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'packet-x': {
          '0%': { left: '0%', opacity: '0' },
          '20%, 80%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        'packet-y': {
          '0%': { top: '0%', opacity: '0' },
          '20%, 80%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
