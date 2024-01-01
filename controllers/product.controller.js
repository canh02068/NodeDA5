const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = require('../models/product.model')
const Category = require('../models/category.model')

exports.index = async function (req, res) {
    Product.getAll(req, function(err, data){
        res.render('product',{
            title : '<b>Danh sách</b> sản phẩm',
            data : data ? data : [],
            totalPage : 5
        });
    })
}

exports.creat = (req, res) => {
    Category.dataComboBox(function(err, cats){
            res.render('productadd', {
                cats: cats ? cats : []
        });
    })
}

exports.store = (req, res) => {
    let bodyData = req.body;
    bodyData.image = req.file.filename;
    Product.store(bodyData, function(err, data) {
        if (err) {
          res.render('err', {
            message: 'Đã có lỗi, vui lòng thử lại', // Thông điệp mặc định nếu không phải lỗi cụ thể
            code: err.errno
          });
        } else {
          res.redirect('/sanpham');
        }
      });
}

exports.delete = (req, res) => {
    Product.delete(req, function(msg, data){
        if (msg) {
            res.render('err', {
                message : msg,
                code : err.errno
            })  
        }
        else {
            res.redirect('/sanpham');
        }
    })
       
    }

exports.edit = (req, res) => {
    let id = req.params.id;
    Product.getOne(id, function(err, data) {
        if (err) {
            res.render('err', {
                message : msg,
                code : err.errno
            })
        } else {
            res.render('productedit', {
                sp : data
            });
        }
    })
}

exports.update = async (req, res) =>{
    console.log(req.body);
    Product.update(req, function(err, data){
        if (err) {
            res.render('err', {
              message: 'Đã có lỗi, vui lòng thử lại', // Thông điệp mặc định nếu không phải lỗi cụ thể
              code: err.errno
            });
          } else {
            res.redirect('/sanpham');
          }
    })
}
