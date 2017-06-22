var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productRepository = require('./repository');

mongoose.connect('mongodb://localhost/nodeCart_test');
mongoose.set('debug', true);


router.get('/product', function (req, res) {
    return productRepository.listAll(req, res)
});

router.get('/category/:category/product', function (req, res) {
    return productRepository.listAllProductsFromCategory(req, res)
});

router.post('/product', function (req, res) {
    return productRepository.create(req, res)
});




module.exports = router;