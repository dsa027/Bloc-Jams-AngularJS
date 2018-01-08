(function() {
     function LandingCtrl(Search) {
       this.search = Search

       this.heroTitle = "Turn the Music Up!"
     }

     angular
         .module('blocJams')
         .controller('LandingCtrl', ['Search', LandingCtrl])
 })()
