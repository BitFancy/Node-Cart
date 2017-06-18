var Product = require('../../models/products');

exports.create = function (req, res) {
    var entry = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });

    entry.save();

    //redirect to home page
    res.redirect(301, '/');

}


exports.list = function (req, res){
    var query = Product.find().exec(function (err, result) {
        res.json(result);
    })
}