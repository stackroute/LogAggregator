var fs = require("fs");

var data = fs.readFileSync('../json/server_logs.json','utf8');

var obj = JSON.parse(data);
console.log(obj[0].path);

( function(data){

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

          for(i = 0;i < p.length; i++){
            p[i]["fixedpos"] = i+1;
          }
          //adding a field "pos" to each object
      //console.log(p);

      fs.writeFile('paths.json', JSON.stringify(final, null, 4), function(err) {

        if(err) {
          console.log(err);
        }
        else {
          console.log("Successfully created ");
        }
    });


}());
