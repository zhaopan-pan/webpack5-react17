"use strict";

const webpackDevMiddleware = require("webpack-dev-middleware");

module.exports = (compiler, option) => {
  const wdm = webpackDevMiddleware(compiler, option);
  return async function(ctx, next) {
    await new Promise((resolve) => {
      wdm(
        ctx.req,
        {
          locals: ctx.res.locals,
          end(content) {
            ctx.body = content;
            resolve(0);
          },
          setHeader() {
            ctx.set.apply(ctx, arguments);
          },
          getHeader() {
            ctx.get.apply(ctx, arguments);
          },
        },
        () => {
          resolve(1);
        }
      );
    });
    await next();
  };
};