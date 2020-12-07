'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class ToolsController extends Controller {
  async upload() {
    let stream = await this.ctx.getFileStream();
    let filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
    let target = path.join(this.config.baseDir,'/app/public/resources', filename);
    let writeStream = fs.createWriteStream(target);
    try{
      await pump(stream, writeStream);
      this.ctx.body = {code:20000, data:'/public/resources/' + filename, msg:'success'};
    }catch(err){
      this.ctx.body = {code:20001, data:null,  msg:'upload is err'}
    }
  }
}

module.exports = ToolsController;
