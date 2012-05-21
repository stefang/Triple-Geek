function G3RouteRoute(start, end, routes_el, route_index, points) {
  
  var anchor1;
  var anchor2; 
  var control1;
  var control2;
  var coords  = []; // x, y, weight 
  var segments = []; // element references
  var timer = null;
  var index = 0;
  var landing = {};
  var speed = 13;
  var segment_count = 40;
  var safe = false;
  var route_el = $(g3_route.svg.group(routes_el, {'id': route_index}));
  var state = null;
  
  this.init = function() {
    anchor1 = start;
    anchor2 = end; 
    define_bezier_controls();
    define_build_coords();
    state = 'ready';
  };
  
  this.render = function() {
    index = 0;
    segments = [];
    animate_route();
  };
  
  this.state = function () {
    return state;
  };
  
  var animate_route = function() {
    state = 'build';
    index++;
    if (index > coords.length-1) {
      clearTimeout(timer);
      index = 0;
      var grow = g3_route.svg.circle(routes_el, anchor2.x, anchor2.y, 5,{fill:'#D1004A', opacity: 1});
      $(grow).animate({ 'svgR': 15, 'svgOpacity': 0 }, 600, 'linear', function(){
        $(this).remove();
      });
      animate_route_clear();
      state = 'clear';
    } else {
      timer = setTimeout(function(){
        render_segment();
        animate_route();
      }, speed);
    }
  };
  
  var animate_route_clear = function() {
    if (index >= coords.length) {
      clearTimeout(timer);
      timer = setTimeout(function(){
        state = 'ready';
      }, speed);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function(){
        $(segments[index]).remove();
        delete segments[index];
        animate_route_clear();
        index++;
        if (index > segment_count / 2) {
          state = 'start_next';
        }
      }, speed);
    }
  };
  
  var render_segment = function() {
    segments.push(g3_route.svg.line(route_el, 
      coords[index].x, 
      coords[index].y, 
      coords[index-1].x,
      coords[index-1].y,
      { 'stroke-width': coords[index].weight, stroke: '#444' , 'stroke-linecap': 'round' })
    );    
  };
  
  this.reset = function() {
  };
  
  var define_build_coords = function() {
    // Cubic Bezier Madness
    if (anchor1 != false && anchor2 != false) {
      var stroke_width = 1;
      var stroke_step = 5 / (segment_count / 1.1) * 2;

      var pos = {x:0, y:0};
      var lpos = { 
        x: anchor1.x, 
        y: anchor1.y };
        
      for (var u = 0; u <= 1 + 1/segment_count; u += 1/segment_count) {

        pos.x = Math.pow(u,3)*(anchor2.x+3*(control1.x-control2.x)-anchor1.x)
        +3*Math.pow(u,2)*(anchor1.x-2*control1.x+control2.x)
        +3*u*(control1.x-anchor1.x)+anchor1.x;

        pos.y = Math.pow(u,3)*(anchor2.y+3*(control1.y-control2.y)-anchor1.y)
        +3*Math.pow(u,2)*(anchor1.y-2*control1.y+control2.y)
        +3*u*(control1.y-anchor1.y)+anchor1.y;

        coords.push({
          x: pos.x,
          y: pos.y,
          weight: stroke_width
        });
        
        if (u > (1 + 1/segment_count)/2) {
          stroke_width -= stroke_step;
        } else {
          stroke_width += stroke_step;
        }

      }    
    }
  };
  
  var define_bezier_controls = function() {
    control1 = g3.getInnerPoint(anchor1, anchor2, 1.25);
    control2 = g3.getInnerPoint(anchor1, anchor2, 1.75);
    control1.y -= 40;
    control2.y -= 40;
  };
  
  var debug_points = function() {
    var g = g3_route.svg.group(route_el, {id: 'route_debug'});
    
    g3_route.svg.line(g, 
      anchor1.x,
      anchor1.y,
      control1.x,
      control1.y,    
      { strokeWidth: 1, stroke: '#f00' }
    );
    
    g3_route.svg.line(g, 
      control1.x,
      control1.y,
      control2.x,
      control2.y,    
      { strokeWidth: 1, stroke: '#0f0' }
    );
    
    g3_route.svg.line(g, 
      control2.x,
      control2.y,    
      anchor2.x,
      anchor2.y,    
      { strokeWidth: 1, stroke: '#00f' }
    );
  };
  
}