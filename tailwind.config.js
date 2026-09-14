/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#F3F6F0",
          100: "#E7EEE0",
          200: "#CFE0C4",
          300: "#AFC9A4",
          400: "#8FB582",
          500: "#6F9C61",
          600: "#557847",
          700: "#3E5943",
          800: "#2E4433",
          900: "#1F2F23",
        },
        sand: {
          100: "#F8F5EC",
          200: "#E4DCC8",
        },
        ink: "#2A2A24",
        paper: "#FBFBF8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
