
var app = angular.module('adminApp', ['ngRoute', 'ngSanitize'] );

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
   $routeProvider
   .when('/', {
       templateUrl: 'Admin/pages/instruction.htm'
   })
   .when('/instructions', {
       templateUrl: 'Admin/pages/instruction.htm',
       controller: 'instructionController'
   })
   .when('/overview', {
       templateUrl: 'Admin/pages/overview.htm',
       controller: 'overviewController'
   })
   .when('/analytics', {
       templateUrl: 'Admin/pages/analytics.htm',
       controller: 'analyticsController'
   })
   .when('/tim', {
       templateUrl: 'Admin/pages/timindex.html'
   })
  .when('/reports', {
       templateUrl: 'Admin/pages/reports.htm',
       controller: 'overviewController'
   });
}]);
