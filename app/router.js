'use strict';
/**
  * @param {Egg.Application} app - egg application
*/
module.exports = app => {
  const { router, controller ,config} = app;
  const jwt = app.middleware.jwt( config.jwt );
  router.post('/api/login', controller.adminList.login);
  router.get('/api/loginout',controller.adminList.loginout);
  router.get('/api/getInfo',jwt, controller.adminList.getInfo);
	router.get('/api/menu',jwt, controller.menu.getMenu);
};
