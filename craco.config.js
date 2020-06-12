const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');

module.exports = {
  webpack: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
      lab: require('path').resolve(__dirname, 'src/lab'),
      config: require('path').resolve(__dirname, 'src/config'),
      modules: require('path').resolve(__dirname, 'src/modules'),
      nav: require('path').resolve(__dirname, 'src/navigation'),
      store: require('path').resolve(__dirname, 'src/store'),
      utils: require('path').resolve(__dirname, 'src/utils'),
      lib: require('path').resolve(__dirname, 'src/utils'),
      layouts: require('path').resolve(__dirname, 'src/layouts'),
      components: require('path').resolve(__dirname, 'src/components'),
      hooks: require('path').resolve(__dirname, 'src/hooks'),
    },
    plugins: [],
    //configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */ },
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
};
