const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpackbar = require('webpackbar') // 进度条

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: 'chunks/[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'), //dev模式下存在于内存中
        publicPath: '/'
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
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                // less 解析
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
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
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
        })
    ]
})
