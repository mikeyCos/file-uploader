const path = require("path");
const rootPath = path.join(__dirname, "..");

module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-preset-env"),
    require("cssnano"),
    require("postcss-url")({
      url: "copy",
      basePath: `${rootPath}/src/assets/fonts/`,
      assetsPath: `${rootPath}/public/assets/fonts`,
      useHash: true,
    }),
  ],
};
