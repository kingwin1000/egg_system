module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const resSchema = new Schema({
    _id:false,
    id:{type: String, required:true},
    resType:{type:Number, required:true},
    resName:{type:String},
    resText:{type:String},
    resUrl:{type:String},
  })
  const contentSchema = new Schema({
    _id:false,
    id:{type: String, required:true},
    title:{ type:String},
    introduct:{type:String},
    titleImg:{type:String},
    clickNum:{type:Number, default:0},
    likeNum:{type:Number, default:0},
    created:{type:Number}
  })
  const LayoutSchema = new Schema({
    _id:false,
    id:{type: String,  default : shortid.generate, required:true},
    type:{ type:Number, required: true, default:0},
    name:{ type:String, required: true},
    title:{ type:String, required: true},
    orderNo:{ type:Number, default:0},
    resData:[resSchema],
    contentData:[contentSchema],
    children:[{
      id:{type: String, default : shortid.generate, required:true},
      type:{ type:Number, required: true, default:0},
      name:{ type:String, required: true},
      title:{ type:String, required: true},
      orderNo:{ type:Number, default:0},
      resData:[resSchema],
      contentData:[contentSchema],      
    }]
  },{versionKey: false})

  const ChannelSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    channelName:{ type:String, required: true},
    channelTitle:{ type:String, required: true},
    status:{type:Number, default:0},
    orderNo:{type:Number,default:0},
    layout:[LayoutSchema]
  },{versionKey: false});  
  return mongoose.model('ChannelModel', ChannelSchema, 'channel');
}