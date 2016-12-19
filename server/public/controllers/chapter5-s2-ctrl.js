app.controller('Chapter5S2Ctrl', function($scope, $http) {

    $scope.alert = "im working"

    $scope.CheckQ1 = function() {
        console.log("in q1")
        if ($scope.question1.answer1 == true && $scope.question1.answer2 == false && $scope.question1.answer3 == false && $scope.question1.answer4 == false) {
            $scope.resultq1 = "Correct"
        } else {
            $scope.resultq1 = "Incorrect"
        }
    }

    $scope.Random = function() {
        return Math.floor((Math.random() * 3) + 1);
    }

    $scope.CheckQ2 = function() {

        if ($scope.question2.answer1 == true && $scope.question2.answer2 == false && $scope.question2.answer3 == false && $scope.question2.answer4 == false) {
            $scope.resultq2 = "Correct"
        } else {
            $scope.resultq2 = "Incorrect"
        }
    }

    $scope.CheckQ3 = function() {

        if ($scope.question3.answer1 == true && $scope.question3.answer2 == false && $scope.question3.answer3 == false && $scope.question3.answer4 == false) {
            $scope.resultq3 = "Correct"
        } else {
            $scope.resultq3 = "Incorrect"
        }
    }

});