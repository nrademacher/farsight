const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./src/**/*.html", "./src/index.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
