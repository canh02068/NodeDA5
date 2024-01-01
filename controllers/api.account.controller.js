const Account = require('../models/account.model');

exports.index = function(req, res){
    Account.GetAll(function(err, data){
        res.send({
            result : data ? data : [],
            message: "",
            code: 200,
        });
    })
}

exports.create = function(req, res){
    Account.store(req.body, function(err, data){
        res.send({
            result : data ? data : [],
            message: "",
            code: 200,
        });
    })
}

exports.getOne = function(req, res){
    Account.getOne(req.params.id, function(err, data){
        res.send({
            result : data ? data : [],
            message: "",
            code: 200,
        });
    })
}

exports.update = function(req, res){
    req.body.id = req.params.id;
    Account.update(req.body, function(err, data){
        res.send({
            result : data ? data : [],
            message: "",
            code: 200,
        });
    })
}

exports.login = function(req, res){
    let bodydata = {
        email: req.body.email,
        password: req.body.matkhauuser
    }
    req.body.id = req.params.id;
    Account.checkLogin(bodydata, function(err, data){
        res.send({
            result : data,
            message: "",
            code: 200,
        });
    })
}