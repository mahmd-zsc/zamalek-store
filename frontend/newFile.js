/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1px",
        // sm: "1rem",
        md: "1px",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      marrgin: {},
    },
    extend: {
      colors: {
        darkColor: "#4D4D4D",
        mainRed: "#DB1F24",
      },
    },
  },
  plugins: [],
  corePlugins: {
    position: true,
  },
};
