angular.module('logAggregator').factory('getTrafficData',
  function($http) {
    return {
      getData : function( year, month) {
        return  $http({
          method: "get",
          url: "json/trafficRate/"+year+"/"+month
        });
      }
    }
  }
);
