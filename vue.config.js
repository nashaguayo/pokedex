const path = require('path');
module.exports = {
  publicPath: '/pokedex/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  runtimeCompiler: true,
};
