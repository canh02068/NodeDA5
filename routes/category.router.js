const categoryCtrl = require("../controllers/category.controller");
module.exports = function (app) {
  app.get('/danhmuc', categoryCtrl.index);

  app.get('/themdanhmuc', categoryCtrl.creat);
  app.post('/themdanhmuc', categoryCtrl.store);

  app.get('/xoadanhmuc/:id', categoryCtrl.delete);

  app.get('/suadanhmuc/:id', categoryCtrl.edit);
  app.post('/suadanhmuc/:id', categoryCtrl.update);

};
