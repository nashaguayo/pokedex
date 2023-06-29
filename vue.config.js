const path = require('path');
module.exports = {
  publicPath: '/pokedex/',
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
      },
    },
  },
};
