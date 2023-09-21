const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
// 进度条
const webpackbar = require('webpackbar')
//生成html 并自动添加bundles文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectConfig = require('../project.config')
// production 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//使用 cssnano 优化和压缩 CSS。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    // devtool: 'source-map', // 报错的时候在控制台输出哪一行报错
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: 'chunks/[name].[contenthash].js',
        path: path.resolve(__dirname, projectConfig.prodOutput),
        publicPath: '/'
    },
    optimization: {
        /**
         * 优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更,
         * 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块,(通常会被包含在最后一个 bundle 中)缓存失效.
         * optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
         */
        //提取引导模板
        runtimeChunk: 'single',
        //代码分割/模块分离
        splitChunks: {
            // 缓存组
            // 利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。
            cacheGroups: {
                //将第三方库(library)（例如 lodash 或 react很少像本地的源代码那样频繁修改）提取到单独的 vendor chunk 文件中
                libs: {
                    test: /[\\/]node_modules[\\/](react|react-dom|mobx)[\\/]/,
                    name: 'libs',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true } //移除所有注释（包括以 /*! 开头的注释）
                        }
                    ]
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, '../src')
            },
            {
                // .样式解析
                test: /\.((c|le)ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
                    {
                        loader: 'css-loader',
                        options: {
                            // 以变量引入的方式使用样式
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    //  使用 PostCSS 加载并转换 CSS/SSS 文件
                    'postcss-loader',
                    {
                        //  加载并编译 LESS 文件
                        loader: 'less-loader'
                    }
                ]
            },
            {
                // 文件解析
                test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[hash:4].[ext]'
                        }
                    }
                ]
            },
            {
                // 图片解析
                test: /\.(png|jpg|jpeg|gif)$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'assets/[name].[hash:4].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 500000, //入口起点的最大体积
        maxAssetSize: 300000 //单个资源体积
    },
    plugins: [
        new webpackbar(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // webpack5底层已经优化了
        // new webpack.DllReferencePlugin({
        //     context: path.resolve(__dirname, '../'),
        //     manifest: require('./buildVendor/vendor-manifest.json')
        // }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack5+react17',
            template: 'public/index-template.html', //指定html模板，可以向其输出指定内容(采用ejs模板语法)  webpack 5.4.0报错
            favicon: 'public/favicon.png',
            inject: true // 是否将js放在body的末尾
        })
    ]
})
