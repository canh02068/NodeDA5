const ketnoi = require("../connect-mysql");
const util = require("node:util");
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Category = function () {};

Category.getAll = function (req, callback) {
  let sql = "SELECT * FROM loaihang ORDER BY loaihangid ASC";
  let _name = req.query.tenlh;

  if (_name) {
    sql += " WHERE tenlh LIKE '%" + _name + "%'";
  }

  ketnoi.query(sql, function (err, data) {
    callback(err, data);
  });
};

Category.dataComboBox = function(myFun){
  ketnoi.query("SELECT loaihangid, tenlh FROM loaihang ODER BY tenlh ASC", (err, data) => {
      myFun(err, data);
  })
}

Category.delete = function (req, myFun) {
  let id = req.params.id;
  let sql_delete = "DELETE FROM loaihang WHERE loaihangid = ?";

  ketnoi.query(sql_delete, [id], function (err, data) {
    if (err) {
      let msg = "";

      if (err.errno == 1451) {
        msg = "Loại hàng đang có sản phẩm, không thể xoá";
      } else if (err.errno == 1062) {
        msg = " Tên danh mục này bị trùng";
      } else {
        msg = "Đã có lỗi, vui lòng thử lại";
      }

      myFun(msg, null);
    } else {
      myFun(false, data);
    }
  });
};


Category.store = function (req, myFun) {
  let sql = "INSERT INTO loaihang SET ?";
  ketnoi.query(sql, req.body, (err, data) => {
    if (err) {
      let msg = "";

      if (err.errno == 1451) {
        msg = "Loại hàng đang có sản phẩm, không thể xoá";
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

Category.getOne = function (id, myFun) {
  ketnoi.query(
    "SELECT * FROM loaihang WHERE loaihangid = ?",
    [id],
    (err, data) => {
      if (data.length) {
        myFun(false, data[0]);
      } else {
        myFun({ msg: "Không tìm thấy dữ liệu" }, null);
      }
    }
  );
};

Category.update = function (req, myFun) {
  let id = req.params.id;
  let sql = "UPDATE loaihang SET tenlh = ? WHERE loaihangid = ?";

  ketnoi.query(sql, [req.body.tenlh, id], (err, data) => {
    if (err) {
      let msg = "";

      if (err.errno == 1451) {
        msg = "Loại hàng đang có sản phẩm, không thể xoá";
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

module.exports = Category;
