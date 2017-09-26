var express = require('express');
var router = express.Router();
var productRepository = require('./repository');

router.get('/product', function (req, res) {
    return productRepository.listAll(req, res)
});


router.post('/product', function (req, res) {
    return productRepository.create(req, res)
});

module.exports = router;