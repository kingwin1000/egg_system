'use strict';

const Controller = require('egg').Controller;
const CryptoJS = require("crypto-js");
class AdminController extends Controller {
  async login() {
    let params = {
      param : this.ctx.request.body,
      rule : {username:{type:'string',min:5}, password:{type:'password'}}
    }
    params.param.password = CryptoJS.MD5(params.param.password+this.app.config.keys).toString();
    let res = await this.service.find.findOne(params,'AdminList');
    if(res.data){
      let _userId = res.data.id;
      let ipParams = {query:{id:_userId},changed:{loginIp:this.ctx.request.ip}};      
      let ip = await this.service.update.updateOne(ipParams,'AdminList'); 
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
    if(res.code == 20000){
      this.ctx.body =  { code:20000, data:{roles:res.data.roles}, msg:'success'};
    }else{
      this.ctx.body =  { code:20000, data:{roles:[]}, msg:'success'};
    }
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
    params.param.password = CryptoJS.MD5(params.param.password+this.app.config.keys).toString();
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
    if(params.changed.password){
      params.changed.password = CryptoJS.MD5(params.changed.password+this.app.config.keys).toString();
    }else{
      delete params.changed.password;
    }
    let res = await this.service.update.updateOne(params,'AdminList'); 
    this.ctx.body = res;
  }


}

module.exports = AdminController;
