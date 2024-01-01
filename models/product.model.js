const ketnoi = require("../connect-mysql");
const util = require("node:util");
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Product = function () {};
Product.getAll = function (req, callback) {
  // let sql = "SELECT s.*, l.tenlh as ltenloai FROM sanpham s JOIN loaihang l ON s.loaihangid = l.loaihangid  ORDER BY sanphamid ASC";
  let sql = "SELECT s.*, l.tenlh as ltenlh, ncc.tenncc as tennhacungcap " +
          "FROM sanpham s " +
          "JOIN loaihang l ON s.loaihangid = l.loaihangid " +
          "JOIN nhacungcap ncc ON s.nhaccid = ncc.nhaccid " +
          "ORDER BY sanphamid ASC";
        //   connection.query(sql, function (err, results) {
        //     if (err) {
        //         console.error(err);
        //         callback(err, null); // Gọi callback với lỗi
        //     } else {
        //         callback(null, results); // Gọi callback với dữ liệu
        //     }
        // });
  // let sql = "SELECT p.*, c.name as cname FROM sanpham p JOIN loaihang c ON p.loaihangid = c.loaihangid";
  let _name = req.query.tenlh;
  if (_name) {
    sql += " WHERE tenlh LIKE '%" + _name + "%'";
  }

  ketnoi.query(sql, function (err, data) {
    callback(err, data);
  });
};

Product.delete = function (req, myFun) {
  let id = req.params.id;
  let sql_delete = "DELETE FROM sanpham WHERE sanphamid = ?";
  ketnoi.query(sql_delete, [id], function (err, data) {
    if (err) {
      let msg = "";

      if (err.errno == 1451) {
        msg = "Có lỗi";
      } else if (err.errno == 1062) {
        msg = " Sản phẩm đã tồn tại";
      } else {
        msg = "Đã có lỗi, vui lòng thử lại";
      }
      myFun(msg, null);
    } else {
      myFun(false, data);
    }
  });
};

Product.store = function (req, myFun) {
  let sql = "INSERT INTO sanpham SET ?";
  ketnoi.query(sql, [req.body], (err, data) => {
    if (err) {
      let msg = "";

      if (err.errno == 1451) {
        msg = "Loại hàng đnag có sản phẩm, không thể xoá";
      } else if (err.errno == 1062) {
        msg = " Tên danh mục này đã tồn tại";
      } else {
        msg = "Đã có lỗi, vui lòng thử lại";
      }

      myFun(msg, null);
      } else {
         myFun(false, data);
      }
    });
};

Product.getOne = function(id, myFun) {
    ketnoi.query("SELECT * FROM sanpham WHERE sanphamid = ?",[id], (err, data) => {
        if (data.length){
            myFun(false, data[0])
        } else {
            myFun({msg : 'Không tìm thấy dũ liệu'}, null)
            }
    }) 
}

Product.update = function (req, myFun) {
  let id = req.params.id;
  if (req.file || req.file != undefined) {
    req.body.image = req.file.filename;
  }

  let sql = "UPDATE sanpham SET tensanpham = ? WHERE sanphamid = ?";

  ketnoi.query(sql, [req.body.tensanpham, id], (err, data) => {
    if (err) {
      let msg = "";

      if (err.errno == 1451) {
        msg = "Loại hàng đang có sản phẩm, không thể xoá";
      } else if (err.errno == 1062) {
        msg = " Tên danh mục này đã tồn tại";
      } else {
        msg = "Đã có lỗi, vui lòng thử lại";
      }

      myFun({msg, errno: err.errno}, null);
    } else {
      myFun(false, data);
    }
  });
};

module.exports = Product;
