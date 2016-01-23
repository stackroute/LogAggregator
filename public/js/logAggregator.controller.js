angular.module('logAggregator').controller('mainController', ['$scope','$cookies','$rootScope', '$window','$http','$location', 'loadConfig',
  function($scope,$cookies,$rootScope, $window,$http,$location, loadConfig ) {
      //  angular.element('.homepage').css('display','block');
      loadConfig.getdata( function(data) {
        $scope.config = data;
        $window.config = $scope.config;
    });
    if($cookies.get('login')==='true'){
      var result=document.getElementsByClassName('homepage');
      angular.element(result).css('display','block');
      $location.path($location.path());
    }
    else{
    $cookies.put("login",'false');
  }
    console.log("cookie inside mainController is"+$cookies.get('login'));
    $scope.showContent=false;
    $scope.logout=function(){
      console.log("inside csignout");
      $rootScope.loginMessage="";
      $rootScope.checkData="";
   $http.get('/auth/signout').then(function(response){
      var result=document.getElementsByClassName('homepage');
      angular.element(result).css('display','none');
      console.log("inside response function");
      $rootScope.tab="";
      $cookies.remove('login');
      $location.path('/');
    });
    }
  }
]);
