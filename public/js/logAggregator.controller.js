angular.module('logAggregator').controller('appController', ['$scope','$http'
  function($scope,$http) {
    $http.get('/config').success(function(data){
      console.log(data);
    });
  }
]);
