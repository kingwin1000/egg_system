'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async addTag() {
    let params = {
      rule : {
        tagName:{ type:'string',min:3,max:50,required: true}, 
      },
      param:this.ctx.request.body
    }
    let res = await this.service.create.createOne(params,'ContentTags');
    this.ctx.body = res;
  }
  async getTag() {
    let params = {
      sort:{ orderNo:1 }, 
      lean:{lean:true}
    }
    let res = await this.service.find.find(params,'ContentTags');
    this.ctx.body = res;
  };
  async delTag(){
    let _paramUrl = this.ctx.params; 
    let res = await this.service.delete.delOne({ param:_paramUrl },'ContentTags');
    this.ctx.body = res;
  };
  async updateTag(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'ContentTags'); 
    this.ctx.body = res;
  };
  /**
  async updateManyMenu(){
    let _paramBody = this.ctx.request.body;
    var params = {
      query : { id: { $in : _paramBody.checkedKeys } },
      changed : { $addToSet :{ roles :_paramBody.roleId}} 
    }
    let res = await this.service.update.updateMany(params,'Menu'); 
    this.ctx.body = {code:20000, data:res, msg:'success'}
  }
* */
}

module.exports = MenuController;
