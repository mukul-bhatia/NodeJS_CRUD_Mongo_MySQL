var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, require: true },
  quantity: { type: Number }
});

module.exports = mongoose.model('Book',schema,'books');
