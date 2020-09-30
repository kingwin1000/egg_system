'use strict';

const Service = require('egg').Service;

class CreateService extends Service {
  async createOne({param,rule},model) {
    let errors = '';
    if( rule ){
      errors = this.app.validator.validate(rule,param);
    }
    if(errors && errors.length > 0){
      return {code:20002, data:null, msg:'params is error'} 
    }else{
      let res = await this.ctx.model[model].create(param);
      return {code:20000, data:res, msg:'success'} 
    }
  }
}

module.exports = CreateService;
