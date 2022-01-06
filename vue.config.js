module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"), // This line must in sass option
      },
    },
  },
};
