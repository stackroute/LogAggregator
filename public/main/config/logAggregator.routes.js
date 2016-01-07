angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'logListing/views/logListing.view.html'
    })
    .when('/userAgent', {
      templateUrl: 'userAgent/views/userAgent.view.html'
    })
    .when('/logListing', {
      templateUrl: 'logListing/views/logListing.view.html'
    })
    .when('/trafficRate', {
      templateUrl: 'trafficRate/views/trafficRate.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
