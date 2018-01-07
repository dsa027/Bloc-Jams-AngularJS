(function() {
  function AlbumCtrl(Fixtures, SongPlayer, Playlist) {
    this.albumData = Fixtures.getAlbum()
    this.songPlayer = SongPlayer
    this.playlist = Playlist
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', [
     'Fixtures', 'SongPlayer', 'Playlist', AlbumCtrl
    ])
 })()
