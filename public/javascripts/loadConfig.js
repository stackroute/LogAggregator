var request = new XMLHttpRequest();
request.open("GET", "../config.json", false);
request.send(null)
config = JSON.parse(request.responseText)[0];
