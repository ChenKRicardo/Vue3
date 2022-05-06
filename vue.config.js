module.exports = {
  lintOnSave: false, //关闭eslintre语法检查
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://39.98.123.211",
        ws: true, //用于支持webscoket
        changeOrigin: true, //
      },
    },
  },
};
