/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#c14f16',
        'brand-primary-hover': '#a94210',
        'brand-primary-light': '#fef3ee',
        'brand-charcoal': '#1e2229',
      },
    },
  },
  plugins: [],
}
