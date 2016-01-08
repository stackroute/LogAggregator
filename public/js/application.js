var mainApplicationModuleName = 'logAggregator';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute','logListing']);
console.log("main module created");
mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
