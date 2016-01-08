angular.module('logAggregator').controller('appController', ['$scope','$http',
  function($scope,$http) {
    console.log("in app ctrl");

    $http.get('/config').success(function(data){
      console.log(data);
    });
  }
]);
