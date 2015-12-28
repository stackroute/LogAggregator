var express = require('express');
var path = require('path');
var router = express.Router();
var Log = require('mongoose').model('Logs');
var plotData=[];
var finalData=[];
var plotdata=[];
var dates={};

/* GET home page. */
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

    Log.find({time : {"$gte": fromDate, "$lt": toDate}}, 'method time', function(err, serverHits) {
        var result=serverHits;
    for(i in result){
     var obj={};
     obj.method=result[i].method;
     // obj.date=(new Date(parseInt(result[i].time.$date))+" ").substring(4,15);
     // obj.time=(new Date(parseInt(result[i].time.$date))+" ").substring(16,24);
     obj.date=result[i].time.getDate();
     obj.month=result[i].time.getMonth()+1;
     obj.year=result[i].time.getFullYear();
     obj.hour=result[i].time.getHours();
     obj.minutes=result[i].time.getMinutes();
     obj.seconds=result[i].time.getSeconds();

     plotData.push(obj);

   }

   result=plotData;
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
   var obj={};
   obj.plot=plotdata;
   finalData.push(obj);
   res.json(finalData);


});
});

module.exports = router;
