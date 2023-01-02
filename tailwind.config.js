/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/index.jsx",
    "./pages/components/bookLists.jsx",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   'sans': ['Montserrat', 'sans-serif'],
      // }
    },
  },
  plugins: [],
}
