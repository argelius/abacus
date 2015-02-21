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
    '<svg width="200" height="200">\n' +
    '  <g>\n' +
    '    <g ng-repeat="piece in pieces">\n' +
    '\n' +
    '    </g>\n' +
    '  </g>\n' +
    '</svg>\n' +
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
      }
    };
  }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImFiYWN1cy5qcyIsImJhckNoYXJ0LmpzIiwiY2hhcnQuanMiLCJwaWVDaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhYmFjdXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24obW9kdWxlKSB7XG50cnkgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycpOyB9XG5jYXRjaChlcnIpIHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnLCBbXSk7IH1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0ZW1wbGF0ZXMvYmFyQ2hhcnQuaHRtbCcsXG4gICAgJycpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnKTsgfVxuY2F0Y2goZXJyKSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJywgW10pOyB9XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAndXNlIHN0cmljdCc7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndGVtcGxhdGVzL2NoYXJ0Lmh0bWwnLFxuICAgICc8c3ZnIG5nLWF0dHItd2lkdGg9XCJ7eyB3aWR0aCB9fVwiIG5nLWF0dHItaGVpZ2h0PVwie3sgaGVpZ2h0IH19XCI+XFxuJyArXG4gICAgJyAgPGcgbmctdHJhbnNjbHVkZT5cXG4nICtcbiAgICAnICA8L2c+XFxuJyArXG4gICAgJzwvc3ZnPlxcbicgK1xuICAgICcnKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9waWVDaGFydC5odG1sJyxcbiAgICAnPHN2ZyB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiPlxcbicgK1xuICAgICcgIDxnPlxcbicgK1xuICAgICcgICAgPGcgbmctcmVwZWF0PVwicGllY2UgaW4gcGllY2VzXCI+XFxuJyArXG4gICAgJ1xcbicgK1xuICAgICcgICAgPC9nPlxcbicgK1xuICAgICcgIDwvZz5cXG4nICtcbiAgICAnPC9zdmc+XFxuJyArXG4gICAgJycpO1xufV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAgXG4gIGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMnLCBbJ2FiYWN1cy50ZW1wbGF0ZXMnXSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FiYWN1cycpXG5cbiAgLmRpcmVjdGl2ZSgnYWJjQ2hhcnQnLCBbZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jaGFydC5odG1sJyxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICB3aWR0aDogJz0nLFxuICAgICAgICBoZWlnaHQ6ICc9J1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzJylcblxuICAuZGlyZWN0aXZlKCdhYmNQaWVDaGFydCcsIFtmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3BpZUNoYXJ0Lmh0bWwnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgZGF0YTogJz0nXG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==