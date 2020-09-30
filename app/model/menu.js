module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MenuSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    menuName:{ type:String, required: true},
    menuTitle:{ type:String, required: true},
    orderNo:{type:Number,default:0},
    hidden:{type:Boolean,default:false},
    parentId: { type: String },
    roles:[{ type: String}],
    pathIds:[{ type: String}],
  },{versionKey: false});
  return mongoose.model('MenuModel', MenuSchema, 'menu');
}