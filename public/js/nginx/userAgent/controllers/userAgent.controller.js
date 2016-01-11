angular.module('logAggregator').controller('userAgentController', ['$scope', 'getAgentData',
  function($scope, getAgentData) {

    var thisYear = (new Date).getFullYear();

    $scope.agentYear = thisYear;
    $scope.yearsToShow = [2016, 2015, 2014, 2013, 2012];
    $scope.agentMonth = 0;

    var handleSuccess = function(response) {
      $scope.agentData = response.data;
    };

    var handleError = function(response) {
      $scope.agentData = {};
      render(criteria, $scope.agentData);
    }

    $scope.renderData = function(criteria) {
      $scope.agentCriteria = criteria;
      var year = $scope.agentYear;
      var month = $scope.agentMonth;
      getAgentData.getAgentData(handleSuccess, handleError, criteria);
      $('.criteriaPane').attr("class", "btn btn-default criteriaPane");
      $('.criteriaPane').addClass("noBorder");
      var elementId = "#"+criteria+"Share";
      $(elementId).addClass("withBorder");
    }
  }
]);
