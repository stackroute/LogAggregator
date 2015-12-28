var Config = require('mongoose').model('Config');
config = {}
// console.log(Config);
Config.find({},{'_id': 0},function(err, data) {
  // console.log(data);
  config = data[0];
});
