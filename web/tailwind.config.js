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
        slate: {
          105: '#f0f4f8',
          150: '#e9eef5',
          250: '#dbe3ec',
          350: '#aebccc',
          450: '#8493a7',
          505: '#64748b',
          550: '#5b697c',
          650: '#3f4b5e',
          750: '#293548',
          850: '#172033',
        },
        'brand-primary': 'var(--color-primary)',
        'brand-primary-hover': 'var(--color-primary-hover)',
        'brand-primary-contrast': 'var(--color-primary-contrast)',
        'brand-primary-light': 'var(--color-primary-light)',
        'brand-charcoal': 'var(--color-dark)',
        'brand-card': 'var(--color-card)',
        'brand-surface': 'var(--color-surface)',
        'brand-border': 'var(--color-border)',
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
