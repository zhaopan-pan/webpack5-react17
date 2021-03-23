const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html 并自动添加bundles文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次构建前清理 /dist 文件夹
const WebpackBar = require("WebpackBar");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const pk = require("../package.json");
const fs = require("fs");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "/dist"), //dev模式下存在于内存中
    publicPath: "/",
  },
  stats: "errors-only",
  optimization: {
    // moduleIds: false,
    /**
     * 优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更,
     * 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块,(通常会被包含在最后一个 bundle 中)缓存失效.
     * optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
     */
    //提取引导模板
    runtimeChunk: "single",
    //代码分割/模块分离
    splitChunks: {
      cacheGroups: {
        //将第三方库(library)（例如 lodash 或 react很少像本地的源代码那样频繁修改）提取到单独的 vendor chunk 文件中
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devtool: "inline-source-map",
  // devServer: {
  //   contentBase: "./dist", //静态文件目录
  //   hot: true, //启用热更新
  //   port: "8081", //测试服务端口
  // },

  // module: {
  //   rules: [],
  // },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "haha",
      template: "src/index-template.html", //指定html模板，可以向其输出指定内容(采用ejs模板语法)  webpack 5.4.0报错
      // templateContent: fs.readFileSync("src/index-template.html", "utf-8"),
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
