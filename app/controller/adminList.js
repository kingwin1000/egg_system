'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    let params = {
      param : this.ctx.request.body,
      rule : {username:{type:'string',min:5}, password:{type:'password'}}
    }
    let res = await this.service.find.findOne(params,'AdminList');
    if(res.data){
      let token = this.app.jwt.sign(params.param, this.app.config.jwt.secret);
      this.ctx.body = { code:20000, data:{token:token}, msg:'success'};
    }else{
      this.ctx.body = { code:20001, msg:'用户名或密码错误!'};
    }
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
    let res = await this.service.find.findOne(params,'AdminList');
    this.ctx.body = res
  };
  async adminList(){
    
  }
}

module.exports = AdminController;
