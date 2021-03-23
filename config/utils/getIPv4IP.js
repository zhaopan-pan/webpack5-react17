module.exports = function() {
  const interfaces = require("os").networkInterfaces();
  for (const key in interfaces) {
    for (let i = 0; i < interfaces[key].length; i++) {
      const inter = interfaces[key][i];
      if (inter.family === "IPv4" && !inter.internal) {
        return inter.address;
      }
    }
  }
};
