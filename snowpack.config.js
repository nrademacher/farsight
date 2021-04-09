module.exports = {
  mount: {
    src: "/",
  },
  plugins: [["@snowpack/plugin-postcss"], ["@snowpack/plugin-dotenv"]],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
