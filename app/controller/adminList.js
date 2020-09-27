'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    let params = this.ctx.request.body;
    //let token = this.app.jwt.sign({ username: params.username }, this.app.config.jwt.secret);
    let token = this.app.jwt.sign(params, this.app.config.jwt.secret);
    if(token){
      this.ctx.body = { code:20000,data:{username:params.username,token:token},msg:'success'};
    }else{
      this.ctx.body = { code:20001,msg:'token is error'};
    }
  };
  
  async adminList(){
    
  }
}

module.exports = AdminController;
