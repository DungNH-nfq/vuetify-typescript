module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.VUE_APP_API,
        pathRewrite: { "^/api": "/" },
        changeOrigin: true,
        secure: false,
        logLevel: "debug",
      },
    },
  },
};
