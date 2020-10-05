module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ContentCategoriesSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    cateName:{ type:String, required: true},
    orderNo:{type:Number,default:0},
    hidden:{type:Boolean,default:false},
    parentId: { type: String },
    pathIds:[{ type: String}],
  },{versionKey: false});
  return mongoose.model('ContentCategoriesModel', ContentCategoriesSchema, 'contentCategories');
}