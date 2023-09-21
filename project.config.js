const path = require('path')

module.exports = {
    port: 3000,
    publicPath: '/',
    realPath: '/index',
    prodOutput: path.resolve(__dirname, './build')
    // prodOutput: path.resolve(__dirname, './build-source-map')
}
