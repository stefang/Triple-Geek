function G3RouteUi() {
  
  var routes = new G3RouteRoutes();
  
  var init = function() {
    $('p.warning').remove();
    g3_route.el.click(function(e){
      routes.add(e.offsetX, e.offsetY);
    });
  };
  init();
}