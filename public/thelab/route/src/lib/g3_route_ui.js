function G3RouteUi() {
  
  var routes = new G3RouteRoutes();
  
  var init = function() {
    $('p.warning').remove();
    g3_route.el.bind('mousedown' ,function(e){
      routes.add(g3.pos(e).x, g3.pos(e).y);
    });
  };
  init();
}