angular.module('logListing').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {

      templateUrl: 'logListing/views/logListing.view.html'

      templateUrl: '/js/nginx/logListing/views/userAgent.view.html'

    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
