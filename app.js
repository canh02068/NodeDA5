const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors =require('cors');
// app.use(cors);
app.use(bodyParser.urlencoded({
    extended : false
}));

app.set('view engine', 'ejs');
const PORT = process.env.PORT || 5000;


const homeCtrl = require('./controllers/home.controller')
app.use(express.static('public'));
app.use(bodyParser.json());

require('./routes/home.router')(app);
require('./routes/category.router')(app);
require('./routes/product.router')(app);

// app.get('/hihi',(res, req)=>{
//     res.json("skjdfhkjshd")
// })
require('./routes/api.product.router')(app);
require('./routes/api.category.router')(app);
require('./routes/api.account.router')(app);


app.listen(PORT, function(error) {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log('Server is running on http://localhost:' + 5000);
    }
});