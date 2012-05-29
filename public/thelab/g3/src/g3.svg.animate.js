g3.Animate = function(el, attribute, to, time, callback) {
  
  var current;
  var types={};
  
  var f, t, c;
  var step = [];
  
  var rate = 13;
  
  var timer;

  var count = time / rate;
  
  var init = function() {
    if (el) {
      current = el.getAttribute(attribute);
      switch (attribute) {
        case 'transform':
          transform_init();
          break;
        case 'stroke-width':
        case 'opacity':
        case 'r':
          single_float_init();
          break;
        case 'fill':
        case 'stroke':
          colour_init();
          break;
      } 
    }
  };
  
  this.stop = function() {
    clearInterval(timer);
  };
  
  var transform_init = function() {
    
    // break transform into separate types. Translate and Scale so far tested to be working OK...
    var t = current.split(' ');
    var to_types = to.split(' ');

    g3.utils.each(t, function(i,type){
      types[type.replace(/\(.+\)/, '')]={
        f: type.replace(/[a-z]+\(*(.+)\)/, '$1').split(','),
        c: type.replace(/[a-z]+\(*(.+)\)/, '$1').split(','),
        t: to_types[i].replace(/[a-z]+\(*(.+)\)/, '$1').split(',')
      };
    });
    
    g3.utils.each(types, function(i, type){
      type.step = [];
      g3.utils.each(type.f, function(i){
        type.step.push(parseFloat((type.t[i] - type.f[i])) / Math.ceil(time / rate));
      });
    });
    
    timer = setInterval(transform_loop,rate);
  };
  
  var transform_loop = function() {
    
    var transform = [];

    g3.utils.each(types, function(i, type){
      g3.utils.each(type.f, function(i){
        type.c[i] = parseFloat(type.c[i]) + parseFloat(type.step[i]);
      });
      transform.push(i+'('+type.c.join(',')+')');
    });
    
    el.setAttribute('transform', transform.join(' '));

    if (count <= 0) {
      clearInterval(timer);
      transform = [];
      g3.utils.each(types, function(i, type){
        transform.push(i+'('+type.t.join(',')+')');
      });
      el.setAttribute('transform',  transform.join(' '));
      if (callback) {
        callback();
      }
    }
    count--;
  };
  
  var colour_init = function() {
    
    if (current === null) {
      // we can't work with nothing check parent for inherited?
      current = el.parentNode.getAttribute('fill');
    }
    
    if (current !== null) {
      f = hex_to_rgb(current);
      c = hex_to_rgb(current);
      t = hex_to_rgb(to);    

      g3.utils.each(f, function(i){
        step.push(parseFloat((t[i] - f[i])) / Math.ceil(time / rate));
      });

      timer = setInterval(colour_loop,rate);
    }
  };
  
  var colour_loop = function() {
    g3.utils.each(f, function(i){
      c[i] += parseFloat(step[i]);
      if (c[i] < 0) { c[i] = 0; }
    });

    el.setAttribute(attribute, '#'+rgb_to_hex(c));

    if (count <= 0) {
      clearInterval(timer);
      el.setAttribute(attribute, to);
      if (callback) {
        callback();
      }
    }

    count--;
  };
    
  var rgb_to_hex = function(c) {
    var r = pad(2, Math.round(c[0]).toString(16));
    var g = pad(2, Math.round(c[1]).toString(16));
    var b = pad(2, Math.round(c[2]).toString(16));
    return r+g+b;
  };
  
  var pad = function(count, value) {
    if (value.length < count) {
      var r = '';
      for (var i=0; i < count - value.length; i++) {
        r+= '0';
      }
      return r+value;
    } else {
      return value;
    }
  };
  
  var hex_to_rgb = function(h) {
    var r = parseInt((fix_hex(h)).substring(0,2),16);
    var g = parseInt((fix_hex(h)).substring(2,4),16);
    var b = parseInt((fix_hex(h)).substring(4,6),16);
    return [r,g,b];
  };
  
  var fix_hex = function(h) { 
    h = (h.charAt(0)=="#") ? h.substring(1,7):h;
    if (h.length < 6) {
      return h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    } else {
      return h;
    }
  };

  var single_float_init = function() {
    f = current;
    c = current;
    t = to;
    step = (parseFloat((t - f)) / Math.ceil(time / rate));
    timer = setInterval(single_float_loop,rate);
  };
  
  var single_float_loop = function() {
    c = parseFloat(c) + parseFloat(step);
    c = Math.abs(Math.round(c*100)/100);
    el.setAttribute(attribute, c);

    if (count <= 0) {
      clearInterval(timer);
      el.setAttribute(attribute, t);
      if (callback) {
        callback();
      }
    }
    count--;
  };
  
  // Auto init the Animate
  init();

};