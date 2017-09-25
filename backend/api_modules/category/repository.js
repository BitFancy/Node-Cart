"use strict";
var Category = require('./model');
var Product = require('../product/model');

exports.create = function (req, res) {
    var entry = new Category({
        name: req.body.name,
        path: req.body.path,
        key: Math.floor(Math.random() * 90000) + 10000
    });
    entry.save()
        .then(function (entry) {
            res.status(200).send(entry);
        })
        .catch(function (err) {
            res.status(422).send(err.name + " : " + err.message)
        })
};


exports.list = function (req, res) {
    Category.find().sort({path: 1})
        .then(function (result) {
            res.json(result);
        })
};

exports.getCategoryElements = function (req, res) {
    Category.find({key: req.params.cat_key})
        .then(function (category) {
            console.log(category);
            let categoryName = category[0].name;

            let re = new RegExp(category[0].path + categoryName + ",");
            return Category.find({path: re})
        })
        .then(function (subcategories) {
            if (!subcategories || !subcategories.length) {
                return Product.find({cat_key: req.params.cat_key})
            }
            else {
                res.json(subcategories);
            }
        })
        .then(function (products) {
            res.json(products);
        })
}