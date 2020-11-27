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
  router.post('/api/menu/addRoles',jwt, controller.menu.updateManyMenu);
  
  router.post('/api/adminRoles',jwt, controller.adminRoles.addRoles);
  router.get('/api/adminRoles',jwt, controller.adminRoles.getRoles);
  router.delete('/api/adminRoles/:id',jwt, controller.adminRoles.delRoles);
  router.put('/api/adminRoles/:id',jwt, controller.adminRoles.updateRoles);

  router.post('/api/resources',jwt, controller.resources.addRes);
  router.get('/api/resources',jwt, controller.resources.getRes);
  router.delete('/api/resources/:id',jwt, controller.resources.delRes);
  router.post('/api/delManyRes',jwt, controller.resources.delManyRes);
  router.put('/api/resources/:id',jwt, controller.resources.updateRes);

  router.post('/api/contentCategories',jwt, controller.contentCategories.addCate);
  router.get('/api/contentCategories',jwt, controller.contentCategories.getCate);
  router.delete('/api/contentCategories/:id',jwt, controller.contentCategories.delCate);
  router.put('/api/contentCategories/:id',jwt, controller.contentCategories.updateCate);

  router.post('/api/contentTags',jwt, controller.contentTags.addTag);
  router.get('/api/contentTags',jwt, controller.contentTags.getTag);
  router.delete('/api/contentTags/:id',jwt, controller.contentTags.delTag);
  router.put('/api/contentTags/:id',jwt, controller.contentTags.updateTag);

  router.post('/api/content',jwt, controller.content.addContent);
  router.get('/api/content',jwt, controller.content.getContent);
  router.delete('/api/content/:id',jwt, controller.content.delContent);
  router.post('/api/delManyContent',jwt, controller.content.delManyContent);
  router.put('/api/content/:id',jwt, controller.content.updateContent);

  router.post('/api/channel',jwt, controller.channel.addChannel);  
  router.get('/api/channel',jwt, controller.channel.getChannel);
  router.delete('/api/channel/:id',jwt, controller.channel.delChannel);
  router.post('/api/addChannelCate',jwt, controller.channel.addChannelCate);
  router.get('/api/getChannelCate',jwt,controller.channel.getChannelCate);
  router.put('/api/setChannelCate/:id',jwt,controller.channel.setChannelCate);
  router.delete('/api/delChannelCate/:id',jwt, controller.channel.delChannelCate);
  //router.put('/api/addChannelSetting/:id',jwt, controller.channel.addChannelSetting);

  router.get('/api/getChannelRes',jwt, controller.channel.getChannelRes);
  router.get('/api/getChannelContent',jwt, controller.channel.getChannelContent);
  

  router.post('/api/upload',jwt, controller.tools.upload);
};
