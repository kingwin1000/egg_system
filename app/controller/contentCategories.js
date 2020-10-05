'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async addCate() {
    let params = {
      rule : {
        cateName:{ type:'string',min:3,max:50,required: true}, 
      },
      param:this.ctx.request.body
    }
    let res = await this.service.create.createOne(params,'ContentCategories');
    this.ctx.body = res;
  }
  async getCate() {
    let params = {
      sort:{ orderNo:1 }, 
      lean:{lean:true}
    }
    let res = await this.service.find.find(params,'ContentCategories');
    let data = this.ctx.helper.toTree(res.data);
    res.data = data;
    this.ctx.body = res;
  };
  async delCate(){
    let _paramUrl = this.ctx.params; 
    var res = await this.service.find.findOne( { param:{parentId:_paramUrl.id} } ,'ContentCategories');
    if(res.data){
      this.ctx.body = { code:20001, data:null, msg:'先删除该分类下的子分类！'}
    }else{
      let res = await this.service.delete.delOne({ param:_paramUrl },'ContentCategories');
      this.ctx.body = res;
    }
  };
  async updateCate(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'ContentCategories'); 
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
