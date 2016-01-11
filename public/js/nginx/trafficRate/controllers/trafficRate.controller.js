angular.module('logAggregator').controller('trafficRateController', ['$scope','getTrafficData',
  function($scope , getTrafficData) {
    var years=[];
    var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    //var values=['01','02','03','04','05','06','07','08','09','10','11','12'];
    var currentYear = (new Date).getFullYear();
    years.push(currentYear);
    var Year=currentYear;
    for(var i=0;i<7;i++)   //value 7 is the noOfYears in config file.
    {
      Year=Year-1;
      years.push(Year);
    }
    $scope.years = years;
    $scope.months=months;

    $scope.render = function() {
      var year = $scope.currentYear;
      var month = 0;
      console.log("hi");
      var data = getTrafficData;
      console.log(data);
      Plotting(data);
      e.preventDefault();
    }
  }
]);
