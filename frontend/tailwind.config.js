/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "1rem",
        xl: "4rem",
        "2xl": "10rem",
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
};
