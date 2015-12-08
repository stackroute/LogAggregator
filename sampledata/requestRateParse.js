var fs = require('fs');
var finalData=[];
var plotdata=[];
var dates={};
var data= fs.readFileSync('../json/traffic_data.json','utf8');
var result=JSON.parse(data);
var flag;

  for(i in result){
    var obj={};

    if(result[i].date<10)
    {
    var day_date =result[i].year+'-' + (result[i].month) + '-' +'0'+result[i].date;
  }else{
    var day_date =result[i].year+'-' + (result[i].month) + '-'+result[i].date;
  }
    dates[day_date]=1;
    flag=0;
    for(k=0;k<plotdata.length;k++)
    {
      if(String(day_date).substring(0,10)===String(plotdata[k].date).substring(0,10)){
        if((plotdata[k])[result[i].method]){
        (plotdata[k])[result[i].method]=(plotdata[k])[result[i].method]+1;
      }else{
        (plotdata[k])[result[i].method]=1;
      }
        flag=1;
      }
    }
      if(flag!=1){
        obj.date=day_date;
        obj.GET=0;
        obj.POST=0;
        obj.OPTIONS=0;
        obj.HEAD=0;
        obj[result[i].method]=1;
        plotdata.push(obj);
      }
  }
  finalData.push(dates);

  // for(k=0;k<plotdata.length;k++)
  // {
  //     if(!((plotdata[k])['GET'])){
  //       (plotdata[k])['GET']=0;
  //     }
  //     if(!((plotdata[k])['POST'])){
  //       (plotdata[k])['POST']=0;
  //     }
  //     if(!((plotdata[k])['OPTIONS'])){
  //       (plotdata[k])['OPTIONS']=0;
  //     }
  //     if(!((plotdata[k])['HEAD'])){
  //       (plotdata[k])['HEAD']=0;
  //     }
  // }

  var obj={};
  obj.plot=plotdata;
  finalData.push(obj);

 fs.writeFile("../json/trafficRateDayWise.json", JSON.stringify(finalData, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to trafficRateDayWise.json");
      }
  });
