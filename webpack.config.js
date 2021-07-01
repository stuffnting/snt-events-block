const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

console.log(defaultConfig);

module.exports = {
  ...defaultConfig,
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/js"),
    filename: "[name].js",
  },
};
