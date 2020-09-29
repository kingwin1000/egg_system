'use strict';

const Service = require('egg').Service;

class CreateService extends Service {
  async createOne(params,model) {
    let res = await this.ctx.model[model].create(params);
    return res;
  }
}

module.exports = CreateService;
