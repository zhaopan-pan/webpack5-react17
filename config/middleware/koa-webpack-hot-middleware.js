const webpackHotMiddleware = require('webpack-hot-middleware')
const chalk = require('chalk')

module.exports = function (compiler, options) {
    const webpackHot = webpackHotMiddleware(compiler, options)

    return async function (ctx, next) {
        const originalEnd = ctx.res.end

        await new Promise(resolve => {
            ctx.res.end = function () {
                originalEnd.apply(this, arguments)
                resolve()
            }
            try {
                webpackHot(ctx.req, ctx.res, function () {
                    resolve()
                })
            } catch (err) {
                console.log(chalk.red('webpackHotMiddleware-error:'))
                console.log(err)
            }
        })
        await next()
    }
}
