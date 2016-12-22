//Controller to hanlde OCTAVE code execution
app.controller('codeCtrl', function($scope, $http) {
    //ACE config
    $scope.aceOptions = {
        theme: 'crimson_editor',
        mode: 'matlab',
        useWrapMode: true
    };
    $scope.textField = '';

    //Will hide or unhide Octave results and errors.
    $scope.resHide = true;
    $scope.errorHide = true;
    $scope.warningHide = true;
    $scope.workspaceHide = true;
    //Switch for File or Text input
    $scope.textInput = true;
    $scope.sol = []

    //Will hold Octave result contents
    $scope.stdout = "Hello World!";
    $scope.error = "This is an error!"
    $scope.warning = "This is a warning!";
    $scope.workspace = "JSON Formatted workspace Vars";

    // Validate input as matlab script, problems will be written to scope.warning
    var validate = function(input) {
        //Check for un-ended for loops, while loops, and if statements
        var count = 0;
        //make sure theres code to run
        if (!input) {
            $scope.warning = 'No code entered';
            $scope.warningHide = false;
            count++;
        }

        //while count
        var start = (input.match(/while|for|if/ig) || []).length;
        var end = (input.match(/end/ig) || []).length;
        var myElse = (input.match(/else(\s*{*)[^i]/ig) || []).length;
        var realeif = (input.match(/elseif/ig) || []).length;
        var eif = (input.match(/else\s+if/ig) || []).length;

        //remove for else if
        start = (start - eif) - realeif;
        myElse = myElse - eif;

        //Too many end statements
        if (end > start) {
            $scope.warning = 'Too many end statements.';
            $scope.warningHide = false;
            count++;
        } else if (start > end) { //Not enough end statements
            $scope.warning = 'A for/while loop or conditional is not ended.';
            $scope.warningHide = false;
            count++;
        } else if (eif > 0) {
            $scope.warning = 'Syntax: \'else if\' must be \'elseif\'.';
            $scope.warningHide = false;
            count++;
        }

        //Testing output
        console.log({
            start: start,
            end: end,
            eif: eif,
            else: myElse,
            realeif: realeif
        });

        return count;
    };

    //Validate then evaluate code in textbox, and receive results
    $scope.sendCode = function() {
        //TODO: Update to handle file input
        //Switches for alerts
        $scope.resHide = true;
        $scope.errorHide = true;
        $scope.warningHide = true;

        //Return if there are warnings
        if (validate($scope.textField) > 0) {
            return;
        }

        //Post data body
        var body = {
            code: $scope.textField
        };
        //Call octave API (in SERVER/routes/index.js)
        //result.data = return values from octave
        $http.post('/api/POST/octave', body).then(function(result) {

            if (result.data.error) {
                $scope.error = result.data.error;
                $scope.errorHide = false;
            }
            if (result.data.stderr) {
                $scope.error = result.data.stderr;
                $scope.errorHide = false;
            }
            if (result.data.stdout) {
                $scope.stdout = result.data.stdout;
                $scope.resHide = false;

            }
            if (result.data.workspace) {
                $scope.workspace = result.data.workspace;
                $scope.workspaceHide = false;
                console.log(result.data.workspace)
            }
            if (!result.data.error && !result.data.stderr && !result.data.stdout) {
                $scope.warning = 'No value being returned or printed.';
                $scope.warningHide = false;
            }
        });
    };

    $scope.Random = function() {
        return Math.floor((Math.random() * 4) + 1);
    }


    $scope.GenerateQuestion = function() {

        var num = $scope.Random()
        var dec = $scope.Random() / 10
        var arr = []
        var arr1 = []
        var str = ""





        arr.push(num.toFixed(4))
        arr1.push(num)
        for (var i = 0; i < 4; i++) {
            num += dec
            arr.push(num.toFixed(4))
            arr1.push(num)
        }



        for (var i = 0; i < arr.length; i++) {
            str += arr[i] + " "
        }

        str = "A = " + str
        $scope.sol = str





        return str




    }

    $scope.$watch('stdout', function() {
        $scope.CheckAnswer()
    }, true);

    $scope.CheckAnswer = function() {
        console.log("called")
        console.log($scope.stdout)
        console.log($scope.question)

        var studentanswer = $scope.stdout.replace(/ /g, '')
        studentanswer = studentanswer.replace(/(\r\n|\n|\r)/gm, "");
        var solution = $scope.question.replace(/ /g, '')

        console.log(studentanswer)
        console.log(solution)

        var match = 0



        if (studentanswer == solution) {
            console.log("got a match!")
            $scope.respond = "Correct!"
        } else {
            $scope.respond = "Incorrect.  Your input produced the following : " + $scope.stdout.replace(/(\r\n|\n|\r)/gm, "")
        }


    }

    $scope.question = $scope.GenerateQuestion()
    $scope.GenerateQuestion()


});
