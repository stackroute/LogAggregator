angular.module('logAggregator').controller('trafficRateController', ['$scope', '$rootScope', 'getTrafficData', '$interval',
function($scope, $rootScope, getTrafficData, $interval) {
  $rootScope.tab = 'requestRate';
  var years = [];
  var months = $scope.config.months;
  var currentYear = (new Date).getFullYear();
  var currentMonth = (new Date).getMonth() + 1;
  years.push(currentYear);
  var Year = currentYear;
  for(var i = 0; i<$scope.config.noOfYears; i++)
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
  $scope.monthValue = months[currentMonth-1].value;
  // $scope.trafficData = [{}, {}];
  var onComplete=function(){
    var tabListener = $rootScope.$watch("tab", function() {
      if($rootScope.tab != 'requestRate') {
        $interval.cancel(off);
        tabListener();
      }
    });
    var off = $interval(function() {
      if($rootScope.tab == 'requestRate') {
        getTrafficData.getData($scope.yearSelected, $scope.monthValue).then(
          function(response) {
          var data = response.data;
          $scope.trafficData = data;
        },function(error){
          var data = [2];
          $scope.trafficData = data;
        }
        );
      }
    }, $scope.config.refreshInterval);
};


  getTrafficData.getData(currentYear, currentMonth,onComplete).then(function(response) {
    var data = response.data;
    $scope.trafficData = data;
    if (Object.keys(data[1]).length == 0) {
      $scope.monthMenu = true;
      $scope.monthSwitch = true;
    }
    $scope.clearSwitch = true;
    $scope.showProgress = false;
  },function(error){
    var data = [2];
    $scope.trafficData = data;
    $scope.showProgress = false;
    console.log("error");}
  );


  $scope.renderYearTraffic = function(year) {
    $scope.yearSelected = year;
    $scope.monthSelected = "Month";
    $scope.monthValue=0;
    month = 0;
    $scope.showProgress = true;
    getTrafficData.getData(year, month).then(function(response) {
      var data = response.data;
      $scope.trafficData = data;
      if (Object.keys(data[1]).length == 0) {
        $scope.monthSwitch = true;
        $scope.monthMenu = true;
        $scope.clearSwitch = false;
        $scope.showProgress = false;
      }  else {
        $scope.monthMenu = false;
        $scope.monthSwitch = true;
        $scope.clearSwitch = false;
        $scope.showProgress = false;
      }
    },function(error){
      var data = [2];
      $scope.trafficData = data;
      $scope.showProgress = false;
      console.log("error");}
    );
  }

  $scope.renderMonthTraffic = function(month, monthValue) {
    year = $scope.yearSelected;
    $scope.monthSelected = month;
    $scope.monthValue=monthValue;
    $scope.showProgress = true;
    getTrafficData.getData(year, monthValue).then(function(response) {
      var data = response.data;
      $scope.trafficData = data;
      if (year == currentYear && month == currentMonth)
      {
        $scope.clearSwitch=true;
      }
      else{
      $scope.monthSwitch=false;
      $scope.clearSwitch=false;
      $scope.showProgress = false;
     }
   },function(error){
     var data = [2];
     $scope.trafficData = data;
      $scope.showProgress = false;
     console.log("error");}
   );
  }

  $scope.monthFilter = function() {
    if($scope.monthSwitch==true){
      return false;
    }
    $scope.monthSelected = "Month";
    $scope.monthValue = 0;
    $scope.showProgress = true;
    getTrafficData.getData($scope.yearSelected, 0).then( function(response) {
      var data = response.data;
      $scope.trafficData = data;
      $scope.monthSwitch = true;
      $scope.clearSwitch = false;
      $scope.showProgress = false;
    },function(error){
      var data = [2];
      $scope.trafficData = data;
      $scope.showProgress = false;
      console.log("error");}
    );
  }

  $scope.clearFilters = function() {
    if($scope.clearSwitch==true){
      return false;
    }
    $scope.yearSelected = currentYear;
    $scope.monthSelected = months[currentMonth-1].month;
    $scope.monthValue = months[currentMonth-1].value;
    $scope.showProgress = true;
    getTrafficData.getData(currentYear, currentMonth).then( function(response) {
      var data = response.data;
      $scope.trafficData = data;
      if (Object.keys(data[1]).length == 0)
      {
        $scope.monthMenu = true;
        $scope.monthSwitch = true;
      }
      $scope.monthMenu = false;
      $scope.monthSwitch = false;
      $scope.clearSwitch = true;
      $scope.showProgress = false;
    },function(error){
      var data = [2];
      $scope.trafficData = data;
      $scope.showProgress = false;
      console.log("error");}
    );
  }
}
]);
