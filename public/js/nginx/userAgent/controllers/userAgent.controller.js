angular.module('logAggregator').controller('userAgentController', ['$scope', 'agentDataService',
  function($scope, agentDataService) {

    var thisYear = (new Date).getFullYear();

    $scope.agentYear = thisYear;
    var years = [];
    for(var i = parseInt(thisYear); i > thisYear - $scope.config.noOfYears; i--) {
      years.push(i);
    }
    $scope.yearsToShow = years;
    $scope.agentMonth = 0;
    $scope.agentMonthName="Month";
    $scope.agentData = {};

    var handleSuccess = function(response, criteria) {
      $scope.agentData = response.data;
      render(criteria, $scope.agentData);
    };

    var handleError = function(response, criteria) {
      $scope.agentData = {};
      render(criteria, $scope.agentData);
    }

    $scope.agentCriteria = 'browser';
    agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);

    $scope.renderData = function(criteria) {
      $scope.agentCriteria = criteria;
      var year = $scope.agentYear;
      var month = $scope.agentMonth;
      agentDataService.getAgentData(handleSuccess, handleError, criteria, year, month);
    }

    $scope.updateAgentYear = function(year) {
      $scope.agentYear = year;
      $scope.agentMonth = 0;
      $scope.agentMonthName='Month';
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, year, $scope.agentMonth);
    }

    $scope.updateAgentMonth=function(month){
      $scope.agentMonth=month.value;
      $scope.agentMonthName=month.month;
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);
    }

    $scope.checkIfDisable = function(){
      return (Object.keys($scope.agentData).length == 0 && $scope.agentMonth == 0)
    }
  }
]);
