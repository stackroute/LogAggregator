angular.module('userAgent').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'userAgent/views/userAgent.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
