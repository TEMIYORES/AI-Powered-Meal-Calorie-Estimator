/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#4f46e5",
        textcolor: "#d4d4d4",
        desccolor: "#737373",
        bg: "#171717",
        navbg: "#737373",
        headerbg: "#262626",
        hover: "#4338ca",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
