function G3RouteRoutes() {
  
  var points    = [];
  var routes    = [];
  var index     = 0;
  var timer     = null;
  var routes_el = g3_route.svg.group(g3_route.svg.root(), {'id': 'routes'});
  
  this.add = function(x, y) {
    var c = g3_route.svg.circle(routes_el, x, y, 5,{fill:'#ddd'});
    points.push({x:x,y:y,circle:c});
    if (points.length > 1) {
      routes.push(new G3RouteRoute(points[points.length-2], points[points.length-1], routes_el, routes.length));
      routes[routes.length-1].init();
      timer = setInterval(monitor, 200);
    }
  };
  
  var monitor = function() {
    if (routes[index].state() == 'ready') {
      routes[index].render();
    }
    if (routes[index].state() == 'start_next') {
      index++;
    }
    if (index >= routes.length) {
      index = 0;
    }
  };
  
  this.reset = function() {
  };
  
  this.routes_el = function() {
    return routes_el;
  };
     
  this.route_count = function() {
    return routes.length  
  };    

}