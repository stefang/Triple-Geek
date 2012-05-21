/**
* G3 Route
* A technical demo
* Made by Stefan Goodchild (@stefangoodchild)
*/

var g3_route = {};

$(document).ready(function() {
  g3_route.init($('.lab'), 'thelab/g3_route/');
});

g3_route.init = function($el, url) {
  g3_route.url = url;
  g3_route.el = $el;
  g3_route.el.svg({
    width: 100,
    height: 500,
    onLoad: g3_route.launch
  });
};

g3_route.launch = function(svg) {
  g3_route.svg = svg;
  g3_route.ui = new G3RouteUi();
}