angular.module('logAggregator').controller('authController', ['$scope','$cookies' ,'$http','$rootScope','$location',
function($scope,$cookies, $http, $rootScope, $location) {

  if($cokkies.get('login')=='true'){
    console.log("in errorhandler");
    $location.path('/logListing');
  }
  else {
    var result=document.getElementsByClassName('homepage');
    angular.element(result).css('display','none');
  }


}]);
