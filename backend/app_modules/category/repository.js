var Category = require('./model');

exports.create = function (req, res) {
    var entry = new Category({
        name: req.body.name,
        path: req.body.path
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
    var query = Category.find().sort({path : 1}).exec(function (err, result) {
        res.json(result);
    })
}