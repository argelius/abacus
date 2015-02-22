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
