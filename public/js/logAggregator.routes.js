angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'js/nginx/auth/views/auth.view.html',
      controller : 'login'
    })
    .when('/register', {
      templateUrl : 'js/nginx/Authentication/views/register.view.html',
      controller : 'register'
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
