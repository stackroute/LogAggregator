var mainApplicationModuleName = 'logAggregator';


var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute','angular-loading-bar']);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
