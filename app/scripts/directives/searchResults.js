(function() {
  let searchResults = function(Search) {
    return {
      templateUrl: '/templates/directives/search_results.html',
      replace: true,
      restrict: 'E',
      // transclude: true,
      scope: false,
      link: function(scope, element, attrs) {
      }
    }
  }

  angular
    .module('blocJams')
    .directive('searchResults', ['Search', searchResults])
})()
