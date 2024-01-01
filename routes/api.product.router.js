const ketnoi = require('../connect-mysql');
const { array } = require('../upload-multer');
module.exports = function(app) {
    app.get('/api/sanpham', (req, res) => {
        let _limit = req.query.limit;
        _limit = _limit != undefined ? _limit :4;
        let sql = "SELECT * FROM sanpham Order By sanphamid DESC LIMIT 4";
        ketnoi.query(sql, (err, data) => {
            let result = [];
            data.forEach(prod => {
                prod.anhsanpham = 'http://localhost:5000/upload-multer/' + prod.anhsanpham,
                result.push(prod)
            });
            res.send({
                result: data,
                code: 200,
                message: ""
            })
        })
    }); 
}