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
        { context: "src", from: "php/*.php", to: "../" },
        { context: "src", from: "plugin.php", to: "../" },
        { context: "src", from: "css/*.css", to: "../" },
        { context: "src", from: "acf-json/*.*", to: "../" },
        { from: "README.md", to: "../" },
        { from: "README.md", to: "../" },
      ],
    }),
  ],
};
