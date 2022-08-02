const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //每次构建前清理 /dist 文件夹
const isProd = process.env.NODE_ENV === 'production'
const isdev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: {
        bundle: [path.resolve(__dirname, '../src/index.tsx')]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css', '.wasm'], //后缀名自动补全
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@/hooks': path.resolve(__dirname, '../src/hooks'),
            '@/pages': path.resolve(__dirname, '../src/pages'),
            '@/store': path.resolve(__dirname, '../src/store'),
            '@/styles': path.resolve(__dirname, '../src/styles'),
            '@/assets': path.resolve(__dirname, '../src/assets'),
            '@/component': path.resolve(__dirname, '../src/component')
        }
    }
}
