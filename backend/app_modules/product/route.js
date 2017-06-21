var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productRepository = require('./repository');

mongoose.connect('mongodb://localhost/nodeCart_test');


router.get('/', function (req, res) {
    return productRepository.list(req, res)
});

router.post('/', function (req, res) {
    return productRepository.create(req, res)
});




module.exports = router;