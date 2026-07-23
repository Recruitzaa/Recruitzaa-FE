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
        'brand-primary': 'var(--color-primary)',
        'brand-primary-hover': 'var(--color-primary-hover)',
        'brand-primary-light': 'var(--color-primary-light)',
        'brand-charcoal': 'var(--color-dark)',
      },
      borderRadius: {
        brand: 'var(--radius)',
        'brand-lg': 'var(--radius-lg)',
      },
      boxShadow: {
        brand: 'var(--shadow)',
        'brand-md': 'var(--shadow-md)',
      },
    },
  },
  plugins: [],
}
