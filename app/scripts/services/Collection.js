(function() {
  function Collection() {
    let Collection = {}

    Collection.chosen = function chosen(album) {
      this.album = album
    }

    return Collection
  }

angular
   .module('blocJams')
   .factory('Collection', Collection)
})();
