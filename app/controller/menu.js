'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async getMenu() {
    let res = await this.service.find.find({},{},'Menu');
    this.ctx.body = res
  };
  async addMenu() {
    let params = this.ctx.request.body;
    let res = await this.service.create.createOne(params,'Menu');
    this.ctx.body = { "code":20000, data:res, msg:'success'}
  }
  async delMenu(){
    let params = this.ctx.params;
    let res = await this.service.delete.delOne(params,'Menu');
    this.ctx.body = { "code":20000, data:res, msg:'success'}
  }
}

module.exports = MenuController;
