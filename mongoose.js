var mongoose = require('mongoose');

module.exports = function() {
  var dbName = 'mongodb://localhost/sampleData'
  var db = mongoose.connect(dbName);

  require('./models/log.server.model');
  require('./models/log.config.model');

  return db;
}
