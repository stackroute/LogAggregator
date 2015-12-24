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
<<<<<<< HEAD
  time : Date,
=======
  time : Date
>>>>>>> a1fff285fcdb623130532234d4adac2a19ebc2f8
},{collection: "serverhits"})

mongoose.model('logs', logSchema);
