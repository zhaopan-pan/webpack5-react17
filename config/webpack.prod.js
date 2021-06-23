const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpackbar = require('webpackbar') // 进度条
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html 并自动添加bundles文件
const projectConfig = require('../project.config')

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: 'chunks/[name].[contenthash].js',
        path: path.resolve(__dirname, projectConfig.prodOutput), //dev模式下存在于内存中
        publicPath: '/webpack5-react17'
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
                    // 将模块导出的内容作为样式并添加到 DOM 中
                    'style-loader',
                    // 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
                    'css-loader',
                    //  使用 PostCSS 加载并转换 CSS/SSS 文件
                    'postcss-loader',
                    {
                        //  加载并编译 LESS 文件
                        loader: 'less-loader',
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
        new webpackbar(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../'),
            manifest: require('./buildVendor/vendor-manifest.json')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'webpack5+react17',
            template: 'public/index-template.html', //指定html模板，可以向其输出指定内容(采用ejs模板语法)  webpack 5.4.0报错
            favicon: 'public/favicon.png',
            inject: true // 是否将js放在body的末尾
        })
    ]
})
