var mainApp = angular.module("logAggregator");
mainApp.factory('logService',function($http){

    return {
        getPath_count: function(){
            var promise = $http({method: 'GET',
                                  url: "/json/logListing/"
                                });

            return promise;
        },//close getPath_count

        getPathData: function(path,pgno){
            if(path!="All"){
              temp =  (path != '/') ? path.substring(1):path;
              path = (path != '/') ? ('/'+encodeURIComponent(temp)):path;
              console.log(path);
            }
            else {
              path = "/All"
            }

            pageno = (pgno != "1") ? pgno:"1";
            var promise = $http({method: 'GET',
                                url: "/json/logListing"+path+"/"+pageno
                              });
            return promise;

        }//close getPathData
    }//close return

});

// if(path.indexOf("%")!=-1)
// path = path.replace(/%/g , "$");
