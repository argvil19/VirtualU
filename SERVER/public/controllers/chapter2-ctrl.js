app.controller('ChapterTwoController', ['$scope', '$location', 'State', function($scope, $location, State) {


    $scope.formData = {};
    $scope.formData.option = {
        a: false,
        b: false,
        c: false,
        d: false,
        e: false
    };

    //$scope.hints = "Hints: "
    $scope.question = {};
    $scope.buttonID = {};

    var stat1 = [1, 1, 1, 1, 1];
    var stat2 = [1, 1, 1, 1, 1];
    var stat3 = [1, 1, 1, 1, 1];
    var count = 0;

    $scope.init = function() {
        var i = 0;
        //console.log(stat1[0],stat1[1],stat1[2],stat1[3],stat1[4]);
        //populate options for question1 
        while (i < 3) {
            var num = Math.floor(Math.random() * (5)); //Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if (stat1[num]) {
                stat1[num] = 0;
                i++;
            }
            if (i == 1 && stat1[1]) {
                i++;
                stat1[1] = 0;
            }
        }
        i = 0;
        //var stat2=[1,1,1,1,1];
        //populate options for question2
        while (i < 3) {
            var num = Math.floor(Math.random() * (5)); //Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if (stat2[num]) {
                stat2[num] = 0;
                i++;
            }
            if (i == 1 && stat2[2]) {
                i++;
                stat2[2] = 0;
            }
        }
        i = 0;
        //populate options for question2
        while (i < 3) {
            var num = Math.floor(Math.random() * (5)); //Math.random()<.5;//Math.floor((Math.random()*2)+0);
            //console.log(num);
            if (stat3[num]) {
                stat3[num] = 0;
                i++;
            }
            if (i == 1 && stat3[3]) {
                i++;
                stat3[3] = 0;
            }
        } //
    }

    $scope.test = function() {
        console.log('inside redd')
        console.log("red: " + $scope.formData.favoriteColors.red)
    }

    $scope.GetRandom = function() {
        //console.log($scope.question.option+","+$scope.question.number)
        if (!stat1[$scope.question.option.a] && $scope.question.number == 1)
            return true;

        if (!stat2[$scope.question.option.b] && $scope.question.number == 2)
            return true;

        if (!stat3[$scope.question.option.c] && $scope.question.number == 3)
            return true;
        else
            return false;

        //var num = Math.floor((Math.random() * (2) + 0));
        //return num;
    }

    $scope.controllerSayHello = function() {
        console.log("Hello from controllerSayHello")
    }

    $scope.CheckAnswers = function() {


        if ($scope.buttonID == 'a') {
            if (document.getElementById("answerBoxa").value == 'e' && document.getElementById("answerBoxb").value == 'i' && document.getElementById("answerBoxc").value == 'g' && document.getElementById("answerBoxd").value == 'h') {
                $scope.question.x1 = ""
                $scope.question.x2 = ""
                $scope.question.x3 = ""
                $scope.question.x4 = ""
                $scope.question.x5 = "Correct Answer!"
                document.getElementById("answerBoxa").style.backgroundColor = "yellowgreen"
                document.getElementById("answerBoxb").style.backgroundColor = "yellowgreen"
                document.getElementById("answerBoxc").style.backgroundColor = "yellowgreen"
                document.getElementById("answerBoxd").style.backgroundColor = "yellowgreen"
            } else {
                var str;
                $scope.question.x5 = "Wrong Answer! "


                if (document.getElementById("answerBoxa").value != 'e') {
                    if (document.getElementById("answerBoxa").value == 'a' || document.getElementById("answerBoxa").value == 'm' || document.getElementById("answerBoxa").value == 'l')
                        str = "Check the syntax of making a directory."
                    else if (document.getElementById("answerBoxa").value == 'b' || document.getElementById("answerBoxa").value == 'f' || document.getElementById("answerBoxa").value == 'j' || document.getElementById("answerBoxa").value == 'k')
                        str = "You are trying to save instead."
                    else if (document.getElementById("answerBoxa").value == 'd' || document.getElementById("answerBoxa").value == 'g')
                        str = "You are trying to clear."
                    else if (document.getElementById("answerBoxa").value == 'i')
                        str = "You are trying to change directory."
                    else if (document.getElementById("answerBoxa").value == 'c' || document.getElementById("answerBoxa").value == 'h')
                        str = "You are trying to load file."
                    else
                        str = "Invalid option."
                    $scope.question.x1 = "This should \"make\" a directory!" + str;

                    document.getElementById("answerBoxa").style.backgroundColor = "tomato"
                }

                if (document.getElementById("answerBoxa").value == 'e') {
                    $scope.question.x1 = ""

                    document.getElementById("answerBoxa").style.backgroundColor = "yellowgreen"
                }
                if (document.getElementById("answerBoxb").value != 'k') {
                    if (document.getElementById("answerBoxb").value == 'a' || document.getElementById("answerBoxb").value == 'm' || document.getElementById("answerBoxb").value == 'e' || document.getElementById("answerBoxb").value == 'l')
                        str = "You are trying to make a directory instead."
                    else if (document.getElementById("answerBoxb").value == 'b' || document.getElementById("answerBoxb").value == 'f' || document.getElementById("answerBoxb").value == 'j' || document.getElementById("answerBoxb").value == 'k')
                        str = "You are trying to save instead."
                    else if (document.getElementById("answerBoxb").value == 'd' || document.getElementById("answerBoxb").value == 'g')
                        str = "You are trying to clear."
                    else if (document.getElementById("answerBoxb").value == 'c' || document.getElementById("answerBoxb").value == 'h')
                        str = "Check syntax of load file."
                    else if (document.getElementById("answerBoxb").value == 'i')
                        str = "You are trying to change directory."
                    else
                        str = "Invalid option."
                    $scope.question.x2 = "This should \"save\" the workspace!" + str;

                    document.getElementById("answerBoxb").style.backgroundColor = "tomato"
                }

                if (document.getElementById("answerBoxb").value == 'k') {
                    $scope.question.x2 = ""

                    document.getElementById("answerBoxb").style.backgroundColor = "yellowgreen"
                }

                if (document.getElementById("answerBoxc").value != 'g') {
                    if (document.getElementById("answerBoxc").value == 'a' || document.getElementById("answerBoxc").value == 'm' || document.getElementById("answerBoxc").value == 'e' || document.getElementById("answerBoxc").value == 'l')
                        str = "You are trying to make a directory instead."
                    else if (document.getElementById("answerBoxc").value == 'b' || document.getElementById("answerBoxc").value == 'f' || document.getElementById("answerBoxc").value == 'j' || document.getElementById("answerBoxc").value == 'k')
                        str = "You are trying to save instead."
                    else if (document.getElementById("answerBoxc").value == 'd')
                        str = "Check syntax of clear."
                    else if (document.getElementById("answerBoxc").value == 'c' || document.getElementById("answerBoxc").value == 'h')
                        str = "You are trying to load file instead."
                    else if (document.getElementById("answerBoxc").value == 'i')
                        str = "You are trying to change directory."
                    else
                        str = "Invalid option."
                    $scope.question.x3 = "This should \"clear\" the workspace!" + str;

                    document.getElementById("answerBoxc").style.backgroundColor = "tomato"
                }

                if (document.getElementById("answerBoxc").value == 'g') {
                    $scope.question.x3 = "";

                    document.getElementById("answerBoxc").style.backgroundColor = "yellowgreen"
                }

                if (document.getElementById("answerBoxd").value != 'h') {
                    if (document.getElementById("answerBoxd").value == 'a' || document.getElementById("answerBoxd").value == 'm' || document.getElementById("answerBoxd").value == 'e' || document.getElementById("answerBoxd").value == 'l')
                        str = "You are trying to make a directory instead."
                    else if (document.getElementById("answerBoxd").value == 'b' || document.getElementById("answerBoxd").value == 'j' || document.getElementById("answerBoxd").value == 'k')
                        str = "Check syntax of save."
                    else if (document.getElementById("answerBoxd").value == 'd' || document.getElementById("answerBoxd").value == 'g')
                        str = "You are trying to clear instead."
                    else if (document.getElementById("answerBoxd").value == 'c')
                        str = "You are trying to load file instead."
                    else if (document.getElementById("answerBoxd").value == 'i')
                        str = "You are trying to change directory."
                    else
                        str = "Invalid option."
                    $scope.question.x4 = "This should load file1!" + str;

                    document.getElementById("answerBoxd").style.backgroundColor = "tomato"
                }

                if (document.getElementById("answerBoxd").value == 'h') {
                    $scope.question.x4 = "";

                    document.getElementById("answerBoxd").style.backgroundColor = "yellowgreen"
                }
            }
        }

        if ($scope.buttonID == 'b') {
            //console.log("question 1")
            //console.log($scope.formData.option.a)
            if ($scope.formData.option.c) {
                if ($scope.formData.option.a || $scope.formData.option.b || $scope.formData.option.d) {
                    $scope.question.y = "Wrong Answer! "
                    return
                } else {
                    $scope.question.y = "Correct Answer!"
                }
            } else
                $scope.question.y = "Wrong Answer! "
        }
        if ($scope.buttonID == 'c') {
            //console.log("question 1")
            console.log($scope.formData1.option.a)
            if ($scope.formData1.option.a) {
                if ($scope.formData1.option.e || $scope.formData1.option.c || $scope.formData1.option.d) {
                    $scope.question.z = "Wrong Answer! "
                    return
                }
                $scope.question.z = "Correct Answer!"
            } else
                $scope.question.z = "Wrong Answer! "
        }

        if ($scope.buttonID == 'd') {

            if ($scope.answerBoxa == 3 && $scope.answerBoxb == "" && $scope.answerBoxc == 2 && $scope.answerBoxd == 6 && $scope.answerBoxe == "" && $scope.answerBoxf == 6) {
                $scope.question.w = "Correct Answer!"
            } else {
                $scope.question.w = "Wrong Answer! "
            }
            /*            console.log("printing out")
                        console.log($scope.answerBoxa)
                        console.log(document.getElementById("answerBoxa").value) 
                        if(document.getElementById("answerBoxa").value==3&&!document.getElementById("answerBoxb").value&&document.getElementById("answerBoxc").value==2&&document.getElementById("answerBoxd").value==6&&!document.getElementById("answerBoxe").value&&document.getElementById("answerBoxf").value==6&&$scope.question.d)
                    
                            $scope.question.w = "Correct Answer!"
                        else      
                            $scope.question.w = "Wrong Answer! "*/
        }

        if ($scope.buttonID == 'e') {
            if ($scope.answerBoxg == 'b' && $scope.answerBoxh == 'c' && $scope.answerBoxi == 'e' && $scope.answerBoxj == 'a' && $scope.answerBoxk == 'd') //&&$scope.question.e)        
                $scope.question.l = "Correct Answer!"
            else
                $scope.question.l = "Wrong Answer! "
        }
    }


}]);

app.directive("chapter2AssessmentP1", function() {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h3>Provide the right sequence of options that will carry out the following:</h3>" +
        "<h4>" +
        "<li>Create a directory named <i>tutorial1</i> in the current working directory</li>" +
        "<li>Save the workspace in the <i>tutorial1</i> directory in a file named <i>file1</i></li>" +
        "<li>Clear the workspace</li>" +
        "<li>Load <i>file1</i> into the workspace</li>" +
        "</h4>" +

        "<h5><pre>" +
        "a) mkdir tutorial1  b) save mkdir/file1        c) load tutorial1/file1<br>" +
        "d) clear all        e) mkdir ('tutorial1')     f) save tutorial<br>" +
        "g) clear            h) load file1              i) cd tutorial1<br>" +
        "j) save tutorial1   k) save tutorial1/file1    l) mkdir('newdir')<br>" +
        "m) newdir = \'tutorial1\';</pre>" +
        "</h5>" +
        "<input type=\"text\" id=\"answerBoxa\" name=\"answerBox\" value=\"\">{{question.x1}}</h4><br>" +
        "<input type=\"text\" id=\"answerBoxb\" name=\"answerBox\" value=\"\">{{question.x2}}</h4><br>" +
        "<input type=\"text\" id=\"answerBoxc\" name=\"answerBox\" value=\"\">{{question.x3}}</h4><br>" +
        "<input type=\"text\" id=\"answerBoxd\" name=\"answerBox\" value=\"\">{{question.x4}}</h4><br>" +

        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='a';CheckAnswers()\" type=\"button\" >Submit</button> " +
        "<br>" +
        "<h3>{{question.x5}}</h3>"

    return directive;

});

app.directive("chapter2AssessmentP2", function() {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h3>Provide a series of commands which will:</h3>" +
        "<h5>     " +
        "<li>Create a directory named tutorial2 in the current working directory</li>" +
        "<li>List the files and folders in the current working directory</li>" +
        "<li>Save the workspace in the tutorial2 directory in a file named myfile</li>" +
        "<li>Clear the workspace</li> " +
        "<li>Load file1 into the workspace</li>" +
        "<li>Check the contents of the workspace</li></h5>" +


        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.a\" ><br>" +
        ">> mkdir tutorial2 <br>" +
        ">> show tutorial2/file1 <br> " +
        ">> save <br>" +
        ">> load tutorial1/file1" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.b\" ><br>" +
        ">> mkdir ('tutorial2') <br> " +
        ">> show tutorial2 <br> " +
        ">> clear <br> " +
        ">> load file1 " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.c\" ><br> " +
        " >> mkdir (\'tutorial2\'); <br> " +
        " >> show tutorial2 <br> " +
        " >> clear <br> " +
        " >> load file1 " +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.d\" ><br> " +
        "       >> mkdir('tutorial2') <br> " +
        "       >> save mkdir/file1 <br> " +
        "       >> clear <br> " +
        "       >> load tutorial2/file1 " +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=2;question.option.b=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData.option.e\" ><br> " +
        "   >> newdir = tutorial; <br> " +
        "   >> mkdir('newdir') <br> " +
        "   >> save tutorial2 <br> " +
        "   >> clear all <br> " +
        "   >> load tutorial2/file1 " +
        "  </label><br> " +
        "</h4>" +

        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='b';CheckAnswers()\" type=\"button\" >Submit</button> " +
        "<br>" +
        "<h3>{{question.y}}</h3>"


    return directive;

});

app.directive("chapter2AssessmentP3", function() {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h3>Provide a series of commands which will:</h3>" +
        "<h5>     " +
        "<li>Create a directory named tutorial3 in the current working directory</li>" +
        "<li>Make tutorial3 the current working directory</li>" +
        "<li>Check the current working directory</li> </h5>" +

        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=0;GetRandom()\">" +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData1.option.a\" ><br>" +
        ">> mkdir tutorial3 <br>" +
        ">> cd tutorial3 <br> " +
        ">> pwd <br>" +
        "</label><br>" +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=1;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData1.option.b\" ><br>" +
        ">> mkdir ('tutorial3') <br> " +
        ">> cd tutorial3 <br> " +
        ">> load <br> " +
        "</label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=2;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData1.option.c\" ><br> " +
        " >> newdir = \'tutorial3\'; <br> " +
        " >> save tutorial3 <br> " +
        " >> load tutorial3" +
        " </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=3;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData1.option.d\" ><br> " +
        "       >> mkdir('tutorial3') <br> " +
        "       >> save mkdir/file3 <br> " +
        "       >> load tutorial3/file1 " +
        "   </label><br> " +
        "<label class=\"checkbox-inline\" ng-show=\"question.number=3;question.option.c=4;GetRandom()\"> " +
        "<input type=\"checkbox\" name=\"favoriteColors\" ng-model=\"formData1.option.e\" ><br> " +
        "   >> newdir = tutorial3; <br> " +
        "   >> mkdir('newdir') <br> " +
        "   >> save tutorial3 <br> " +
        "  </label><br> " +
        "</h4>" +
        " <button value='Change Text' class=\"btn btn-success\" ng-click=\"buttonID='c';CheckAnswers()\" type=\"button\" >Submit</button> " +
        "<br>" +
        "<h3>{{question.z}}</h3>"



    return directive;

});

app.directive("chapter2AssessmentP4", function() {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h3>The following commands are typed at the command prompt. There are no variables in" +
        "the workspace prior to typing these commands. What are the variables in the" +
        "workspace and their values after typing these commands?</h3>" +
        "<h5>     " +
        ">> a= 3<br>" +
        ">> b = 2 <br> " +
        ">> c = a=b;<br> >> d = a*c; <br> " +
        ">> e = 4<br>" +
        ">> f = 2*a;<br>" +
        ">>clear b, e <br> </h5>" +

        "<br>" +
        "a = <input type=\"text\" ng-model=\"answerBoxa\" name=\"answerBox\" value=\"a\"><br>" +
        "b = <input type=\"text\" ng-model=\"answerBoxb\" ng-init = 'answerBoxb = \"\" '  name=\"answerBox\" value=\"b\"><br>" +
        "c = <input type=\"text\" ng-model=\"answerBoxc\" name=\"answerBox\" value=\"c\"><br>" +
        "d = <input type=\"text\" ng-model=\"answerBoxd\" name=\"answerBox\" value=\"d\"><br>" +
        "e = <input type=\"text\" ng-model=\"answerBoxe\" ng-init = 'answerBoxe = \"\" ' name=\"answerBox\" value=\"e\"><br>" +
        "f = <input type=\"text\" ng-model=\"answerBoxf\" name=\"answerBox\" value=\"f\"><br>" +
        "<button value='Change Text' ng-model=\"formData.option.q4\" ng-click=\"buttonID='d';CheckAnswers()\" class=\"btn btn-success\" type=\"button\" >Check Answer</button> <br>" +
        "<h3>{{question.w}}</h3>"

    return directive;

});


app.directive("chapter2AssessmentP5", function() {


    var directive = {};
    directive.restrict = 'A';
    directive.template =
        "<h3>Match the commands to their respective actions</h3>" +
        "<h4>     " +
        "<pre>a) mkdir                      Clear the screen                " +
        "<input type=\"text\" ng-model=\"answerBoxg\" name=\"answerBox\" value=\"\"></pre><br>" +
        "<pre>b) clear                      List files                      " +
        "<input type=\"text\" ng-model=\"answerBoxh\" name=\"answerBox\" value=\"\"></pre><br>" +
        "<pre>c) show                       Load                            " +
        "<input type=\"text\" ng-model=\"answerBoxi\" name=\"answerBox\" value=\"\"></pre><br>" +
        "<pre>d) save                       Make directory                  " +
        "<input type=\"text\" ng-model=\"answerBoxj\" name=\"answerBox\" value=\"\"></pre><br>" +
        "<pre>e) load                       Save files                      " +
        "<input type=\"text\" ng-model=\"answerBoxk\" name=\"answerBox\" value=\"\"></pre><br>" +

        "</h4><br>" +
        "<br>" +

        " <button value='Change Text' ng-model=\"formData.option.q5\" ng-click=\"buttonID='e';CheckAnswers()\" class=\"btn btn-success\" type=\"button\" >Check Answer</button> <br>" +
        "<h3>{{question.l}}</h3>"


    return directive;

});
