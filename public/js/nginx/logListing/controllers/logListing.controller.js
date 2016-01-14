angular.module('logAggregator')
  .controller('logController', ['$scope', '$rootScope','logService',
    function($scope, $rootScope, logService){

        $rootScope.tab = 'logListing';
        $scope.showLogProgress = true;
        logService.getPath_count().then(function(response){
            data =  response.data;
            $scope.Path_Count = data.arr;//path_count data
            $scope.showLogProgress = false;
        });//close then

        $scope.pathClickEvent = function(obj){
            currentpath = (obj == "All") ? "All": obj.path;
            $scope.currentpath =  currentpath;
            $scope.showLogProgress = true;
            logService.getPathData(currentpath,1).then(function(response){

                count = response.data.count;
                $scope.view = (obj == "All") ? "All":"path";
                $scope.clickedPath = response.data.collection_data;
                $scope.no_of_pgs = (parseInt(count/100) + 1) ;
                $scope.getPgs = function(num){
                    return new Array(num);
                }
            });
            $scope.currentpage = 1;
        };//close pathclick event

        $scope.pathClickEvent("All");

        $scope.pagenoClickEvent = function(pgno){
            $scope.currentpage = pgno;
            logService.getPathData(currentpath,pgno).then(function(response){
                $scope.clickedPath = response.data.collection_data;
            });
        }//close pagenoClickEventlick event

    }//close fn
]);
