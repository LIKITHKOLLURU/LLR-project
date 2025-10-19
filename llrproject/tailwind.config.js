/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          dark: '#60a5fa',
        },
        secondary: {
          light: '#6b7280',
          dark: '#9ca3af',
        },
        background: {
          light: '#ffffff',
          dark: '#1f2937',
        },
        text: {
          light: '#111827',
          dark: '#f9fafb',
        },
      },
    },
  },
  plugins: [],
}
