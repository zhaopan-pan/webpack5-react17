const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../'),
      manifest: require("./buildVendor/vendor-manifest.json"),
    }),
  ],
});
