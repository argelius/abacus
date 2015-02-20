(function() {
  'use strict';

  angular.module('abacus')

  .directive('abcChart', [function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/chart.html',
      transclude: true,
      scope: {
        width: '=',
        height: '='
      }
    };
  }]);
})();
