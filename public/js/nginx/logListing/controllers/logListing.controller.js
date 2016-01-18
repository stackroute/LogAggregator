angular.module('logAggregator').controller('logController', ['$scope', '$rootScope','logService','$interval',
function($scope, $rootScope, logService, $interval) {
  $rootScope.tab = 'logListing';
  $scope.showLogProgress = true;
  var onComplete =
  $interval(function(){
      if($rootScope.tab == 'logListing') {
        logService.getPath_count().then(function(response) {
          data =  response.data;
          $scope.Path_Count = data.arr;//path_count data
          $scope.showLogProgress = false;
          console.log("refreshing");
        });  //close then
      }
      else {
       $interval.cancel(onComplete);
      }
  },1000);

  $scope.pathClickEvent = function(obj) {
    $scope.showLogDataProgress = true;
    currentpath = (obj == "All") ? "All": obj.path;
    $scope.currentpath =  currentpath;
    logService.getPathData(currentpath,1).then(function(response) {
        count = response.data.count;
        $scope.view = (obj == "All") ? "All":"path";
        $scope.clickedPath = response.data.collection_data;
        $scope.no_of_pgs = (parseInt(count/100) + 1) ;
        $scope.getPgs = function(num){
          return new Array(num);
        };
        $scope.$watch('showLogProgress', function() {
          if(!$scope.showLogProgress)
            $scope.showLogDataProgress = $scope.showLogProgress;
        });
      });
    $scope.currentpage = 1;
  };//close pathclick event

  $scope.pathClickEvent("All");

  $scope.pagenoClickEvent = function(pgno) {
    $scope.showLogDataProgress = true;
    $scope.currentpage = pgno;
    logService.getPathData(currentpath,pgno).then(function(response) {
      $scope.clickedPath = response.data.collection_data;
      $scope.showLogDataProgress = false;
    });
  }//close pagenoClickEventlick event
}]);//close fn
