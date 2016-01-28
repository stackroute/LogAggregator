/*Copyright 2016 Wipro Limited, NIIT Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This code is written by Prateek Reddy Yammanuru, Shiva Manognya Kandikuppa, Uday Kumar Mydam, Nirup TNL, Sandeep Reddy G, Deepak Kumar*/

angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'js/nginx/auth/views/auth.view.html',
      controller : 'authController'
    })
    .when('/login', {
      redirectTo : 'js/nginx/auth/views/auth.view.html',
      controller : 'authController'
    })
    .when('/changePassword', {
      templateUrl : 'js/nginx/auth/views/changePassword.view.html',
      controller : 'changePasswordController'
    })
    .when('/aboutus', {
      templateUrl : 'js/nginx/auth/views/aboutus.view.html',
      controller: 'aboutusController'
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
    .when('/errorhandler', {
      templateUrl : 'js/nginx/auth/views/error.view.html',
      controller : 'errorHandlerController'
    })
    .otherwise({
      redirectTo : '/',
      controller : 'errorHandlerController'
    });
  }
]);
