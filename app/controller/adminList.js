'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    let params = {
      param : this.ctx.request.body,
      rule : {username:{type:'string',min:5}, password:{type:'password'}}
    }
    let res = await this.service.find.findOne(params,'AdminList');


    //if(res.data){
      let token = this.app.jwt.sign(params.param, this.app.config.jwt.secret);
      this.ctx.body = { code:20000, data:{token:token}, msg:'success'};
    //}else{
    //  this.ctx.body = { code:20001, msg:'用户名或密码错误!'};
    //}
  };
  async loginout() {
   this.ctx.state.adminInfo = null;
    this.ctx.body = { code:20000, msg:'success'};
  };
  async getInfo(){
    let params = {
      param : this.ctx.state.adminInfo,
      rule : {username:{type:'string',min:5}, password:{type:'password'}}
    }
    //let res = await this.service.find.findOne(params,'AdminList');
    this.ctx.body =  { code:20000, data:{roles:'403'}, msg:'success'};
  };

  async addAdmin() {
    let params = {
      rule : {
        username:{ type:'string',min:3,max:50 ,required: true},
        password:{ type:'password',required: true},
        roles:{ type: 'array', required: true}
      },
      param:this.ctx.request.body
    }
    let res = await this.service.create.createOne(params,'AdminList');
    this.ctx.body = res;
  };

  async getAdmin() {
    let _query = this.ctx.query;
    if (_query.username) {
      let reg = new RegExp(_query.username,'i');
      _query.username = {$regex:reg}
    }
    this.ctx.helper.toDelNull(_query);
    let params = {
      sort:{ created:-1 },
      param:_query,
    }
    let res = await this.service.find.find(params,'AdminList');
    this.ctx.body = res;
  };

  async delAdmin(){
    let _paramUrl = this.ctx.params; 
    let res = await this.service.delete.delOne({ param:_paramUrl },'AdminList');
    this.ctx.body = res;
  };

  async updateAdmin(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'AdminList'); 
    this.ctx.body = res;
  }


}

module.exports = AdminController;
