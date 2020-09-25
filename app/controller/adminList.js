'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    let _params = {};
    let _rule = {};
    let _res = await this.service.find.findOne(_params,_rule,'AdminList'); 
    console.log('1111',_res);
    this.ctx.body = '11111'
  };
  async adminList(){
    
  }
}

module.exports = AdminController;
