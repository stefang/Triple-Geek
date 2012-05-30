/**
* G3 Mesh
* A technical demo
* Made by Stefan Goodchild (@stefangoodchild)
*/

var g3_mesh = {};

$(document).ready(function() {
  g3_mesh.init($('#lab'), 'thelab/mesh/');
});

g3_mesh.init = function($el, url) {
  g3_mesh.url = url;
  g3_mesh.el = $el;
  g3_mesh.perf = g3.svg.perf.test();
  console.log(g3_mesh.perf);
  if (g3_mesh.svg = g3.svg.create(g3_mesh.el.attr('id'))) {
    g3_mesh.ui = new G3MeshUi();
  }
  g3_mesh.svg.setAttribute('style', 'background-color: #eeeeee');
};