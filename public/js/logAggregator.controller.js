angular.module('logAggregator').controller('mainController', ['$scope','$rootScope', '$window','$http','$location', 'loadConfig',
  function($scope,$rootScope, $window,$http,$location, loadConfig ) {
      //  angular.element('.homepage').css('display','block');
      loadConfig.getdata( function(data) {
        $scope.config = data;
        $window.config = $scope.config;
    });
    $scope.showContent=false;
    $scope.logout=function(){
      console.log("inside csignout");
   $http.get('/auth/signout').then(function(response){
      var result=document.getElementsByClassName('homepage');
      angular.element(result).css('display','none');
      console.log("inside response function");
      $rootScope.tab="";
      $location.path('/');
    });
    }
  }
]);
