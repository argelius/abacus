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
    '    <g \n' +
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImFiYWN1cy5qcyIsInBpZUNoYXJ0LmpzIiwiYmFyQ2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QURIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWJhY3VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnKTsgfVxuY2F0Y2goZXJyKSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJywgW10pOyB9XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAndXNlIHN0cmljdCc7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGVtcGxhdGVzL2JhckNoYXJ0Lmh0bWwnLFxuICAgICcnKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9waWVDaGFydC5odG1sJyxcbiAgICAnPHN2ZyBuZy1hdHRyLXdpZHRoPVwie3sgc2l6ZSB9fVwiIG5nLWF0dHItaGVpZ2h0PVwie3sgc2l6ZSB9fVwiPlxcbicgK1xuICAgICcgIDxnPlxcbicgK1xuICAgICcgICAgPGcgXFxuJyArXG4gICAgJyAgICAgIG5nLWF0dHItc3Ryb2tlPVwie3sgY29sb3JzWyRpbmRleF0gfX1cIlxcbicgK1xuICAgICcgICAgICBuZy1hdHRyLWZpbGw9XCJ7eyBjb2xvcnNbJGluZGV4XSB9fVwiXFxuJyArXG4gICAgJyAgICAgIG5nLXJlcGVhdD1cInNlY3RvciBpbiBzZWN0b3JzXCI+XFxuJyArXG4gICAgJyAgICAgIDxwYXRoXFxuJyArXG4gICAgJyAgICAgICAgbmctYXR0ci1kPVwiXFxuJyArXG4gICAgJyAgICAgICAgTSB7eyBzZWN0b3JbMF1bMF0gfX0ge3sgc2VjdG9yWzBdWzFdIH19XFxuJyArXG4gICAgJyAgICAgICAgTCB7eyBzZWN0b3JbMV1bMF0gfX0ge3sgc2VjdG9yWzFdWzFdIH19XFxuJyArXG4gICAgJyAgICAgICAgQSB7eyByYWRpdXMgfX0ge3sgcmFkaXVzIH19IDAge3sgYW5nbGVzWyRpbmRleF0gPj0gMTgwID8gMSA6IDAgfX0gMSB7eyBzZWN0b3JbMl1bMF0gfX0ge3sgc2VjdG9yWzJdWzFdIH19XFxuJyArXG4gICAgJyAgICAgICAgTCB7eyBzZWN0b3JbMF1bMF0gfX0ge3sgc2VjdG9yWzBdWzFdIH19XFxuJyArXG4gICAgJyAgICAgICAgXCJcXG4nICtcbiAgICAnICAgICAgPjwvcGF0aD5cXG4nICtcbiAgICAnICAgIDwvZz5cXG4nICtcbiAgICAnICA8L2c+XFxuJyArXG4gICAgJzwvc3ZnPlxcbicgK1xuICAgICd7eyBhbmdsZXMgfX1cXG4nICtcbiAgICAnJyk7XG59XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzJylcblxuICAuZmFjdG9yeSgnJGFiYWN1cycsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhYmFjdXMgPSB7fTtcblxuICAgIGFiYWN1cy5kZWZhdWx0Q29sb3JzID0gWycjMzM2NmNjJywnI2RjMzkxMicsJyNmZjk5MDAnLCcjMTA5NjE4JywnIzk5MDA5OScsJyMwMDk5YzYnLCcjZGQ0NDc3JywnIzY2YWEwMCcsJyNiODJlMmUnLCcjMzE2Mzk1JywnIzk5NDQ5OScsJyMyMmFhOTknLCcjYWFhYTExJywnIzY2MzNjYycsJyNlNjczMDAnLCcjOGIwNzA3JywnIzY1MTA2NycsJyMzMjkyNjInLCcjNTU3NGE2JywnIzNiM2VhYycsJyNiNzczMjInLCcjMTZkNjIwJywnI2I5MTM4MycsJyNmNDM1OWUnLCcjOWM1OTM1JywnI2E5YzQxMycsJyMyYTc3OGQnLCcjNjY4ZDFjJywnI2JlYTQxMycsJyMwYzU5MjInLCcjNzQzNDExJ107XG5cbiAgICBhYmFjdXMuZ2V0Q29sb3JzID0gZnVuY3Rpb24obmJyT2ZDb2xvcnMpIHtcbiAgICAgIHZhciBjb2xvcnMgPSBuZXcgQXJyYXkobmJyT2ZDb2xvcnMpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ick9mQ29sb3JzOyBpKyspIHtcbiAgICAgICAgY29sb3JzW2ldID0gYWJhY3VzLmRlZmF1bHRDb2xvcnNbaSAlIGFiYWN1cy5kZWZhdWx0Q29sb3JzLmxlbmd0aF07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfTtcblxuICAgIHJldHVybiBhYmFjdXM7XG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMnKVxuXG4gIC5kaXJlY3RpdmUoJ2FiY1BpZUNoYXJ0JywgWydQaWVDaGFydCcsIGZ1bmN0aW9uKFBpZUNoYXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9waWVDaGFydC5odG1sJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGRhdGE6ICc9JyxcbiAgICAgICAgc2l6ZTogJz0nXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLnBpZUNoYXJ0ID0gbmV3IFBpZUNoYXJ0KHNjb3BlLCBlbGVtZW50KTtcblxuICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2NvcGUucGllQ2hhcnQuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9