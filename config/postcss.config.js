const path = require("path");
const rootPath = path.join(__dirname, "..");

module.exports = {
  plugins: [
    require("postcss-preset-env"),
    require("postcss-import"),
    require("postcss-mixins"),
    require("cssnano"),
    require("postcss-url")([
      {
        filter: "**/*.ttf",
        url: "copy",
        assetsPath: `${rootPath}/public/assets/fonts`,
        basePath: `${rootPath}/src/assets/fonts/`,
        useHash: true,
      },
    ]),
  ],
};
