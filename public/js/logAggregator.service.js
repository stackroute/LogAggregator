angular.module('logAggregator').factory('loadConfig', ['$http',
  function($http) {
    var factory={};
    var config;
    factory.getdata=function(success){
      if(config){
        success(config);
        return;
      }
      $http.get('/config').success(function(data){
        config=data;
        success(config);
      });
    };
    return factory;
}

]);
