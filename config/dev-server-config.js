const webpack = require('webpack');
const koaWebpackDevMiddleware = require('./middleware/koa-webpack-dev-middleware');
const koaWebpackHotMiddleware = require('./middleware/koa-webpack-hot-middleware');
const webpackConfig = require('./webpack.dev.js');
const chalk = require('chalk');

function devServerConfig(app, defaultUrl) {
  webpackConfig.entry.bundle.unshift(
    'webpack-hot-middleware/client?noInfo=true'
  );
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  // 告知 koa 使用 webpack-dev-middleware，
  // 以及将 webpack.webpackConfig.js 配置文件作为基础配置。
  app.use(
    koaWebpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: 'none',//errors-only
    })
  );

  //技术选型中使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，so使用 webpack-hot-middleware 依赖包，
  //以在自定义服务器或应用程序上启用 HMR。
  app.use(
    koaWebpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2000,
    })
  );

  compiler.hooks.done.tap('done', (
    stats /* stats is passed as an argument when done hook is tapped.  */
  ) => {
    const hasErrors = stats.hasErrors();
    const hasWarnings = stats.hasWarnings();
    if (hasErrors || hasWarnings) return
    console.log(
      chalk.green(
        '==> 🌎 Open up ' + chalk.yellow(defaultUrl) + ' in your browser.'
      )
    );
  });
}

module.exports = devServerConfig;
