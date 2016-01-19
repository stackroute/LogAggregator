angular.module('logAggregator').factory('agentDataService', ['$http',
  function($http) {
    return {
      getAgentData: function(handleSuccess, handleError, criteria, year, month, onComplete) {
          var request = $http({
            method: "get",
            url: "json/userAgent/"+criteria+"/"+year+"/"+month,
          });
          request.then( function(data) {
            handleSuccess(data, criteria);
          }, function(data) {
            handleError(data, criteria);
          }
        ).then (
          function() {
            if(onComplete)
              onComplete();
          }
        );
      }
    }
  }
]);
