console.log(process.env.VUE_APP_API);
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    "/api/*": {
      target: process.env.VUE_APP_API,
      pathRewrite: { "/api": "/" },
      changeOrigin: true,
    },
  },
};
