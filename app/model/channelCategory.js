module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ChannelCategorySchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    name:{ type:String, required: true},
    type:{ type:Number, required: 0},
    channelId:{ type:String, required: true},
    orderNo:{ type:Number, default:0},
    resData:[{ type: String}],
    contentData:[{ type: String}],
    parentId:{ type: String, default:0},
  },{versionKey: false});  
  return mongoose.model('ChannelCategory', ChannelCategorySchema, 'channelCategory');
}