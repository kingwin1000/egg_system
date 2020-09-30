'use strict';

const Service = require('egg').Service;

class UpdateService extends Service {
  async updateOne(params,model) {
    let res = await this.ctx.model[model].updateOne(params.query,params.changed);
    if(res.ok == 1){
      return {code:20000, data:res, msg:'success'}
    }else{
      return {code:20002, data:null, msg:'params is error'} 
    }
  }
}

module.exports = UpdateService;
