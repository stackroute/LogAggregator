(function(){
var fs = require('fs');
var obj,
    datas,
    paths = [];
    datas = JSON.parse(fs.readFileSync("paths.json", 'utf8'));
    for(var i=0; i<30; i++){
      paths[i] = datas.arr[i].path;
    }

obj = JSON.parse(fs.readFileSync('server.logs.json', 'utf8'));
    for(var j=0; j<30; j++)
    {     var temp = paths[j];
          var array = [];
          for(var i=0; i<obj.length; i++)
          {
            delete obj[i]._id ;
            if(obj[i].path === temp)
            { obj[i].size=parseInt(obj[i].size)/8;
              if(obj[i].size>1000 && obj[i].size<1000000)
                  {obj[i].size = parseFloat(obj[i].size)/1000;
                    obj[i].size = (obj[i].size).toFixed(2)+ " KB" ;}

              else if (obj[i].size<1000 ) {
                  obj[i].size = obj[i].size + " B" ;}

                else if (obj[i].size>1000000 ) {
                  obj[i].size = parseFloat(obj[i].size)/1000000;
                  obj[i].size = (obj[i].size).toFixed(2)+ " MB" ;
                }
              array.push(obj[i]);
            }
          }
          //var res=array;
          fs.writeFile('pathJsons/path'+(j+1)+'.json',JSON.stringify(array, null, 4))
    }
    //	fs.writeFile('output.json',JSON.stringify(obj, null, 4));
})();
