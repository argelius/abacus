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
    '<svg>\n' +
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
    '<abc-chart>\n' +
    '  <g>\n' +
    '  </g>\n' +
    '</abc-chart>\n' +
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
      transclude: true
    };
  }]);
})();

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyIsImFiYWN1cy5qcyIsImJhckNoYXJ0LmpzIiwiY2hhcnQuanMiLCJwaWVDaGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFiYWN1cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9iYXJDaGFydC5odG1sJyxcbiAgICAnJyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycpOyB9XG5jYXRjaChlcnIpIHsgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ2FiYWN1cy50ZW1wbGF0ZXMnLCBbXSk7IH1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd0ZW1wbGF0ZXMvY2hhcnQuaHRtbCcsXG4gICAgJzxzdmc+XFxuJyArXG4gICAgJyAgPGcgbmctdHJhbnNjbHVkZT5cXG4nICtcbiAgICAnICA8L2c+XFxuJyArXG4gICAgJzwvc3ZnPlxcbicgK1xuICAgICcnKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMudGVtcGxhdGVzJyk7IH1cbmNhdGNoKGVycikgeyBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzLnRlbXBsYXRlcycsIFtdKTsgfVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3RlbXBsYXRlcy9waWVDaGFydC5odG1sJyxcbiAgICAnPGFiYy1jaGFydD5cXG4nICtcbiAgICAnICA8Zz5cXG4nICtcbiAgICAnICA8L2c+XFxuJyArXG4gICAgJzwvYWJjLWNoYXJ0PlxcbicgK1xuICAgICcnKTtcbn1dKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgIFxuICBhbmd1bGFyLm1vZHVsZSgnYWJhY3VzJywgWydhYmFjdXMudGVtcGxhdGVzJ10pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMnKVxuXG4gIC5kaXJlY3RpdmUoJ2FiY0NoYXJ0JywgW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY2hhcnQuaHRtbCcsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlXG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhYmFjdXMnKVxuXG4gIC5kaXJlY3RpdmUoJ2FiY1BpZUNoYXJ0JywgW2Z1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcGllQ2hhcnQuaHRtbCcgXG4gICAgfTtcbiAgfV0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==