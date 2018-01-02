(function() {
     function AlbumCtrl() {
       this.albumData = albumPicasso
     }

     this.formatTime = function(time) {
       return Math.floor(thisAlbum.duration/60) + ":" + Math.floor(thisAlbum.duration%60)
     }

     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl)
 })()
