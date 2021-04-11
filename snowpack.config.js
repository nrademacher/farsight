module.exports = {
  mount: {
    src: '/',
    assets: '/',
    vendors: '/',
  },
  plugins: [['@snowpack/plugin-postcss'], ['@snowpack/plugin-dotenv']],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
};
