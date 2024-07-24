/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FE8A00',
        'secondary': {
          100: '#CFCFCF',
          200: '#1F2834',
          300: '#151F2B',
        }
      },
    },
  },
  plugins: [],
}

