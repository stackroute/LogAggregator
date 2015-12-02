var file = require("fs");

file.readFile("server.logs.json", "utf8", function(err, data) {
  var dataObj = JSON.parse(data);
  var reqData = [];

  for(var i = 0, len = dataObj.length; i < len ; i++) {
    var user = {
      browser : "none",
      os : "none",
    };

    var agent = dataObj[i]["agent"],
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

  file.writeFile("agentData.json", JSON.stringify(reqData, null, 2));
  
});
