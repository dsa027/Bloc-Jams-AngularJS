(function() {
  function PlaylistsCtrl(Playlist) {
    this.playlist = Playlist
  }

  angular
    .module('blocJams')
    .controller('PlaylistsCtrl', ['Playlist', PlaylistsCtrl])
 })()
