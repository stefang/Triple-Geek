g3.svg.perf = {
  test: function() {
    count = 1000;
    if (g3.utils.supports_svg()) {
      start = new Date();
      var svgtestnode = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svgtestnode.setAttribute('width', '100');
      svgtestnode.setAttribute('height', '100');
      svgtestnode.setAttribute('display', 'none');
      document.body.appendChild(svgtestnode);
      g3.svg.perf.create_circle(svgtestnode, count);
      end = new Date();
      p = g3.utils.map(end - start, 26, 86, 20, 6);
      return p;
    }
    svgtestnode.parentNode.removeChild(svgtestnode);
  },
  create_circle: function(parent, count) {
    for (var i = 0; i < count; i++) {
      g3.svg.circle(parent, Math.random()*100, Math.random()*100, 5, {
        'fill': '#2C96CA', 
        'stroke': '#2e2e2e', 
        'stroke-width': 1, 
        'stroke-opacity': 0.5,
        'cursor': 'pointer'
      });
    }
  }
};