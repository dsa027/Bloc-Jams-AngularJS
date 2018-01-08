(function() {
  function PlaylistsCtrl(Playlist, Search) {
    this.playlist = Playlist
    this.search = Search
  }

  angular
    .module('blocJams')
    .controller('PlaylistsCtrl', ['Playlist', 'Search', PlaylistsCtrl])
 })()
