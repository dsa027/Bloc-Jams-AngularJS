(function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
       this.albumData = Fixtures.getAlbum()
       this.songPlayer = SongPlayer

       AlbumCtrl.formatTime = function(time) {
         return Math.floor(thisAlbum.duration/60) + ":" + Math.floor(thisAlbum.duration%60)
       }
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl])
 })()
