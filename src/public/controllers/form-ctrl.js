app.controller('formCtrl', ['$scope', 'State', function($scope, State) {


    $scope.aceOptions = {
        theme: 'crimson_editor',
        mode: 'matlab',
        useWrapMode: true
    };
    //$scope.textField = options[0]["string"];

    $scope.array = [];
    $scope.arrayString = "";
    $scope.type = "min";
    $scope.type2 = "max";
    $scope.textField = "";
    $scope.loopField = "";
    $scope.conditionalField = "";
    $scope.case = ">";
    $scope.mcWrong = false;
    $scope.mcWrite = false;

    //$scope.ran = Math.floor((Math.random()));



    $scope.load = function() {

        if (State.tableSave["pseudo"] == null) {
            $scope.build();
            State.tableSave["pseudo"] = $scope.array;
        } else {
            $scope.array = State.tableSave["pseudo"];
        }
    };

    $scope.load2 = function() {
        $scope.build();
        State.tableSave["pseudo"] = $scope.array;
    };

    $scope.build = function() {

        $scope.type = "min";
        $scope.type2 = "max";
        if (Math.random() < 0.5) {
            $scope.type = "max";
            $scope.type2 = "min";
        }

        $scope.array.length = 0;
        $scope.arrayString = "";
        $scope.correct = false;
        $scope.correct2 = false;
        $scope.loopField = "";
        $scope.conditionalField = "";
        $scope.case = ">";
        $scope.textField = "";
        $scope.show = true;
        var min;
        var max;

        for (i = 0; i < Math.floor((Math.random() * 10) + 3); i++) {
            var hide = false;
            var value = Math.floor((Math.random() * 20)) - 10;
            $scope.arrayString += value + ",";
            if (min == null || max == null) {
                min = value;
                max = value;
            }
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }

            if (i == 0) {
                hide = true;
            }

            var object = {
                index: i + 1,
                value: value,
                input: "",
                input2: "",
                valueInput: "",
                decision: "true or false",
                hidden: hide,
                hidden2: hide,
                min: min,
                max: max,
                correct: false,
                wrong: false,
                correct2: false,
                wrong2: false
            };

            $scope.array.push(object);
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.load();

    $scope.check = function(index) {
        State.tableSave["pseudo"] = $scope.array;
        switch ($scope.type) {
            case "min":
                if ($scope.array[index - 1].input == $scope.array[index - 1].min) {
                    if (index >= $scope.array.length) {
                        $scope.correct = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    } else {
                        $scope.array[index].hidden = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    }
                } else {
                    $scope.array[index - 1].correct = false;
                    $scope.array[index - 1].wrong = true;
                }
                break;
            case "max":
                if ($scope.array[index - 1].input == $scope.array[index - 1].max) {
                    if (index >= $scope.array.length) {
                        $scope.correct = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    } else {
                        $scope.array[index].hidden = true;
                        $scope.array[index - 1].correct = true;
                        $scope.array[index - 1].wrong = false;
                    }
                } else {
                    $scope.array[index - 1].correct = false;
                    $scope.array[index - 1].wrong = true;
                }
                break;
        }

    };

    $scope.check2 = function(index) {
        var check = 0;
        State.tableSave["pseudo"] = $scope.array;
        switch ($scope.type) {
            case "min":
                if (($scope.array[index - 1].input2 == $scope.array[index - 1].min) && ($scope.array[index - 1].value == $scope.array[index - 1].valueInput)) {
                    switch ($scope.case) {
                        case ">":
                            if ($scope.array[index - 1].min > $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].min <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<":
                            if ($scope.array[index - 1].min < $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].min >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case ">=":
                            if ($scope.array[index - 1].min >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].min < $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<=":
                            if ($scope.array[index - 1].min <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].min > $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                    }
                    if (check == 1) {
                        if (index >= $scope.array.length) {
                            $scope.correct2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        } else {
                            $scope.array[index].hidden2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        }
                    } else {
                        $scope.array[index - 1].correct2 = false;
                        $scope.array[index - 1].wrong2 = true;
                    }
                } else {
                    $scope.array[index - 1].correct2 = false;
                    $scope.array[index - 1].wrong2 = true;
                }
                break;
            case "max":
                if ($scope.array[index - 1].input2 == $scope.array[index - 1].max && ($scope.array[index - 1].value == $scope.array[index - 1].valueInput)) {
                    switch ($scope.case) {
                        case ">":
                            if ($scope.array[index - 1].max > $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].max <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<":
                            if ($scope.array[index - 1].max < $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].max >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case ">=":
                            if ($scope.array[index - 1].max >= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].max < $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                        case "<=":
                            if ($scope.array[index - 1].max <= $scope.array[index - 1].value && $scope.array[index - 1].decision == "true") {
                                check = 1;
                            } else if ($scope.array[index - 1].max > $scope.array[index - 1].value && $scope.array[index - 1].decision == "false") {
                                check = 1;
                            }
                            break;
                    }
                    if (check == 1) {
                        if (index >= $scope.array.length) {
                            $scope.correct2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        } else {
                            $scope.array[index].hidden2 = true;
                            $scope.array[index - 1].correct2 = true;
                            $scope.array[index - 1].wrong2 = false;
                        }
                    } else {
                        $scope.array[index - 1].correct2 = false;
                        $scope.array[index - 1].wrong2 = true;
                    }
                } else {
                    $scope.array[index - 1].correct2 = false;
                    $scope.array[index - 1].wrong2 = true;
                }
                break;
        }

    };

    $scope.change = function() {
        $scope.show = !$scope.show;
    };

    $scope.mc = function(value) {
        switch ($scope.type2) {
            case "min":
                if (value == $scope.array[$scope.array.length - 1].min) {
                    $scope.mcWrite = true;
                    $scope.mcWrong = false;
                } else {
                    $scope.mcWrite = false;
                    $scope.mcWrong = true;
                }
                break;
            case "max":
                if (value == $scope.array[$scope.array.length - 1].max) {
                    $scope.mcWrite = true;
                    $scope.mcWrong = false;
                } else {
                    $scope.mcWrite = false;
                    $scope.mcWrong = true;
                }
                break;
        }

    };


    $scope.text = function(title) {
        //$scope.condtionalField = "";
        switch (title) {
            case "for":
                $scope.loopField = "%min = ?\nfor k = 1 : length(X)\n\t%if the value is less or higher than the value we expected\n\t%then set a new min value or max value\n\t%else\n\t%increment k\n\t%note: you can acheive the final answer from infinite number of solutions\nend";
                break;
            case "while":
                $scope.loopField = "k = 1\n%min = ?\nwhile k < length(X)\n\t%if the value is less or higher than the value we expected\n\t%then set a new min value or max value\n\t%else\n\t%increment k\n\t%note: you can acheive the final answer from infinite number of solutions\nend\n";
                break;
            case "<":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " < X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = "<";
                break;
            case ">":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " > X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = ">";
                break;
            case "<=":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " <= X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = "<=";
                break;
            case ">=":
                $scope.conditionalField = "%Loop through array while k is less than length of array\n\n\tif " + $scope.type + " >= X(k)\n\t\t%set a new min or max\n\telse\n\t\t%increment k\nend";
                $scope.case = ">=";
                break;

        }

        $scope.textField = "X[" + $scope.arrayString + "]\n" + $scope.loopField.replace(/\t%if[\s\S]*end/, $scope.conditionalField);

    };

}]);
