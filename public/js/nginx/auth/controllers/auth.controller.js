angular.module('logAggregator').controller('authController', ['$scope', '$http','$rootScope','$location',
function($scope, $http, $rootScope, $location) {

  $scope.error_message = '';

  console.log($scope.user);

  $scope.login = function(username,password){
    console.log("--- "+username);
    $scope.user={
      username:username,
      password:password
    };
    $http.post('/auth/login', $scope.user).then(function(response){
      console.log("successssssss");
      if(response.data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = response.data.user.username;
        var result=document.getElementsByClassName('homepage');
        angular.element(result).css('display','block');
        $location.path('/logListing');
      }
      else{
        $scope.error_message = response.data.message;
      }
    });
  };

$scope.register = function(){
        $scope.userDetails={
          firstName:$scope.firstName,
          lastName:$scope.lastName,
          username:$scope.username,
          email:$scope.email,
          password:$scope.password
        };

        if($scope.password==$scope.confirmPassword){
          $http.post('/auth/signup', $scope.userDetails).success(function(data){
            if(data.state == 'success'){
              $rootScope.authenticated = true;
              $rootScope.current_user = data.user.username;
              $location.path('/');
            }
            else{
              $scope.error_message = data.message;
            }
          });
        }
        else {
          $scope.checkPassword="Password doesn't match";

        }

  };

}]);
