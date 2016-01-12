var mainApplicationModuleName = 'logAggregator';


var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute']);
console.log("application-main module created");

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
