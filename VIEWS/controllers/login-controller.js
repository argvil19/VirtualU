
'use strict'

app.controller('loginController', ['$scope', function($scope){

  $scope.login = function(user){
    console.log(user);
  }

  $scope.init = function(){
    console.log('Login Controller Loaded!');
  };
}]);
