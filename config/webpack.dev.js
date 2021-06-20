const webpack = require('webpack')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 控制台友好输出
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ESLintPlugin = require('eslint-webpack-plugin') // 已经替代eslint-loader，webpack官方文档out
const { transformer, formatter } = require('./utils/resolve-error')
const projectCon = require('../project.config')
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html 并自动添加bundles文件

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].[hash].js',
        publicPath: projectCon.publicPath
    },
    devtool: 'eval-source-map', // 报错的时候在控制台输出哪一行报错
    optimization: {
        // moduleIds: false,
        /**
         * 优化持久化缓存的, runtime 指的是 webpack 的运行环境(具体作用就是模块解析, 加载) 和 模块信息清单, 模块信息清单在每次有模块变更(hash 变更)时都会变更,
         * 所以我们想把这部分代码单独打包出来, 配合后端缓存策略, 这样就不会因为某个模块的变更导致包含模块信息的模块,(通常会被包含在最后一个 bundle 中)缓存失效.
         * optimization.runtimeChunk 就是告诉 webpack 是否要把这部分单独打包出来.
         */
        //提取引导模板
        runtimeChunk: 'single',
        //代码分割/模块分离
        splitChunks: {
            cacheGroups: {
                //将第三方库(library)（例如 lodash 或 react很少像本地的源代码那样频繁修改）提取到单独的 vendor chunk 文件中
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
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
                // .css 解析
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            import: false,
                            // 以变量引入的方式使用样式
                            importLoaders: true,
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                // .less 解析
                test: /\.less$/,
                use: [
                    'style-loader', // 将模块导出的内容作为样式并添加到 DOM 中
                    'css-loader', // 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
                    'postcss-loader', //  使用 PostCSS 加载并转换 CSS/SSS 文件
                    {
                        loader: 'less-loader', //  加载并编译 LESS 文件
                        options: {
                            lessOptions: {
                                strictMath: true
                            }
                        }
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
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新之模块替换
        new FriendlyErrorsPlugin({
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,
            // add formatters and transformers (see below)
            additionalFormatters: [formatter],
            additionalTransformers: [transformer]
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx', 'ts', 'tsx', '.wasm'],
            eslintPath: require.resolve('eslint'),
            cache: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack5+react17',
            template: 'public/index-template.html', //指定html模板，可以向其输出指定内容(采用ejs模板语法)  webpack 5.4.0报错
            favicon: 'public/favicon.png'
        })
    ]
})
