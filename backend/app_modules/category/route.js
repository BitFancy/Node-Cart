var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoryRepository = require('./repository');

mongoose.connect('mongodb://localhost/nodeCart_test');


router.get('/category', function (req, res) {
    return categoryRepository.list(req, res)
});

router.post('/category', function (req, res) {
    return categoryRepository.create(req, res)
});




module.exports = router;