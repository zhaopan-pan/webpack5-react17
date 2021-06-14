const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次构建前清理 /dist 文件夹
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
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        include: path.resolve(__dirname, "../src"),
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: "webpack5+react17",
      template: "public/index-template.html", //指定html模板，可以向其输出指定内容(采用ejs模板语法)  webpack 5.4.0报错
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less", ".css", ".wasm"], //后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, '../src'),
    },
  },
};
