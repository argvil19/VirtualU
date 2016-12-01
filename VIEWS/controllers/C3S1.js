app.controller('codeCtrlC3S1', function($scope, $http) {

    $scope.q1hints;

    $scope.q1 = "1. Select all options below which calculate tan(45 degree) and assigns the result to a variable x. Note: 180 degree=pi radians = 3.1415 radians." +
    ""
        /*<br> <code> </code>*/


    $scope.q2 = "2. Select all options below which calculate . Assume that values for x and z exist in the workspace."
    +""
    $scope.q3 = "3. What is the value of y resulting from the following MATLAB commands:" +
    "<br> <code>x = 3 case = 2 y = 2.*x + case </code>"

    $scope.q4 = "4. Provide a mathematical expression which is equivalent to the MATLAB expression:"
    +"<br> <code>z = 4.*sqrt(w)./x./y.^3 </code>"

    $scope.q1options = [
        { text: "x = tan(45*pi/180)", hints: "names don’t matter, it’s the order in the list.", correct: true, type: "ms", chosen: 0 },
        { text: "x = tan(45) ", hints: "function doesn’t affect value of var1 in the workspace", correct: true, type: "ms", chosen: 0 },
        { text: "angle = 45 45*pi/180 x = tan(ans) ", hints: "function doesn’t affect value of var1 in the workspace", correct: false, type: "ms", chosen: 0 },
        { text: "x = tand(45) ", hints: "var1 is not defined in the workspace.", correct: false, type: "ms", chosen: 0 },
    ]

    $scope.q2options = [
        { text: "y = 2.*x.^2./4./z ", hints: "names don’t matter, it’s the order in the list.", correct: true, type: "ms", chosen: 0 },
        { text: "y = 2.*x.^2./(4.*z) ", hints: "names don’t matter, it’s the order in the list.", correct: false, type: "ms", chosen: 0 },
        { text: "y = (2.*x.^2./(4.*z) ", hints: "only the second element of x is sent to the function.", hints: "names don’t matter, it’s the order in the list.", correct: false, type: "ms", chosen: 0 },
        { text: "y = (2.*(x.^2))./(4.*z) ", hints: "", correct: true, type: "mc" },
    ]

    $scope.q3options = [
        { text: "y = y = NaN ", hints: "names don’t matter, it’s the order in the list", correct: true, type: "ms", chosen: 0 },
        { text: "Error ", hints: "names don’t matter, it’s the order in the list.", correct: true, type: "ms", chosen: 0 },
        { text: "y = 7 ", hints: "only the second element of x is sent to the function.", hints: "names don’t matter, it’s the order in the list.", correct: false, type: "ms", chosen: 0 },
        { text: "y = 8 ", hints: "the value of var and x in the base workspace do not affect their values in the function’s workspace.", correct: false, type: "ms", chosen: 0 },
    ]

    $scope.q4options = [
                { text: "10", hints: "Check out chapter 10.5 tutorials", correct: 1, type: "sa" }, //sa == short answer
]


    $scope.q1options = shuffle($scope.q1options)
    $scope.q2options = shuffle($scope.q2options)
    $scope.q3options = shuffle($scope.q3options)



    $scope.options = {
        selected: ''
    };



    $scope.questions = [
        { question: $scope.q1, options: $scope.q1options, hint: $scope.q1hints },
        { question: $scope.q2, options: $scope.q2options, hint: $scope.q1hints },
        { question: $scope.q3, options: $scope.q3options, hint: $scope.q1hints },
        { question: $scope.q4, options: $scope.q4options, hint: $scope.q1hints },
    ]

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $scope.CheckAnswer = function(options) {
        console.log(options[0].type)
        console.log($scope.options.selected)
            //if mcq then only check to see if the selected option is correct
        if (options[0].type == "mc") {
            if ($scope.options.selected.correct == 1) {
                console.log("correct answer!")
                $scope.q1hints = "correct answer!"
            } else {
                console.log("incorrect answer!")
                $scope.q1hints = $scope.options.selected.hints
            }
        } else if (options[0].type == "sa") {

            console.log("hello sa")
            if ($scope.options.selected == options[0].text) {
                $scope.q1hints = "correct answer!"
            } else {
                $scope.q1hints = options[0].hints
            }

        } else if (options[0].type == "ms") //handle if its MSQ
        {
            //to keep track of any incorrect answer
            var tracker = 0
            console.log(options)
            for (var i = 0; i < options.length; i++) {
                if (options[i].chosen != options[i].correct) {
                    console.log(options[i].chosen)
                    console.log(options[i].correct)
                    $scope.q1hints = "incorrect"
                    tracker++
                    break;
                }

            }

            if (tracker == 0) {
                $scope.q1hints = "correct"
            }

        }
    }



});
