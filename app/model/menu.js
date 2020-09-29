module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const MenuSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    menuName:{ type:String, required: true,min: [6, 'Too few eggs'],max: 12},
    menuTitle:{ type:String, required: true,min: [6, 'Too few eggs'],max: 12},
    sortNo:{type:Number,max:100,default:0},
    hidden:{type:Boolean,default:false},
    idPath:[String]
  },{versionKey: false});
  return mongoose.model('MenuModel', MenuSchema, 'menu');
}