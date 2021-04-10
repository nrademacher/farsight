const forms = require('@tailwindcss/forms')

module.exports = {
  purge: ['./src/**/*.html', './src/index.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: "'Open Sans', sans-serif",
      body: "'Open Sans', sans-serif",
      heading: "'Playfair Display', sans-serif"
    }
  },
  variants: {
    extend: {}
  },
  plugins: [forms]
}
