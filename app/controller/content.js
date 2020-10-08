'use strict';

const Controller = require('egg').Controller;

class ContentController extends Controller {
  async addContent() {
    let params = {
      rule : {
        title:{ type:'string',min:3,max:50 ,required: true},
        categories:{type: 'array',required: true},
        content:{ type:'string',min:3, required: true}
      },
      param:this.ctx.request.body
    } 
    let res = await this.service.create.createOne(params,'Content');
    this.ctx.body = res;  
  };
  async getContent(){
    let _query = this.ctx.query;
    let _queryArr = this.ctx.queries;
    this.ctx.helper.toDelNull(_query);
    if(_query.title){
      let reg = new RegExp(_query.title,'i'); _query.title = {$regex:reg}
    };
    if(_queryArr.categories && _queryArr.categories.length > 0){
      delete _query['categories[]'];
      _query.categories = _queryArr.categories;
    };
    let params = {      
      sort:{ created:-1 },
      param:_query,
    }
    let res = await this.service.find.findByPage(params,'Content');  
    this.ctx.body = res;  
  };
  async delContent(){
    let _paramUrl = this.ctx.params;
    let res = await this.service.delete.delOne({ param:_paramUrl },'Content');
    this.ctx.body = res;    
  };
  async delManyContent(){
    let _paramBody = this.ctx.request.body;
    let _param = { id: { $in : _paramBody.ids } };
    let res = await this.service.delete.delMany({ param:_param},'Content');
    this.ctx.body = res;    
  };
  async updateContent(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'Content'); 
    this.ctx.body = res;    
  }
  
}

module.exports = ContentController;
