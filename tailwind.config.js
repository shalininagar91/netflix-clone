/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        "300px": "repeat(auto-fit, minmax(150px, auto))",
      },
    },
  },
  plugins: [],
};
