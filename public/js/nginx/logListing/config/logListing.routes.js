angular.module('logListing').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'logListing/views/logListing.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);