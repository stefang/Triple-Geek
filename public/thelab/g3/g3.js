/*!
* G3 - Triple Geek Library
* Everyone has a collection of utils and stuff. This is mine. Mainly focussed around 
* SVG creation and animation and supporting stuff like vector bits without relying on jQuery SVG
*
* No version number and no tests, I'm a bad man. Not sure which bits work and which don't :-)
*/var g3={};g3.utils={getBBoxCentre:function(a){return{x:a.position().left+a[0].getBBox().width/2,y:a.position().top+a[0].getBBox().height/2}},drawBBox:function(a){g3.svg.rect(a.position().left,a.position().top,a[0].getBBox().width,a[0].getBBox().height,{stroke:"green",fill:"none"})},objLength:function(a){var b,c=0;for(b in a)c+=Number(a.hasOwnProperty(b));return c},each:function(a,b,c){var d,e=0,f=a.length;if(c){if(f===undefined){for(d in a)if(b.apply(a[d],c)===!1)break}else for(;e<f;)if(b.apply(a[e++],c)===!1)break}else if(f===undefined){for(d in a)if(b.call(a[d],d,a[d])===!1)break}else for(var g=a[0];e<f&&b.call(g,e,g)!==!1;g=a[++e]);return a},getVector:function(a,b){var c=a.x-b.x,d=a.y-b.y;return{x:c,y:d,length:Math.abs(Math.sqrt(c*c+d*d))}},getInnerPoint:function(a,b,c){var d={x:0,y:0},e=g3.getVector(a,b);d.y=e.y/c+b.y;d.x=e.x/c+b.x;return d},map:function(a,b,c,d,e){return d+(e-d)*(a-b)/(c-b)},is_touch_device:function(){return typeof window.ontouchstart!="undefined"?!0:!1},supports_svg:function(){return!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect},mousepos:function(a,b){var c=a.pageX-b.offsetLeft,d=a.pageY-b.offsetTop;return{x:c,y:d}}};g3.svg={create:function(a){el=document.getElementById(a);if(g3.utils.supports_svg()){el.setAttribute("class","hasSVG");var b=document.createElementNS("http://www.w3.org/2000/svg","svg");b.setAttribute("width","100%");b.setAttribute("height",el.clientHeight);el.appendChild(b);return b}var c=document.createElement("p");c.setAttribute("class","warning");var d=document.createTextNode("This is a technical demo. You need to be using a modern browser that supports SVG for this to work. There are many ways to hack things to work in the browsers that must not be named and I'll make the effort for a client project. This is just the lab though. I don't do that here.");c.appendChild(d);el.appendChild(c);return!1},group:function(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg","g");b&&g3.utils.each(b,function(a,b){c.setAttribute(a,b)});a.appendChild(c);return c},circle:function(a,b,c,d,e){var f=document.createElementNS("http://www.w3.org/2000/svg","circle");f.setAttribute("cx",b);f.setAttribute("cy",c);f.setAttribute("r",d);e&&g3.utils.each(e,function(a,b){f.setAttribute(a,b)});a.appendChild(f);return f},rect:function(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg","rect");b&&g3.utils.each(b,function(a,b){c.setAttribute(a,b)});a!==null&&a.appendChild(c);return c},line:function(a,b,c,d,e,f){var g=document.createElementNS("http://www.w3.org/2000/svg","line");g.setAttribute("x1",b);g.setAttribute("y1",c);g.setAttribute("x2",d);g.setAttribute("y2",e);f&&g3.utils.each(f,function(a,b){g.setAttribute(a,b)});a.appendChild(g);return g},text:function(a,b,c,d,e){var f=document.createElementNS("http://www.w3.org/2000/svg","text"),g=document.createTextNode(d);f.setAttribute("x",b);f.setAttribute("y",c);e&&g3.utils.each(e,function(a,b){f.setAttribute(a,b)});f.appendChild(g);a!==null&&a.appendChild(f);return f},rotateLoop:function(a,b,c){var d=document.createElementNS("http://www.w3.org/2000/svg","animateTransform");d.setAttribute("attributeType","XML");d.setAttribute("attributeName","transform");d.setAttribute("type","rotate");if(c>0){d.setAttribute("from","0");d.setAttribute("to","360")}else{d.setAttribute("from","360");d.setAttribute("to","0")}d.setAttribute("begin","indefinite");d.setAttribute("dur",b+"s");d.setAttribute("repeatCount","indefinite");if(a!==null){a.appendChild(d);d.beginElement()}return d},find:function(a,b){var c=[];g3.utils.each(a.childNodes,function(a,d){d.getAttribute("class")==b&&c.push(d)});return c[0]},clone:function(a){var b=document.getElementById(a);return b?b.cloneNode(!0):!1},append:function(a,b){a.appendChild(b)},remove:function(a){a!==null&&a!==""&&a!==undefined&&a!=="undefined"&&a!=="null"&&a.parentNode.removeChild(a)},setAttributes:function(a,b){g3.utils.each(b,function(b,c){a.setAttribute(b,c)})},animate:function(a,b,c,d){if(a){a.g3animation===undefined&&(a.g3animation={});g3.utils.each(b,function(b,e){a.g3animation[b]&&a.g3animation[b].stop();a.g3animation[b]=new g3.Animate(a,b,e,c,d)})}}};g3.Animate=function(a,b,c,d,e){var f,g={},h,i,j,k=[],l=13,m,n=d/l,o=function(){if(a){f=a.getAttribute(b);switch(b){case"transform":p();break;case"stroke-width":case"opacity":case"r":x();break;case"fill":case"stroke":r()}}};this.stop=function(){clearInterval(m)};var p=function(){var a=f.split(" "),b=c.split(" ");g3.utils.each(a,function(a,c){g[c.replace(/\(.+\)/,"")]={f:c.replace(/[a-z]+\(*(.+)\)/,"$1").split(","),c:c.replace(/[a-z]+\(*(.+)\)/,"$1").split(","),t:b[a].replace(/[a-z]+\(*(.+)\)/,"$1").split(",")}});g3.utils.each(g,function(a,b){b.step=[];g3.utils.each(b.f,function(a){b.step.push(parseFloat(b.t[a]-b.f[a])/Math.ceil(d/l))})});m=setInterval(q,l)},q=function(){var b=[];g3.utils.each(g,function(a,c){g3.utils.each(c.f,function(a){c.c[a]=parseFloat(c.c[a])+parseFloat(c.step[a])});b.push(a+"("+c.c.join(",")+")")});a.setAttribute("transform",b.join(" "));if(n<=0){clearInterval(m);b=[];g3.utils.each(g,function(a,c){b.push(a+"("+c.t.join(",")+")")});a.setAttribute("transform",b.join(" "));e&&e()}n--},r=function(){f===null&&(f=a.parentNode.getAttribute("fill"));if(f!==null){h=v(f);j=v(f);i=v(c);g3.utils.each(h,function(a){k.push(parseFloat(i[a]-h[a])/Math.ceil(d/l))});m=setInterval(s,l)}},s=function(){g3.utils.each(h,function(a){j[a]+=parseFloat(k[a]);j[a]<0&&(j[a]=0)});a.setAttribute(b,"#"+t(j));if(n<=0){clearInterval(m);a.setAttribute(b,c);e&&e()}n--},t=function(a){var b=u(2,Math.round(a[0]).toString(16)),c=u(2,Math.round(a[1]).toString(16)),d=u(2,Math.round(a[2]).toString(16));return b+c+d},u=function(a,b){if(b.length<a){var c="";for(var d=0;d<a-b.length;d++)c+="0";return c+b}return b},v=function(a){var b=parseInt(w(a).substring(0,2),16),c=parseInt(w(a).substring(2,4),16),d=parseInt(w(a).substring(4,6),16);return[b,c,d]},w=function(a){a=a.charAt(0)=="#"?a.substring(1,7):a;return a.length<6?a[0]+a[0]+a[1]+a[1]+a[2]+a[2]:a},x=function(){h=f;j=f;i=c;k=parseFloat(i-h)/Math.ceil(d/l);m=setInterval(y,l)},y=function(){j=parseFloat(j)+parseFloat(k);j=Math.abs(Math.round(j*100)/100);a.setAttribute(b,j);if(n<=0){clearInterval(m);a.setAttribute(b,i);e&&e()}n--};o()};g3.svg.perf={test:function(){count=1e3;if(g3.utils.supports_svg()){start=new Date;var a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("width","100");a.setAttribute("height","100");a.setAttribute("display","none");document.body.appendChild(a);g3.svg.perf.create_circle(a,count);end=new Date;return end-start}a.parentNode.removeChild(a)},create_circle:function(a,b){for(var c=0;c<b;c++)g3.svg.circle(a,Math.random()*100,Math.random()*100,5,{fill:"#2C96CA",stroke:"#2e2e2e","stroke-width":1,"stroke-opacity":.5,cursor:"pointer"})}};