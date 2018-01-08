(function() {
  function Album() {
    let Album = {}

    Album.album = ""

    // this will be the album that is presented in AlbumCtrl
    Album.setAlbum = function setAlbum(album) {
      // Album.songPlayer.init()
      Album.album = album
    }

    // get the album that is/will be presented in AlbumCtrl
    Album.getAlbum = function getAlbum() {
      if (!Album.album) return

      return Album.album
    }

    return Album
  }

angular
   .module('blocJams')
   .factory('Album', Album)
})();
