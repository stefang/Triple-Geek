function G3MeshUi() {
  
  var discs = [];
  var connections = [];
  var connection_g = g3.svg.group(g3_mesh.svg, { id: 'connections' });
  var dragging = false;
  var drag_el;
  var pos;
    
  var init = function() {
    for ( var i=0; i < g3_mesh.perf; i++ ) {
      discs.push(new G3MeshDisc(i));
    }
    // Connections
    var skip = 0;
    g3.utils.each(discs, function(i,d){
      for (var j = skip; j < g3.utils.objLength(discs); j++) {
        if (j!==i) {
          c = new G3MeshConnection(discs[i], discs[j], connection_g);
          connections.push(c);
        }
      }
      skip ++;
    });
    
    if (g3.utils.is_touch_device()) {
      g3.utils.each(discs, function(i,d){
        d.dot().addEventListener('touchstart',function(e){
          dragging = true;
          drag_el = this;
        }, false);
      });
      
      g3_mesh.svg.addEventListener('touchmove',function(e){
        if (dragging === true) {
          e.preventDefault();
          npos = pos(e.pageX, e.pageY, g3_mesh.el);
          drag_el.parentNode.setAttributeNS(null, 'transform', 'translate('+npos.x+','+npos.y+')');
          g3.utils.each(connections, function(i,c) { 
            if (c.match_disc(drag_el)) {
              c.update_start();
            }
          });
        }
      }, false);
      
      g3_mesh.svg.addEventListener('touchend',function(e){
        dragging = false;
      }, false)
            
    } else {
      // Mousebits

      g3.utils.each(discs, function(i,d){
        d.dot().addEventListener('mousedown',function(e){
          dragging = true;
          drag_el = this;
        }, false);
      });
      g3_mesh.svg.addEventListener('mousemove',function(e){
        if (dragging === true) {
          npos = pos(e.pageX, e.pageY, g3_mesh.el);
          drag_el.parentNode.setAttributeNS(null, 'transform', 'translate('+npos.x+','+npos.y+')');
          g3.utils.each(connections, function(i,c) { 
            if (c.match_disc(drag_el)) {
              c.update_start();
            }
          });
        }
      }, false);
      g3_mesh.svg.addEventListener('mouseup',function(e){
        dragging = false;
      }, false);
      
    }
  };
  
  var pos = function(x, y, parent) {
    var posx = x -parent.offset().left; 
    var posy = y - parent.offset().top;   
    return { x:posx, y:posy };
  };
  
  this.discs = function() {
    return discs;
  };
  
  this.connections = function() {
    return connections;
  };
  
  init();
}