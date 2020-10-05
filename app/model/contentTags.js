module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ContentTagsSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    tagName:{ type:String, required: true},
    orderNo:{type:Number,default:0},
    hidden:{type:Boolean,default:false}
  },{versionKey: false});
  return mongoose.model('ContentTagsModel', ContentTagsSchema, 'contentTags');
}