module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
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
    // position utility is already enabled by default
    position: true,
  },
};
