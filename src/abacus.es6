(function() {
  'use strict';

  var createElement = (qualifiedName) => {
    return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName);
  };

  class Chart extends HTMLElement {
    createdCallback() {
      this.style.display = 'block';

      this.shadowRoot = this.createShadowRoot();
      this.svgRoot = this.createSvgRoot();
      this.shadowRoot.appendChild(this.svgRoot);

      this.svgRoot.appendChild(this.render());
    }

    getDimensions() {
      return this.svgRoot.getBoundingClientRect();
    }

    render(dimensions) {
      var root = createElement('g');

      root.appendChild(this.renderData());

      return root;
    }

    renderData() {
      var nodes = this.getDataNodes(),
        root = createElement('g'),
        dimensions = this.getDimensions();

      var maxValue = nodes.map((node) => {
        return parseFloat(node.getAttribute('value'));
      }).reduce((a, b) => {
        return a > b ? a : b;
      });

      console.log(maxValue);

      return root;
    }

    createSvgRoot() {
      var svgRoot = createElement('svg');

      // Should fill container.
      svgRoot.style.width = '100%';
      svgRoot.style.height = '100%';

      return svgRoot;
    }

    getColor(index) {
      var baseColors = ['#AFD2E9', '#88BB92', '#EEF4D4', '#F06543', '#E36588'];
      return baseColors[index % baseColors.length];
    }

    getDataNodes() {
      var nodes = this.getElementsByTagName('abc-data');
      return Array.prototype.slice.apply(nodes);
    }
  }

  class Data extends HTMLElement {
  }

  document.registerElement('abc-chart', Chart);
  document.registerElement('abc-data', Data);
})();
