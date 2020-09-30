'use strict';

const Service = require('egg').Service;

class DeleteService extends Service {
  async delOne({ param },model) {
    let res = await this.ctx.model[model].deleteOne(param);
    console.log('========',res)
    if(res.ok == 1){
      return {code:20000, data:res, msg:'success'}
    }else{
      return {code:20002, data:null, msg:'params is error'} 
    }
  }
}

module.exports = DeleteService;
