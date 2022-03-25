module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        // modify the options...
        return options;
      })
      .end()
      .use("vue-style-loader")
      .loader("vue-style-loader")
      .end();
  },
};
