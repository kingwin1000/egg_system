const egg = require('egg');

const workers = Number(process.argv[2] || require('os').cpus().length);
egg.startCluster({
  workers,
  port: process.env.PORT || 81,
  baseDir: __dirname,
});