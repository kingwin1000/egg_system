/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};
  config.keys = appInfo.name + '_1601014143357_5554';
  config.mongoose = { client: { url: "mongodb://127.0.0.1:27017/egg_system", options: {} } };
  config.jwt = { secret: "abc!@#abc" };
  config.security = {csrf: { enable: false } };  
  config.cors = {origin:'*', allowMethods: 'GET,HEAD,PUT,POST,DELETE',maxAge:60*9999},
  config.validate = {};
  config.multipart = { mode: 'stream', whitelist: ['.jpg','.gif','.png','.jpeg','.mp4','.mp3','.wma'], fileSize: '20mb' };
  
  
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
