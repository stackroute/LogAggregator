angular.module('logAggregator').controller('userAgentController', ['$scope', '$rootScope', 'agentDataService', '$interval',
  function($scope, $rootScope, agentDataService, $interval) {
    var thisYear = (new Date).getFullYear();
    $rootScope.tab = 'agentAnalytics';
    $scope.agentYear = thisYear;
    var years = [];
    for(var i = parseInt(thisYear); i > thisYear - $scope.config.noOfYears; i--) {
      years.push(i);
    }
    $scope.yearsToShow = years;
    $scope.agentMonth = 0;
    $scope.agentMonthName = "Month";
    $scope.agentData = {};
    $scope.showAgentProgress = true;

    var handleSuccess = function(response, criteria) {
      $scope.agentData = response.data;
      $scope.showAgentProgress = false;
    };

    var handleError = function(response, criteria) {
      $scope.agentData = undefined;
      $scope.showAgentProgress = false;
    }

    var onComplete =function() {
      $interval(function() {
        if($rootScope.tab == 'agentAnalytics') {
          agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);
        } else {
          $interval.cancel(onComplete());
        }
      }, $scope.config.refreshInterval);
    };

    $scope.agentCriteria = 'browser';
    agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth, onComplete);

    $scope.renderData = function(criteria) {
      $scope.showAgentProgress = true;
      $scope.agentCriteria = criteria;
      var year = $scope.agentYear;
      var month = $scope.agentMonth;
      agentDataService.getAgentData(handleSuccess, handleError, criteria, year, month);
    }

    $scope.updateAgentYear = function(year) {
      $scope.showAgentProgress = true;
      $scope.agentYear = year;
      $scope.agentMonth = 0;
      $scope.agentMonthName = 'Month';
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, year, $scope.agentMonth);
    }

    $scope.updateAgentMonth=function(month){
      $scope.showAgentProgress = true;
      $scope.agentMonth = month.value;
      $scope.agentMonthName = month.month;
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);
    }

    $scope.checkIfDisable = function(){
      if($scope.agentData)
        return (Object.keys($scope.agentData).length == 0 && $scope.agentMonth == 0)
    }
  }
]);
