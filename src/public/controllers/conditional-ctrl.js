app.controller('conditionalCtrl', ['$scope', 'State', function($scope, State) {


    $scope.aceOptions = {
        theme: 'crimson_editor',
        mode: 'matlab',
        useWrapMode: true
    };

    $scope.array = [];
    $scope.people = [];
    $scope.correct = false;
    $scope.wrong = false;
    $scope.On = true;
    $scope.conditionalField = "X = 0\n%Set your variables\n";
    var conditionalIndex = 1;
    $scope.expressions = ['>', '<', '>=', '<=', '==', '!=', ''];
    $scope.names = ["Juan's ", "Erick's ", "Q's ", "Zach's ", ""];
    var enteredBool = false;


    $scope.V = function(valueCheck, bool, value) {
        var correctValue = 0;
        //if (valueCheck == false) {
        if (bool == true && valueCheck == 1) {
            correctValue = value;
        } else {
            if (i == 0) {
                correctValue = 0;
            } else {
                correctValue = $scope.array[i - 1].X;
            }
        }
        //  }
        /*  else {
              if (i == 0) {
                  correctValue = 0;
              }
              else {
                  correctValue = $scope.array[i - 1].X;
              }
          }*/
        return correctValue;
    };

    $scope.load = function() {

        if (State.tableSave["Condi"] == null) {
            $scope.build();
            State.tableSave["Condi"] = $scope.array;
        } else {
            $scope.array = State.tableSave["Condi"];
        }
    };

    $scope.load2 = function() {
        $scope.build();
        State.tableSave["Condi"] = $scope.array;
    };

    $scope.build = function() {


        var choices = ["weight ", "IQ ", "height ", "number of adorable kittens "];
        var statement = ["if ", "else if ", "else ", "end "];

        var expressionText = ['greater than ', 'less than ', 'greater than or equal to ', 'less then or equal to ', 'equal to ', 'not equal to '];

        $scope.array.length = 0;
        var type = choices[Math.floor((Math.random() * 3.25))];
        $scope.people.length = 0;
        var value = 0;
        var conditionCheck = false;
        var valueCheck = 0;
        $scope.correct = false;
        $scope.On = true;
        $scope.conditionalField = "X = 0\n%Set your variables\n";
        var string = "";
        var opposite = "";
        var index = 0;

        for (i = 0; i < 4; i++) {
            value = Math.floor((Math.random() * 300));
            var person = {
                name: $scope.names[i],
                value: value,
                string: $scope.names[i] + type + "equals " + value + "."
            };
            $scope.people.push(person);
        }

        for (i = 0; i < Math.floor((Math.random() * 5) + 3); i++) {
            var expression = Math.floor((Math.random() * 5.999));
            value = Math.floor((Math.random() * 300));
            var correctValue = 0;
            var x = Math.floor((Math.random() * 3.999));
            var y = Math.floor((Math.random() * 3.999));

            index++;


            var bool = true;
            var enteredInput = false;


            var condition = "if ";
            var expressionInput = $scope.expressions[expression];


            if (conditionCheck == false) {
                condition = "if ";
                conditionCheck = true;
                valueCheck = 0;
                index = 1;

                switch ($scope.expressions[expression]) {
                    case '>':
                        bool = ($scope.people[x].value > $scope.people[y].value);
                        opposite = "<=";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '<':
                        bool = ($scope.people[x].value < $scope.people[y].value);
                        opposite = ">=";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '>=':
                        bool = ($scope.people[x].value >= $scope.people[y].value);
                        opposite = "<";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '<=':
                        bool = ($scope.people[x].value <= $scope.people[y].value);
                        opposite = ">";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '!=':
                        bool = ($scope.people[x].value != $scope.people[y].value);
                        opposite = "!=";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                    case '==':
                        bool = ($scope.people[x].value == $scope.people[y].value);
                        opposite = "==";
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }
                        correctValue = $scope.V(valueCheck, bool, value);
                        break;
                }

                if (bool == true) {
                    enteredBool = true;
                }
                enteredInput = true;
                string = condition + $scope.names[x] + type + "is " + expressionText[expression] + $scope.names[y] + type + "then X equals " + value + ".";
            } else {
                var state = statement[Math.floor((Math.random() * 2.999))];
                switch (state) {
                    case "if ":
                        condition = "if ";
                        valueCheck = 0;
                        index = 1;
                        string = condition + $scope.names[x] + type + "is " + expressionText[expression] + $scope.names[y] + type + "then X equals " + value + ".";

                        switch ($scope.expressions[expression]) {
                            case '>':
                                bool = ($scope.people[x].value > $scope.people[y].value);
                                opposite = "<=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<':
                                bool = ($scope.people[x].value < $scope.people[y].value);
                                opposite = ">=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '>=':
                                bool = ($scope.people[x].value >= $scope.people[y].value);
                                opposite = "<";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<=':
                                bool = ($scope.people[x].value <= $scope.people[y].value);
                                opposite = ">";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '!=':
                                bool = ($scope.people[x].value != $scope.people[y].value);
                                opposite = "!=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '==':
                                bool = ($scope.people[x].value == $scope.people[y].value);
                                opposite = "==";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                        }

                        if (bool == true) {
                            enteredBool = true;
                        } else {
                            enteredBool = false;
                        }
                        enteredInput = true;
                        break;
                    case "else if ":
                        condition = "else if ";
                        string = condition + $scope.names[x] + type + "is " + expressionText[expression] + $scope.names[y] + type + "then X equals " + value + ".";

                        switch ($scope.expressions[expression]) {
                            case '>':
                                bool = ($scope.people[x].value > $scope.people[y].value);
                                opposite = "<=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<':
                                bool = ($scope.people[x].value < $scope.people[y].value);
                                opposite = ">=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '>=':
                                bool = ($scope.people[x].value >= $scope.people[y].value);
                                opposite = "<";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '<=':
                                bool = ($scope.people[x].value <= $scope.people[y].value);
                                opposite = ">";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '!=':
                                bool = ($scope.people[x].value != $scope.people[y].value);
                                opposite = "!=";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                            case '==':
                                bool = ($scope.people[x].value == $scope.people[y].value);
                                opposite = "==";
                                if (bool && valueCheck == 0) {
                                    valueCheck = 1;
                                } else if (valueCheck == 1) {
                                    valueCheck = 2;
                                }
                                correctValue = $scope.V(valueCheck, bool, value);
                                break;
                        }

                        if (enteredBool == false) {
                            enteredInput = true;
                        }
                        if (bool == true) {
                            enteredBool = true;
                        }
                        break;
                    case "else ":
                        condition = "else ";
                        if (valueCheck == 0) {
                            enteredInput = true;
                            bool = true;
                        } else {
                            bool = false;
                        }
                        if (bool && valueCheck == 0) {
                            valueCheck = 1;
                        } else if (valueCheck == 1) {
                            valueCheck = 2;
                        }

                        enteredBool = false;
                        correctValue = $scope.V(valueCheck, bool, value);
                        conditionCheck = false;
                        string = "else X equals " + value + ".";
                        expressionInput = "";
                        x = 4;
                        y = 4;

                        break;
                }
            }


            var object = {
                index: index,
                show: false,
                string: string,
                condition: condition,
                bool: bool,
                boolInput: "true",
                expression: expressionInput,
                opposite: opposite,
                right: false,
                wrong: false,
                X: correctValue.toString(),
                XInput: "",
                enteredString: "False",
                enteredBool: enteredInput,
                nameX: x,
                nameY: y,
                name1: $scope.names[4],
                name2: $scope.names[4],
                exp: $scope.expressions[6]
            };

            $scope.array.push(object);
        }

        //$scope.array[0].show = true;

        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.load();

    $scope.boolChange = function(index) {
        if ($scope.array[index].boolInput == "true") {
            $scope.array[index].boolInput = "false";
        } else {
            $scope.array[index].boolInput = "true";
        }
    };

    $scope.check = function(index) {
        console.log($scope.array);
        State.tableSave["Condi"] = $scope.array;
        var item = $scope.array[index];


        if (item.enteredBool == item.show) {
            if (item.enteredBool == true) {
                if (($scope.names[item.nameX] == item.name1 && $scope.names[item.nameY] == item.name2 && (item.expression == item.exp)) || ($scope.names[item.nameY] == item.name1 && $scope.names[item.nameX] == item.name2 && (item.opposite == item.exp))) {
                    if ((item.boolInput == (item.bool).toString()) && (item.X == item.XInput)) {
                        item.right = true;
                        item.wrong = false;
                        return true;
                    }
                }
            } else {
                item.right = true;
                item.wrong = false;
                return true;
            }
        }
        item.right = false;
        item.wrong = true;
        return false;

        /* if($scope.array[index].boolInput == ($scope.array[index].bool).toString() && $scope.array[index].expression == $scope.array[index].expressionInput && $scope.array[index].X == $scope.array[index].XInput){
         $scope.array[index].right = true;
         $scope.array[index].wrong = false;
         }
         else{
         $scope.array[index].right = false;
         $scope.array[index].wrong = true;
         }*/
    };

    $scope.Enter = function(index) {
        $scope.array[index].show = !$scope.array[index].show;
        switch ($scope.array[index].show) {
            case false:
                $scope.array[index].enteredString = "False";
                break;
            case true:
                $scope.array[index].enteredString = "True";
                break;
        }
    };

    $scope.Solve = function() {
        var check = true;
        var i = 0;

        while (check == true && i < $scope.array.length) {
            check = $scope.check(i);
            i++;
        }
        if (check == true) {
            $scope.correct = true;
            $scope.wrong = false;
        } else {
            $scope.wrong = true;
            $scope.correct = false;
        }
    };

    $scope.text = function(string) {


        switch (string) {
            case "if":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nif %Condition\n\t%Set your X value\n%" + conditionalIndex;
                $scope.On = !$scope.On;
                conditionalIndex++;
                break;
            case "elseif":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nelseif %Condition\n\t%Set your X value\n%" + conditionalIndex;
                $scope.On = !$scope.On;
                conditionalIndex++;
                break;
            case "else":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nelse \n\t%Set your X value\nend\n%" + conditionalIndex;
                conditionalIndex++;
                break;
            case "end":
                $scope.conditionalField += "\n%" + conditionalIndex + "\nend\n%" + conditionalIndex;
                conditionalIndex++;
                break;
            case "<":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 < %variable2");
                $scope.On = !$scope.On;
                break;
            case ">":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 > %variable2");
                $scope.On = !$scope.On;
                break;
            case "<=":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 <= %variable2");
                $scope.On = !$scope.On;
                break;
            case ">=":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 >= %variable2");
                $scope.On = !$scope.On;
                break;
            case "==":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 == %variable2");
                $scope.On = !$scope.On;
                break;
            case "!=":
                $scope.conditionalField = $scope.conditionalField.replace("%Condition", "%variable1 != %variable2");
                $scope.On = !$scope.On;
                break;
            case "reset":
                $scope.conditionalField = "X = 0\n%Set your variables\n";
                $scope.On = true;
                conditionalIndex = 1;
                break;
        }
    };

}]);