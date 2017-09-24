var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name : { "type" : String , required: [true, 'Please insert category name']},
    path : { "type" : String , required: [true, 'Please insert category description']},
    key : { "type" : String , required : [true, 'Please insert category key']  }

});

module.exports = mongoose.model('Category', categorySchema);
