var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var logSchema = new Schema({
  remote : String,
  host : String,
  user : String,
  method : String,
  path : String,
  code : Number,
  size : String,
  referer : String,
  agent : String,
  time : Date
},{collection: "server_hits"})

mongoose.model('Logs', logSchema);
