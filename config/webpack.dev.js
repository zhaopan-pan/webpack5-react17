const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //每次构建前清理 /dist 文件夹
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ESLintPlugin = require('eslint-webpack-plugin') // 已经替代eslint-loader，webpack官方文档out
const { transformer, formatter } = require('./utils/resolve-error')

module.exports = merge(baseConfig, {
    mode: 'development',
    // output: {
    //     filename: '[name].[contenthash].tsx',
    //     path: path.resolve(__dirname, '/dist'), //dev模式下存在于内存中
    //     publicPath: '/'
    // },
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
    // module: {
    //   rules: [],
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,
            // add formatters and transformers (see below)
            additionalFormatters: [formatter],
            additionalTransformers: [transformer]
        }),
        new ESLintPlugin({
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            eslintPath: require.resolve('eslint'),
            cache: true
        })
    ],
    resolve: {}
})
