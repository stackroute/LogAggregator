angular.module('logListing').config(['$routeProvider',
  function($routeProvider) {
    console.log("in my listing routes");
    $routeProvider
    .when('/', {

      templateUrl: 'logListing/views/logListing.view.html',
      controller : 'js/nginx/logListing/controllers/logListing.controller.js'

    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);
