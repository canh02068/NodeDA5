const ketnoi = require("../connect-mysql");
const util = require("node:util");
const query = util.promisify(ketnoi.query).bind(ketnoi);
const Account = function () {};

Account.GetAll = function(myFun){
    let sql = "SECLECT * FROM user Order By userid ASC";
    ketnoi.query(sql, (err, result) => {
        myFun(err, result);
    })
}

Account.getOne = function(id, myFun){
    let sql = "SECLECT * FROM user WHERE userid = ?";
    ketnoi.query(sql, [userid], (err, result) => {
        let data = result.length >0 ? result[0] : "";
        myFun(err, data);
    })
}

Account.store = function (body, myFun) {
    let sql = "INSERT INTO user SET ?";
    ketnoi.query(sql, body, (err, data) => {
        body.userid = data.InsertId;
        myFun(err, data);
    });
}

Account.update =  function (body, myFun) {
    let sql = "UPDATE user SET ? WHERE userid = ?";
    ketnoi.query(sql, [body, body.userid], async (err, data) => {
        let accc = await query("SELECT * FROM user WHERE userid = ? ", [userid]);
        let data1 = accc.length >0 ? accc[0] : "";
        myFun(err, data1);
    });
}

Account.delete = async function(id, myFun){
    let accc = await query("SELECT * FROM user WHERE userid = ? ", [userid]);
    let sql = "SECLECT * FROM account WHERE userid = ?";
    ketnoi.query(sql, [userid], (err, result) => {
        let data = accc.length >0 ? accc[0] : "";
        myFun(err, data);
    })
}

Account.checkLogin = function(body, myFun){
    let sql = "SECLECT * FROM account WHERE email = ? and matkhauuser = ?";
    ketnoi.query(sql, [body.email, body.matkhauuser], (err, result) => {
        let data = result.length >0 ? result[0] : "";
        myFun(err, data);
    })
}
module.exports = Account;