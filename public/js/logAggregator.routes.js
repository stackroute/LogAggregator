angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'js/nginx/auth/views/auth.view.html',
      controller : 'authController'
    })
    .when('/register', {
      templateUrl : 'js/nginx/auth/views/register.view.html',
      controller : 'authController'
    })
    .when('/agentAnalytics', {
      templateUrl : 'js/nginx/userAgent/views/userAgent.view.html',
      controller : 'userAgentController'
    })
    .when('/logListing', {
      templateUrl : 'js/nginx/logListing/views/logListing.view.html',
      controller : 'logController'
    })
    .when('/requestRate', {
      templateUrl : 'js/nginx/trafficRate/views/trafficRate.view.html',
      controller : 'trafficRateController'
    })
    .when('/home', {
      templateUrl : 'js/nginx/homepage.html',
      controller : ''
    })
    .otherwise({
      redirectTo : '/'
    });
  }
]);
