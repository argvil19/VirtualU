app.controller('AnimationIFCtrl', function($scope) {

    var startStatus = false;
    var r1;
    var r2;
    var r3;
    var position = 0;

    var bigx = 10;
    var count = 0;
    stage = new createjs.Stage("myCanvas");
    var ball1 = new createjs.Shape();

    $scope.tableArray = [];
    $scope.iftableArray = [
        { one: "6", two: "3", three: '1', four: '3', five: '-4', x: '1', status: false },
        { one: "6", two: "3", three: '1', four: '3', five: '-4', x: '-2', status: false },
        { one: "6", two: "3", three: '1', four: '3', five: '-4', x: '-2', status: false }
    ];


    function loadImage() {
        var preload = new createjs.LoadQueue();
        preload.addEventListener("fileload", handleFileComplete);
        preload.loadFile("./yimg.jpg");
    }

    function handleFileComplete(event) {
        //document.body.appendChild(event.result);
        console.log('done loading');
        //stage.addChild(event.result);
        var bgBitmap = new createjs.Bitmap(event.result);
        stage.addChild(bgBitmap);

        var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
        ball1.x = 53;
        ball1.y = 43;
        var distance = 97;
        stage.addChild(ball1);
        stage.update();
        //stage.update();

    }

    loadImage();


    $scope.display = function() {
        console.log('startStatus: ' + startStatus);

        if (startStatus === true) {
            console.log('looooooooooooooooooool');
            return true;
        }

        // return false;

        //console.log('display is being called');
        //$scope.iftableArray.push( $scope.iftableArray[1]);

    };


    var testArr = [2, 3]; //JSON.parse($scope.firstRow);
    var tick = 0;


    function table(r1, r2, logic, move, show) {
        this.row1 = r1;
        this.row2 = r2;
        this.logic = logic;
        this.move = move;
        this.show = true;
    }


    //if check for if animation
    $scope.ifcheck = function() {

        if ($scope.finalPos == 5) {
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


        startStatus = true;

        /// testArr = [1,2,3];
        //so we know when to stop by we hit the end of the array
        createjs.Ticker.paused = false;

        //if user doesn't select anything then go with default( option 1)

        //handleTick is where all the animation happens
        createjs.Ticker.addEventListener("tick", handleTick);


    }


    function handleTick(event) {

        if (createjs.Ticker.paused == false) {


            console.log(testArr);
            ball1.x += testArr[count] * 97;
            var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            ball1.graphics.beginFill(color).drawCircle(0, 0, 35);
            stage.update();
            tick++;
            $scope.iftableArray[count].status = true;
            console.log(JSON.stringify($scope.iftableArray));
            $scope.iftableArray = $scope.iftableArray;
            count++;

            if (count == testArr.length) {

                createjs.Ticker.paused = true;

            }
        }
    }


});