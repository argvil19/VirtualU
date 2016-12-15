
'use strict'

app.controller('loginController', ['$scope', 'httpService', function($scope, httpService){

  $scope.login = function(user){
    console.log(user);

    httpService({
      url: '/login',
      method: 'POST',
      data: JSON.stringify(user),
      successCallback: function(res){
        $scope.message = res.data.message;
        localStorage.setItem('jwtToken', res.data.token);  // localStorage to save jwtToken for secure api calls.
      },
      errorCallack: function(err){
        $scope.message = err.data.message;
      }
    });

/*    comment from Q:

    Hey Arpit :) Q here,
    so - what I was thinking for this implementation is that:

    Once the user is fully authenthicated - we then pull everything we have on them from the mongo DB
    then attach that user infomation to the CurrentUser service.
    "CurrentUser" service (/VIEWS/controllers/CurrentUser.js)

    Feel free to give me any suggestion :D


    I see you at the controller in the index.html file
    right now - all of my controllers is attached in the main.html file. path: hvu-imt/VIEWS/student/pages/main/html

    Is this a right place to put it? or do you suggest to move it?
    */

  }

  $scope.init = function(){
    console.log('Login Controller Loaded!');
  };
}]);
