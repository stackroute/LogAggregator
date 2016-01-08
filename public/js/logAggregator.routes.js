angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'nginx/logListing/views/logListing.view.html'
    })
    .when('/userAgent', {
      templateUrl: 'nginx/userAgent/views/userAgent.view.html'
    })
    .when('/logListing', {
      templateUrl: 'nginx/logListing/views/logListing.view.html'
    })
    .when('/trafficRate', {
      templateUrl: 'nginx/trafficRate/views/trafficRate.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
