(function() {
     function CollectionCtrl(Fixtures, Collection, SongPlayer) {
       this.collection = Collection
       this.songPlayer = SongPlayer
       this.albums = Fixtures.getCollection()
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', [
           'Fixtures', 'Collection', 'SongPlayer', CollectionCtrl
         ])
 })()
