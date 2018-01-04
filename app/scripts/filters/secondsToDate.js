angular
   .module('blocJams')
   .filter('secondsToDate', [function() {
     return function(seconds) {
       return new Date(1970, 0, 1).setSeconds(seconds)
     }
   }])
