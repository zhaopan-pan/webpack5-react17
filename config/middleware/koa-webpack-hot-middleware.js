const webpackHotMiddleware = require("webpack-hot-middleware");

module.exports = function(compiler, options) {
  const webpackHot = webpackHotMiddleware(compiler, options);

  return async function(ctx, next) {
    const originalEnd = ctx.res.end;

    await new Promise((resolve) => {
      ctx.res.end = function() {
        originalEnd.apply(this, arguments);
        resolve();
      };

      webpackHot(ctx.req, ctx.res, function() {
        resolve();
      });
    });
    await next();
  };
};
