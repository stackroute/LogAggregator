angular.module('logListing').config(['$routeProvider',
  function($routeProvider) {
    console.log("in my listing routes");
    $routeProvider
    .when('/', {

      templateUrl: 'logListing/views/logListing.view.html',
      controller : 'logController'

    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
