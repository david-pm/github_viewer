(function() {
  
  var app = angular.module("githubViewer");

  var MainController = function($scope, $interval, $location) {

    var decrementCount = function(){
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };
    
    var countdownInterval = null;
    var startCountDown = function() {
      countdownInterval = $interval(decrementCount, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
          if (countdownInterval) {
            $interval.cancel(countdownInterval);
            $scope.countdown = null;
          }
          // move to user/username
          $location.path("/user/" + username);
    };
    
    $scope.username = "nelsonwells";
    $scope.countdown = 10;
    startCountDown();

  };

  app.controller("MainController", MainController);

}());