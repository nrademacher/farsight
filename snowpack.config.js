module.exports = {
  mount: {
    src: "/",
    assets: { url: "/", static: true, resolve: false },
  },
  plugins: [["@snowpack/plugin-postcss"], ["@snowpack/plugin-dotenv"]],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
