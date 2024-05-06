/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["jost", "sans-serif"],
      },
    },
    colors: {
      'black': "#000000",
      'white': "#FFFFFF",
      'anti-white': "#EEEEEE",
      'verdigris': "#76ABAE",
      'gunmetal': {
        700: "#222831",
        500: "#31363F",
      },
      'red': {
        500: '#EF4444',
      },
      'green': {
        600: '#16a34a',
      },
      'martyc-green': '#518385',
      'rich-black' : '#12161B'
    },
  },
  plugins: [],
}

