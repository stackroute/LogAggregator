angular.module('logListing')
  .factory('pathsArray',function($http,$log){

      return {

          load:function(){

              data = $http.get('/json/logListing/');
              $log.log(data);

          }

            return data;
      }


  });
