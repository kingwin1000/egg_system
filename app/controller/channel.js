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
  async addChannelCate(){
    let params = {
      rule : {
        name:{ type:'string',min:3,max:50 ,required: true}
      },
      param:this.ctx.request.body,
    }
    let res = await this.service.create.createOne(params,'ChannelCategory');
    this.ctx.body = res;
  };
  async getChannelCate(){
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query);
    let params = {
      sort:{ orderNo:1 }, 
      lean:{lean:true},
      param:_query
    } 
    let res = await this.service.find.find(params,'ChannelCategory');
    let data = this.ctx.helper.toTree(res.data);
    res.data = data;
    this.ctx.body = res;    
  };  
  async delChannelCate(){
    let _paramUrl = this.ctx.params;
    let res = await this.service.delete.delOne({ param:_paramUrl },'ChannelCategory');
    this.ctx.body = res; 
  };
  async getChannelRes(){
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query);
    if(_query.resName){
      let reg = new RegExp(_query.resName,'i');
      _query.resName = {$regex:reg}
    }
    if(_query.channelCateId){
      let res = await this.service.find.findOne({param:{id:_query.channelCateId}},'ChannelCategory');
      _query.orderData = res.data.resData;
    }
    let params = {      
      sort:{ created:-1 },
      param:_query,
    }
    let res = await this.service.find.findByIndex(params,'Resources');  
    this.ctx.body = res;  
  };
  async getChannelContent(){
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query); 
    if(_query.title){
      let reg = new RegExp(_query.title,'i');
      _query.title = {$regex:reg}
    }       
    if(_query.channelCateId){
      let res = await this.service.find.findOne({param:{id:_query.channelCateId}},'ChannelCategory');
      _query.orderData = res.data.contentData;
    }
    let params = {      
      sort:{ created:-1 },
      param:_query,
    }        
    let res = await this.service.find.findByIndex(params,'Content');  
    this.ctx.body = res;

  };
  async setChannelCate(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'ChannelCategory'); 
    this.ctx.body = res; 
  }
}

module.exports = ChannelController;
