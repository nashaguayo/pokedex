const path = require('path');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/pokedex/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/media-queries.scss";`,
      },
    },
  },
  runtimeCompiler: true,
};
