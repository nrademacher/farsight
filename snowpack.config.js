module.exports = {
  mount: {
    src: "/",
    assets: "/"
  },
  plugins: [["@snowpack/plugin-postcss"], ["@snowpack/plugin-dotenv"]],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
