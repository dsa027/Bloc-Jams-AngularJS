(function() {
  let yesNoDialog = function() {
    return {
      templateUrl: '/templates/directives/yes_no_dialog.html',
      replace: true,
      restrict: 'E',
      // transclude: true,
      scope: {
        handleNo: '&',
        handleYes: '&',
        leave: '&'
      },
      link: function(scope, element, attrs) {
        var yesNoDialog = $(element)

        attrs.$observe('title', function(value) {
          scope.title = value
        })

        attrs.$observe('key', function(value) {
          scope.key = value
        })

        attrs.$observe('buttonYes', function(value) {
          scope.buttonYes = value
        })

        attrs.$observe('buttonNo', function(value) {
          scope.buttonNo = value
        })

        scope.handleNoButton = function handleNoButton() {
          scope.handleNo()
        }

        scope.handleYesButton = function handleYesButton() {
          scope.handleYes()
        }
      }
    }
  }

  angular
    .module('blocJams')
    .directive('yesNoDialog', yesNoDialog)
})()
