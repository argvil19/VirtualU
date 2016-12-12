
app.controller('registerController', ['$scope', '$http', function($scope, $http){

  $scope.register = function(user){
    console.log('Regsitering User:', user);
    var req = {
      method: 'POST',
      url: '/register',
      data: JSON.stringify(user)
    };

    $http(req)
    .then(function(res){
      
    })
    .catch(function(err){
      console.log(err);
    });
  }

}]);
