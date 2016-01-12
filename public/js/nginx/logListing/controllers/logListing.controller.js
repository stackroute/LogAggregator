angular.module('logAggregator')

  .controller('logController', ['$scope','logService',function($scope,logService) {

          $scope.paths_selected = [];
          currentpath = {};
          count=0;

          logService.disparray().then(function(response){

                    data =  response.data;



                    $scope.paths_selected = data.arr;

             });//close then

            $scope.pathClickEvent = function(obj){

                  currentpath = (obj=="All") ? "All": obj.path;
                  $scope.currentpath =  currentpath;
                  logService.dispObj(currentpath,1).then(function(response){

                              count = response.data.count;
                              $scope.view=(obj=="All") ? "All":"path";
                              $scope.clickedObj=response.data.collection_data;
                              $scope.numPages = (parseInt(count/100) + 1) ;
                              $scope.getPgs = function(num){
                                    return new Array(num);
                                  }

                  });
                  $scope.currentpage = 1;
              };//close click event
              $scope.pathClickEvent("All");
              

              $scope.pagenoClickEvent = function(pgno){

                    $scope.currentpage = pgno;
                    logService.dispObj(currentpath,pgno).then(function(response){
                        $scope.clickedObj=response.data.collection_data;
                    });
              }


              $scope.pathClickEvent('All');



    }//close fn

]);
