const koa = require("koa");
const express = require("express");
const webpack = require("webpack");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const webpackConfig = require("./webpack.dev.js");
const devServerConfig = require("./dev-server-config.js");
const colors = require("colors");
const mount = require("koa-mount");

const app = new koa();

const port = 3000;
let argvIp = 0;
if (process.argv.some((i) => i === "ip")) {
  argvIp = getIPv4IP();
}
// 写入ip文件
if (argvIp) {
  fs.writeFileSync(
    path.join(__dirname, "./devconfig/.localIP.js"),
    `export const ip = '${argvIp}'`
  );
} else {
  fs.writeFileSync(path.join(__dirname, "./devconfig/.localIP.js"), "");
}
const devUrl = `http://${argvIp ? argvIp : "localhost"}:${port}${
  webpackConfig.output.publicPath
}`;
const defaultUrl = `${devUrl}index.html`;

if (process.env.NODE_ENV == "production") {
  console.log("-------模拟生产服务器---------");
  /**
   * koa-mount是一个将中间件挂载到指定路径的Koa中间件。它可以挂载任意Koa中间件！
   * koa-static是一个中间件，所以koa-mount可以和koa-static结合，以实现和express一样的静态服务请求前缀的功能。
   */
  app.use(
    mount("/", require("koa-static")(path.resolve(__dirname, "../dist")))
  );
} else {
  devServerConfig(app, defaultUrl);
}

app.listen(port, function() {
  if (process.platform === "win32" || process.platform === "win64") {
    child_process.exec(`start https://:${port}/index.html`);
  } else {
    child_process.exec(`open ${defaultUrl}`);
  }
  console.log("app listening on port 3000!\n");
});
