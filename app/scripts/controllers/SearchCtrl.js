(function() {
  function SearchCtrl(Search) {
    this.search = Search
  }
  
  angular
  .module('blocJams')
  .controller('SearchCtrl', ['Search', SearchCtrl])
})()
