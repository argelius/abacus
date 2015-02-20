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
  $templateCache.put('templates/chart.html',
    '<svg ng-attr-width="{{ width }}" ng-attr-height="{{ height }}">\n' +
    '  <g ng-transclude>\n' +
    '  </g>\n' +
    '</svg>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('abacus.templates'); }
catch(err) { module = angular.module('abacus.templates', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/pieChart.html',
    '<abc-chart width="width" height="height">\n' +
    '  <g stroke="black" ng-repeat="segment in getAngles()">\n' +
    '  </g>\n' +
    '</abc-chart>\n' +
    '\n' +
    '');
}]);
})();

(function() {
  'use strict';
   
  angular.module('abacus', ['abacus.templates']);
})();

(function() {
  'use strict';
})();

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImFiYWN1cy5qcyIsImJhckNoYXJ0LmpzIiwiY2hhcnQuanMiLCJwaWVDaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhYmFjdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24obW9kdWxlKSB7XG50cnkgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycpOyB9XG5jYXRjaChlcnIpIHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnLCBbXSk7IH1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0ZW1wbGF0ZXMvYmFyQ2hhcnQuaHRtbCcsXG4gICAgJycpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnKTsgfVxuY2F0Y2goZXJyKSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJywgW10pOyB9XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAndXNlIHN0cmljdCc7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGVtcGxhdGVzL2NoYXJ0Lmh0bWwnLFxuICAgICc8c3ZnIG5nLWF0dHItd2lkdGg9XCJ7eyB3aWR0aCB9fVwiIG5nLWF0dHItaGVpZ2h0PVwie3sgaGVpZ2h0IH19XCI+XFxuJyArXG4gICAgJyAgPGcgbmctdHJhbnNjbHVkZT5cXG4nICtcbiAgICAnICA8L2c+XFxuJyArXG4gICAgJzwvc3ZnPlxcbicgK1xuICAgICcnKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9waWVDaGFydC5odG1sJyxcbiAgICAnPGFiYy1jaGFydCB3aWR0aD1cIndpZHRoXCIgaGVpZ2h0PVwiaGVpZ2h0XCI+XFxuJyArXG4gICAgJyAgPGcgc3Ryb2tlPVwiYmxhY2tcIiBuZy1yZXBlYXQ9XCJzZWdtZW50IGluIGdldEFuZ2xlcygpXCI+XFxuJyArXG4gICAgJyAgPC9nPlxcbicgK1xuICAgICc8L2FiYy1jaGFydD5cXG4nICtcbiAgICAnXFxuJyArXG4gICAgJycpO1xufV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAgXG4gIGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMnLCBbJ2FiYWN1cy50ZW1wbGF0ZXMnXSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FiYWN1cycpXG5cbiAgLmRpcmVjdGl2ZSgnYWJjQ2hhcnQnLCBbZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jaGFydC5odG1sJyxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICB3aWR0aDogJz0nLFxuICAgICAgICBoZWlnaHQ6ICc9J1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzJylcblxuICAuZGlyZWN0aXZlKCdhYmNQaWVDaGFydCcsIFtmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3BpZUNoYXJ0Lmh0bWwnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgZGF0YTogJz0nXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLndpZHRoID0gMjAwO1xuICAgICAgICBzY29wZS5oZWlnaHQgPSAyMDA7XG5cbiAgICAgICAgc2NvcGUuZ2V0VmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHNjb3BlLmRhdGE7XG4gICAgICAgIH07XG5cbiAgICAgICAgc2NvcGUuZ2V0VG90YWwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc2NvcGUuZ2V0VmFsdWVzKCkucmVkdWNlKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhICsgYjtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzY29wZS5nZXRBbmdsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdG90YWwgPSBzY29wZS5nZXRUb3RhbCgpO1xuXG4gICAgICAgICAgcmV0dXJuIHNjb3BlLmdldFZhbHVlcygpLm1hcChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSAvIHRvdGFsKSAqIDIgKiBNYXRoLlBJO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9OyAgIFxuXG4gICAgICAgIHZhciBwb2xhclRvQ2FydGVzaWFuID0gZnVuY3Rpb24oY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBhbmdsZSkge1xuICAgICAgICAgICAgdmFyIHggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICAgICAgICAgIHkgPSBjZW50ZXJZICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gW3gsIHldO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNjb3BlLmdldFNlZ21lbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGFuZ2xlcyA9IHNjb3BlLmdldEFuZ2xlcygpO1xuXG4gICAgICAgICAgcmV0dXJuIGFuZ2xlcy5tYXAoZnVuY3Rpb24oYW5nbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwb2xhclRvQ2FydGVzaWFuKHNjb3BlLndpZHRoIC8gMiwgc2NvcGUud2lkdGggLyAyLCBzY29wZS53aWR0aCAvIDIsIGFuZ2xlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9