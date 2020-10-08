'use strict';
const Controller = require('egg').Controller;
class ChannelController extends Controller {
  async addChannel() {
    let params = {
      rule : {
        channelName:{ type:'string',min:3,max:50 ,required: true},
        channelTitle:{type:'string',required: true}
      },
      param:this.ctx.request.body
    } 
    let res = await this.service.create.createOne(params,'Channel');
    this.ctx.body = res;      
  };
  async getChannel(){
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query);
    if(_query.channelTitle){
      let reg = new RegExp(_query.channelTitle,'i'); 
      _query.channelTitle = {$regex:reg}
    };
    let params = {      
      sort:{ orderNo:1 },
      param:_query,
    }
    let res = await this.service.find.findByPage(params,'Channel');  
    this.ctx.body = res;
  };
  async delChannel(){
    let _paramUrl = this.ctx.params;
    let res = await this.service.delete.delOne({ param:_paramUrl },'Channel');
    this.ctx.body = res;    
  };  
  async addChannelChild(){
    let params = {
      rule : {
        name:{ type:'string',min:3,max:50 ,required: true},
        title:{type:'string',required: true}
      },
      query:this.ctx.params,
      param:this.ctx.request.body,
      pushed:{ $push: { layout : this.ctx.request.body}},
    }
    let res = await this.service.update.updatePush(params,'Channel');
    this.ctx.body = res;
  };
  async addChannelSetting(){
    let params = {
      query:this.ctx.params,
      param:this.ctx.request.body,
      pushed:{ $push: { layout : this.ctx.request.body}},
    }    
  }
}

module.exports = ChannelController;
