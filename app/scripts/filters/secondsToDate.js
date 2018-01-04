(function() {
  angular
   .module('blocJams')
   .filter('secondsToDate', [function() {
     return function(seconds) {
       if (Number.isNaN(seconds)) return 0

       return new Date(1970, 0, 1).setSeconds(seconds)
     }
   }])
})()
