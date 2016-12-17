app.controller('GradesCtrl', ['$scope', 'CurrentUser', function($scope, CurrentUser, $http) {

   $scope.user = CurrentUser.currentUser
}]);