angular.module('logAggregator').controller('authController', ['$scope', '$http','$rootScope','$location',
function($scope, $http, $rootScope, $location) {

  $scope.error_message = '';
  $scope.login = function(username,password){
    $scope.user={
      username:username,
      password:password
    };
    $http.post('/auth/login', $scope.user).then(function(response){
      if(response.data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.loginMessage="";
        $rootScope.current_user = response.data.user.username;
        var result=document.getElementsByClassName('homepage');
        angular.element(result).css('display','block');
        $location.path('/logListing');
      }
      else{
        $scope.error_message = response.data.message;
        $rootScope.loginMessage="Invalid username or password";
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
              $rootScope.loginMessage="Sign up successfull. Please login to continue.";
              $location.path('/login');
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
  //
  // $scope.logout=function(){
  //   console.log("inside signout");
  // var request=  $http.get('/auth/signout');
  // console.log("inside controller");
  //
  // request.then(function(response){
  //   var result=document.getElementsByClassName('homepage');
  //   angular.element(result).css('display','none');
  //
  //   $location.path('/');
  // });
  // }

}]);
