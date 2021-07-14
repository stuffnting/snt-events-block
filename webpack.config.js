const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

/*module.exports = {
  ...defaultConfig,
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "js/[name].js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "php/*.php" },
        { from: "plugin.php" },
        { from: "css/*.css" },
        { from: "acf-json/*.*" },
      ],
    }),
  ],
};*/

module.exports = {
  ...defaultConfig,
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "php/*.php", to: "../" },
        { from: "plugin.php", to: "../" },
        { from: "css/*.css", to: "../" },
        { from: "acf-json/*.*", to: "../" },
      ],
    }),
  ],
};
