require('./senseHelpExample');

const storage = require('../storage');

require('ui/modules')
.get('app/sense')
.directive('senseWelcome', function () {
  return {
    restrict: 'E',
    template: require('./welcome.html'),
    link: function ($scope) {
      // date junk is a work around for https://github.com/elastic/kibana/pull/5167
      var shown = Date.now();

      $scope.$on('$destroy', function () {
        if (Date.now() - shown > 1000) {
          storage.set('version_welcome_shown', 'f271d96dcc64cc6747bc2565501b2bb990917d5d');
        }
      });
    }
  }
});
