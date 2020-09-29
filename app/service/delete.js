'use strict';

const Service = require('egg').Service;

class DeleteService extends Service {
  async delOne(params,model) {
    let res = await this.ctx.model[model].deleteOne(params);
    return res;
  }
}

module.exports = DeleteService;
