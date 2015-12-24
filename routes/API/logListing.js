var log = require('mongoose').model('logs');
var express = require('express');
var router = express.Router();



router.get('/:pathId/:pgno', function(req, res  ) {
console.log("in req");
        temp = req.params.pathId;
        console.log("temp is "+temp);
        pgno = req.params.pgno;
        console.log("page no "+pgno);
        limit=100;
        var counts = 0;
        skip = pgno > 1 ? ((pgno-1) * limit) : 0;
        if(temp!="All"){
            console.log("in path req");
              newtemp = temp.split('^').join('/');
              var paths = "/" + newtemp;


           count = log.count({path:paths},function(er,c){
            console.log("count is "+c);

              counts=c;
              log.find({path:paths},'remote host path user method code size referer agent time',{skip:skip,limit:limit}, function(err,serverhits) {
                  var arr=[];
                  arr.push(serverhits);
                  arr.push({"count":counts});
                  res.json(arr);
              });
          });
          //console.log("count "+ count);

        }//close if

        else {
          console.log("in all req");
          count = log.count({},function(er,c){
           console.log("count is "+c);

             counts=c;
             log.find({},'remote host path user method code size referer agent time',{skip:skip,limit:limit}, function(err,serverhits) {
                 var arr=[];
                 arr.push(serverhits);
                 arr.push({"count":counts});
                 res.json(arr);
             });
         });

        }

});//pathid get req



router.get('/', function(req, res  ) {



    log.find({},'remote host path user method code size referer agent time', function(err,serverhits) {

        //  console.log(serverhits);
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
                     //  console.log(p[i].count);
                       var k = index(value,p);
                       p[k].count +=  1;
               }


           }//close for

                 p.sort(function(a, b) {
                     return b.count-a.count;
                });


        //console.log(final)
         var paths = JSON.stringify(final, null, 4);

         res.json(paths);

    });


});//pathid get req






module.exports = router;
