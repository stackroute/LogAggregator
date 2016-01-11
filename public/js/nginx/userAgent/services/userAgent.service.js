angular.module('logAggregator').factory('getAgentData',
  function($http) {
    return {
      getAgentData: function(handleSuccess, handleError, criteria) {
          var request = $http({
            method: "get",
            url: "json/userAgent/os/2015/0",
          });
          request.then( function() {
            handleSuccess(criteria);
            handleError(criteria)
          });
        }
    }
  }
);
