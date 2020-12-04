'use strict';
const Controller = require('egg').Controller;
class ResourcesController extends Controller {
  async addRes() {
    let params = {
      rule : {
        resName:{ type:'string',min:3,max:50 ,required: true}
      },
      param:this.ctx.request.body
    }
    let res = await this.service.create.createOne(params,'Resources');
    this.ctx.body = res;
  };
  async getRes(){
    let _query = this.ctx.query;
    this.ctx.helper.toDelNull(_query);
    if(_query.resName){
      let reg = new RegExp(_query.resName,'i');
      _query.resName = {$regex:reg}
    }
    if(_query.groupId){
      let _ids = await this.service.find.findOne({param:{id:_query.groupId}},'Resources')
      _ids = _ids.data.resIds;
      _query.id =  { $in:_ids}; 
      delete _query.groupId;
    }
    if(_query.groupNum){
      let _ids = await this.service.find.findOne({param:{id:_query.groupNum}},'Resources')
      _ids = _ids.data.resIds;
      _query.id =  { $nin:_ids};        
      _query.resType =  { $nin:3};
      delete _query.groupNum;
    }
    let params = {      
      sort:{ created:-1 },
      param:_query,
    }
    let res = await this.service.find.findByPage(params,'Resources');
    this.ctx.body = res;  
  };
  async delRes(){
    let _paramUrl = this.ctx.params;
    let params = {
      sort:{ created:-1 },
      param:{
        resType:3,
        resIds:{ $elemMatch : {$eq:_paramUrl.id}}
      },
    };
    let res = await this.service.find.find(params,'Resources');
    if(res.data.length > 0){
      res.type = 'list';
      this.ctx.body = res;
    }else{
      let res = await this.service.delete.delOne({ param:_paramUrl },'Resources');
      res.type = 'del';
      this.ctx.body = res;
    }
  };
  async delManyRes(){
    let _paramBody = this.ctx.request.body;
    var _params = {
      query : {resType:3, resIds:{ $in : _paramBody.ids}},
      changed : { $pullAll :{ resIds : _paramBody.ids}}
    }
    await this.service.update.updateMany(_params,'Resources'); 
    let _param = { id: { $in : _paramBody.ids } };
    let res = await this.service.delete.delMany({ param:_param},'Resources');
		this.ctx.body = res;
  };
  async groupRes(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    if(_paramBody.type == 'del'){
      let params = {
        query : { id: _query.id},
        changed : { $pull :{ resIds :_paramBody.id}} 
      }
      let res = await this.service.update.updateMany(params,'Resources');
      this.ctx.body = res;      
    }else if(_paramBody.type == 'add'){
      let params = {
        query : { id: _query.id},
        changed : { $addToSet :{ resIds :_paramBody.id}} 
      }
      let res = await this.service.update.updateMany(params,'Resources');
      this.ctx.body = res;          
    }
  };
  async updateRes(){
    let _query = this.ctx.params; 
    let _paramBody = this.ctx.request.body;
    let params = {
      query:_query,
      changed:_paramBody
    };
    let res = await this.service.update.updateOne(params,'Resources'); 
    this.ctx.body = res;
  }  
}

module.exports = ResourcesController;
