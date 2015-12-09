var fs = require("fs");

var data = fs.readFileSync('server.logs.json','utf8');

var obj = JSON.parse(data);
console.log(obj[0].path);

( function(data){


              obj.sort(function(a, b) {
                return b.time.$date-a.time.$date;
           });


           for(var i=0; i<obj.length; i++)

           {
              delete obj[i]._id;
              delete obj[i].host;
                 if(obj[i].size>1000 && obj[i].size<1000000)
                     {obj[i].size = parseFloat(obj[i].size)/1000;
                       obj[i].size = (obj[i].size).toFixed(2)+ " KB" ;}

                 else if (obj[i].size<1000 ) {
                     obj[i].size = obj[i].size + " B" ;}

                   else if (obj[i].size>1000000 ) {
                     obj[i].size = parseFloat(obj[i].size)/1000000;
                     obj[i].size = (obj[i].size).toFixed(2)+ " MB" ;
                   }

           }

      fs.writeFile('pathJsons/all.json', JSON.stringify(obj, null, 4), function(err) {

        if(err) {
          console.log(err);
        }
        else {
          console.log("Successfully created ");
        }
    });


}());
