'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

(function () {
  'use strict';

  var createElement = function createElement(qualifiedName) {
    return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);
  };

  var Chart = (function (_HTMLElement) {
    function Chart() {
      _classCallCheck(this, Chart);

      if (_HTMLElement != null) {
        _HTMLElement.apply(this, arguments);
      }
    }

    _inherits(Chart, _HTMLElement);

    _createClass(Chart, [{
      key: 'createdCallback',
      value: function createdCallback() {
        this.style.display = 'block';

        this.shadowRoot = this.createShadowRoot();
        this.svgRoot = this.createSvgRoot();
        this.shadowRoot.appendChild(this.svgRoot);

        this.svgRoot.appendChild(this.render());
      }
    }, {
      key: 'getDimensions',
      value: function getDimensions() {
        return this.svgRoot.getBoundingClientRect();
      }
    }, {
      key: 'render',
      value: function render(dimensions) {
        var root = createElement('g');

        root.appendChild(this.renderData());

        return root;
      }
    }, {
      key: 'renderData',
      value: function renderData() {
        var nodes = this.getDataNodes(),
            root = createElement('g'),
            dimensions = this.getDimensions();

        var maxValue = nodes.map(function (node) {
          return parseFloat(node.getAttribute('value'));
        }).reduce(function (a, b) {
          return a > b ? a : b;
        });

        console.log(maxValue);

        return root;
      }
    }, {
      key: 'createSvgRoot',
      value: function createSvgRoot() {
        var svgRoot = createElement('svg');

        // Should fill container.
        svgRoot.style.width = '100%';
        svgRoot.style.height = '100%';

        return svgRoot;
      }
    }, {
      key: 'getColor',
      value: function getColor(index) {
        var baseColors = ['#AFD2E9', '#88BB92', '#EEF4D4', '#F06543', '#E36588'];
        return baseColors[index % baseColors.length];
      }
    }, {
      key: 'getDataNodes',
      value: function getDataNodes() {
        var nodes = this.getElementsByTagName('abc-data');
        return Array.prototype.slice.apply(nodes);
      }
    }]);

    return Chart;
  })(HTMLElement);

  var Data = (function (_HTMLElement2) {
    function Data() {
      _classCallCheck(this, Data);

      if (_HTMLElement2 != null) {
        _HTMLElement2.apply(this, arguments);
      }
    }

    _inherits(Data, _HTMLElement2);

    return Data;
  })(HTMLElement);

  document.registerElement('abc-chart', Chart);
  document.registerElement('abc-data', Data);
})();
//# sourceMappingURL=abacus.js.map