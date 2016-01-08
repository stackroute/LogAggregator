angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'js/nginx/logListing/views/logListing.view.html'
    })
    .when('/userAgent', {
      templateUrl: 'js/nginx/userAgent/views/userAgent.view.html',
      controller: 'userAgentController'
    })
    .when('/logListing', {
      templateUrl: 'js/nginx/logListing/views/logListing.view.html'
    })
    .when('/trafficRate', {
      templateUrl: 'js/nginx/trafficRate/views/trafficRate.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
