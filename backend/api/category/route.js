var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoryRepository = require('./repository');


mongoose.Promise = require('bluebird');


router.get('/category/:cat_key/', function (req, res) {
    return categoryRepository.getCategoryElements(req,res)
})

router.get('/categories', function (req, res) {
    return categoryRepository.list(req, res)
});

router.post('/category', function (req, res) {
    return categoryRepository.create(req, res)
});




module.exports = router;