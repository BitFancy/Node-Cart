var Product = require('../category/model');

exports.create = function (req, res) {
    var entry = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category : req.body.price
    });

    entry.save(function (err, entry) {
        if (err) {
            res.status(422).send(err.name)
        }
        else {
            res.status(200).send(entry);
        }

    });
};


exports.list = function (req, res) {
    var query = Product.find().exec(function (err, result) {
        res.json(result);
    })
}