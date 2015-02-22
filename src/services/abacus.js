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
