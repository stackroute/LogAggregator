angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'js/nginx/logListing/views/logListing.view.html',
      controller : 'js/nginx/logListing/controllers/logListing.controller.js'
    })
    .when('/userAgent', {
      templateUrl: 'js/nginx/userAgent/views/userAgent.view.html',
      controller: 'userAgentController'
    })
    .when('/logListing', {
      templateUrl: 'js/nginx/logListing/views/logListing.view.html',
      controller : 'js/nginx/logListing/controllers/logListing.controller.js'
    })
    .when('/trafficRate', {
      templateUrl: 'js/nginx/trafficRate/views/trafficRate.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });

    console.log("in LA routes");
  }

]);
