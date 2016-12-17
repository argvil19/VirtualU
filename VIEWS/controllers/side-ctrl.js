/* Created by Juan Barajas */

app.controller('sideController', ['$scope', '$location', 'State', function($scope, $location, State) {



    $scope.enablelecture = State.statelecture;
    $scope.enableExample = State.stateexample;

    $scope.visual = false;
    $scope.pseudo = false;
    $scope.tutorial = true;
    $scope.hw = false;
    $scope.complete = State.complete;


    $scope.go = function(path, sectionNumber) {
        console.log(path);

        if (path == 'chapter10') {
            console.log('chpater 10');
            $scope.chapter10 = 1;
            $scope.chapter9 = 0;

        }

        if (path == 'chapter9') {
            console.log('chpater 9');
            $scope.chapter9 = 1;
            $scope.chapter10 = 0;

        }

        if (path == 'notes' || path == 'lectureVideo' || path == 'exampleVideo')
            State.AddAttempt();

        if (path == 'exampleVideo' && sectionNumber == 10.1) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[1] = true;
            console.log('im in  here');

            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 10.2) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[2] = true;
            console.log('im in  here');

            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 10.3) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[3] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 10.4) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[4] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 10.5) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[5] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 10.6) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[6] = true;
            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 9.1) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[7] = true;
            $scope.enableExample = State.stateexample;

        }

        if (path == 'exampleVideo' && sectionNumber == 9.2) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[8] = true;
            $scope.enableExample = State.stateexample;

        }
        if (path == 'exampleVideo' && sectionNumber == 9.3) {
            State.stateexample = [false, false, false, false, false, false];
            State.stateexample[9] = true;
            $scope.enableExample = State.stateexample;

        }
        //cut off for example videos











        if (path == 'lectureVideo' && sectionNumber == 10.1) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[1] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }
        if (path == 'lectureVideo' && sectionNumber == 10.2) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[2] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }
        if (path == 'lectureVideo' && sectionNumber == 10.3) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[3] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }
        if (path == 'lectureVideo' && sectionNumber == 10.4) {
            State.statelecture = [false, false, false, false, false, false];
            State.statelecture[4] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        if (path == 'lectureVideo' && sectionNumber == 9.1) {
            State.statelecture = [false, false, false, false, false, false, false, false, false];
            State.statelecture[5] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        if (path == 'lectureVideo' && sectionNumber == 9.2) {
            State.statelecture = [false, false, false, false, false, false, false, false, false];
            State.statelecture[6] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        if (path == 'lectureVideo' && sectionNumber == 9.3) {
            State.statelecture = [false, false, false, false, false, false, false, false, false];
            State.statelecture[7] = true;
            console.log('im in  here');

            $scope.enablelecture = State.statelecture;

        }

        //Simple control for side bar.
        switch (path) {
            case 'tutorial':
                // $scope.tutorial = true;
                $scope.pseudo = true;
                $scope.visual = true;
                $scope.hw = true;
                break;
            case 'animation':
                $scope.pseudo = true;
                $scope.visual = false;
                $scope.hw = true;
                break;
            case 'sudoCode':
                $scope.pseudo = false;
                $scope.visual = true;
                $scope.hw = true;
                break;
            case 'example':
                $scope.pseudo = false;
                $scope.visual = false;
                $scope.hw = false;
                break;
            default:
                $scope.hw = true;
                $scope.pseudo = false;
                $scope.visual = false;
        }


        $location.path(path).search({ section: sectionNumber });

    };
}]);
