var mongoose = require('mongoose');

module.exports = function() {
  var dbName = 'mongodb://172.23.238.253/LogAggregator'
  var db = mongoose.connect(dbName);

  require('./models/log.server.model');
  require('./models/log.config.model');

  return db;
}
