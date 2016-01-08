angular.module('logAggregator').controller('mainController', ['$scope','loadConfig',
  function($scope,loadConfig) {
    loadConfig.getdata(function(data){
      $scope.config=data;
      console.log(data);
    });
}
]);
