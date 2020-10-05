module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ContentSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    title:{ type:String, required: true},
    introduct:{type:String},
    titleImg:{type:String},
    clickNum:{type:Number, default:0},
    likeNum:{type:Number, default:0},
    categories:[String],
    tags:[String],
    status:{type:Number, default:0},
    content:{type:String,required: true},
    updateDate:{type:Number, default:Date.now},
    created: {type:Number, default:Date.now },
  },{versionKey: false});
  return mongoose.model('ContentModel', ContentSchema, 'content');
}