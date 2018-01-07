(function() {
  let playlistSelect = function(Playlist) {
    return {
      templateUrl: '/templates/directives/playlist_select.html',
      replace: true,
      restrict: 'E',
      // transclude: true,
      scope: false,
      link: function(scope, element, attrs) {
        scope.playlist = Playlist
      }
    }
  }

  angular
    .module('blocJams')
    .directive('playlistSelect', ['Playlist', playlistSelect])

})()
