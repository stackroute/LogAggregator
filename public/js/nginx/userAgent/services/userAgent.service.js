angular.module('logAggregator').factory('agentDataService', ['$http',
  function($http) {
    return {
      getAgentData: function(handleSuccess, handleError, onComplete, criteria, year, month) {
          var request = $http({
            method: "get",
            url: "json/userAgent/"+criteria+"/"+year+"/"+month,
            complete : onComplete
          });
          request.then( function(data) {
            handleSuccess(data, criteria);
          }, function(data) {
            handleError(data, criteria);
          }
        );
      }
    }
  }
]);
