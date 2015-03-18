(function() {
  
  var app = angular.module("githubViewer");

  var UserController = function($scope, github, $routeParams) {

    var onUserComplete = function(data) {
      $scope.user = data;
      // github service
      github.getRepos($scope.user).then(onRepos, onError);
    };
    
    var onRepos = function(data) {
      $scope.repos = data;
    };
    
    var onError = function(reason) {
      $scope.error = "Could not fetch data: " + reason.message;
    };
    
    $scope.pluralizer = {
      0: "no repos :(",
      1: "only one :\\",
      other: "{} repos on github :)"
    };
    
    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "-stargazers_count";
    
    github.getUser($scope.username)
      .then(onUserComplete, onError);

  };

  app.controller("UserController", UserController);

}());