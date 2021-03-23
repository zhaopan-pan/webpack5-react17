const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次构建前清理 /dist 文件夹
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html 并自动添加bundles文件

const isProd = process.env.NODE_ENV === "production";
const isdev = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    bundle: [path.resolve(__dirname, "../src/main.js")],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"), //dev模式下存在于内存中
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
    new CleanWebpackPlugin(),
    // new FriendlyErrorsWebpackPlugin({}),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: isProd ? "xixi" : "haha",
      template: "src/index-template.html", //指定html模板，可以向其输出指定内容(采用ejs模板语法)  webpack 5.4.0报错
      // templateContent: fs.readFileSync("src/index-template.html", "utf-8"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};
