'use strict';

const Controller = require('egg').Controller;

class ResourcesController extends Controller {
  async addRes() {
    let params = {
      rule : {
        resName:{ type:'string',min:3,max:50 ,required: true}
      },
      param:this.ctx.request.body
    }
    let res = await this.service.create.createOne(params,'Resources');
    this.ctx.body = res;
  };
  async getRes(){
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query);
    if(_query.resName){
      let reg = new RegExp(_query.resName,'i');
      _query.resName = {$regex:reg}
    }    
    let params = {      
      sort:{ created:-1 },
      param:_query,
    }
    let res = await this.service.find.findByPage(params,'Resources');  
    this.ctx.body = res;  
  };
  async delRes(){
    let _paramUrl = this.ctx.params;
    let res = await this.service.delete.delOne({ param:_paramUrl },'Resources');
    this.ctx.body = res;
  };
  async delManyRes(){
    let _paramBody = this.ctx.request.body;
    let _param = { id: { $in : _paramBody.ids } };
    let res = await this.service.delete.delMany({ param:_param},'Resources');
    this.ctx.body = res;
  };
  async updateRes(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'Resources'); 
    this.ctx.body = res;
  }  
}

module.exports = ResourcesController;
