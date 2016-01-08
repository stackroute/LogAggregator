angular.module('userAgent').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/nginx/logListing/views/userAgent.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
