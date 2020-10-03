module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminListSchema = new Schema({
    id:{ type: String, default : shortid.generate,  required:true},
    username: { type: String, unique: true, required:true},
    password: { type: String },
    avatar: { type: String },
    roles:[String],
    introduction:{ type:String },
    type: { type:Number , default: 0},
    status: { type:Number , default: 0},
    loginIp:{ type:String },
    created: {type:Number, default:Date.now },
    loginTime: {type:Number, default:Date.now}
  }, {versionKey: false});
  return mongoose.model('AdminListModel', AdminListSchema, 'adminList');
}