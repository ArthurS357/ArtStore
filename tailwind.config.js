/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#1a1a1a',
          surface: '#2a2a2a',
          text: '#f0f0f0',
          'text-secondary': '#a0a0a0',
          border: '#3a3a3a',
        },
      },
    },
  },
  plugins: [],
};