'use strict';

const Controller = require('egg').Controller;

class adminRolesController extends Controller {
  async addRoles() {
    let params = {
      rule : {roleName:{ type:'string',min:3,max:50 ,required: true}},
      param:this.ctx.request.body
    }
    let res = await this.service.create.createOne(params,'AdminRoles');
    this.ctx.body = res;
  }
  async getRoles() {
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query);
    if(_query.roleName){
      let reg = new RegExp(_query.roleName,'i');
      _query.roleName = {$regex:reg}
    }
    let params = {
      param:_query, sort:{ created:-1 } 
    }
    let res = await this.service.find.find(params,'AdminRoles');
    this.ctx.body = res;
  };
  async delRoles(){
    let _paramUrl = this.ctx.params; 
    let res = await this.service.delete.delOne({ param:_paramUrl },'AdminRoles');
    this.ctx.body = res;
  };

  async updateRoles(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'AdminRoles'); 
    this.ctx.body = res;
  }
}

module.exports = adminRolesController;
