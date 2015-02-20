(function() {
  'use strict';

  angular.module('abacus')

  .directive('abcPieChart', [function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pieChart.html',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {
        scope.width = 200;
        scope.height = 200;

        scope.getValues = function() {
          return scope.data;
        };

        scope.getTotal = function() {
          return scope.getValues().reduce(function(a, b) {
            return a + b;
          });
        };

        scope.getAngles = function() {
          var total = scope.getTotal();

          return scope.getValues().map(function(value) {
            return (value / total) * 2 * Math.PI;
          });
        };   

        var polarToCartesian = function(centerX, centerY, radius, angle) {
            var x = centerX + radius * Math.cos(angle),
                y = centerY + radius * Math.sin(angle);

            return [x, y];
        };

        scope.getSegments = function() {
          var angles = scope.getAngles();

          return angles.map(function(angle) {
            return polarToCartesian(scope.width / 2, scope.width / 2, scope.width / 2, angle);
          });
        };
      }
    };
  }]);
})();
