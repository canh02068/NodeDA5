const categoryCtrl = require("../controllers/api.category.controlller");
module.exports = function (app) {
  app.get('/api/danhmuc', categoryCtrl.index);
  app.post('/api/danhmuc', categoryCtrl.store);
  app.delete('/api/danhmuc/:id', categoryCtrl.delete);
  app.get('/api/danhmuc/:id', categoryCtrl.edit);
  app.post('/api/danhmuc/:id', categoryCtrl.update);

};
