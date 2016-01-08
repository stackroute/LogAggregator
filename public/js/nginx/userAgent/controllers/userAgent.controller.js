angular.module('logAggregator').controller('userAgentController', ['$scope', 'getAgentData',
  function($scope, getAgentData) {

    var thisYear = (new Date).getFullYear();
    $('#yearDropDown').attr('value', thisYear)
                      .html(thisYear+" <span class='caret'></span>")
    $scope.agentYear = thisYear;

    var string = "";
    ///change the number of years from 6 to take from config file
    for(var k=0; k<6; k++) {
      string = string + "<li><a href='#' value='"+thisYear+"'>"+thisYear+"</a></li> ";
      thisYear = thisYear - 1;
    }
    $('#agentAnalytics .filters .yearSelect').html(string);
    $scope.agentMonth = 0;

    $scope.renderData = function(criteria) {
      $scope.agentCriteria = criteria;
      var year = $scope.agentYear;
      var month = $scope.agentMonth;
      console.log("hi");
      var data = getAgentData;
      console.log(data);
      render(criteria, data);
      $('.criteriaPane').attr("class", "btn btn-default criteriaPane");
      $('.criteriaPane').addClass("noBorder");
      var elementId = "#"+criteria+"Share";
      $(elementId).addClass("withBorder");
      e.preventDefault();
    }
  }
]);
