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
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drawIn: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 1s ease-out both",
      },
    },
  },
  plugins: [],
};
