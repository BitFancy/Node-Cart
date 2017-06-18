const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const product = require("../app_modules/product/route.js");


app.use(morgan('tiny'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/product', product);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});