const webpack = require("webpack");
const path = require("path");
const WebpackBar = require("webpackbar");

module.exports = {
    mode: "development",

    entry: {
        vendor: ["react", "react-dom"],
    },

    context: __dirname,
    devtool: "source-map", // 调试js用这个

    output: {
        path: path.join(__dirname, "buildVendor"),
        filename: "[name].[hash].js",
        library: "[name]_[hash]",
    },

    plugins: [
        // DllPlugin 和 DllReferencePlugin 用某种方法实现了拆分 bundles，
        // 同时还大幅度提升了构建的速度。"DLL" 一词代表微软最初引入的动态链接库
        new webpack.DllPlugin({
            path: path.join(__dirname, "buildVendor", "[name]-manifest.json"),
            name: "[name]_[hash]",
        }),
        new WebpackBar(),
    ],
};
