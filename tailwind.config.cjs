/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0D10',
          800: '#0F1216',
          700: '#14181E',
          600: '#1A1F27',
          500: '#232A33',
          400: '#333C48',
        },
        primary: {
          DEFAULT: '#E11D2E',
          50: '#FDE8EA',
          100: '#FBC9CD',
          200: '#F5989E',
          300: '#ED616C',
          400: '#E63A46',
          500: '#E11D2E',
          600: '#C41424',
          700: '#9E0F1C',
          800: '#7A0B16',
          900: '#560710',
        },
        accent: {
          DEFAULT: '#F97316',
          50: '#FFF3EC',
          100: '#FFE2CF',
          200: '#FFC49F',
          300: '#FFA163',
          400: '#FC8433',
          500: '#F97316',
          600: '#DD5A0C',
          700: '#B4460B',
          800: '#8C380D',
          900: '#6E2D0D',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Inter', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(225, 29, 46, 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
