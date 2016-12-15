
var app = angular.module('adminApp', ['ngRoute', 'ngSanitize'] );

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
   $routeProvider
   .when('/login', {
     templateUrl: 'Admin/pages/login.htm',
     controller: 'loginController'
   })
   .when('/register', {
     templateUrl: 'Admin/pages/register.htm',
     controller: 'registerController'
   })
   .when('/home', {
       templateUrl: 'Admin/pages/instruction.htm'
   })
   .when('/instructions', {
       templateUrl: 'Admin/pages/instruction.htm',
       controller: 'instructionController'
   })
   .when('/builder', {
       templateUrl: 'Admin/pages/builder.htm',
       controller: 'builderController'
   })
   .when('/example', {
       templateUrl: 'Admin/pages/example.htm',
       controller: 'exampleController'
   })
   .when('/overview', {
       templateUrl: 'Admin/pages/overview.htm',
       controller: 'overviewController'
   })
   .when('/analytics', {
       templateUrl: 'Admin/pages/analytics.htm',
       controller: 'analyticsController'
   })
   .when('/export', {
       templateUrl: 'Admin/pages/export.htm',
       controller: 'overviewController'
   })
  .when('/reports', {
       templateUrl: 'Admin/pages/reports.htm',
       controller: 'overviewController'
   })
   .otherwise({ redirectTo: '/login'});
}]);

/**
* Interceptor for adding the jwt token to all the http
* request by $http service. Jwt token is needed to authorize
* the user at the backend, token is saved in localStorage at
* the time of log in.
**/
app.factory('httpRequestInterceptor', function(){
  return {
    request: function(config){
      console.log('interceptor loaded!', localStorage.getItem('jwtToken'));
        config.headers['Authorization'] = "JWT " + localStorage.getItem('jwtToken');

        return config;
    }
  };
});

// registering the interceptor.
app.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');
}]);
