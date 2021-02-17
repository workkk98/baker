const path = require('path');
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('less')
      .use('less-loader')
      .loader('less-loader')
      .end()
  },
  outputDir: path.resolve(__dirname, '../cookie-baker-extension/dist'),
  publicPath: process.env.NODE_ENV === 'production'
  ? './'
  : '/'
};