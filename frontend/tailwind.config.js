/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b5998",
        secondary: "#8b9dc3",
        pgray: "#dfe3ee",
        lgray: "#f7f7f7",
        green: "#00A700",
        fblue: "#1278F2",
      },
    },
  },
  plugins: [],
}