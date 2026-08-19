/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#F01616',
          'red-bright': '#FF2020',
          'red-dark': '#C81010',
          black: '#111111',
          'black-card': '#161616',
          'black-muted': '#222222',
          light: '#F5F5F3',
          'light-warm': '#FAF9F6',
          muted: '#737373',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        display: ['Syne', 'Anton', 'Inter Tight', 'sans-serif'],
        headline: ['Syne', 'sans-serif'],
        condensed: ['"Inter Tight"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderRadius: {
        'subtle': '4px',
        'card': '8px',
      }
    },
  },
  plugins: [],
}
