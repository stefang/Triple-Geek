function G3RouteUi() {
  
  var routes = new G3RouteRoutes();
  
  var init = function() {
    $('p.warning').remove();
    g3_route.el.append('<div/>');
    g3_route.el.css({
      position: 'relative'
    }).find('div').css({
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0});
    if (g3.is_touch_device()) {
      g3_route.el.find('div').bind('touchstart', function(e){
        if (e.originalEvent.touches.length > 0) {
          $.each(e.originalEvent.touches, function(i, t){
            var pos = g3.pos(t.pageX, t.pageY, $(e.target).parent());
            routes.add(pos.x, pos.y);
          });
        }
        });
    } else {
      g3_route.el.find('div').bind('mousedown', function(e){
        var pos = g3.pos(e.pageX, e.pageY, $(e.target).parent());
        routes.add(pos.x, pos.y);
      });
    }
  };
  init();
}