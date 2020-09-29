'use strict';
/** @type Egg.EggPlugin */
exports.mongoose = {enable: true, package: 'egg-mongoose'};
exports.jwt = {enable: true, package: 'egg-jwt'};
exports.csrf = { enable:false };
exports.cors = { enable: true, package: 'egg-cors'};
exports.validate = { enable: false, package: 'egg-validate'};