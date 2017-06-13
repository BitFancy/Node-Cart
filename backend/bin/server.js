const express = require('express');
const morgan = require('morgan');
const app = express();
const category = require("../category/route.js");
app.use(morgan('tiny'));

app.use('/category', category);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});