(function() {
  function Search($location, $state, $stateParams, Fixtures, Album, SongPlayer) {
    let Search = {}

    Search.fixtures = Fixtures
    Search.album = Album
    Search.songPlayer = SongPlayer

    Search.searchTerm = ""
    Search.results = ""

    Search.handleSearch = function handleSearch() {
      if (Search.searchTerm) {
        Search.results = Fixtures.search(Search.searchTerm)
      }
      else {
        Search.results = ""
      }
    }

    Search.clearAll = function clearAll() {
      Search.searchTerm = ""
      Search.results = ""
    }

    Search.goTo = function goTo(where) {
      Search.album.setAlbum(where)
      Search.songPlayer.init()
      if ($location.path() === '/album') {
        $state.transitionTo($state.current, $stateParams, {
          reload: true, inherit: false, notify: true
        })
      }
      else {
        $location.url('/album')
      }
    }

    return Search
  }

angular
   .module('blocJams')
   .factory('Search', [
     '$location', '$state', '$stateParams', 'Fixtures', 'Album', 'SongPlayer', Search
   ])
})();
