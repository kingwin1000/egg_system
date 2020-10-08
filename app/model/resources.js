module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ResourcesSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    resName:{type:String, required:true},
    resType:{type:Number, default:0},
    resUrl:{type:String},
    resText:{type:String},
    resUrlIds:[{ type: String}],
    resSize:{type:String, default:0},
    status:{type:Number, default:0},
    created: {type:Number, default:Date.now },
  },{versionKey: false})
  return mongoose.model('ResourcesModel', ResourcesSchema, 'resources');
}