
'use strict';

app.factory('httpService', ['$http', function($http){

  return function(jsonParams){
    var req = {
      url: jsonParams.url,
      method: jsonParams.method || 'GET',
      data: jsonParams.data || {},
      successCallback: jsonParams.successCallback,
      errorCallack: jsonParams.errorCallack || function(err){
        console.log('Error on HTTP', this.method, 'to', this.url, ':', err);
      }
    };

    $http(req)
    .then(req.successCallback)
    .catch(req.errorCallack);
  };

}]);
