/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3B5F', // Azul Profundo Autoridade
          light: '#2C5A8A',
          dark: '#122842',
        },
        secondary: {
          DEFAULT: '#D4AF37', // Dourado Conhecimento
          light: '#E5C96A',
          dark: '#A6892B',
        },
        neutral: {
          sage: '#6B7280', // Cinza Sábio
          parchment: '#F5F1E8', // Bege Pergaminho
          offwhite: '#FAFAFA',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1B3B5F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Corpo de texto
        serif: ['Playfair Display', 'serif'], // Títulos e destaques
        mono: ['IBM Plex Mono', 'monospace'], // Dados e estatísticas
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}
