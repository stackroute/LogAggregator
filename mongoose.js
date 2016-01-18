var mongoose = require('mongoose');

module.exports = function() {
  var dbName = 'mongodb://172.23.238.253:27018/nginx';
  //var dbName = 'mongodb://localhost:27017/logaggregator'
  var db = mongoose.connect(dbName);

  require('./models/log.server.model');
  require('./models/log.config.model');

  return db;
}
