var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name : { "type" : String , required: [true, 'Please insert product name']},
    description : { "type" : String , required: [true, 'Please insert product description']},
    price : { "type" : Number , required: [true, 'Please insert product base price']},
    path : { "type" : String, required : [true, 'Please put this product in specific category']}
});

module.exports = mongoose.model('Product', productSchema);
