var request = new XMLHttpRequest();
request.open("GET", "/config", false);
request.send(null)
config = JSON.parse(request.responseText);
console.log(config);
