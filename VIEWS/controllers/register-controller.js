
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
      $scope.message = res.data;
    })
    .catch(function(err){
      $scope.message = err.data;
    });
  }

}]);
