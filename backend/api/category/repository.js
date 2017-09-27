"use strict";
var Category = require('./model');
var Product = require('../product/model');

exports.create = function (category) {
    var entry = new Category({
        name: category.name,
        path: category.path,
        key: Math.floor(Math.random() * 90000) + 10000
    });
    return entry.save()
};


exports.list = function () {
    Category.find().sort({ path: 1 })
};


exports.getCategoryByKey = function (key) {
    return Category.find({ key: key });
}


exports.getAllSubcategories = function (parentCategory) {
    let categoryName = parentCategory[0].name;
    let categoryPath = parentCategory[0].path !== "null" ? parentCategory[0].path : "";
    console.log(categoryPath);
    let re = new RegExp(categoryPath + categoryName + ",");
    return Category.find({ path: re })
}

exports.getCategoryElements = function (categoryKey) {
    return this.getCategoryByKey(categoryKey)
        .then((category) => testArrayAgainstNotFound(array))
        .then((category) => this.getAllSubcategories(category))
        .then((subcategories) => {
            if (!subcategories || !subcategories.length) {
                return Product.find({ cat_key: categoryKey })
            }
            else {
                return subcategories;
            }
        })
}

function testArrayAgainstNotFound(array) {
    if (!array || !array.length) throw new Error('Category with given key does not exist');
    else return array
}

