'use strict';

const Service = require('egg').Service;

class UpdateService extends Service {
  async updateOne(params,model) {
    let _changed = {$set:params.changed}
    let res = await this.ctx.model[model].updateOne(params.query,_changed);
    if(res.ok == 1){
      return {code:20000, data:res, msg:'success'}
    }else{
      return {code:20002, data:null, msg:'params is error'} 
    }
  };
  async updateMany(params,model){
    let res = await this.ctx.model[model].updateMany(params.query,params.changed);
    if(res.ok == 1){
      return {code:20000, data:res, msg:'success'}
    }else{
      return {code:20002, data:null, msg:'params is error'} 
    }
  }

}

module.exports = UpdateService;
