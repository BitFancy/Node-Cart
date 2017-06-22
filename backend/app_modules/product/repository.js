"use strict";
var Product = require('./model');

exports.create = function (req, res) {
    var entry = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        path : req.body.path
    });

    entry.save(function (err, entry) {
        if (err) {
            console.log(err);
            res.status(422).send(err.name)
        }
        else {
            res.status(200).send(entry);
        }

    });
};


exports.listAll = function (req, res) {
    let query = Product.find().exec(function (err, result) {
        res.json(result);
    })
};


exports.listAllProductsFromCategory = function (req, res) {
    console.log("from category");
    let query = Product.find({path : /,Cameras,/}).exec(function (err, result) {
        if(err){
            console.log(err);
        }
        console.log(query);
        res.json(result);
    })
};