(function() {
     function PlayerBarCtrl(SongPlayer, Album) {
         this.album = Album
         this.songPlayer = SongPlayer

         this.albumData = this.album.getAlbum()
     }

     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', [
           'SongPlayer', 'Album', PlayerBarCtrl
         ]);
 })();
