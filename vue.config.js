// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // configureWebpack: {
  //   plugins: [new VuetifyLoaderPlugin()],
  // },
  // transpileDependencies: [],
  publicPath: '/',
  transpileDependencies: ['vuetify', 'swiper', 'dom7', 'ssr-window'],

  configureWebpack: (config) => {
    if (process.env.NODE_ENV == 'production') {
      config.mode = 'production';
      let optimization = {
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              mangle: true,
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'],
              },
            },
          }),
        ],
      };
      Object.assign(config, {
        optimization,
      });
    } else {
      // 为开发环境修改配置
      config.mode = 'development';
    }
  },
};