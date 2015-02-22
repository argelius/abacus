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
      console.log(this.scope.colors);
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
      console.log(sectors);

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImFiYWN1cy5qcyIsInBpZUNoYXJ0LmpzIiwiYmFyQ2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FESEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFiYWN1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9iYXJDaGFydC5odG1sJyxcbiAgICAnJyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycpOyB9XG5jYXRjaChlcnIpIHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnLCBbXSk7IH1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0ZW1wbGF0ZXMvcGllQ2hhcnQuaHRtbCcsXG4gICAgJzxzdmcgbmctYXR0ci13aWR0aD1cInt7IHNpemUgfX1cIiBuZy1hdHRyLWhlaWdodD1cInt7IHNpemUgfX1cIj5cXG4nICtcbiAgICAnICA8Zz5cXG4nICtcbiAgICAnICAgIDxnIFxcbicgK1xuICAgICcgICAgICBuZy1hdHRyLXN0cm9rZT1cInt7IGNvbG9yc1skaW5kZXhdIH19XCJcXG4nICtcbiAgICAnICAgICAgbmctYXR0ci1maWxsPVwie3sgY29sb3JzWyRpbmRleF0gfX1cIlxcbicgK1xuICAgICcgICAgICBuZy1yZXBlYXQ9XCJzZWN0b3IgaW4gc2VjdG9yc1wiPlxcbicgK1xuICAgICcgICAgICA8cGF0aFxcbicgK1xuICAgICcgICAgICAgIG5nLWF0dHItZD1cIlxcbicgK1xuICAgICcgICAgICAgIE0ge3sgc2VjdG9yWzBdWzBdIH19IHt7IHNlY3RvclswXVsxXSB9fVxcbicgK1xuICAgICcgICAgICAgIEwge3sgc2VjdG9yWzFdWzBdIH19IHt7IHNlY3RvclsxXVsxXSB9fVxcbicgK1xuICAgICcgICAgICAgIEEge3sgcmFkaXVzIH19IHt7IHJhZGl1cyB9fSAwIHt7IGFuZ2xlc1skaW5kZXhdID49IDE4MCA/IDEgOiAwIH19IDEge3sgc2VjdG9yWzJdWzBdIH19IHt7IHNlY3RvclsyXVsxXSB9fVxcbicgK1xuICAgICcgICAgICAgIEwge3sgc2VjdG9yWzBdWzBdIH19IHt7IHNlY3RvclswXVsxXSB9fVxcbicgK1xuICAgICcgICAgICAgIFwiXFxuJyArXG4gICAgJyAgICAgID48L3BhdGg+XFxuJyArXG4gICAgJyAgICA8L2c+XFxuJyArXG4gICAgJyAgPC9nPlxcbicgK1xuICAgICc8L3N2Zz5cXG4nICtcbiAgICAne3sgYW5nbGVzIH19XFxuJyArXG4gICAgJycpO1xufV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgYW5ndWxhci5tb2R1bGUoJ2FiYWN1cycpXG5cbiAgLmZhY3RvcnkoJyRhYmFjdXMnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYWJhY3VzID0ge307XG5cbiAgICBhYmFjdXMuZGVmYXVsdENvbG9ycyA9IFsnIzMzNjZjYycsJyNkYzM5MTInLCcjZmY5OTAwJywnIzEwOTYxOCcsJyM5OTAwOTknLCcjMDA5OWM2JywnI2RkNDQ3NycsJyM2NmFhMDAnLCcjYjgyZTJlJywnIzMxNjM5NScsJyM5OTQ0OTknLCcjMjJhYTk5JywnI2FhYWExMScsJyM2NjMzY2MnLCcjZTY3MzAwJywnIzhiMDcwNycsJyM2NTEwNjcnLCcjMzI5MjYyJywnIzU1NzRhNicsJyMzYjNlYWMnLCcjYjc3MzIyJywnIzE2ZDYyMCcsJyNiOTEzODMnLCcjZjQzNTllJywnIzljNTkzNScsJyNhOWM0MTMnLCcjMmE3NzhkJywnIzY2OGQxYycsJyNiZWE0MTMnLCcjMGM1OTIyJywnIzc0MzQxMSddO1xuXG4gICAgYWJhY3VzLmdldENvbG9ycyA9IGZ1bmN0aW9uKG5ick9mQ29sb3JzKSB7XG4gICAgICB2YXIgY29sb3JzID0gbmV3IEFycmF5KG5ick9mQ29sb3JzKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYnJPZkNvbG9yczsgaSsrKSB7XG4gICAgICAgIGNvbG9yc1tpXSA9IGFiYWN1cy5kZWZhdWx0Q29sb3JzW2kgJSBhYmFjdXMuZGVmYXVsdENvbG9ycy5sZW5ndGhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29sb3JzO1xuICAgIH07XG5cbiAgICByZXR1cm4gYWJhY3VzO1xuICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzJylcblxuICAuZGlyZWN0aXZlKCdhYmNQaWVDaGFydCcsIFsnUGllQ2hhcnQnLCBmdW5jdGlvbihQaWVDaGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcGllQ2hhcnQuaHRtbCcsXG4gICAgICBzY29wZToge1xuICAgICAgICBkYXRhOiAnPScsXG4gICAgICAgIHNpemU6ICc9J1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBzY29wZS5waWVDaGFydCA9IG5ldyBQaWVDaGFydChzY29wZSwgZWxlbWVudCk7XG5cbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNjb3BlLnBpZUNoYXJ0LmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==