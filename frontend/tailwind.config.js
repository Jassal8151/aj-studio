/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#f1c40f',
          500: '#d4af37',
          600: '#aa7c11',
        },
      },
    },
  },
  plugins: [],
};
