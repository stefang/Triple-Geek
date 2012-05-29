function G3MeshDisc(id) {
  
  var disc;
  var x = Math.random(0,1) * g3_mesh.el.width();
  var y = Math.random(0,1)* g3_mesh.el.height();
  var r;
  var dot;
  
  var init = function() {
    disc = g3.svg.group(g3_mesh.svg, { 
      'id': 'disc_'+id,
      'transform': 'translate('+x+','+y+')'
    });
    r = (Math.random()*5)+10;
    dot = g3.svg.circle(disc, 0, 0, r, {
      'id': 'disc_'+id, 
      'fill': '#2C96CA', 
      'stroke': '#2e2e2e', 
      'stroke-width': 1, 
      'stroke-opacity': 0.5,
      'cursor': 'pointer'
    });
    line_ring(r);
    line_ring(r+15);
    if ((Math.random()*2)-1 > 0) {
      line_ring(r+30);
    }
    return disc;
  };
  
  var line_ring = function(r) {
    var d = g3.svg.group(disc);
    var ani = g3.svg.rotateLoop(d, (Math.random()*5)+5, (Math.random()*2)-1);
    var x,y, x2, y2;
    r = r + 5 + (Math.random()*20);
    var bias = ((Math.random()*2)-1)+10;
    var weight = Math.round(Math.random()+1);
    var length = Math.round(Math.random()*3+1);
        
    for (var i = 0; i < 360; i = i + 10 ) {
      x=r*Math.cos(i* (Math.PI/180));
      y=r*Math.sin(i* (Math.PI/180));
      x2=r*Math.cos((i+length)* (Math.PI/180));
      y2=r*Math.sin((i+length)* (Math.PI/180));
      g3.svg.line(d, x, y, x2, y2, { 'stroke': '#fff', 'stroke-width': weight, 'stroke-opacity': 0.2 });
    }
  };
  
  this.dot = function() {
    return dot;
  };
  
  this.disc = function() {
    return disc;
  };
  
  
  this.loc = function() {
    return { x:x, y:y, r:r };
  };
  
  this.set_loc = function(nx, ny, return_loc) {
    x = nx;
    y = ny;
    if (return_loc) {
      return loc;
    }
  };
    
  init();
}