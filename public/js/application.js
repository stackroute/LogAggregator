var mainApplicationModuleName = 'logAggregator';


var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute']);
console.log("application-main module created");

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
