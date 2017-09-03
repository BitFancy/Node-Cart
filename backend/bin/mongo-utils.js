"use strict";
const Promise = require("bluebird");

const Product = require("../app_modules/product/model");

const MongoUtils = (function () {
    const clearDb = function () {
        // public
    };

    const seedDb = function (seedJson) {

        Product.collection.drop();
        seedJson.products.forEach((singleProductDefinition) => {
            let newTestProduct = new Product(singleProductDefinition);
            newTestProduct.save();
        })
    };

    return {
        clearDb: clearDb,
        seedDb: seedDb
    };

})();

module.exports = MongoUtils;