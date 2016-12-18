app.controller('myCtrl', function($scope) {
    $scope.firstRow = "[1, 1, -1]";
    $scope.secondRow = "[1, 0, 1]";
    $scope.thirdRow = "[1, 1, 1 ]";


    var r1;
    var r2;
    var r3;
    var position = 0;

    var bigx = 10;
    var count = 0;
    stage = new createjs.Stage("myCanvas");
    var map = new createjs.Bitmap("./yimg.jpg");

    var ball1 = new createjs.Shape();
    var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
    ball1.x = 53;
    ball1.y = 43;
    var distance = 97;
    stage.addChild(map);
    stage.update();
    stage.addChild(ball1);
    stage.update();
    $scope.tableArray = [];
    var testArr = []; //JSON.parse($scope.firstRow);
    var tick = 0;
    //var table = {r1:0, r2:0, logic:0, move: 0};


    //var testArr = [0 ,1 ,0 ,1 ,0 ,0, -1 ,0 ,0, 1];
    function table(r1, r2, logic, move, show) {
        this.row1 = r1;
        this.row2 = r2;
        this.logic = logic;
        this.move = move;
        this.show = true;
    }

    //check to see if the guess is correct without going through the animation
    $scope.check = function() {

        reCompute();
        testArr = [];
        position = 0;
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push(r1[i] * r2[j]);
            }
        }


        var userinput = parseInt($scope.finalPos);

        for (var i = 0; i < testArr.length; i++) {
            position += testArr[i];


        }


        if (position == userinput) {
            $scope.finalPos = "correct!";

        } else {
            $scope.finalPos = "incorrect!";

        }


    }

    //when users change their R1,R2 and ect.. we need to parse them again in order to use it as an array
    function reCompute() {
        r1 = JSON.parse($scope.firstRow);
        r2 = JSON.parse($scope.secondRow);
        r3 = JSON.parse($scope.thirdRow);
    }

    function reInit() {
        stage.removeAllChildren();

    }


    //set the time interval for the animation to go by
    createjs.Ticker.setInterval(1000);
    //trigger the timer to start
    $scope.start = function() {

        testArr = [];
        //so we know when to stop by we hit the end of the array
        createjs.Ticker.paused = false;

        //if user doesn't select anything then go with default( option 1)
        if (testArr.length == 0) {
            $scope.opOne();

        }
        //handleTick is where all the animation happens
        createjs.Ticker.addEventListener("tick", handleTick);


    }


    $scope.opOne = function() {
        $scope.tableArray.length = 0;
        reCompute();
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push(r1[i] * r2[j]);
                /*refer to opTwo and opThree with the same logic
                 * create a new table with r1[i], r2[j], logic and the # of steps to take (move)
                 * add them to our table array and display it in the HTML
                 * */
                var newTable = new table(r1[i], r2[j], "A(i) * A(j)", r1[i] * r2[j], false);
                $scope.tableArray.push(newTable);


            }


        }


    }

    $scope.opTwo = function() {
        $scope.tableArray = [];
        reCompute();
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push((r1[i] * 2 * r2[i]));
                var newTable = new table(r1[i], r2[j], "r1[i] * 2 * r2[i]", r1[i] * 2 * r2[i]);
                $scope.tableArray.push(newTable);


            }

        }

    }

    $scope.opThree = function() {
        $scope.tableArray = [];
        reCompute();
        for (var i = 0; i < r1.length; i++) {
            for (var j = 0; j < r2.length; j++) {
                testArr.push((r1[i] + r2[j]) % 2);
                var newTable = new table(r1[i], r2[j], "(r1[i] + r2[j]) % 2", (r1[i] + r2[j]) % 2);
                $scope.tableArray.push(newTable);


            }

        }

    }


    function testInput() {
        console.log("hey");
        console.log("he11111y");
    }

    function handleTick(event) {

        if (createjs.Ticker.paused == false) {


            ball1.x += testArr[count] * 97;
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
            stage.update();
            //$scope.tableArray.push(new table(1,2,"kittens",3 * 4,false));
            //console.log($scope.tableArray[tick]);
            $scope.tableArray[tick].show = false;
            //console.log($scope.tableArray[tick]);
            tick++;
            count++;
            if (count == testArr.length) {
                //$scope.finalPos = "Correct!";


                createjs.Ticker.paused = true;
            }
        }
    }
});