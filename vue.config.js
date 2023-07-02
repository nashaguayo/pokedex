const path = require('path');
module.exports = {
  publicPath: '/pokedex/',
  configureWebpack: {
    resolve: {
      alias: {
        '@css': path.resolve(__dirname, 'src/css'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@lib': path.resolve(__dirname, 'src/lib'),
      },
    },
  },
  runtimeCompiler: true,
};
