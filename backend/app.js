"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const product = require("./api/product/route.js");
const category = require("./api/category/route.js");
const mongoose = require('mongoose');
mongoose.set('debug', true);


//conection with default production db
mongoose.connect('mongodb://localhost/nodeCart_test');


app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', product);
app.use('/', category);


module.exports = app;



