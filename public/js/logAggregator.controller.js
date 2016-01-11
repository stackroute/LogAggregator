angular.module('logAggregator').controller('mainController', ['$scope','loadConfig',
  function($scope,loadConfig) {
    loadConfig.getdata(function(data){
      $scope.config=data;
<<<<<<< HEAD
      //console.log(data);
=======
>>>>>>> b87a7cdcaaf029b3089069828a88b5248d6c9fed
    });
}
]);
