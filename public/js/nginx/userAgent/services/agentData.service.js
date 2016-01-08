angular.module('userAgent').factory('getAgentData', [$scope,
  function($scope) {
    var year = $scope.agentYear;
    var month = $scope.agentMonth;
    var criteria = $scope.criteria;
    var handleSuccess = function(response) {
      return response.data;
    }
    var handleError = function(response) {
      return {};
    }
    var request = $http({
      method: "get",
      url: "json/userAgent/"+criteria+"/2015/0",
    });
    return( request.then( handleSuccess, handleError ) );
  }
]);
