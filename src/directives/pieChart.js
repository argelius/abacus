(function() {
  'use strict';

  angular.module('abacus')

  .directive('abcPieChart', ['PieChart', function(PieChart) {
    return {
      restrict: 'E',
      templateUrl: 'templates/pieChart.html',
      scope: {
        data: '=',
        size: '='
      },
      link: function(scope, element, attrs) {
        scope.pieChart = new PieChart(scope, element);

        scope.$on('$destroy', function() {
          scope.pieChart.destroy();
        });
      }
    };
  }]);
})();
