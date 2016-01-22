angular.module('logAggregator').controller('mainController', ['$scope', '$window', 'loadConfig',
  function($scope, $window, loadConfig ) {
      //  angular.element('.homepage').css('display','block');
      loadConfig.getdata( function(data) {
        $scope.config = data;
        $window.config = $scope.config;
    });
    $scope.showContent=false;
  }
]);
