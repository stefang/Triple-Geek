function G3MeshConnection(d1, d2, g) {
  
  var v = g3.utils.getVector(d1.loc(), d2.loc());
  var alpha = g3.utils.map(v.length, 0, 300, 0.5, 0);
  var style;
  var line;
  
  var init = function() {
    line = g3.svg.line(g, d1.loc().x, d1.loc().y, d2.loc().x, d2.loc().y, set_style_from_vector());
  };
  
  var set_style_from_vector = function() {
    if ( v.length < 150 ) {
      style = {
        'stroke': '#555', 
        'stroke-width': 1 + (4 - v.length / 50), 
        'stroke-opacity': 1
      };
    } else {
      style = {
        'stroke': '#333', 
        'stroke-width': 1, 
        'stroke-opacity': alpha
      };
    }
    return style;
  };
  
  this.update_start = function() {
    var t1 = d1.disc().getAttribute('transform').replace(/[a-z]+\(*(.+)\)/, '$1').split(',');
    var t2 = d2.disc().getAttribute('transform').replace(/[a-z]+\(*(.+)\)/, '$1').split(',');
    d1.set_loc(t1[0], t1[1], false);
    d2.set_loc(t2[0], t2[1], false);
    line.setAttribute('x1', t1[0]);
    line.setAttribute('y1', t1[1]);
    line.setAttribute('x2', t2[0]);
    line.setAttribute('y2', t2[1]);
    v = g3.utils.getVector(d1.loc(), d2.loc());
    alpha = g3.utils.map(v.length, 0, 300, 0.5, 0);
    g3.svg.setAttributes(line, set_style_from_vector());
  };
  
  this.match_disc = function(d) {
   if (d == d1.dot()) {
     return true;
   } else if (d == d2.dot()) {
     return true;
   } else  {
     return false;
   }
  };
      
  init();
}