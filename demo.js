module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const DemoSchema = new Schema({
      uid: {
          type: String,
          // 创建唯一索引
          unique: true
      },
      username: {
          type: String,
          // 创建唯一索引
          unique: true
      },
      password: {
          type: String
      },
      email: {
          type: String,
          // 创建唯一索引
          unique: true
      },
      secret: {
          type: String
      },
      createTime: {
          type: Date
      }
  });
  return mongoose.model('DemoModel', DemoSchema, 'demo');
}