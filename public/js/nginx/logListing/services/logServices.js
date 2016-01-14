var mainApp = angular.module("logAggregator");
mainApp.factory('logService',function($http){
  
  var data={};
  var service = {
    disparray: function(){
      var promise = $http(
        {method:'GET', url:"/json/logListing/"}
      )
      .success(function (data, status, headers, config) {


      });
      return promise;
    },//close disparray

    dispObj: function(path,pgno){

      if(path!="All"){
        if(path.indexOf("%")!=-1)
        path = path.replace('%','/');

        temp =  (path!='/') ? path.substring(1):path;
        path = (path!='/') ? ('/'+encodeURIComponent(temp)):path;

      }
      else {
        path="/All"
      }

      pageno = (pgno != "1") ? pgno:"1";
      var promise = $http(
        {method:'GET', url:"/json/logListing"+path+"/"+pageno}
      )
      .success(function (data, status, headers, config) {
      });

      return promise;

    }//close dispObj

  }//close service
  return service;

});
