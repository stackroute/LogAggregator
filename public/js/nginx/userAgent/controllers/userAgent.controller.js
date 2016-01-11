angular.module('logAggregator').controller('userAgentController', ['$scope', 'agentDataService',
  function($scope, agentDataService) {

    var thisYear = (new Date).getFullYear();

    $scope.agentYear = thisYear;
    $scope.yearsToShow = [2016, 2015, 2014, 2013, 2012];
    $scope.agentMonth = 0;
    $scope.agentMonthName="Month";
    $scope.agentData = {};
    var months=[{name:'January',value:1},{name:'February',value:2},{name:'March',value:3},
                {name:'April',value:4},{name:'May',value:5},{name:'June',value:6},
                {name:'July',value:7},{name:'August',value:8},{name:'September',value:9},
                {name:'October',value:10},{name:'November',value:11},{name:'December',value:'12'}
              ];
    $scope.months = months;

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
      $scope.agentMonthName=month.name;
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);
    }

    $scope.checkIfDisable = function(){
      return (Object.keys($scope.agentData).length == 0 && $scope.agentMonth == 0)
    }
  }
]);
