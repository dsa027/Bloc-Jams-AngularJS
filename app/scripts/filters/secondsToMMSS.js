(function() {
  angular
    .module('blocJams')
    .filter('secondsToMMSS', [function() {
      return function(seconds) {
        if (!seconds || isNaN(seconds)) return '-:--'

        let date = new Date(1970, 0, 1)
        date.setSeconds(seconds)

        return date.getMinutes() + ":" + ('0' + date.getSeconds()).slice(0, 2)
     }
   }])
})()
