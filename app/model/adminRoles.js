module.exports = app => {
  const shortid = require('shortid');
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AdminRolesSchema = new Schema({
    id:{ type: String, default : shortid.generate,  required:true},
    roleName:{ type: String, required:true, unique: true},
    roleRemark:{type:String,},
    status:{type:Number,default:0 },
    roleMenuIds:[{ type: String}],
    created: {type:Number, default:Date.now },
  } , {versionKey: false});
  return mongoose.model('AdminRolesModel', AdminRolesSchema, 'adminRoles');
}