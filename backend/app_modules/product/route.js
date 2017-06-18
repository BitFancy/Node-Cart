var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productController = require('../controllers/productContoller');

mongoose.connect('mongodb://localhost/nodeCart_test');


router.get('/', function (req, res) {
    return productController.list(req, res)
});

router.post('/new-product', function (req, res) {
    return productController.create(req, res)
});




module.exports = router;