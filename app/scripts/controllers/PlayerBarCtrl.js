(function() {
     function PlayerBarCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum()

         this.fixtures = Fixtures
         this.songPlayer = SongPlayer
     }

     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();
