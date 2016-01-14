var Log = require('mongoose').model('Logs');
var express = require('express');
var router = express.Router();



router.get('/:pathId/:pgno', function(req, res  ) {
    console.log("rooooooooooooooooooo");
        temp = req.params.pathId;
        pgno = req.params.pgno;
        limit=config.listingLimit;
        var counts = 0;
        skip = pgno > 1 ? ((pgno-1) * limit) : 0;
        if(temp=="All"){
          //if(typeof temp==undefined)
          paths="/";
           //data for all
            count = Log.count({},function(er,c){

               counts=c;
               Log.find({},'remote host path user method code size referer agent time',{skip:skip,limit:limit}, function(err,serverhits) {
                 var obj={"collection_data":serverhits,
                           "count": counts};
                           (obj.collection_data).sort(function(a, b) {
                               return (b.time-a.time);
                          });

                   res.send(obj);
               });
           });


       }//close if
          else{

              newtemp = decodeURIComponent(temp);
              // newtemp = newtemp.replace(/$/g , "%");
              // if(newtemp.indexOf(newtemp.length-1)=='%')
              // console.log("-------------> "+newtemp.indexOf(newtemp.length-1));
              // newtemp = newtemp.replace(newtemp.indexOf(newtemp.length-1),'');
              var paths = "/" + newtemp;

            //else
console.log("n----> " +paths);
           count = Log.count({path:paths},function(er,c){

              counts=c;
              Log.find({path:paths},'remote host path user method code size referer agent time',{skip:skip,limit:limit}, function(err,serverhits) {
                  var arr={"collection_data":serverhits,
                            "count": counts};
                            (arr.collection_data).sort(function(a, b) {
                                return (b.time-a.time);
                           });

                  res.send(arr);
              });
          });

        }//close else



});//pathid get req



router.get('/', function(req, res  ) {



    Log.find({},'remote host path user method code size referer agent time', function(err,serverhits) {

          var obj = serverhits;
          final = {
           arr : []
           };

           var l = obj.length;

           var index = function(value,array) {

                 for( var i = 0; i < array.length; i++){

                     if( array[i].path === value)
                         return i;

                 }//close for
                   return "null";

           }//close function index

           p = final.arr;
           for(var i=0; i<l; i++)
           {
               var value = obj[i].path;

               if(index(value,p) === "null")
               {
                     p.push( {
                       "path" : obj[i].path,
                       "count" : 1
                     })

               }
               else {
                       var k = index(value,p);
                       p[k].count +=  1;
               }


           }//close for

                 p.sort(function(a, b) {
                     return b.count-a.count;
                });



         //var paths = JSON.stringify(final, null, 4);

         res.json(final);

    });


});//pathid get req






module.exports = router;
