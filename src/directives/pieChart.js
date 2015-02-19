(function() {
  'use strict';

  angular.module('abacus')

  .directive('abcPieChart', [function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/pieChart.html' 
    };
  }]);
})();
