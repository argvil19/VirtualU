app.controller('tableController', ['$scope', 'State', '$route', '$routeParams', function($scope, State, $route, $routeParams) {




    $scope.correct = [];
    $scope.incorrect = [];
    $scope.neither = [];

    for (var i = 0; i < 20; i++) {
        $scope.correct.push(0);
        $scope.incorrect.push(0);
        $scope.neither.push(0);
    }
    //Changed array into map of tables
    $scope.$on('$locationChangeStart', function(event) {

        //Grab section number
        var section = $routeParams.section;

        //Save table according to section number
        State.tableSave[section] = $scope.table;
    });

    bootbox.alert("The objective of this exercise is for you to interpret the following code. Fill in the table provided with the correct values in each step. Goodluck!");

    //Function to decide if the user has finished the tutorial
    var done = function(argument) {

        var doneLength = $scope.table.length - 1;
        var numDone = 0;
        var index = 0;

        $scope.table.forEach(function(row) {
            // console.log("Row" + JSON.stringify(row));
            if (row.result == "green") {
                numDone++;
            }
            if ($scope.table[index].result == "yellow") {
                $scope.correct[index] = 0;
                $scope.incorrect[index] = 0;
                $scope.neither[index] = 1;
            } else if ($scope.table[index].result == "green") {
                $scope.correct[index] = 1;
                $scope.incorrect[index] = 0;
                $scope.neither[index] = 0;
            } else if ($scope.table[index].result == "red") {
                $scope.correct[index] = 0;
                $scope.incorrect[index] = 1;
                $scope.neither[index] = 0;
            } else {
                $scope.correct[index] = 0;
                $scope.incorrect[index] = 0;
                $scope.neither[index] = 0;
            }
            index++;
        });

        //Set what tutorial was completed
        if (numDone == doneLength) {
            var section = $routeParams.section;

            if (section == "10.6") {
                State.complete[0] = true;
            } else if (section == "10.5") {
                State.complete[1] = true;
            } else if (section == "10.7") {
                State.complete[2] = true;
            } else if (section == "10.2") {
                State.complete[3] = true;
            } else if (section == "10.8") {
                State.complete[4] = true;
            } else if (section == "10.4") {
                State.complete[5] = true;
            } else if (section == 'conditional') {
                State.complete[6] = true;
            }

            return true;
        } else
            return false;
    }

    if (State.tableSave[$routeParams.section] != undefined) {
        $scope.table = State.tableSave[$routeParams.section];
    } else {
        $scope.table = State.setTable($routeParams.section);
        State.attempt = 0;
        State.checkattempt = 0;
    }

    $scope.enable = [false, false, false, false, false, false, false];

    var getTable = function() {
        var section = $routeParams.section;

        for (var bit in $scope.enable) {
            bit = false;
        }

        if (section == "10.6") {

            $scope.enable[0] = true;
            $scope.condCheck = false;
            return [{
                    step: "step",
                    aOfk: "a(4-k)",
                    bOfk: "b(k)",
                    junkBefore: "Old Junk",
                    junk: "New Junk",
                    blah: "",
                    result: "Result"
                },
                { step: 1, aOfk: 2, bOfk: 3, junkBefore: 0, junk: 6, result: "white" },
                { step: 2, aOfk: 1, bOfk: -1, junkBefore: 6, junk: 5, result: "white" },
                { step: 3, aOfk: 0, bOfk: 2, junkBefore: 5, junk: 5, result: "white" }
            ];
        } else if (section == "10.5") {
            $scope.enable[1] = true;
            $scope.condCheck = false;
            return [{
                    step: "Step",
                    m: "m",
                    n: "n",
                    xOfM: "x(m)",
                    yOfN: "y(n)",
                    outOfmn: "out(m,n)",
                    blah: "",
                    result: "result"
                },
                { step: "1", m: 1, n: 3, xOfM: 5, yOfN: 4, outOfmn: 9, result: "white" },
                { step: "2", m: 1, n: 2, xOfM: 5, yOfN: 2, outOfmn: 7, result: "white" },
                { step: "3", m: 1, n: 1, xOfM: 5, yOfN: 0, outOfmn: 5, result: "white" },
                { step: "4", m: 3, n: 3, xOfM: 0, yOfN: 4, outOfmn: 4, result: "white" },
                { step: "5", m: 3, n: 2, xOfM: 0, yOfN: 2, outOfmn: 2, result: "white" },
                { step: "6", m: 3, n: 1, xOfM: 0, yOfN: 0, outOfmn: 0, result: "white" }
            ];
        } else if (section == "10.7") {
            $scope.enable[2] = true;
            $scope.condCheck = false;
            return [
                { step: "step", index: "index", xOfIndex: "x(index)", count: "count", blah: "", result: "result" },
                { step: "1", index: 1, xOfIndex: 2, count: 1, result: "white" },
                { step: "2", index: 2, xOfIndex: -3, count: 1, result: "white" },
                { step: "3", index: 3, xOfIndex: -5, count: 1, result: "white" },
                { step: "4", index: 4, xOfIndex: 0, count: 2, result: "white" },
                { step: "5", index: 5, xOfIndex: -3, count: 2, result: "white" }
            ];
        } else if (section == "10.2") {
            $scope.enable[3] = true;
            $scope.condCheck = false;
            return [
                { step: "Step", x: 'x', varOfX: 'var(x+2)', index: 'index', y: 'y', blah: '', result: "result" },
                { step: "1", x: 3, varOfX: 6, index: 1, y: 6, result: "white" },
                { step: "2", x: 2, varOfX: 0, index: 3, y: '6 0 0', result: "white" },
                { step: "3", x: 1, varOfX: 5, index: 5, y: '6 0 0 0 5', result: "white" },
                { step: "4", x: 1, varOfX: 5, index: 5, y: '6 -6 0 0 5', result: "white" }
            ];
        } else if (section == "10.8") {
            $scope.enable[4] = true;
            $scope.condCheck = false;
            return [{
                    step: 'Step',
                    index: 'index',
                    numOfIndex: 'numbers(index)',
                    count: 'count',
                    blah: '',
                    result: 'result'
                },
                { step: '1', index: 1, numOfIndex: 2, count: 0, result: 'white' },
                { step: '2', index: 2, numOfIndex: -4, count: 1, result: 'white' }
            ];
        } else if (section == "10.4") {
            $scope.enable[5] = true;
            $scope.condCheck = false;
            return [
                { step: 'step', k: 'k', xOfk: 'x(k)', yOfxOfk: 'y(x(k))', z: 'z', blah: '', result: 'result' },
                { step: '1', k: 7, xOfk: 3, yOfxOfk: '4', z: '0 0 0 0 0 0 4', result: "white" },
                { step: '2', k: 6, xOfk: 5, yOfxOfk: '8', z: '0 0 0 0 0 8 4', result: "white" },
                { step: '3', k: 5, xOfk: 4, yOfxOfk: '6', z: '0 0 0 0 6 8 4', result: "white" },
                { step: '4', k: 4, xOfk: 2, yOfxOfk: '2', z: '0 0 0 2 6 8 4', result: "white" }
            ];
        } else if (section == 'conditional') {
            $scope.enable[6] = true;
            $scope.condCheck = true;
            return [
                { step: '', cond1: 'a <= b & c < d', cond2: 'b < c | c < d', cond3: 'd >= c', x: 'x', blah: '', result: 'result' },
                { step: '', cond1: 'false', cond2: 'true', cond3: 'true', x: '1', result: "white" }
            ];
        }

    }



    $scope.compTable = getTable();
    $scope.done = done();

    //Alerts controller.
    var alerts = function(index) {
        if ($scope.table[index].result == "yellow") {
            $scope.correct[index] = 0;
            $scope.incorrect[index] = 0;
            $scope.neither[index] = 1;
        } else if ($scope.table[index].result == "green") {
            $scope.correct[index] = 1;
            $scope.incorrect[index] = 0;
            $scope.neither[index] = 0;
        } else if ($scope.table[index].result == "red") {
            $scope.correct[index] = 0;
            $scope.incorrect[index] = 1;
            $scope.neither[index] = 0;
        } else {
            $scope.correct[index] = 0;
            $scope.incorrect[index] = 0;
            $scope.neither[index] = 0;
        }
    }

    //Will check if a row with the given index value has correct values.
    $scope.check = function(index) {

        //Set pass to default
        var pass = true;

        //Check against actual answers
        for (var key in $scope.compTable[index]) {
            //console.log(key + ": " + $scope.table[index][key]);
            if (key == "step" || key == "result") continue;

            if (!$scope.table[index][key] || $scope.table[index][key] == '') {
                bootbox.alert('Fill all fields please');
                return;
            }

            if ($scope.compTable[index][key] != $scope.table[index][key])
                pass = false;
        }

        //If not yellow then fill green
        if (pass == true && ($scope.table[index].result == "white" || $scope.table[index].result == "red"))
            $scope.table[index].result = "green";
        else {
            //If not filled or incorrect then mark incorrect
            if ($scope.table[index].result == "white")
                $scope.table[index].result = "red"
        }

        //Alerts
        alerts(index);

        //Add to attempts
        State.AddCheckAttempt();

        //Check if all green then user is done.
        $scope.done = done();
    };



    //Will fill a row if not already filled and not already answered correct.
    $scope.fill = function(row) {

        if (State.attempt >= 1 && State.checkattempt > 2) {

            //If result not green
            if ($scope.table[row].result != "green") {

                //Fill all values
                for (var key in $scope.table[row]) {
                    $scope.table[row][key] = $scope.compTable[row][key];
                }

                //Indicate filled row
                $scope.table[row].result = "yellow";
            }
        } else {
            //Direct user to reference material.
            if (State.attempt < 1)
                bootbox.alert("Don't give up now. See reference material and try again.", function() {

                });
            //Inform user to make another attempt to fill in a row
            else if (State.checkattempt <= 2)
                bootbox.alert("Please make another attempt.", function() {

                });
        }
        alerts(row);
    }
}]);
