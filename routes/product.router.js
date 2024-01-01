const productCtrl = require("../controllers/product.controller");
const upload = require("../upload-multer");
module.exports = function (app) {
  app.get('/sanpham', productCtrl.index);

  app.get('/themsanpham', productCtrl.creat);
  app.post('/themsanpham', upload.single('anhsanpham'), productCtrl.store);

  app.get('/xoasanpham/:id', productCtrl.delete);

  app.get('/suasanpham/:id', productCtrl.edit);
  app.post('/suasanpham/:id',upload.single('anhsanpham'), productCtrl.update);

};
