var fs = require('fs');
var plotdata=[];
var data= fs.readFileSync('../json/traffic_data.json','utf8');
var result=JSON.parse(data);
var flag;

  for(i in result){
    var obj={};

    var day_date =result[i].year+'-' + (result[i].month) + '-' + result[i].date;

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
        obj[result[i].method]=1;
        plotdata.push(obj);
      }
  }

  for(k=0;k<plotdata.length;k++)
  {
      if(!((plotdata[k])['GET'])){
        (plotdata[k])['GET']=0;
      }
      if(!((plotdata[k])['POST'])){
        (plotdata[k])['POST']=0;
      }
      if(!((plotdata[k])['OPTIONS'])){
        (plotdata[k])['OPTIONS']=0;
      }
      if(!((plotdata[k])['HEAD'])){
        (plotdata[k])['HEAD']=0;
      }
  }

// var months={
//   Jan : 01,
//   Feb : 02,
//   Mar : 03,
//   Apr : 04,
//   May : 05,
//   Jun : 06,
//   Jul : 07,
//   Aug : 08,
//   Sep : 09,
//   Oct : 10,
//   Nov : 11,
//   Dec : 12
// }
// var A=[];
// for(i in plotdata)
// {
//   A[months[(String(plotdata[i].date).substring(4,7))]-1]=1;
// }
// for(i=0;i<=11;i++)
// {
//   if(!A[i]){
//     A[i]=0;
//   }
// }
// var month_days;
// for(i in A){
//   if(A[i]==1){
//     if(i==1 || i==3 || i==5 || i==7 || i==8 || i==10 || i==12){
//       month_days=31;
//     }
//     else{
//       month_days=30;
//     }
//     if(i==2){
//       month_days=28;
//     }
//     for(i=0;i<month_days;i++)
//     {
//
//     }
//   }
// }
 fs.writeFile("../json/day_traffic_parse.json", JSON.stringify(plotdata, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to day_traffic_parse.json");
      }
  });
