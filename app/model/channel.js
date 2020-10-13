module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ChannelSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    channelName:{ type:String, required: true},
    channelTitle:{ type:String, required: true},
    status:{type:Number, default:0},
    orderNo:{type:Number,default:0},
    channelCateId:{ type:String,default:null}
  },{versionKey: false});  
  return mongoose.model('ChannelModel', ChannelSchema, 'channel');
}