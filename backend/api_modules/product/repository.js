"use strict";
var Product = require('./model');

exports.create = function (req, res) {
    var entry = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        cat_key: req.body.cat_key
    });

    entry.save()
        .then(function (entry) {
            res.status(200).send(entry)
        })
        .catch(function (err) {
            res.status(422).send(err.name)
        })
};


exports.listAll = function (req, res) {
    Product.find()
        .then(function (products) {
            res.json(products);
        })
};


exports.listAllProductsFromCategory = function (req, res) {
    return Product.find({cat_key: 35950})
        .then(function (result) {
           res.json(result);
        })
        .catch(function (err) {
            console.log(err);
        });
};