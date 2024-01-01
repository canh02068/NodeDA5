const homeCtrl = require('../controllers/home.controller')
module.exports = function (app) {
  app.get("/", homeCtrl.home);
  app.get("/aboutus", homeCtrl.aboutus);
  app.get("/contact", homeCtrl.contact);
};
