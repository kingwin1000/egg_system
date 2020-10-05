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
    
    console.log('=======>',res);
    
    this.ctx.body = res;  
  }
}

module.exports = ContentController;
