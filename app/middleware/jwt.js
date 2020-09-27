module.exports = (options, app) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    if(token){
      try {
        let decode = ctx.app.jwt.verify(token, options.secret);       
        await next();
      }catch(error){
        ctx.body = {code:'401',message: 'token is err'};
        return;
      }
    }else{
      ctx.body = {code:'401',message: 'no token'};
      return;
    }
  } 
};