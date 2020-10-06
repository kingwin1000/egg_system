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
    this.ctx.helper.toDelNull(_query);
    if(_query.title){
      let reg = new RegExp(_query.title,'i');
      _query.title = {$regex:reg}
    }
    
    let params = {      
      sort:{ created:-1 },
      param:_query,
    }
    let res = await this.service.find.findByPage(params,'Content');  
    this.ctx.body = res;  
  };  
}

module.exports = ContentController;
