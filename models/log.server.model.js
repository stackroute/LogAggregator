var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var logSchema = new Schema({
  remote : String,
  host : String,
  user : String,
  method : String,
  path : String,
  code : Number,
  size : Number,
  referer : String,
  agent : String,
  time : {
    "$date" : Number,
  }
},{collection: "serverhits"})

mongoose.model('logs', logSchema);
console.log("Schema log loaded");
