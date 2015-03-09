(function(module) {
try { module = angular.module('abacus.templates'); }
catch(err) { module = angular.module('abacus.templates', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/barChart.html',
    '');
}]);
})();

(function(module) {
try { module = angular.module('abacus.templates'); }
catch(err) { module = angular.module('abacus.templates', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/pieChart.html',
    '<svg ng-attr-width="{{ size }}" ng-attr-height="{{ size }}">\n' +
    '  <g>\n' +
    '    <g\n' +
    '      ng-attr-stroke="{{ colors[$index] }}"\n' +
    '      ng-attr-fill="{{ colors[$index] }}"\n' +
    '      ng-repeat="sector in sectors">\n' +
    '      <path\n' +
    '        ng-attr-d="\n' +
    '        M {{ sector[0][0] }} {{ sector[0][1] }}\n' +
    '        L {{ sector[1][0] }} {{ sector[1][1] }}\n' +
    '        A {{ radius }} {{ radius }} 0 {{ angles[$index] >= 180 ? 1 : 0 }} 1 {{ sector[2][0] }} {{ sector[2][1] }}\n' +
    '        L {{ sector[0][0] }} {{ sector[0][1] }}\n' +
    '        "\n' +
    '      ></path>\n' +
    '    </g>\n' +
    '  </g>\n' +
    '</svg>\n' +
    '{{ angles }}\n' +
    '');
}]);
})();

(function() {
  'use strict';
   
  angular.module('abacus', ['abacus.templates']);
})();

(function() {
  angular.module('abacus')

  .factory('$abacus', function() {
    var abacus = {};

    abacus.defaultColors = ['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#b82e2e','#316395','#994499','#22aa99','#aaaa11','#6633cc','#e67300','#8b0707','#651067','#329262','#5574a6','#3b3eac','#b77322','#16d620','#b91383','#f4359e','#9c5935','#a9c413','#2a778d','#668d1c','#bea413','#0c5922','#743411'];

    abacus.getColors = function(nbrOfColors) {
      var colors = new Array(nbrOfColors);

      for (var i = 0; i < nbrOfColors; i++) {
        colors[i] = abacus.defaultColors[i % abacus.defaultColors.length];
      }

      return colors;
    };

    return abacus;
  });
})();

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

(function() {
  'use strict';
})();

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImFiYWN1cy5qcyIsInBpZUNoYXJ0LmpzIiwiYmFyQ2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QURIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWJhY3VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnKTsgfVxuY2F0Y2goZXJyKSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJywgW10pOyB9XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAndXNlIHN0cmljdCc7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGVtcGxhdGVzL2JhckNoYXJ0Lmh0bWwnLFxuICAgICcnKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9waWVDaGFydC5odG1sJyxcbiAgICAnPHN2ZyBuZy1hdHRyLXdpZHRoPVwie3sgc2l6ZSB9fVwiIG5nLWF0dHItaGVpZ2h0PVwie3sgc2l6ZSB9fVwiPlxcbicgK1xuICAgICcgIDxnPlxcbicgK1xuICAgICcgICAgPGdcXG4nICtcbiAgICAnICAgICAgbmctYXR0ci1zdHJva2U9XCJ7eyBjb2xvcnNbJGluZGV4XSB9fVwiXFxuJyArXG4gICAgJyAgICAgIG5nLWF0dHItZmlsbD1cInt7IGNvbG9yc1skaW5kZXhdIH19XCJcXG4nICtcbiAgICAnICAgICAgbmctcmVwZWF0PVwic2VjdG9yIGluIHNlY3RvcnNcIj5cXG4nICtcbiAgICAnICAgICAgPHBhdGhcXG4nICtcbiAgICAnICAgICAgICBuZy1hdHRyLWQ9XCJcXG4nICtcbiAgICAnICAgICAgICBNIHt7IHNlY3RvclswXVswXSB9fSB7eyBzZWN0b3JbMF1bMV0gfX1cXG4nICtcbiAgICAnICAgICAgICBMIHt7IHNlY3RvclsxXVswXSB9fSB7eyBzZWN0b3JbMV1bMV0gfX1cXG4nICtcbiAgICAnICAgICAgICBBIHt7IHJhZGl1cyB9fSB7eyByYWRpdXMgfX0gMCB7eyBhbmdsZXNbJGluZGV4XSA+PSAxODAgPyAxIDogMCB9fSAxIHt7IHNlY3RvclsyXVswXSB9fSB7eyBzZWN0b3JbMl1bMV0gfX1cXG4nICtcbiAgICAnICAgICAgICBMIHt7IHNlY3RvclswXVswXSB9fSB7eyBzZWN0b3JbMF1bMV0gfX1cXG4nICtcbiAgICAnICAgICAgICBcIlxcbicgK1xuICAgICcgICAgICA+PC9wYXRoPlxcbicgK1xuICAgICcgICAgPC9nPlxcbicgK1xuICAgICcgIDwvZz5cXG4nICtcbiAgICAnPC9zdmc+XFxuJyArXG4gICAgJ3t7IGFuZ2xlcyB9fVxcbicgK1xuICAgICcnKTtcbn1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMnKVxuXG4gIC5mYWN0b3J5KCckYWJhY3VzJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFiYWN1cyA9IHt9O1xuXG4gICAgYWJhY3VzLmRlZmF1bHRDb2xvcnMgPSBbJyMzMzY2Y2MnLCcjZGMzOTEyJywnI2ZmOTkwMCcsJyMxMDk2MTgnLCcjOTkwMDk5JywnIzAwOTljNicsJyNkZDQ0NzcnLCcjNjZhYTAwJywnI2I4MmUyZScsJyMzMTYzOTUnLCcjOTk0NDk5JywnIzIyYWE5OScsJyNhYWFhMTEnLCcjNjYzM2NjJywnI2U2NzMwMCcsJyM4YjA3MDcnLCcjNjUxMDY3JywnIzMyOTI2MicsJyM1NTc0YTYnLCcjM2IzZWFjJywnI2I3NzMyMicsJyMxNmQ2MjAnLCcjYjkxMzgzJywnI2Y0MzU5ZScsJyM5YzU5MzUnLCcjYTljNDEzJywnIzJhNzc4ZCcsJyM2NjhkMWMnLCcjYmVhNDEzJywnIzBjNTkyMicsJyM3NDM0MTEnXTtcblxuICAgIGFiYWN1cy5nZXRDb2xvcnMgPSBmdW5jdGlvbihuYnJPZkNvbG9ycykge1xuICAgICAgdmFyIGNvbG9ycyA9IG5ldyBBcnJheShuYnJPZkNvbG9ycyk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmJyT2ZDb2xvcnM7IGkrKykge1xuICAgICAgICBjb2xvcnNbaV0gPSBhYmFjdXMuZGVmYXVsdENvbG9yc1tpICUgYWJhY3VzLmRlZmF1bHRDb2xvcnMubGVuZ3RoXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFiYWN1cztcbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FiYWN1cycpXG5cbiAgLmRpcmVjdGl2ZSgnYWJjUGllQ2hhcnQnLCBbJ1BpZUNoYXJ0JywgZnVuY3Rpb24oUGllQ2hhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3BpZUNoYXJ0Lmh0bWwnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgZGF0YTogJz0nLFxuICAgICAgICBzaXplOiAnPSdcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUucGllQ2hhcnQgPSBuZXcgUGllQ2hhcnQoc2NvcGUsIGVsZW1lbnQpO1xuXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzY29wZS5waWVDaGFydC5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0Jztcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=