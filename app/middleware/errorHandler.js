module.exports = () => {
  return async function errorHandler (ctx, next){
    try {
      await next();
      if(ctx.status === 404){
        ctx.body = { code:404, data:null, msg:'appurl is error'};
      }
    } catch (err){
      status = err.status;
      console.log('error',err)
      if(status === 500){
        ctx.body = { code:500, data:null, msg:'system is error'};
      }else if(status === 400){
        ctx.body = { code:400, data:null, msg:'upload is error'};
      }else if(status === 422){
        ctx.body = { code:422, data:null, msg:'params is error'};
      }
    }
  }
}