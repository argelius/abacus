(function() {
  'use strict';

  angular.module('abacus')

  .factory('PieChart', ['$abacus', function($abacus) {
    var PieChart = function(scope, element) {
      this.scope = scope;
      this.element = element;

      scope.$watchCollection('data', this.refreshScope.bind(this));
      scope.$watch('size', this.refreshScope.bind(this));
    };

    PieChart.prototype.refreshScope = function() {
      this.scope.sectors = this.calculateSectors();
      this.scope.radius = this.getRadius();
      this.scope.angles = this.calculateAngles();
      this.scope.colors = $abacus.getColors(this.scope.sectors.length);
    };

    /**
     * Return values.
     */
    PieChart.prototype.getValues = function() {
      return this.scope.data;
    };

    PieChart.prototype.getSize = function() {
      return this.scope.size;
    };

    PieChart.prototype.getRadius = function() {
      return this.getSize() / 2;
    };

    PieChart.prototype.getMidPoint = function() {
      return [this.getSize() / 2, this.getSize() / 2];
    };

    PieChart.prototype.calculateTotal = function() {
      return this.getValues().reduce(function(a, b) {
        return a + b;
      });
    };

    /**
     * Calculate angles for sectors.
     */
    PieChart.prototype.calculateAngles = function() {
      var values = this.getValues(),
          total = this.calculateTotal();

      return values.map(function(value) {
        return (value / total) * 360;
      });
    };

    PieChart.prototype.angleToCartesian = function(angle) {
      var midPoint = this.getMidPoint(),
          radius = this.getRadius();

      var angleInRadians = Math.PI / 180 * angle;

      var x = midPoint[0] + radius * Math.cos(angleInRadians),
          y = midPoint[1] + radius * Math.sin(angleInRadians);

      return [x,y];
    };

    /**
     * Get sectors.
     */
    PieChart.prototype.calculateSectors = function() {
      var angles = this.calculateAngles(),
          midPoint = this.getMidPoint(),
          sectors = new Array(angles.length);

      sectors[0] = [
        midPoint,
        this.angleToCartesian(0),
        this.angleToCartesian(angles[0])
      ];

      for (var i = 1, l = angles.length; i < l; i ++) {
        angles[i] += angles[i - 1];

        sectors[i] = [
          midPoint,
          this.angleToCartesian(angles[i - 1]),
          this.angleToCartesian(angles[i])
        ];
      }

      return sectors;
    };

    PieChart.prototype.destroy = function() {
      this.scope = this.element = null;
    };

    return PieChart;
  }]);
})();
