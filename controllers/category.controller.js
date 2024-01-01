const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Category = require('../models/category.model')

exports.index = async function (req, res) {
    Category.getAll(req, function(err, data){
        res.render('category',{
            title : '<b>Danh sách</b> loại hàng',
            data : data ? data : [],
            totalPage : 5
        });
    })
}

exports.creat = (req, res) => {
    res.render('categoryadd');
}

exports.store = (req, res) => {
    Category.store(req, function(msg, data){
        if (msg) {
            res.render('err', {
                message : msg,
                code : err.errno
            })  
        }
        else {
            res.redirect('/danhmuc');
        }
    })
}

exports.delete = (req, res) => {
    Category.delete(req, function(msg, data){
        if (msg) {
            res.render('err', {
                message : msg,
                code : err.errno
            })  
        }
        else {
            res.redirect('/danhmuc');
        }
    })
       
    }

exports.edit = (req, res) => {
    let id = req.params.id;
    Category.getOne(id, function(err, data) {
        if (err) {
            res.render('err', {
                message : msg,
                code : err.errno
            })
        } else {
            res.render('categoryedit', {
                cat : data
            });
        }
    })
}

exports.update = async (req, res) =>{
    Category.update(req, function(msg, data){
        if (msg) {
            res.render('err', {
                message : msg,
                code : err.errno
            })  
        }
        else {
            res.redirect('/danhmuc');
        }
    })
}