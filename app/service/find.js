'use strict';
const Service = require('egg').Service;
class FindService extends Service {
  async findOne(params,rule,data) {
    let errors = this.app.validator.validate(rule,params);
    if(errors && errors.length > 0){
      return {code:201, msg:'params is error'}
    }else{
      let res = await this.ctx.model[data].findOne(params,{_id:false});
      return res;
    }
  }
}
module.exports = FindService;
