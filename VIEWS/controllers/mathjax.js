// Make MATHJAX a directive.
app.controller('mathjaxController', [
  '$scope',
  '$log',
  'panelService',
  'answerService',
  function($scope, $log, panelService, answerService ){
    $log.log("mathjax Controller Hit.");
    
    equation = '$$A=\\left(\\begin{array}{cc}1 & 2 \\\\3 & 5\\end{array}\\right).$$';
    
  
}]);
