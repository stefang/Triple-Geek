g3.utils = {
  getBBoxCentre: function($el) {
    // TODO Move this to pure JS
    return {
      x: $el.position().left + ($el[0].getBBox().width/2),
      y: $el.position().top + ($el[0].getBBox().height/2)
    };
  },

  // TODO Move this to pure JS
  drawBBox: function ($el) {
    g3.svg.rect(
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
  
  each: function(object, callback, args) {
    // Yes. This is nicked from jQuery. $diety bless Mr Resig
    var name,
    i = 0,
    length = object.length;

    if (args) {
        if (length === undefined) {
            for (name in object) {
              if (callback.apply(object[name], args) === false) {
                break;
              }
            }
        } else {
          for (; i < length;) {
            if (callback.apply(object[i++], args) === false) {
              break;
            }
          }
        }

        // A special, fast, case for the most common use of each
    } else {
        if (length === undefined) {
            for (name in object) {
              if (callback.call(object[name], name, object[name]) === false) {
                break;
              }
            }
        } else {
          for (var value = object[0];
          i < length && callback.call(value, i, value) !== false; value = object[++i]) {}
        }
    }

    return object;
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
  
  map: function(value, low1, high1, low2, high2) {
      return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  },
  
  is_touch_device: function() {
    return (typeof(window.ontouchstart) != 'undefined') ? true : false;
  },
  
  supports_svg: function() {
    return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;    
  },

  mousepos: function(e, obj) {
    var posx = e.pageX - obj.offsetLeft; 
    var posy = e.pageY - obj.offsetTop;   
    return { x:posx, y:posy };
  }
  
};