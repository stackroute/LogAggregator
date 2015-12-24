

var log = require('mongoose').model('logs');
var express = require('express');
var router = express.Router();


router.get('/:year/:month', function(req, res, next) {
  var year = req.params.year;
  var month = req.params.month;
  var fromDate, toDate;
  if(month=="0") {
    fromDate = new Date(year, 0);
    toDate = new Date(parseInt(year)+1, 0);
  } else {
    fromDate = new Date(year, parseInt(month)-1);
    toDate = new Date(year, parseInt(month));
  }
  log.find({time : {"$gte": fromDate, "$lt": toDate}}, 'agent', function(err, serverHits) {
    var reqData = [];

    for(var i = 0, len = serverHits.length; i < len ; i++) {
      var user = {
        browser : "Others",
        os : "Others",
      };

      var agent = serverHits[i]["agent"],
          browser = ["OPR", "Chrome", "Firefox", "Trident", "Edge", "Safari"],
          browserNames = ["Opera", "Google Chrome", "Mozilla Firefox", "Internet Explorer", "Microsoft Edge", "Safari"],
          os = ["Windows NT 6.1", "Macintosh", "Windows NT 10.0", "Windows NT 6.2", "Windows NT 6.3"],
          osNames = ["Windows 7", "Macintosh", "Windows 10", "Windows 8", "Windows 8.1"];

      for(var j = 0, browLen = browser.length; j < browLen; j++) {
        if(agent.indexOf(browser[j], 0) != -1) {
          user["browser"] = browserNames[j];
          break;
        }
      }

      for(var k = 0, osLen = os.length; k < osLen; k++) {
        if(agent.indexOf(os[k], 0) != -1) {
          user["os"] = osNames[k];
          break;
        }
      }

      reqData.push(user);
    }
    res.json(reqData)
  });
}
);

module.exports = router;
