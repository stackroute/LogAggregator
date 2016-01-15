angular.module('logAggregator').controller('trafficRateController', ['$scope', '$rootScope', 'getTrafficData',
function($scope, $rootScope, getTrafficData) {
  $rootScope.tab = 'requestRate';
  var years = [];
  var months = $scope.config.months;
  var currentYear = (new Date).getFullYear();
  var currentMonth = (new Date).getMonth() + 1;
  years.push(currentYear);
  var Year = currentYear;
  for(var i=0; i<$scope.config.noOfYears; i++)
  {
    Year = Year - 1;
    years.push(Year);
  }
  $scope.years = years;
  $scope.months = months;
  $scope.yearSelected = currentYear;
  $scope.monthSelected = months[currentMonth-1].month;
  $scope.monthSwitch = false;
  $scope.monthMenu = false;
  $scope.clearSwitch = false;
  $scope.showProgress = true;

  getTrafficData.getData(currentYear, currentMonth).then(function(response) {
    var data = response.data;
    if(Object.keys(data[1]).length == 0) {
      $scope.monthMenu = true;
      $scope.monthSwitch = true;
    }
    Plotting(data, currentYear, currentMonth);
    $scope.clearSwitch = true;
    $scope.showProgress = false;
  });

  $scope.renderYearTraffic = function(year) {
    $scope.yearSelected = year;
    $scope.monthSelected = "Month";
    month = 0;
    $scope.showProgress = true;
    getTrafficData.getData(year, month).then(function(response) {
      var data = response.data;
      if(Object.keys(data[1]).length == 0) {
        $scope.monthSwitch = true;
        $scope.monthMenu = true;
        Plotting(data, year, 0);
        $scope.clearSwitch = false;
        $scope.showProgress = false;
      }
      else {
        $scope.monthMenu = false;
        $scope.clearSwitch = false;
        Plotting(data, year, 0);
        $scope.showProgress = false;
      }
    });
  }

  $scope.renderMonthTraffic = function(month, monthValue) {
    year = $scope.yearSelected;
    $scope.monthSelected = month;
    $scope.showProgress = true;
    getTrafficData.getData(year, monthValue).then(function(response) {
      var data = response.data;
      $scope.monthSwitch = false;
      if(year == currentYear && month == currentMonth)
      {
        $scope.clearSwitch = false;
        $scope.monthSwitch = true;
      }
      Plotting(data, year, monthValue);
      $scope.showProgress = false;
    });
  }

  $scope.monthFilter = function() {
    $scope.monthSelected = "Month";
    $scope.showProgress = true;
    getTrafficData.getData($scope.yearSelected, 0).then( function(response) {
      var data = response.data;
      $scope.monthSwitch = true;
      $scope.clearSwitch = false;
      Plotting(data, $scope.yearSelected, 0);
      $scope.showProgress = false;
    });
  }

  $scope.clearFilters = function() {
    $scope.yearSelected = currentYear;
    $scope.monthSelected = months[currentMonth-1].month;
    $scope.showProgress = true;
    getTrafficData.getData(currentYear, currentMonth).then( function(response) {
      var data = response.data;
      if(Object.keys(data[1]).length == 0)
      {
        $scope.monthMenu = true;
        $scope.monthSwitch = true;
      }
      $scope.clearSwitch = true;
      Plotting(data, currentYear, currentMonth);
      $scope.showProgress = false;
    });
  }
}
]);
