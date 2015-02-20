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
