angular.module('logAggregator').controller('ExampleController', ['$scope',

    .controller('pathsControl', ['$scope',
      function($scope) {
            console.log("in listing  controller");
            pathsArray.load().success(function(data){
                    var no_of_paths=10,
                    no_of_paths = config.paths;
                    paths_selected=[];
                    data = JSON.parse(data);

                    for(var i=0; i<no_of_paths; i++)
                    {
                      //storing paths into an array

                        paths_selected.push({"path": data.arr[i]["path"],
                        "count": data.arr[i]["count"]
                        });
                    }
          });

          $scope.paths= paths_selected;

      }//close fn

    ]);
