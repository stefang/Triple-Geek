g3.svg = {
  create: function(id) {
    el = document.getElementById(id);
    if (g3.utils.supports_svg()) {
      el.setAttribute('class', 'hasSVG');
      var svgnode = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svgnode.setAttribute('width', '100%');
      svgnode.setAttribute('height', el.clientHeight);
      el.appendChild(svgnode);
      return svgnode;
    } else {
      var p = document.createElement("p");
      p.setAttribute('class', 'warning');
      var t = document.createTextNode("This is a technical demo. You need to be using a modern browser that supports SVG for this to work. There are many ways to hack things to work in the browsers that must not be named and I'll make the effort for a client project. This is just the lab though. I don't do that here.");
      p.appendChild(t);
      el.appendChild(p);
      return false;
    }
  },
  
  group: function(target, attributes) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (attributes) {
      g3.utils.each(attributes, function(i, a){
        g.setAttribute(i, a);
      });
    }
    target.appendChild(g);
    return g;
  },

  circle: function(target, cx, cy, r, attributes) {
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute( "cx",cx );
    c.setAttribute( "cy",cy );
    c.setAttribute( "r",r );
    if (attributes) {
      g3.utils.each(attributes, function(i, a){
        c.setAttribute(i, a);
      });
    }
    target.appendChild(c);
    return c;
  },

  rect: function(target, attributes) {
    var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    if (attributes) {
      g3.utils.each(attributes, function(i, a){
        r.setAttribute(i, a);
      });
    }
    if (target !== null) {
      target.appendChild(r);
    }
    return r;
  },

  line: function(target, x1, y1, x2, y2, attributes) {
    var c = document.createElementNS("http://www.w3.org/2000/svg", "line");
    c.setAttribute( "x1",x1 );
    c.setAttribute( "y1",y1 );
    c.setAttribute( "x2",x2 );
    c.setAttribute( "y2",y2 );
    if (attributes) {
      g3.utils.each(attributes, function(i, a){
        c.setAttribute(i, a);
      });
    }
    target.appendChild(c);
    return c;
  },


  text: function(target, cx, cy, txt, attributes) {
    var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var n = document.createTextNode(txt);
    t.setAttribute( "x",cx );
    t.setAttribute( "y",cy );
    if (attributes) {
      g3.utils.each(attributes, function(i, a){
        t.setAttribute(i, a);
      });
    }
    t.appendChild(n);
    if (target !== null) {
      target.appendChild(t);
    }
    return t;
  },
  
  rotateLoop: function(target, duration, direction) {
    var a = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
    a.setAttribute('attributeType','XML');
    a.setAttribute('attributeName','transform');
    a.setAttribute('type', 'rotate');
    if ( direction > 0) {
      a.setAttribute('from', '0');
      a.setAttribute('to', '360');
    } else {
      a.setAttribute('from', '360');
      a.setAttribute('to', '0');
    }
    a.setAttribute('begin', 'indefinite');
    a.setAttribute('dur', duration+'s');
    a.setAttribute('repeatCount', 'indefinite');
    if (target !== null) {
      target.appendChild(a);
      a.beginElement();
    }
    return a;
  },

  find: function(parent, klass) {
    var els = [];
    g3.utils.each(parent.childNodes, function(i, e){
      if (e.getAttribute('class') == klass) {
        els.push(e);
      }
    });
    return els[0];
  },

  clone: function(el){
    var e = document.getElementById(el);
    if (e) {
      return e.cloneNode(true);
    } else {
      return false;
    }
  },

  append: function(target, el){
    target.appendChild(el);
  },

  remove: function(el) {
    if (el !== null && el !== '' && el !== undefined && el !== 'undefined' && el !== 'null') {
      el.parentNode.removeChild(el);
    }
  },

  setAttributes: function(el, attributes) {
    g3.utils.each(attributes, function(i, a){
      el.setAttribute(i, a);
    });
  },

  animate: function(el, attributes, time, callback){
    if (el) {
      if (el.g3animation === undefined) { el.g3animation = {}; }
      g3.utils.each(attributes, function(i, a){
        if (el.g3animation[i]) { el.g3animation[i].stop(); }
        el.g3animation[i] = new g3.Animate(el, i, a, time, callback);
      });
    }
  }
};