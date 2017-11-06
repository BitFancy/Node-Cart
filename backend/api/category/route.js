var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoryRepository = require('./repository');


mongoose.Promise = require('bluebird');


router.get('/category/:key/', function (req, res) {
    return categoryRepository.getCategoryElements(req.params.key)
        .then((elements) => res.json(elements))
        .catch((err) => res.status(400).send(err.name + " : " + err.message))

})

router.get('/categories', function (req, res) {
    return categoryRepository.list()
    .then((elements) => res.json(elements))
});

router.post('/category', function (req, res) {
    return categoryRepository.create(req.body)
        .then((category) => res.json(category))
        .catch((err) => res.status(422).send(err.name + " : " + err.message))
});




module.exports = router;