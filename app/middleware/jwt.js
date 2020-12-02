module.exports = (options, app) => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header['x-token'];
    if(token){
      try {
        let decode = ctx.app.jwt.verify(token, options.secret); 
        ctx.state.adminInfo = { username:decode.username, password:decode.password }
        await next();
      }catch(error){
        ctx.body = {code:'401',message: 'system is err'};
        return;
      }
    }else{
      ctx.body = {code:'401',message: 'no token'};
      return;
    }
  } 
};