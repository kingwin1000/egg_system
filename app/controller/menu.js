'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async getMenu() {
    let options ={sortNo:1}
    var res = await this.service.find.find({},{},'Menu',options);
    var data = res.data;
    var tree = [];
    data.forEach(item =>{
      if(item.parentId == '0'){
        item.children = getNode(item.id);
        tree.push(item);
      }
    }) 
    function getNode(id){
      const node = [];
      for(const item of data){
        if(item.parentId === id){
          item.children = getNode(item.id);
          node.push(item);
        }  
      }
      if(node.length === 0) return;
      return node
    }
    res.data = tree;
    this.ctx.body = res;
  };
  async addMenu() {
    let params = this.ctx.request.body;
    let res = await this.service.create.createOne(params,'Menu');
    this.ctx.body = { "code":20000, data:res, msg:'success'}
  }
  async delMenu(){
    let params = this.ctx.params;
    
    var res = await this.service.find.findOne({parentId:params.id},{},'Menu');
    if(res.data){
      this.ctx.body = { "code":20001, data:null, msg:'先删除该分类下的子分类！'}
    }else{
      let res = await this.service.delete.delOne(params,'Menu');
      this.ctx.body = { "code":20000, data:res, msg:'success'}
    }
  }
}

module.exports = MenuController;
