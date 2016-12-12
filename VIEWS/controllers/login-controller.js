
'use strict'

app.controller('loginController', ['$scope', 'httpService', function($scope, httpService){

  $scope.login = function(user){
    console.log(user);
    httpService({
      url: '/login',
      method: 'POST',
      data: JSON.stringify(user),
      successCallback: function(res){
        $scope.message = res.data;
      },
      errorCallack: function(err){
        $scope.message = err.data;
      }
    });
  }

  $scope.init = function(){
    console.log('Login Controller Loaded!');
  };
}]);
