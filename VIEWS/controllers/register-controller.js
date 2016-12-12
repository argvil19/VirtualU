
app.controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location){

  $scope.register = function(user){
    console.log('Regsitering User:', user);
    var req = {
      method: 'POST',
      url: '/register',
      data: JSON.stringify(user)
    };

    $http(req)
    .then(function(res){
      $location.path('/login');
    })
    .catch(function(err){
      console.log(err);
      $scope.message = 'username already exists!';
    });
  }

}]);
