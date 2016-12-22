app.controller('pcController', function($scope) {

    /*
     * Model Variables
     */
    $scope.x = 3;
    $scope.term = 1;
    $scope.contrib = 1;
    $scope.estimate = 1;
    $scope.mathJax = '';
    $scope.difference = 10000;

    /*
     * Model of table
     */
    $scope.table = [];
    $scope.compTable = [];

    /*
     *   Name: Check
     *   Description: Checks user input against actual answer
     */
    $scope.check = function(row) {
        console.log("Contib: " + $scope.table[row].contrib);
        if ($scope.table[row].contrib == $scope.compTable[row].contrib && $scope.table[row].estimate == $scope.compTable[row].estimate) {
            //console.log('Correct!');
            alert('Correct!');
            $scope.table[row].estimate = $scope.compTable[row].estimate;

            $scope.compTable[row].result = "green";
            $scope.table[row].result = $scope.compTable[row].result;
        } else {
            alert('Incorrect!');
        }
    };

    /*
     *   Name: sFact
     *   Description: Computes the factorial of a given value
     */
    function sFact(num) {
        var rval = 1;
        for (var i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }

    /*
     *   Name: Init
     *   Description: Initializes table and compTable
     */
    (function init() {
        var difference = 10000;
        var term = 0,
            contrib = 0,
            estimate = 0;
        var x = 3;
        var mathjax;

        while (difference > 0.1) {

            var pwr = Math.pow(x, term);
            var fct = sFact(term);
            contrib = pwr / fct;

            var old = estimate;
            estimate += contrib;
            mathjax = old + ' + ' + contrib + ' = ' + estimate;

            difference = estimate - old;
            console.log('Estimate: ' + estimate + ' Old: ' + old);
            $scope.table.push({ term: term + 1, contrib: 0, estimate: 0, visible: true, result: "red" });
            $scope.compTable.push({ term: term + 1, contrib: contrib, estimate: estimate, result: "red" });
            term += 1;
        }

    })();

    /*
     *   Name: Fill
     *   Description: Used to fill in table as a whole or row by row
     */
    $scope.fill = function(row) {

        if (row || row == 0) {
            $scope.table[row].contrib = $scope.compTable[row].contrib;
            $scope.table[row].estimate = $scope.compTable[row].estimate;
            $scope.table[row].result = $scope.compTable[row].result = "yellow";
            return;
        }

        $scope.table.length = 0;

        while ($scope.difference > 0.1) {

            if ($scope.term == 1) {
                $scope.contrib = 1;
                $scope.estimate = 1;
                $scope.mathJax = $scope.estimate;
            } else {
                var pwr = Math.pow($scope.x, $scope.term - 1);
                var fct = sFact($scope.term - 1);
                $scope.contrib = pwr / fct;

                var old = $scope.estimate;
                $scope.estimate += $scope.contrib;
                $scope.mathJax = old + ' + ' + $scope.contrib + ' = ' + $scope.estimate;

                $scope.difference = $scope.estimate - old;
                console.log('Estimate: ' + $scope.estimate + ' Old: ' + old);
            }

            $scope.table.push({ term: $scope.term, contrib: $scope.contrib, estimate: $scope.mathJax, result: "yellow" });

            $scope.term += 1;
        }
    }
});