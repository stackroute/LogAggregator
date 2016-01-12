angular.module('logAggregator').controller('trafficRateController', ['$scope','getTrafficData',
function($scope , getTrafficData) {
  var years=[];
  var months=[
    {
      month:'January',
      value:01
    },
    {
      month:'February',
      value:02
    },
    {
      month:'March',
      value:03
    },
    {
      month:'April',
      value:04
    },
    {
      month:'May',
      value:05
    },
    {
      month:'June',
      value:06
    },
    {
      month:'July',
      value:07
    },
    {
      month:'August',
      value:08
    },
    {
      month:'September',
      value:09
    },
    {
      month:'October',
      value:10
    },
    {
      month:'November',
      value:11
    },
    {
      month:'December',
      value:12
    }
  ];

  var currentYear = (new Date).getFullYear();
  var currentMonth = (new Date).getMonth()+1;
  years.push(currentYear);
  var Year=currentYear;
  for(var i=0;i<$scope.config.noOfYears;i++)
  {
    Year=Year-1;
    years.push(Year);
  }
  $scope.years = years;
  $scope.months=months;
  $scope.yearSelected=currentYear;
  $scope.monthSelected=months[currentMonth-1].month;
  $scope.monthSwitch=false;
  $scope.monthMenu=false;
  $scope.clearSwitch=false;
  //$scope.isClickEnable=true;

  getTrafficData.getData(currentYear,currentMonth).then(function(response){
    var data=response.data;
    if(Object.keys(data[1]).length==0)
    {
      $scope.monthMenu=true;
      $scope.monthSwitch=true;
    }
    Plotting(data,currentYear,currentMonth);
    $scope.clearSwitch=true;
  });

  $scope.renderYearTraffic = function(year) {
    $scope.yearSelected=year;
    $scope.monthSelected="Month";
    month=0;
    getTrafficData.getData(year,month).then(function(response){
      var data=response.data;
      if(Object.keys(data[1]).length==0)
      {
        $scope.monthSwitch=true;
        $scope.monthMenu=true;
        Plotting(data,year,0);
        $scope.clearSwitch=false;
      }
      else
      {
        $scope.monthMenu=false;
        $scope.clearSwitch=false;
        Plotting(data,year,0);
      }
    });
  }

  $scope.renderMonthTraffic = function(month,monthValue) {
    year=$scope.yearSelected;
    $scope.monthSelected=month;
    getTrafficData.getData(year,monthValue).then(function(response){
      var data=response.data;
      $scope.monthSwitch=false;
      if(year==currentYear && month==currentMonth)
      {
        $scope.clearSwitch=false;
        $scope.monthSwitch=true;
      }
      Plotting(data,year,monthValue);
    });
  }

  $scope.monthFilter=function() {
    $scope.monthSelected="Month";
    getTrafficData.getData($scope.yearSelected,0).then(function(response){
      var data=response.data;
      $scope.monthSwitch=true;
      $scope.clearSwitch=false;
      Plotting(data,$scope.yearSelected,0);
    });
  }

  $scope.clearFilters=function() {
    $scope.yearSelected=currentYear;
    $scope.monthSelected=months[currentMonth-1].month;
    getTrafficData.getData(currentYear,currentMonth).then(function(response){
      var data=response.data;
      if(Object.keys(data[1]).length==0)
      {
        $scope.monthMenu=true;
        $scope.monthSwitch=true;
      }
      $scope.clearSwitch=true;
      Plotting(data,currentYear,currentMonth);
    });
  }
}
]);
