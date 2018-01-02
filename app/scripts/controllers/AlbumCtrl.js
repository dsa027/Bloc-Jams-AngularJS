(function() {
     function AlbumCtrl(Fixtures) {
       this.albumData = Fixtures.getAlbum()

       AlbumCtrl.formatTime = function(time) {
         return Math.floor(thisAlbum.duration/60) + ":" + Math.floor(thisAlbum.duration%60)
       }
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl])
 })()
