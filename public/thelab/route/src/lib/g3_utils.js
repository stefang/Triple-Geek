var g3 = {
  getBBoxCentre: function($el) {
    return {
      x: $el.position().left + ($el[0].getBBox().width/2),
      y: $el.position().top + ($el[0].getBBox().height/2),
    };
  },

  drawBBox: function ($el) {
    g3_route.svg.rect(
      $el.position().left, 
      $el.position().top, 
      $el[0].getBBox().width, 
      $el[0].getBBox().height, 
      {
        stroke: 'green',
        fill: 'none'
      }
    );
  },

  objLength: function(obj){    
    var key,len=0;
    for(key in obj){
      len += Number( obj.hasOwnProperty(key) );
    }
    return len;
  },

  getVector: function(start, end) {
    var x = start.x - end.x;
    var y = start.y - end.y;
    return {
      x: x,
      y: y,
      length: Math.abs(Math.sqrt((x*x) + (y*y)))
    };
  },

  getInnerPoint: function(start, end, div){
    var centre = {
      x: 0,
      y: 0
    };
    var vector = g3.getVector(start, end);
    centre.y = (vector.y / div) + end.y;
    centre.x = (vector.x / div) + end.x;
    return centre;
  },
  
  is_touch_device: function() {
    return (typeof(window.ontouchstart) != 'undefined') ? true : false;
  },
  
  pos: function(x, y, parent) {
    var posx = x -  parent.offset().left; 
    var posy = y -  parent.offset().top;   
    return { x:posx, y:posy };
  }
  
};