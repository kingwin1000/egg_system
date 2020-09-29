'use strict';
const Service = require('egg').Service;
class FindService extends Service {
  async findOne(params,rule,model) {
    //let errors = this.app.validator.validate(rule,params);
    //if(errors && errors.length > 0){
    //  return {code:20001, msg:'params is error'}
    //}else{
      let res = await this.ctx.model[model].findOne(params,{_id:false,password:false});
      return {code:20000, data:res, msg:'success'}
    //}
  };
  async find(params,rule,model) {
    //let errors = this.app.validator.validate(rule,params);
    ///if(errors && errors.length > 0){
    //  return {code:20001, msg:'params is error'}
    //}else{
      let res = await this.ctx.model[model].find(params,{_id:false,password:false});
      return {code:20000, data:res, msg:'success'}
    //}      
  }  
}
module.exports = FindService;
