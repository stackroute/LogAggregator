angular.module('logAggregator').controller('changePasswordController', ['$scope','$cookies' ,'$http','$rootScope','$location',
function($scope,$cookies, $http, $rootScope, $location) {

  $scope.changePassword = function(){
    var password=$scope.password;
    var newPassword=$scope.newPassword;
    var confirmNewPassword=$scope.confirmNewPassword;

  }

}]);
