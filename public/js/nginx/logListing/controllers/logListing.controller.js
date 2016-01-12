angular.module('logAggregator')

  .controller('logController', ['$scope','logService',function($scope,logService) {

          $scope.paths_selected = [];
          currentpath = {};
          count=0;

          logService.disparray().then(function(response){

                    data =  JSON.parse(JSON.parse(response.data));
                    //console.log(data.arr);
                    $scope.paths_selected = data.arr;



                         });//close then
                $scope.pathClickEvent = function(obj){
                  //console.log(obj.path);

                    currentpath = (obj=="All") ? "All": obj.path;console.log("curpath "+currentpath);
                          logService.dispObj(currentpath,1).then(function(response){
                              count = response.data.count;
                              $scope.view=(obj=="All") ? "All":"path";
                              console.log(response.data);
                              console.log("count-->  "+count);
                              $scope.clickedObj=response.data.collection_data;
                              $scope.numPages = (parseInt(count/100) + 1) ;
                              console.log("fdfd---> "+$scope.numPages);
                                $scope.getPgs = function(num){
                                    return new Array(num);
                                  }

                          });


                        // //console.log($scope.getPgs(3));
                        // $scope.myFilter = function(value) {
                        //        console.log('filter '+ value.size);
                        //        return (value.size.charAt('1'));
                        //     };
                  };//close click event
                $scope.pagenoClickEvent = function(pgno){
                      logService.dispObj(currentpath,pgno).then(function(response){
                        $scope.clickedObj=response.data.collection_data;
                });
              }






        }//close fn

    ]);

angular.module('logAggregator')
          .filter('sizeFilter',function(){

            return function(input){


              size=parseInt(input)/8;
              if(size>1000 && size<1000000)

                  {size = parseFloat(size)/1000;
                   size = (size).toFixed(2)+ " KB" ;}

              else if (size<1000 ) {
                   size = size + " B" ;}

              else if (size>1000000 ) {
                 size = parseFloat(size)/1000000;
                 size = (size).toFixed(2)+ " MB" ;
               }
              return size;
            }

          });

          angular.module('logAggregator')
                    .filter('agentFilter',function(){

                      return function(input){

                          temp = input;
                          title="";
                          if(temp.indexOf("Chrome") != -1)
                              {title="Chrome";}
                          else if (temp.indexOf("Safari")!= -1)
                              {title="Safari";}
                          else if (temp.indexOf("Trident")!= -1)
                              {title="IE";}
                          else if (temp.indexOf("Vagrant")!= -1)
                              {title="Others";}
                          else if (temp.indexOf("Opr")!= -1)
                               {title="Opera";}
                          else if (temp.indexOf("-")!= -1)
                              {title="Others";}
                          else
                                {title="Mozilla";}


                          return title;
                      }
          });
