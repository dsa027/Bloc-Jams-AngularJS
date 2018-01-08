(function() {
     function CollectionCtrl(Fixtures, SongPlayer, Album, Search) {
       this.fixtures = Fixtures
       this.songPlayer = SongPlayer
       this.album = Album
       this.search = Search

       this.albums = this.fixtures.getCollection()
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', [
           'Fixtures', 'SongPlayer', 'Album', 'Search', CollectionCtrl
         ])
 })()
