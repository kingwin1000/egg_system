module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ContentSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    title:{ type:String, required: true},
    introduct:{type:String},
    introductImg:{type:String},
    clickNum:{type:Number, default:0},
    likeNum:{type:Number, default:0},
    categories:[String],
    tags:[String],
    status:{type:Number, default:0},
    orderNo:{type:Number,default:0},
    content:{type:String,required: true}
  },{versionKey: false});
  return mongoose.model('ContentModel', ContentSchema, 'content');
}