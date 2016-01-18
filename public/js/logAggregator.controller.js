angular.module('logAggregator').controller('mainController', ['$scope', '$window', 'loadConfig',
  function($scope, $window, loadConfig ) {
      loadConfig.getdata( function(data) {
        $scope.config = data;
        $window.config = $scope.config;
    });
  }
]);
