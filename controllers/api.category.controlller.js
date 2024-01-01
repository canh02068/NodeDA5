const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Category = require('../models/category.model')

exports.index = async function (req, res) {

    Category.getAll(req, function(err, data){
        res.send({
            result : data ? data : [],
            message: "",
            code: 200,
            totalPage : 5
        });
    })
}


exports.store = (req, res) => {
    Category.store(req, function(msg, data){
        if (msg) {
            res.send({
                result: "",
                message : msg,
                code : err.errno
            })  
        }
        else {
            req.body.id = data.InsertId;
            res.send({
                result: req.body,
                message : 'Thêm mới Thành Công',
                code : 200
            });
        }
    })
}

exports.delete = (req, res) => {
    let id = req.params.id;
    Category.getOne(id, function(err, data) {
        if (err) {
            res.send({
                result: "",
                message : msg,
                code : 200
            })
        } else {
            Category.delete(req, function(msg, data){
                if (msg) {
                    res.send({
                        result: "",
                        message : msg,
                        code : err.errno
                    });
                }
                else {
                    res.send({
                        result: data,
                        message : 'Xóa Thành Công',
                        code : 200
                    });
                }
            })
        }
    })
}

exports.edit = (req, res) => {
    let id = req.params.id;
    Category.getOne(id, function(err, data) {
        if (err) {
            res.send({
                result: "",
                message : msg,
                code : 200
            })
        } else {
            res.send({
                result: data,
                message : "",
                code : 200
            });
        }
    })
}

exports.update = async (req, res) =>{
    Category.getOne(req.params.id, function(err, data) {
        if (err) {
            res.send({
                result: "",
                message : msg,
                code : 200
            })
        } else {
            Category.update(req, function(msg, data){
                if (msg) {
                    res.send( {
                        result: "",
                        message : msg,
                        code : err.errno
                    })  
                }
                else {
                    req.body.id = req.params.id;
                    res.send({
                        result: req.body,
                        message : 'Cập Nhật Thành Công',
                        code : 200
                    });
                }
            })
        }
    })
    
}