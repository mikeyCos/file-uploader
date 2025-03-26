const path = require("path");
const rootPath = path.join(__dirname, "..");

module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("postcss-import"),
    require("postcss-mixins"),
    require("cssnano"),
    require("postcss-url")({
      url: "copy",
      basePath: `${rootPath}/src/assets/fonts/`,
      assetsPath: `${rootPath}/public/assets/fonts`,
      useHash: true,
    }),
  ],
};
