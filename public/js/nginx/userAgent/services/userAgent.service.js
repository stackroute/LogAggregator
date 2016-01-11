angular.module('logAggregator').factory('agentDataService',
  function($http) {
    return {
      getAgentData: function(handleSuccess, handleError, criteria, year, month) {
          var request = $http({
            method: "get",
            url: "json/userAgent/"+criteria+"/"+year+"/"+month,
          });
          console.log("json/userAgent/"+criteria+"/"+year+"/"+month);
          console.log(criteria);
          request.then( function(data) {
            handleSuccess(data, criteria);
          }, function(data) {
            handleError(data, criteria);
          } );
        }
    }
  }
);
