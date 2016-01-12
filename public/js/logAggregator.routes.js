angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'js/nginx/logListing/views/logListing.view.html',
      controller : 'logController'
    })
    .when('/agentAnalytics', {
      templateUrl: 'js/nginx/userAgent/views/userAgent.view.html',
      controller: 'userAgentController'
    })
    .when('/logListing', {
      templateUrl: 'js/nginx/logListing/views/logListing.view.html',
      controller : 'logController'
    })
    .when('/requestRate', {
      templateUrl: 'js/nginx/trafficRate/views/trafficRate.view.html',
      controller: 'trafficRateController'
    })
    .otherwise({
      redirectTo: '/'
    });
  }

]);


  // .run(function($rootScope, $location) {
  //   var path = $location.path();
  //   console.log($location);
  //   if(path == '/')
  //     $rootScope.tab = "logListing";
  //   else
  //     $rootScope.tab = path.substring(1, path.length);
  //   console.log($rootScope.tab);
  // })
  
