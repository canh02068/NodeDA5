const accountCtrl = require('../controllers/api.account.controller');
module.exports = function(app){
    app.get('/api/user', accountCtrl.index);
    app.post('/api/user', accountCtrl.create);
    app.get('/api/user/:id', accountCtrl.getOne);
    app.put('/api/user/:id', accountCtrl.update);
    app.post('/api/user/login', accountCtrl.login);
}