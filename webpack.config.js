const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  ...defaultConfig,
  externals: {
    lodash: "lodash",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "src", from: "php/*.php", to: "../" },
        { context: "src", from: "plugin.php", to: "../" },
        { context: "src", from: "css/*.css", to: "../" },
        { context: "src", from: "acf-json/*.*", to: "../" },
        { from: "README.md", to: "../" },
      ],
    }),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ["../**/*"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
  ],
};
