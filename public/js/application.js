var mainApplicationModuleName = 'logAggregator';


var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute']);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
