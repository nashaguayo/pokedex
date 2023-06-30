const path = require('path');
module.exports = {
  publicPath: '/pokedex/',
  configureWebpack: {
    resolve: {
      alias: {
        '@config': path.resolve(__dirname, 'src/config'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      },
    },
  },
};
