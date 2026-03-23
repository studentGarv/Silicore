/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f0ff',
          purple: '#b000ff',
          blue: '#0080ff',
        },
        dark: {
          bg: '#0a0a0f',
          surface: '#14141a',
          elevated: '#1e1e28',
        }
      },
      backdropBlur: {
        glass: '20px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(176, 0, 255, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        'glass': '12px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
