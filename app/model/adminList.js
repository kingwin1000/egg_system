module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminListSchema = new Schema({
    id:{ type: String, default : shortid.generate, required:true},
    username: { type: String , unique:true },
    avatar: { type: String },
    roles:{ type:Array },
    introduction:{ type:String },
    type: { type:Number , default: 0},
    password: { type: String },
    loginIp:{ type:String },
    loginTime: {type: Date }
  });
  return mongoose.model('AdminListModel', AdminListSchema, 'adminList');
}