(function() {
     function CollectionCtrl(Fixtures, SongPlayer) {
       this.songPlayer = SongPlayer
       this.fixtures = Fixtures

       this.albums = this.fixtures.getCollection()
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', [
           'Fixtures', 'SongPlayer', CollectionCtrl
         ])
 })()
