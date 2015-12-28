var Config = require('mongoose').model('Config');
config = {}
// console.log(Config);
Config.find({},function(err, data) {
  // console.log(data);
  config = data[0];
});
