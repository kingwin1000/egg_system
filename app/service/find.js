'use strict';
const Service = require('egg').Service;
class FindService extends Service {
  async findOne( { param, rule }, model) {
    var field = field ? field : {}; field._id = false; field.password = false;
    var errors = '';
    if( rule ){
      errors = this.app.validator.validate(rule,param);
    }
    if(errors && errors.length > 0){
      return {code:20002, data:null, msg:'params is error'} 
    }else{
      let res = await this.ctx.model[model].findOne(param,field);
      return {code:20000, data:res, msg:'success'}
    }
  };
  async find( { param,rule,field, lean,sort },  model) {
    var param = param ? param : {};
    var field = field ? field : {}; field._id = false; field.password = false;
    var lean = lean ? lean :{ lean :false};
    var sort = sort ? sort : { orderNo:1 };
    var errors = '';
    if( rule ){
      errors = this.app.validator.validate(rule,param);
    }
    if(errors && errors.length > 0){
      return {code:20002, data:null, msg:'params is error'} 
    }else{
      var res = await this.ctx.model[model].find(param,field,lean).sort(sort);
      return {code:20000, data:res, msg:'success'}
    }     
  };
  async findByPage({param,rule,field,sort},model){
    var param = param ? param : {};
    var sort = sort ? sort : { orderNo:1 };
    var field = field ? field : {}; field._id = false; field.password = false;
    var errors = '';
    param.page = param.page ? param.page : 1;
    param.pageSize = param.pageSize ? param.pageSize :20;
    var page = parseInt(param.page);
    var limit = parseInt(param.pageSize);
    var skip = (page-1)*limit
    delete param.page; 
    delete param.pageSize;
    if( rule ){
      errors = this.app.validator.validate(rule,param);
    } 
    if(errors && errors.length > 0){
      return {code:20002, data:null, msg:'params is error'} 
    }else{
      let res = await this.ctx.model[model].find(param,field).limit(limit).skip(skip).sort(sort);
      let total = await this.ctx.model[model].count(param);
      let page = Math.ceil(total/limit);
      return {code:20000, totalNum:total, totalPage:page, data:res, msg:'success'}
    } 
    return {code:20000,data:res, msg:'success'}   
  };
  async findCount(model){
    let total = await this.ctx.model[model].count();
    return {code:20000,total:total, msg:'success'}  
  };
  async findByIndex({param,rule,field,sort},model){
    var param = param ? param : {};
    var sort = sort ? sort : { orderNo:1 };
    var field = field ? field : {}; field._id = false; field.password = false;
    var errors = '';
    param.page = param.page ? param.page : 1;
    param.pageSize = param.pageSize ? param.pageSize :20;
    var page = parseInt(param.page);
    var limit = parseInt(param.pageSize);
    var skip = (page-1)*limit;
    if( rule ){
      errors = this.app.validator.validate(rule,param);
    } 
    if(errors && errors.length > 0){
      return {code:20002, data:null, msg:'params is error'} 
    }else{
      let res = await this.ctx.model[model].aggregate([
        {  $project:field  },
        {  $addFields: { sort : {  $indexOfArray: [ param.orderData, '$id' ] } , index:0} },        
        {  $sort: { sort: -1 } },
        {  $skip:skip  },
        {  $limit:limit },           
      ])
      let total = await this.ctx.model[model].count();
      let page = Math.ceil(total/limit);
      return {code:20000, totalNum:total, totalPage:page, data:res, msg:'success'}
    } 
  };
}
module.exports = FindService;
