(function() {
  function AlbumCtrl(SongPlayer, Playlist, Album, Search) {
    this.songPlayer = SongPlayer
    this.playlist = Playlist
    this.album = Album
    this.search = Search

    this.albumData = this.album.getAlbum()
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', [
      'SongPlayer', 'Playlist', 'Album', 'Search', AlbumCtrl
    ])
 })()
