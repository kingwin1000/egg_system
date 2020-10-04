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
  router.post('/api/adminList',jwt, controller.adminList.addAdmin);
  router.get('/api/adminList',jwt, controller.adminList.getAdmin);
  router.delete('/api/adminList/:id',jwt, controller.adminList.delAdmin);
  router.put('/api/adminList/:id',jwt, controller.adminList.updateAdmin);
  
  router.post('/api/menu',jwt, controller.menu.addMenu);
  router.get('/api/menu',jwt, controller.menu.getMenu);
  router.delete('/api/menu/:id',jwt, controller.menu.delMenu);
  router.put('/api/menu/:id',jwt, controller.menu.updateMenu);

  router.post('/api/adminRoles',jwt, controller.adminRoles.addRoles);
  router.get('/api/adminRoles',jwt, controller.adminRoles.getRoles);
  router.delete('/api/adminRoles/:id',jwt, controller.adminRoles.delRoles);
  router.put('/api/adminRoles/:id',jwt, controller.adminRoles.updateRoles);

  router.post('/api/resources',jwt, controller.resources.addRes);
  router.get('/api/resources',jwt, controller.resources.getRes);
  router.delete('/api/resources/:id',jwt, controller.resources.delRes);
  router.post('/api/delManyRes',jwt, controller.resources.delManyRes);
  router.put('/api/resources/:id',jwt, controller.resources.updateRes);
};
