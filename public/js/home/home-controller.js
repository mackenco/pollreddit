angular.module('pollreddit')
  .controller('HomeController', ['$scope', '$routeParams', '$location', '$resource', '$interval', 'localStorageService',
    function ($scope, $routeParams, $location, $resource, $interval, localStorageService) {
      $scope.clicked = null;
      $scope.clickedPin = null;
      $scope.first = true;
      $scope.resultsLoading = false;
      $scope.commentLoading = false;
      $scope.pins = JSON.parse(localStorageService.get('pins')) || [];
      $scope.pinIds = [];

      $scope.search = function() {
        $scope.first = true;
        $scope.results = {};
        $scope.poll(); 
      };

      $scope.validThumb = function(thumb) {
        return thumb.match(/http:/) ? true : false;
      };

      $scope.setClicked = function(result) {
        $scope.clicked = result.data.id; 
        $scope.comment = {};
        $scope.commentLoading = true;
        var stripped = result.data.permalink.match(/.*(?=\?)/)[0];
        Comment.query({ base: stripped }, function(results) {
          var comment = results[1].data.children[0];
          if (comment) {
            $scope.comment = comment.data; 
          } else {
            $scope.comment = {body: 'No comments', author: 'No author'}; 
          }
          $scope.commentLoading = false;
        });
      };

      $scope.setClickedPin = function(pin) {
        $scope.clickedPin = pin.id; 
      };

      $scope.pinResult = function(result) {
        if ($scope.pinIds.indexOf(result.data.id) > -1) { return; }

        $scope.pins.push({
          id: result.data.id,
          title: result.data.title,
          thumbnail: result.data.thumbnail,
          score: result.data.score,
          url: result.data.url,
          permalink: result.data.permalink,
          comment: {
            author: $scope.comment.author,
            body: $scope.comment.body 
          } 
        });
        localStorageService.set('pins', JSON.stringify($scope.pins));  

        $scope.pinIds.push(result.data.id);
      };

      $scope.isPinned = function(result) {
        return $scope.pinIds.indexOf(result.data.id) > -1; 
      }

      var Result = $resource('/search', { keyword: '@keyword' });
      var Comment = $resource('/comment', { base: '@base' });

      $scope.poll = function() {
        if ($scope.keyword) {
          $scope.resultsLoading = true;
          Result.get({keyword: $scope.keyword}, function(results) {
            $scope.results = results.data.children; 
            $scope.resultsLoading = false;
            $scope.first = false;
          }); 
        } else {
          $scope.results = []; 
        }
      };
  
      $interval($scope.poll, 60000);
  }]);
