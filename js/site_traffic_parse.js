var fs = require('fs');
var plotdata=[];
var data= fs.readFileSync('../sampledata/server.logs.json','utf8');
var result=JSON.parse(data);

  for(i in result){
    var obj={};
    obj.method=result[i].method;
    // obj.date=(new Date(parseInt(result[i].time.$date))+" ").substring(4,15);
    // obj.time=(new Date(parseInt(result[i].time.$date))+" ").substring(16,24);
    obj.date=new Date(parseInt(result[i].time.$date)).getDate();
    obj.month=new Date(parseInt(result[i].time.$date)).getMonth()+1;
    obj.year=new Date(parseInt(result[i].time.$date)).getFullYear();
    obj.hour=new Date(parseInt(result[i].time.$date)).getHours();
    obj.minutes=new Date(parseInt(result[i].time.$date)).getMinutes();
    obj.seconds=new Date(parseInt(result[i].time.$date)).getSeconds();

    plotdata.push(obj);
  }


     fs.writeFile("../json/traffic_data.json", JSON.stringify(plotdata, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to traffic_data.json");
      }
  });
