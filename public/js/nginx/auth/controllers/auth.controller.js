angular.module('logAggregator').controller('authController', ['$scope','$cookies' ,'$http','$rootScope','$location',
function($scope,$cookies, $http, $rootScope, $location) {

  $scope.error_message = '';
<<<<<<< HEAD
  var result=document.getElementsByClassName('homepage');
  angular.element(result).css('display','none');
=======
>>>>>>> 6bc155f98c3d5320a1dcbc4851e6fd5cac735594
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
        $cookies.put('login','true');
        console.log("setting cookie value"+$cookies.get('login'));
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
  //
  // }

}]);
