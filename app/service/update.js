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
  };
  async updatePush({ query,param,rule,pushed},model){
    var errors = '';
    if( rule ){
      errors = this.app.validator.validate(rule,param);
    }    
    if(errors && errors.length > 0){
      return {code:20002, data:null, msg:'params is error'} 
    }else{
      let res = await this.ctx.model[model].update(query,pushed);
      if(res.ok == 1){
        return {code:20000, data:res, msg:'success'} 
      }else{
        return {code:20002, data:null, msg:'params is error'} 
      }
    }
  }
  async updatePush2({ query,param,rule,pushed},model){
    let res = await this.ctx.model[model].findOne({
      'layout.id':'Ecy5kSR4U8'
    })
    var abc = res.layout.id('5f7f1b005c8bd82860bb68d3').children;
   abc.populate({name:'11',title:'新增',type:0,orderNo:0,resData:[],contentData:[]});

  }

}

module.exports = UpdateService;
