/*!
 * Cropper v4.0.0
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2018 Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2018-04-01T06:27:27.267Z
 */
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],i):i(t.jQuery)}(this,function(d){"use strict";d=d&&d.hasOwnProperty("default")?d.default:d;var n="undefined"!=typeof window,r=n?window:{},l="cropper",k="all",T="crop",W="move",E="zoom",H="e",N="w",L="s",O="n",z="ne",Y="nw",X="se",R="sw",h=l+"-crop",t=l+"-disabled",S=l+"-hidden",p=l+"-hide",o=l+"-modal",m=l+"-move",u="action",g="preview",s="crop",c="move",f="none",a="crop",v="cropend",w="cropmove",b="cropstart",x="dblclick",y="load",M=r.PointerEvent?"pointerdown":"touchstart mousedown",C=r.PointerEvent?"pointermove":"touchmove mousemove",D=r.PointerEvent?"pointerup pointercancel":"touchend touchcancel mouseup",B="ready",A="resize",I="wheel mousewheel DOMMouseScroll",j="zoom",U=/^(?:e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/,P=/^data:/,q=/^data:image\/jpeg;base64,/,$=/^(?:img|canvas)$/i,Q={viewMode:0,dragMode:s,aspectRatio:NaN,data:null,preview:"",responsive:!0,restore:!0,checkCrossOrigin:!0,checkOrientation:!0,modal:!0,guides:!0,center:!0,highlight:!0,background:!0,autoCrop:!0,autoCropArea:.8,movable:!0,rotatable:!0,scalable:!0,zoomable:!0,zoomOnTouch:!0,zoomOnWheel:!0,wheelZoomRatio:.1,cropBoxMovable:!0,cropBoxResizable:!0,toggleDragModeOnDblclick:!0,minCanvasWidth:0,minCanvasHeight:0,minCropBoxWidth:0,minCropBoxHeight:0,minContainerWidth:200,minContainerHeight:100,ready:null,cropstart:null,cropmove:null,cropend:null,crop:null,zoom:null},i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},F=function(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")},Z=function(){function a(t,i){for(var e=0;e<i.length;e++){var a=i[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,i,e){return i&&a(t.prototype,i),e&&a(t,e),t}}(),bt=function(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)},e=Number.isNaN||r.isNaN;function K(t){return"number"==typeof t&&!e(t)}function V(t){return void 0===t}function G(t){return"object"===(void 0===t?"undefined":i(t))&&null!==t}var J=Object.prototype.hasOwnProperty;function _(t){if(!G(t))return!1;try{var i=t.constructor,e=i.prototype;return i&&e&&J.call(e,"isPrototypeOf")}catch(t){return!1}}function tt(t){return"function"==typeof t}function it(i,e){if(i&&tt(e))if(Array.isArray(i)||K(i.length)){var t=i.length,a=void 0;for(a=0;a<t&&!1!==e.call(i,i[a],a,i);a+=1);}else G(i)&&Object.keys(i).forEach(function(t){e.call(i,i[t],t,i)});return i}var et=Object.assign||function(e){for(var t=arguments.length,i=Array(1<t?t-1:0),a=1;a<t;a++)i[a-1]=arguments[a];return G(e)&&0<i.length&&i.forEach(function(i){G(i)&&Object.keys(i).forEach(function(t){e[t]=i[t]})}),e},at=/\.\d*(?:0|9){12}\d*$/i;function xt(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:1e11;return at.test(t)?Math.round(t*i)/i:t}var nt=/^(?:width|height|left|top|marginLeft|marginTop)$/;function ot(t,i){var e=t.style;it(i,function(t,i){nt.test(i)&&K(t)&&(t+="px"),e[i]=t})}function ht(t,i){if(i)if(K(t.length))it(t,function(t){ht(t,i)});else if(t.classList)t.classList.add(i);else{var e=t.className.trim();e?e.indexOf(i)<0&&(t.className=e+" "+i):t.className=i}}function rt(t,i){i&&(K(t.length)?it(t,function(t){rt(t,i)}):t.classList?t.classList.remove(i):0<=t.className.indexOf(i)&&(t.className=t.className.replace(i,"")))}function st(t,i,e){i&&(K(t.length)?it(t,function(t){st(t,i,e)}):e?ht(t,i):rt(t,i))}var ct=/([a-z\d])([A-Z])/g;function dt(t){return t.replace(ct,"$1-$2").toLowerCase()}function lt(t,i){return G(t[i])?t[i]:t.dataset?t.dataset[i]:t.getAttribute("data-"+dt(i))}function pt(t,i,e){G(e)?t[i]=e:t.dataset?t.dataset[i]=e:t.setAttribute("data-"+dt(i),e)}function mt(i,e){if(G(i[e]))try{delete i[e]}catch(t){i[e]=void 0}else if(i.dataset)try{delete i.dataset[e]}catch(t){i.dataset[e]=void 0}else i.removeAttribute("data-"+dt(e))}var ut=/\s\s*/,gt=function(){var t=!1;if(n){var i=!1,e=function(){},a=Object.defineProperty({},"once",{get:function(){return t=!0,i},set:function(t){i=t}});r.addEventListener("test",e,a),r.removeEventListener("test",e,a)}return t}();function ft(e,t,a){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},o=a;t.trim().split(ut).forEach(function(t){if(!gt){var i=e.listeners;i&&i[t]&&i[t][a]&&(o=i[t][a],delete i[t][a],0===Object.keys(i[t]).length&&delete i[t],0===Object.keys(i).length&&delete e.listeners)}e.removeEventListener(t,o,n)})}function vt(o,t,h){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},s=h;t.trim().split(ut).forEach(function(a){if(r.once&&!gt){var t=o.listeners,n=void 0===t?{}:t;s=function(){for(var t=arguments.length,i=Array(t),e=0;e<t;e++)i[e]=arguments[e];delete n[a][h],o.removeEventListener(a,s,r),h.apply(o,i)},n[a]||(n[a]={}),n[a][h]&&o.removeEventListener(a,n[a][h],r),n[a][h]=s,o.listeners=n}o.addEventListener(a,s,r)})}function wt(t,i,e){var a=void 0;return tt(Event)&&tt(CustomEvent)?a=new CustomEvent(i,{detail:e,bubbles:!0,cancelable:!0}):(a=document.createEvent("CustomEvent")).initCustomEvent(i,!0,!0,e),t.dispatchEvent(a)}function yt(t){var i=t.getBoundingClientRect();return{left:i.left+(window.pageXOffset-document.documentElement.clientLeft),top:i.top+(window.pageYOffset-document.documentElement.clientTop)}}var Mt=r.location,Ct=/^(https?:)\/\/([^:/?#]+):?(\d*)/i;function Dt(t){var i=t.match(Ct);return i&&(i[1]!==Mt.protocol||i[2]!==Mt.hostname||i[3]!==Mt.port)}function Bt(t){var i="timestamp="+(new Date).getTime();return t+(-1===t.indexOf("?")?"?":"&")+i}function kt(t){var i=t.rotate,e=t.scaleX,a=t.scaleY,n=t.translateX,o=t.translateY,h=[];K(n)&&0!==n&&h.push("translateX("+n+"px)"),K(o)&&0!==o&&h.push("translateY("+o+"px)"),K(i)&&0!==i&&h.push("rotate("+i+"deg)"),K(e)&&1!==e&&h.push("scaleX("+e+")"),K(a)&&1!==a&&h.push("scaleY("+a+")");var r=h.length?h.join(" "):"none";return{WebkitTransform:r,msTransform:r,transform:r}}function Tt(t,i){var e=t.pageX,a=t.pageY,n={endX:e,endY:a};return i?n:et({startX:e,startY:a},n)}var Wt=Number.isFinite||r.isFinite;function Et(t){var i=t.aspectRatio,e=t.height,a=t.width,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"contain",o=function(t){return Wt(t)&&0<t};if(o(a)&&o(e)){var h=e*i;"contain"===n&&a<h||"cover"===n&&h<a?e=a/i:a=e*i}else o(a)?e=a/i:o(e)&&(a=e*i);return{width:a,height:e}}var Ht=String.fromCharCode;var Nt=/^data:.*,/;function Lt(t){var i=new DataView(t),e=void 0,a=void 0,n=void 0,o=void 0;if(255===i.getUint8(0)&&216===i.getUint8(1))for(var h=i.byteLength,r=2;r<h;){if(255===i.getUint8(r)&&225===i.getUint8(r+1)){n=r;break}r+=1}if(n){var s=n+10;if("Exif"===function(t,i,e){var a="",n=void 0;for(e+=i,n=i;n<e;n+=1)a+=Ht(t.getUint8(n));return a}(i,n+4,4)){var c=i.getUint16(s);if(((a=18761===c)||19789===c)&&42===i.getUint16(s+2,a)){var d=i.getUint32(s+4,a);8<=d&&(o=s+d)}}}if(o){var l=i.getUint16(o,a),p=void 0,m=void 0;for(m=0;m<l;m+=1)if(p=o+12*m+2,274===i.getUint16(p,a)){p+=8,e=i.getUint16(p,a),i.setUint16(p,1,a);break}}return e}var Ot={render:function(){this.initContainer(),this.initCanvas(),this.initCropBox(),this.renderCanvas(),this.cropped&&this.renderCropBox()},initContainer:function(){var t=this.element,i=this.options,e=this.container,a=this.cropper;ht(a,S),rt(t,S);var n={width:Math.max(e.offsetWidth,Number(i.minContainerWidth)||200),height:Math.max(e.offsetHeight,Number(i.minContainerHeight)||100)};ot(a,{width:(this.containerData=n).width,height:n.height}),ht(t,S),rt(a,S)},initCanvas:function(){var t=this.containerData,i=this.imageData,e=this.options.viewMode,a=Math.abs(i.rotate)%180==90,n=a?i.naturalHeight:i.naturalWidth,o=a?i.naturalWidth:i.naturalHeight,h=n/o,r=t.width,s=t.height;t.height*h>t.width?3===e?r=t.height*h:s=t.width/h:3===e?s=t.width/h:r=t.height*h;var c={aspectRatio:h,naturalWidth:n,naturalHeight:o,width:r,height:s};c.left=(t.width-r)/2,c.top=(t.height-s)/2,c.oldLeft=c.left,c.oldTop=c.top,this.canvasData=c,this.limited=1===e||2===e,this.limitCanvas(!0,!0),this.initialImageData=et({},i),this.initialCanvasData=et({},c)},limitCanvas:function(t,i){var e=this.options,a=this.containerData,n=this.canvasData,o=this.cropBoxData,h=e.viewMode,r=n.aspectRatio,s=this.cropped&&o;if(t){var c=Number(e.minCanvasWidth)||0,d=Number(e.minCanvasHeight)||0;1<h?(c=Math.max(c,a.width),d=Math.max(d,a.height),3===h&&(c<d*r?c=d*r:d=c/r)):0<h&&(c?c=Math.max(c,s?o.width:0):d?d=Math.max(d,s?o.height:0):s&&((c=o.width)<(d=o.height)*r?c=d*r:d=c/r));var l=Et({aspectRatio:r,width:c,height:d});c=l.width,d=l.height,n.minWidth=c,n.minHeight=d,n.maxWidth=1/0,n.maxHeight=1/0}if(i)if(h){var p=a.width-n.width,m=a.height-n.height;n.minLeft=Math.min(0,p),n.minTop=Math.min(0,m),n.maxLeft=Math.max(0,p),n.maxTop=Math.max(0,m),s&&this.limited&&(n.minLeft=Math.min(o.left,o.left+(o.width-n.width)),n.minTop=Math.min(o.top,o.top+(o.height-n.height)),n.maxLeft=o.left,n.maxTop=o.top,2===h&&(n.width>=a.width&&(n.minLeft=Math.min(0,p),n.maxLeft=Math.max(0,p)),n.height>=a.height&&(n.minTop=Math.min(0,m),n.maxTop=Math.max(0,m))))}else n.minLeft=-n.width,n.minTop=-n.height,n.maxLeft=a.width,n.maxTop=a.height},renderCanvas:function(t,i){var e=this.canvasData,a=this.imageData;if(i){var n=function(t){var i=t.width,e=t.height,a=t.degree;if(90==(a=Math.abs(a)%180))return{width:e,height:i};var n=a%90*Math.PI/180,o=Math.sin(n),h=Math.cos(n),r=i*h+e*o,s=i*o+e*h;return 90<a?{width:s,height:r}:{width:r,height:s}}({width:a.naturalWidth*Math.abs(a.scaleX||1),height:a.naturalHeight*Math.abs(a.scaleY||1),degree:a.rotate||0}),o=n.width,h=n.height,r=e.width*(o/e.naturalWidth),s=e.height*(h/e.naturalHeight);e.left-=(r-e.width)/2,e.top-=(s-e.height)/2,e.width=r,e.height=s,e.aspectRatio=o/h,e.naturalWidth=o,e.naturalHeight=h,this.limitCanvas(!0,!1)}(e.width>e.maxWidth||e.width<e.minWidth)&&(e.left=e.oldLeft),(e.height>e.maxHeight||e.height<e.minHeight)&&(e.top=e.oldTop),e.width=Math.min(Math.max(e.width,e.minWidth),e.maxWidth),e.height=Math.min(Math.max(e.height,e.minHeight),e.maxHeight),this.limitCanvas(!1,!0),e.left=Math.min(Math.max(e.left,e.minLeft),e.maxLeft),e.top=Math.min(Math.max(e.top,e.minTop),e.maxTop),e.oldLeft=e.left,e.oldTop=e.top,ot(this.canvas,et({width:e.width,height:e.height},kt({translateX:e.left,translateY:e.top}))),this.renderImage(t),this.cropped&&this.limited&&this.limitCropBox(!0,!0)},renderImage:function(t){var i=this.canvasData,e=this.imageData,a=e.naturalWidth*(i.width/i.naturalWidth),n=e.naturalHeight*(i.height/i.naturalHeight);et(e,{width:a,height:n,left:(i.width-a)/2,top:(i.height-n)/2}),ot(this.image,et({width:e.width,height:e.height},kt(et({translateX:e.left,translateY:e.top},e)))),t&&this.output()},initCropBox:function(){var t=this.options,i=this.canvasData,e=t.aspectRatio,a=Number(t.autoCropArea)||.8,n={width:i.width,height:i.height};e&&(i.height*e>i.width?n.height=n.width/e:n.width=n.height*e),this.cropBoxData=n,this.limitCropBox(!0,!0),n.width=Math.min(Math.max(n.width,n.minWidth),n.maxWidth),n.height=Math.min(Math.max(n.height,n.minHeight),n.maxHeight),n.width=Math.max(n.minWidth,n.width*a),n.height=Math.max(n.minHeight,n.height*a),n.left=i.left+(i.width-n.width)/2,n.top=i.top+(i.height-n.height)/2,n.oldLeft=n.left,n.oldTop=n.top,this.initialCropBoxData=et({},n)},limitCropBox:function(t,i){var e=this.options,a=this.containerData,n=this.canvasData,o=this.cropBoxData,h=this.limited,r=e.aspectRatio;if(t){var s=Number(e.minCropBoxWidth)||0,c=Number(e.minCropBoxHeight)||0,d=Math.min(a.width,h?n.width:a.width),l=Math.min(a.height,h?n.height:a.height);s=Math.min(s,a.width),c=Math.min(c,a.height),r&&(s&&c?s<c*r?c=s/r:s=c*r:s?c=s/r:c&&(s=c*r),d<l*r?l=d/r:d=l*r),o.minWidth=Math.min(s,d),o.minHeight=Math.min(c,l),o.maxWidth=d,o.maxHeight=l}i&&(h?(o.minLeft=Math.max(0,n.left),o.minTop=Math.max(0,n.top),o.maxLeft=Math.min(a.width,n.left+n.width)-o.width,o.maxTop=Math.min(a.height,n.top+n.height)-o.height):(o.minLeft=0,o.minTop=0,o.maxLeft=a.width-o.width,o.maxTop=a.height-o.height))},renderCropBox:function(){var t=this.options,i=this.containerData,e=this.cropBoxData;(e.width>e.maxWidth||e.width<e.minWidth)&&(e.left=e.oldLeft),(e.height>e.maxHeight||e.height<e.minHeight)&&(e.top=e.oldTop),e.width=Math.min(Math.max(e.width,e.minWidth),e.maxWidth),e.height=Math.min(Math.max(e.height,e.minHeight),e.maxHeight),this.limitCropBox(!1,!0),e.left=Math.min(Math.max(e.left,e.minLeft),e.maxLeft),e.top=Math.min(Math.max(e.top,e.minTop),e.maxTop),e.oldLeft=e.left,e.oldTop=e.top,t.movable&&t.cropBoxMovable&&pt(this.face,u,e.width>=i.width&&e.height>=i.height?W:k),ot(this.cropBox,et({width:e.width,height:e.height},kt({translateX:e.left,translateY:e.top}))),this.cropped&&this.limited&&this.limitCanvas(!0,!0),this.disabled||this.output()},output:function(){this.preview(),wt(this.element,a,this.getData())}},zt={initPreview:function(){var e=this.crossOrigin,t=this.options.preview,a=e?this.crossOriginUrl:this.url,i=document.createElement("img");if(e&&(i.crossOrigin=e),i.src=a,this.viewBox.appendChild(i),this.viewBoxImage=i,t){var n=t;"string"==typeof t?n=this.element.ownerDocument.querySelectorAll(t):t.querySelector&&(n=[t]),it(this.previews=n,function(t){var i=document.createElement("img");pt(t,g,{width:t.offsetWidth,height:t.offsetHeight,html:t.innerHTML}),e&&(i.crossOrigin=e),i.src=a,i.style.cssText='display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"',t.innerHTML="",t.appendChild(i)})}},resetPreview:function(){it(this.previews,function(t){var i=lt(t,g);ot(t,{width:i.width,height:i.height}),t.innerHTML=i.html,mt(t,g)})},preview:function(){var r=this.imageData,t=this.canvasData,i=this.cropBoxData,s=i.width,c=i.height,d=r.width,l=r.height,p=i.left-t.left-r.left,m=i.top-t.top-r.top;this.cropped&&!this.disabled&&(ot(this.viewBoxImage,et({width:d,height:l},kt(et({translateX:-p,translateY:-m},r)))),it(this.previews,function(t){var i=lt(t,g),e=i.width,a=i.height,n=e,o=a,h=1;s&&(o=c*(h=e/s)),c&&a<o&&(n=s*(h=a/c),o=a),ot(t,{width:n,height:o}),ot(t.getElementsByTagName("img")[0],et({width:d*h,height:l*h},kt(et({translateX:-p*h,translateY:-m*h},r))))}))}},Yt={bind:function(){var t=this.element,i=this.options,e=this.cropper;tt(i.cropstart)&&vt(t,b,i.cropstart),tt(i.cropmove)&&vt(t,w,i.cropmove),tt(i.cropend)&&vt(t,v,i.cropend),tt(i.crop)&&vt(t,a,i.crop),tt(i.zoom)&&vt(t,j,i.zoom),vt(e,M,this.onCropStart=this.cropStart.bind(this)),i.zoomable&&i.zoomOnWheel&&vt(e,I,this.onWheel=this.wheel.bind(this)),i.toggleDragModeOnDblclick&&vt(e,x,this.onDblclick=this.dblclick.bind(this)),vt(t.ownerDocument,C,this.onCropMove=this.cropMove.bind(this)),vt(t.ownerDocument,D,this.onCropEnd=this.cropEnd.bind(this)),i.responsive&&vt(window,A,this.onResize=this.resize.bind(this))},unbind:function(){var t=this.element,i=this.options,e=this.cropper;tt(i.cropstart)&&ft(t,b,i.cropstart),tt(i.cropmove)&&ft(t,w,i.cropmove),tt(i.cropend)&&ft(t,v,i.cropend),tt(i.crop)&&ft(t,a,i.crop),tt(i.zoom)&&ft(t,j,i.zoom),ft(e,M,this.onCropStart),i.zoomable&&i.zoomOnWheel&&ft(e,I,this.onWheel),i.toggleDragModeOnDblclick&&ft(e,x,this.onDblclick),ft(t.ownerDocument,C,this.onCropMove),ft(t.ownerDocument,D,this.onCropEnd),i.responsive&&ft(window,A,this.onResize)}},Xt={resize:function(){var t=this.options,i=this.container,e=this.containerData,a=Number(t.minContainerWidth)||200,n=Number(t.minContainerHeight)||100;if(!(this.disabled||e.width<=a||e.height<=n)){var o=i.offsetWidth/e.width;if(1!==o||i.offsetHeight!==e.height){var h=void 0,r=void 0;t.restore&&(h=this.getCanvasData(),r=this.getCropBoxData()),this.render(),t.restore&&(this.setCanvasData(it(h,function(t,i){h[i]=t*o})),this.setCropBoxData(it(r,function(t,i){r[i]=t*o})))}}},dblclick:function(){var t,i;this.disabled||this.options.dragMode===f||this.setDragMode((t=this.dragBox,i=h,(t.classList?t.classList.contains(i):-1<t.className.indexOf(i))?c:s))},wheel:function(t){var i=this,e=Number(this.options.wheelZoomRatio)||.1,a=1;this.disabled||(t.preventDefault(),this.wheeling||(this.wheeling=!0,setTimeout(function(){i.wheeling=!1},50),t.deltaY?a=0<t.deltaY?1:-1:t.wheelDelta?a=-t.wheelDelta/120:t.detail&&(a=0<t.detail?1:-1),this.zoom(-a*e,t)))},cropStart:function(t){if(!this.disabled){var i=this.options,e=this.pointers,a=void 0;t.changedTouches?it(t.changedTouches,function(t){e[t.identifier]=Tt(t)}):e[t.pointerId||0]=Tt(t),a=1<Object.keys(e).length&&i.zoomable&&i.zoomOnTouch?E:lt(t.target,u),U.test(a)&&!1!==wt(this.element,b,{originalEvent:t,action:a})&&(t.preventDefault(),this.action=a,this.cropping=!1,a===T&&(this.cropping=!0,ht(this.dragBox,o)))}},cropMove:function(t){var i=this.action;if(!this.disabled&&i){var e=this.pointers;t.preventDefault(),!1!==wt(this.element,w,{originalEvent:t,action:i})&&(t.changedTouches?it(t.changedTouches,function(t){et(e[t.identifier],Tt(t,!0))}):et(e[t.pointerId||0],Tt(t,!0)),this.change(t))}},cropEnd:function(t){if(!this.disabled){var i=this.action,e=this.pointers;t.changedTouches?it(t.changedTouches,function(t){delete e[t.identifier]}):delete e[t.pointerId||0],i&&(t.preventDefault(),Object.keys(e).length||(this.action=""),this.cropping&&(this.cropping=!1,st(this.dragBox,o,this.cropped&&this.options.modal)),wt(this.element,v,{originalEvent:t,action:i}))}}},Rt={change:function(t){var i=this.options,e=this.canvasData,a=this.containerData,n=this.cropBoxData,o=this.pointers,h=this.action,r=i.aspectRatio,s=n.left,c=n.top,d=n.width,l=n.height,p=s+d,m=c+l,u=0,g=0,f=a.width,v=a.height,w=!0,b=void 0;!r&&t.shiftKey&&(r=d&&l?d/l:1),this.limited&&(u=n.minLeft,g=n.minTop,f=u+Math.min(a.width,e.width,e.left+e.width),v=g+Math.min(a.height,e.height,e.top+e.height));var x,y,M,C=o[Object.keys(o)[0]],D={x:C.endX-C.startX,y:C.endY-C.startY},B=function(t){switch(t){case H:p+D.x>f&&(D.x=f-p);break;case N:s+D.x<u&&(D.x=u-s);break;case O:c+D.y<g&&(D.y=g-c);break;case L:m+D.y>v&&(D.y=v-m)}};switch(h){case k:s+=D.x,c+=D.y;break;case H:if(0<=D.x&&(f<=p||r&&(c<=g||v<=m))){w=!1;break}B(H),d+=D.x,r&&(l=d/r,c-=D.x/r/2),d<0&&(h=N,d=0);break;case O:if(D.y<=0&&(c<=g||r&&(s<=u||f<=p))){w=!1;break}B(O),l-=D.y,c+=D.y,r&&(d=l*r,s+=D.y*r/2),l<0&&(h=L,l=0);break;case N:if(D.x<=0&&(s<=u||r&&(c<=g||v<=m))){w=!1;break}B(N),d-=D.x,s+=D.x,r&&(l=d/r,c+=D.x/r/2),d<0&&(h=H,d=0);break;case L:if(0<=D.y&&(v<=m||r&&(s<=u||f<=p))){w=!1;break}B(L),l+=D.y,r&&(d=l*r,s-=D.y*r/2),l<0&&(h=O,l=0);break;case z:if(r){if(D.y<=0&&(c<=g||f<=p)){w=!1;break}B(O),l-=D.y,c+=D.y,d=l*r}else B(O),B(H),0<=D.x?p<f?d+=D.x:D.y<=0&&c<=g&&(w=!1):d+=D.x,D.y<=0?g<c&&(l-=D.y,c+=D.y):(l-=D.y,c+=D.y);d<0&&l<0?(h=R,d=l=0):d<0?(h=Y,d=0):l<0&&(h=X,l=0);break;case Y:if(r){if(D.y<=0&&(c<=g||s<=u)){w=!1;break}B(O),l-=D.y,c+=D.y,d=l*r,s+=D.y*r}else B(O),B(N),D.x<=0?u<s?(d-=D.x,s+=D.x):D.y<=0&&c<=g&&(w=!1):(d-=D.x,s+=D.x),D.y<=0?g<c&&(l-=D.y,c+=D.y):(l-=D.y,c+=D.y);d<0&&l<0?(h=X,d=l=0):d<0?(h=z,d=0):l<0&&(h=R,l=0);break;case R:if(r){if(D.x<=0&&(s<=u||v<=m)){w=!1;break}B(N),d-=D.x,s+=D.x,l=d/r}else B(L),B(N),D.x<=0?u<s?(d-=D.x,s+=D.x):0<=D.y&&v<=m&&(w=!1):(d-=D.x,s+=D.x),0<=D.y?m<v&&(l+=D.y):l+=D.y;d<0&&l<0?(h=z,d=l=0):d<0?(h=X,d=0):l<0&&(h=Y,l=0);break;case X:if(r){if(0<=D.x&&(f<=p||v<=m)){w=!1;break}B(H),l=(d+=D.x)/r}else B(L),B(H),0<=D.x?p<f?d+=D.x:0<=D.y&&v<=m&&(w=!1):d+=D.x,0<=D.y?m<v&&(l+=D.y):l+=D.y;d<0&&l<0?(h=Y,d=l=0):d<0?(h=R,d=0):l<0&&(h=z,l=0);break;case W:this.move(D.x,D.y),w=!1;break;case E:this.zoom((y=et({},x=o),M=[],it(x,function(r,t){delete y[t],it(y,function(t){var i=Math.abs(r.startX-t.startX),e=Math.abs(r.startY-t.startY),a=Math.abs(r.endX-t.endX),n=Math.abs(r.endY-t.endY),o=Math.sqrt(i*i+e*e),h=(Math.sqrt(a*a+n*n)-o)/o;M.push(h)})}),M.sort(function(t,i){return Math.abs(t)<Math.abs(i)}),M[0]),t),w=!1;break;case T:if(!D.x||!D.y){w=!1;break}b=yt(this.cropper),s=C.startX-b.left,c=C.startY-b.top,d=n.minWidth,l=n.minHeight,0<D.x?h=0<D.y?X:z:D.x<0&&(s-=d,h=0<D.y?R:Y),D.y<0&&(c-=l),this.cropped||(rt(this.cropBox,S),this.cropped=!0,this.limited&&this.limitCropBox(!0,!0))}w&&(n.width=d,n.height=l,n.left=s,n.top=c,this.action=h,this.renderCropBox()),it(o,function(t){t.startX=t.endX,t.startY=t.endY})}},St={crop:function(){return!this.ready||this.cropped||this.disabled||(this.cropped=!0,this.limitCropBox(!0,!0),this.options.modal&&ht(this.dragBox,o),rt(this.cropBox,S),this.setCropBoxData(this.initialCropBoxData)),this},reset:function(){return this.ready&&!this.disabled&&(this.imageData=et({},this.initialImageData),this.canvasData=et({},this.initialCanvasData),this.cropBoxData=et({},this.initialCropBoxData),this.renderCanvas(),this.cropped&&this.renderCropBox()),this},clear:function(){return this.cropped&&!this.disabled&&(et(this.cropBoxData,{left:0,top:0,width:0,height:0}),this.cropped=!1,this.renderCropBox(),this.limitCanvas(!0,!0),this.renderCanvas(),rt(this.dragBox,o),ht(this.cropBox,S)),this},replace:function(i){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return!this.disabled&&i&&(this.isImg&&(this.element.src=i),t?(this.url=i,this.image.src=i,this.ready&&(this.viewBoxImage.src=i,it(this.previews,function(t){t.getElementsByTagName("img")[0].src=i}))):(this.isImg&&(this.replaced=!0),this.options.data=null,this.uncreate(),this.load(i))),this},enable:function(){return this.ready&&this.disabled&&(this.disabled=!1,rt(this.cropper,t)),this},disable:function(){return this.ready&&!this.disabled&&(this.disabled=!0,ht(this.cropper,t)),this},destroy:function(){var t=this.element;return lt(t,l)&&(this.isImg&&this.replaced&&(t.src=this.originalUrl),this.uncreate(),mt(t,l)),this},move:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,e=this.canvasData,a=e.left,n=e.top;return this.moveTo(V(t)?t:a+Number(t),V(i)?i:n+Number(i))},moveTo:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,e=this.canvasData,a=!1;return t=Number(t),i=Number(i),this.ready&&!this.disabled&&this.options.movable&&(K(t)&&(e.left=t,a=!0),K(i)&&(e.top=i,a=!0),a&&this.renderCanvas(!0)),this},zoom:function(t,i){var e=this.canvasData;return t=(t=Number(t))<0?1/(1-t):1+t,this.zoomTo(e.width*t/e.naturalWidth,null,i)},zoomTo:function(t,i,e){var a,n,o,h=this.options,r=this.canvasData,s=r.width,c=r.height,d=r.naturalWidth,l=r.naturalHeight;if(0<=(t=Number(t))&&this.ready&&!this.disabled&&h.zoomable){var p=d*t,m=l*t;if(!1===wt(this.element,j,{originalEvent:e,oldRatio:s/d,ratio:p/d}))return this;if(e){var u=this.pointers,g=yt(this.cropper),f=u&&Object.keys(u).length?(o=n=a=0,it(u,function(t){var i=t.startX,e=t.startY;a+=i,n+=e,o+=1}),{pageX:a/=o,pageY:n/=o}):{pageX:e.pageX,pageY:e.pageY};r.left-=(p-s)*((f.pageX-g.left-r.left)/s),r.top-=(m-c)*((f.pageY-g.top-r.top)/c)}else _(i)&&K(i.x)&&K(i.y)?(r.left-=(p-s)*((i.x-r.left)/s),r.top-=(m-c)*((i.y-r.top)/c)):(r.left-=(p-s)/2,r.top-=(m-c)/2);r.width=p,r.height=m,this.renderCanvas(!0)}return this},rotate:function(t){return this.rotateTo((this.imageData.rotate||0)+Number(t))},rotateTo:function(t){return K(t=Number(t))&&this.ready&&!this.disabled&&this.options.rotatable&&(this.imageData.rotate=t%360,this.renderCanvas(!0,!0)),this},scaleX:function(t){var i=this.imageData.scaleY;return this.scale(t,K(i)?i:1)},scaleY:function(t){var i=this.imageData.scaleX;return this.scale(K(i)?i:1,t)},scale:function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:t,e=this.imageData,a=!1;return t=Number(t),i=Number(i),this.ready&&!this.disabled&&this.options.scalable&&(K(t)&&(e.scaleX=t,a=!0),K(i)&&(e.scaleY=i,a=!0),a&&this.renderCanvas(!0,!0)),this},getData:function(){var e=0<arguments.length&&void 0!==arguments[0]&&arguments[0],t=this.options,i=this.imageData,a=this.canvasData,n=this.cropBoxData,o=void 0;if(this.ready&&this.cropped){o={x:n.left-a.left,y:n.top-a.top,width:n.width,height:n.height};var h=i.width/i.naturalWidth;it(o,function(t,i){t/=h,o[i]=e?Math.round(t):t})}else o={x:0,y:0,width:0,height:0};return t.rotatable&&(o.rotate=i.rotate||0),t.scalable&&(o.scaleX=i.scaleX||1,o.scaleY=i.scaleY||1),o},setData:function(t){var i=this.options,e=this.imageData,a=this.canvasData,n={};if(this.ready&&!this.disabled&&_(t)){var o=!1;i.rotatable&&K(t.rotate)&&t.rotate!==e.rotate&&(e.rotate=t.rotate,o=!0),i.scalable&&(K(t.scaleX)&&t.scaleX!==e.scaleX&&(e.scaleX=t.scaleX,o=!0),K(t.scaleY)&&t.scaleY!==e.scaleY&&(e.scaleY=t.scaleY,o=!0)),o&&this.renderCanvas(!0,!0);var h=e.width/e.naturalWidth;K(t.x)&&(n.left=t.x*h+a.left),K(t.y)&&(n.top=t.y*h+a.top),K(t.width)&&(n.width=t.width*h),K(t.height)&&(n.height=t.height*h),this.setCropBoxData(n)}return this},getContainerData:function(){return this.ready?et({},this.containerData):{}},getImageData:function(){return this.sized?et({},this.imageData):{}},getCanvasData:function(){var i=this.canvasData,e={};return this.ready&&it(["left","top","width","height","naturalWidth","naturalHeight"],function(t){e[t]=i[t]}),e},setCanvasData:function(t){var i=this.canvasData,e=i.aspectRatio;return this.ready&&!this.disabled&&_(t)&&(K(t.left)&&(i.left=t.left),K(t.top)&&(i.top=t.top),K(t.width)?(i.width=t.width,i.height=t.width/e):K(t.height)&&(i.height=t.height,i.width=t.height*e),this.renderCanvas(!0)),this},getCropBoxData:function(){var t=this.cropBoxData,i=void 0;return this.ready&&this.cropped&&(i={left:t.left,top:t.top,width:t.width,height:t.height}),i||{}},setCropBoxData:function(t){var i=this.cropBoxData,e=this.options.aspectRatio,a=void 0,n=void 0;return this.ready&&this.cropped&&!this.disabled&&_(t)&&(K(t.left)&&(i.left=t.left),K(t.top)&&(i.top=t.top),K(t.width)&&t.width!==i.width&&(a=!0,i.width=t.width),K(t.height)&&t.height!==i.height&&(n=!0,i.height=t.height),e&&(a?i.height=i.width/e:n&&(i.width=i.height*e)),this.renderCropBox()),this},getCroppedCanvas:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(!this.ready||!window.HTMLCanvasElement)return null;var i,e,a,n,o,h,r,s,c,d,l,p,m,u,g,f,v,w,b,x,y,M,C,D,B,k,T,W,E,H,N,L,O,z,Y,X,R,S,A,I,j,U=this.canvasData,P=(i=this.image,e=this.imageData,a=U,n=t,o=e.aspectRatio,h=e.naturalWidth,r=e.naturalHeight,s=e.rotate,c=void 0===s?0:s,d=e.scaleX,l=void 0===d?1:d,p=e.scaleY,m=void 0===p?1:p,u=a.aspectRatio,g=a.naturalWidth,f=a.naturalHeight,v=n.fillColor,w=void 0===v?"transparent":v,b=n.imageSmoothingEnabled,x=void 0===b||b,y=n.imageSmoothingQuality,M=void 0===y?"low":y,C=n.maxWidth,D=void 0===C?1/0:C,B=n.maxHeight,k=void 0===B?1/0:B,T=n.minWidth,W=void 0===T?0:T,E=n.minHeight,H=void 0===E?0:E,N=document.createElement("canvas"),L=N.getContext("2d"),O=Et({aspectRatio:u,width:D,height:k}),z=Et({aspectRatio:u,width:W,height:H},"cover"),Y=Math.min(O.width,Math.max(z.width,g)),X=Math.min(O.height,Math.max(z.height,f)),R=Et({aspectRatio:o,width:D,height:k}),S=Et({aspectRatio:o,width:W,height:H},"cover"),A=Math.min(R.width,Math.max(S.width,h)),I=Math.min(R.height,Math.max(S.height,r)),j=[-A/2,-I/2,A,I],N.width=xt(Y),N.height=xt(X),L.fillStyle=w,L.fillRect(0,0,Y,X),L.save(),L.translate(Y/2,X/2),L.rotate(c*Math.PI/180),L.scale(l,m),L.imageSmoothingEnabled=x,L.imageSmoothingQuality=M,L.drawImage.apply(L,[i].concat(bt(j.map(function(t){return Math.floor(xt(t))})))),L.restore(),N);if(!this.cropped)return P;var q=this.getData(),$=q.x,Q=q.y,F=q.width,Z=q.height,K=P.width/Math.floor(U.naturalWidth);1!==K&&($*=K,Q*=K,F*=K,Z*=K);var V=F/Z,G=Et({aspectRatio:V,width:t.maxWidth||1/0,height:t.maxHeight||1/0}),J=Et({aspectRatio:V,width:t.minWidth||0,height:t.minHeight||0},"cover"),_=Et({aspectRatio:V,width:t.width||(1!==K?P.width:F),height:t.height||(1!==K?P.height:Z)}),tt=_.width,it=_.height;tt=Math.min(G.width,Math.max(J.width,tt)),it=Math.min(G.height,Math.max(J.height,it));var et=document.createElement("canvas"),at=et.getContext("2d");et.width=xt(tt),et.height=xt(it),at.fillStyle=t.fillColor||"transparent",at.fillRect(0,0,tt,it);var nt=t.imageSmoothingEnabled,ot=void 0===nt||nt,ht=t.imageSmoothingQuality;at.imageSmoothingEnabled=ot,ht&&(at.imageSmoothingQuality=ht);var rt=P.width,st=P.height,ct=$,dt=Q,lt=void 0,pt=void 0,mt=void 0,ut=void 0,gt=void 0,ft=void 0;ct<=-F||rt<ct?gt=mt=lt=ct=0:ct<=0?(mt=-ct,ct=0,gt=lt=Math.min(rt,F+ct)):ct<=rt&&(mt=0,gt=lt=Math.min(F,rt-ct)),lt<=0||dt<=-Z||st<dt?ft=ut=pt=dt=0:dt<=0?(ut=-dt,dt=0,ft=pt=Math.min(st,Z+dt)):dt<=st&&(ut=0,ft=pt=Math.min(Z,st-dt));var vt=[ct,dt,lt,pt];if(0<gt&&0<ft){var wt=tt/F;vt.push(mt*wt,ut*wt,gt*wt,ft*wt)}return at.drawImage.apply(at,[P].concat(bt(vt.map(function(t){return Math.floor(xt(t))})))),et},setAspectRatio:function(t){var i=this.options;return this.disabled||V(t)||(i.aspectRatio=Math.max(0,t)||NaN,this.ready&&(this.initCropBox(),this.cropped&&this.renderCropBox())),this},setDragMode:function(t){var i=this.options,e=this.dragBox,a=this.face;if(this.ready&&!this.disabled){var n=t===s,o=i.movable&&t===c;t=n||o?t:f,i.dragMode=t,pt(e,u,t),st(e,h,n),st(e,m,o),i.cropBoxMovable||(pt(a,u,t),st(a,h,n),st(a,m,o))}return this}},At=r.Cropper,It=function(){function e(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(F(this,e),!t||!$.test(t.tagName))throw new Error("The first argument is required and must be an <img> or <canvas> element.");this.element=t,this.options=et({},Q,_(i)&&i),this.cropped=!1,this.disabled=!1,this.pointers={},this.ready=!1,this.reloading=!1,this.replaced=!1,this.sized=!1,this.sizing=!1,this.init()}return Z(e,[{key:"init",value:function(){var t=this.element,i=t.tagName.toLowerCase(),e=void 0;if(!lt(t,l)){if(pt(t,l,this),"img"===i){if(this.isImg=!0,e=t.getAttribute("src")||"",!(this.originalUrl=e))return;e=t.src}else"canvas"===i&&window.HTMLCanvasElement&&(e=t.toDataURL());this.load(e)}}},{key:"load",value:function(t){var i=this;if(t){this.url=t,this.imageData={};var e=this.element,a=this.options;if(a.checkOrientation&&window.ArrayBuffer)if(P.test(t))q.test(t)?this.read((n=t.replace(Nt,""),o=atob(n),h=new ArrayBuffer(o.length),it(r=new Uint8Array(h),function(t,i){r[i]=o.charCodeAt(i)}),h)):this.clone();else{var n,o,h,r,s=new XMLHttpRequest;this.reloading=!0,this.xhr=s;var c=function(){i.reloading=!1,i.xhr=null};s.ontimeout=c,s.onabort=c,s.onerror=function(){c(),i.clone()},s.onload=function(){c(),i.read(s.response)},a.checkCrossOrigin&&Dt(t)&&e.crossOrigin&&(t=Bt(t)),s.open("get",t),s.responseType="arraybuffer",s.withCredentials="use-credentials"===e.crossOrigin,s.send()}else this.clone()}}},{key:"read",value:function(t){var i,e,a,n=this.options,o=this.imageData,h=Lt(t),r=0,s=1,c=1;if(1<h){this.url=(i="image/jpeg",e=new Uint8Array(t),a="",it(e,function(t){a+=Ht(t)}),"data:"+i+";base64,"+btoa(a));var d=function(t){var i=0,e=1,a=1;switch(t){case 2:e=-1;break;case 3:i=-180;break;case 4:a=-1;break;case 5:i=90,a=-1;break;case 6:i=90;break;case 7:i=90,e=-1;break;case 8:i=-90}return{rotate:i,scaleX:e,scaleY:a}}(h);r=d.rotate,s=d.scaleX,c=d.scaleY}n.rotatable&&(o.rotate=r),n.scalable&&(o.scaleX=s,o.scaleY=c),this.clone()}},{key:"clone",value:function(){var t=this.element,i=this.url,e=void 0,a=void 0;this.options.checkCrossOrigin&&Dt(i)&&((e=t.crossOrigin)?a=i:(e="anonymous",a=Bt(i))),this.crossOrigin=e,this.crossOriginUrl=a;var n=document.createElement("img");e&&(n.crossOrigin=e),n.src=a||i;var o=this.start.bind(this),h=this.stop.bind(this);this.image=n,this.onStart=o,this.onStop=h,this.isImg?t.complete?this.timeout=setTimeout(o,0):vt(t,y,o,{once:!0}):(n.onload=o,n.onerror=h,ht(n,p),t.parentNode.insertBefore(n,t.nextSibling))}},{key:"start",value:function(t){var e=this,i=this.isImg?this.element:this.image;t&&(i.onload=null,i.onerror=null),this.sizing=!0;var a=r.navigator&&/(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i.test(r.navigator.userAgent),n=function(t,i){et(e.imageData,{naturalWidth:t,naturalHeight:i,aspectRatio:t/i}),e.sizing=!1,e.sized=!0,e.build()};if(!i.naturalWidth||a){var o=document.createElement("img"),h=document.body||document.documentElement;(this.sizingImage=o).onload=function(){n(o.width,o.height),a||h.removeChild(o)},o.src=i.src,a||(o.style.cssText="left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;",h.appendChild(o))}else n(i.naturalWidth,i.naturalHeight)}},{key:"stop",value:function(){var t=this.image;t.onload=null,t.onerror=null,t.parentNode.removeChild(t),this.image=null}},{key:"build",value:function(){if(this.sized&&!this.ready){var t=this.element,i=this.options,e=this.image,a=t.parentNode,n=document.createElement("div");n.innerHTML='<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>';var o=n.querySelector("."+l+"-container"),h=o.querySelector("."+l+"-canvas"),r=o.querySelector("."+l+"-drag-box"),s=o.querySelector("."+l+"-crop-box"),c=s.querySelector("."+l+"-face");this.container=a,this.cropper=o,this.canvas=h,this.dragBox=r,this.cropBox=s,this.viewBox=o.querySelector("."+l+"-view-box"),this.face=c,h.appendChild(e),ht(t,S),a.insertBefore(o,t.nextSibling),this.isImg||rt(e,p),this.initPreview(),this.bind(),i.aspectRatio=Math.max(0,i.aspectRatio)||NaN,i.viewMode=Math.max(0,Math.min(3,Math.round(i.viewMode)))||0,ht(s,S),i.guides||ht(s.getElementsByClassName(l+"-dashed"),S),i.center||ht(s.getElementsByClassName(l+"-center"),S),i.background&&ht(o,l+"-bg"),i.highlight||ht(c,"cropper-invisible"),i.cropBoxMovable&&(ht(c,m),pt(c,u,k)),i.cropBoxResizable||(ht(s.getElementsByClassName(l+"-line"),S),ht(s.getElementsByClassName(l+"-point"),S)),this.render(),this.ready=!0,this.setDragMode(i.dragMode),i.autoCrop&&this.crop(),this.setData(i.data),tt(i.ready)&&vt(t,B,i.ready,{once:!0}),wt(t,B)}}},{key:"unbuild",value:function(){this.ready&&(this.ready=!1,this.unbind(),this.resetPreview(),this.cropper.parentNode.removeChild(this.cropper),rt(this.element,S))}},{key:"uncreate",value:function(){var t=this.element;this.ready?(this.unbuild(),this.ready=!1,this.cropped=!1):this.sizing?(this.sizingImage.onload=null,this.sizing=!1,this.sized=!1):this.reloading?this.xhr.abort():this.isImg?t.complete?clearTimeout(this.timeout):ft(t,y,this.onStart):this.image&&this.stop()}}],[{key:"noConflict",value:function(){return window.Cropper=At,e}},{key:"setDefaults",value:function(t){et(Q,_(t)&&t)}}]),e}();if(et(It.prototype,Ot,zt,Yt,Xt,Rt,St),d.fn){var jt=d.fn.cropper,Ut="cropper";d.fn.cropper=function(r){for(var t=arguments.length,s=Array(1<t?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];var c=void 0;return this.each(function(t,i){var e=d(i),a="destroy"===r,n=e.data(Ut);if(!n){if(a)return;var o=d.extend({},e.data(),d.isPlainObject(r)&&r);n=new It(i,o),e.data(Ut,n)}if("string"==typeof r){var h=n[r];d.isFunction(h)&&((c=h.apply(n,s))===n&&(c=void 0),a&&e.removeData(Ut))}}),void 0!==c?c:this},d.fn.cropper.Constructor=It,d.fn.cropper.setDefaults=It.setDefaults,d.fn.cropper.noConflict=function(){return d.fn.cropper=jt,this}}});
/**
 * 图片截取工具
 */
var Crop = {
    CropAvatar: function ($element, fun) {
        this.callback = fun;
        this.$container = $element;
        // 页面图片
        this.$cropper = this.$container.find('img');
        // 模态框
        this.$cropperModal = $('#cropper-modal');
        // 上传图片
        this.$cropperInput = this.$cropperModal.find('.cropper-input');
        // 保存
        this.$cropperSave = this.$cropperModal.find('.cropper-save');
        // 截取区域
        this.$cropperWrapper = this.$cropperModal.find('.cropper-wrapper');
        // 预览图
        this.$cropperPreview = this.$cropperModal.find('.cropper-preview');
        this.init();
    }
};
Crop.CropAvatar.prototype = {
    /**
     * 初始化
     */
    init: function () {
        try {
            this.initModal();
            this.addListener();
        } catch (e) {
            alert('图片截取仅支持在Chrome、Firefox、Safari、Opera、IE10+、或国产浏览器极速模式下使用,如需使用,请更换其他浏览器.');
        }
    },
    /**
     * 绑定事件
     */
    addListener: function () {
        this.$container.on('click', $.proxy(this.click, this));
        this.$cropperInput.on('change', $.proxy(this.change, this));
        this.$cropperSave.on('click', $.proxy(this.submit, this));
        this.bindToolEvent();
    },
    /**
     * 绑定工具条事件
     */
    bindToolEvent: function () {
        var _cropper = this;
        $('.cropper-tool').on('click', '[data-method]', function () {
            var $this = $(this);
            // 获取操作信息
            var data = $this.data();
            var cropper = _cropper.$img.data('cropper');
            var cropped;

            if (cropper && data.method) {
                cropped = cropper.cropped;
                _cropper.$img.cropper(data.method, data.option, data.secondOption);
                switch (data.method) {
                    case 'rotate':
                        if (cropped && options.viewMode > 0) {
                            _cropper.$img.cropper('crop');
                        }
                        break;
                    case 'scaleX':
                    case 'scaleY':
                        $(this).data('option', -data.option);
                        break;
                }
            }
        });
    },
    /**
     * 初始化模态框
     */
    initModal: function () {
        this.$cropperModal.modal({
            backdrop: 'static',
            keyboard: false,
            show: false
        });
    },
    /**
     * 初始化预览图
     */
    initPreview: function () {
        var url = this.$cropper.attr('src');
        if (mUtil.isNotBlank(url)) {
            this.$cropperPreview.html('<img alt="预览" src="' + url + '">');
        }
    },
    /**
     * 点击图片打开模态框
     */
    click: function () {
        var _cropper = this;
        this.$cropperModal.modal('show').on('shown.bs.modal', function () {
            var _src = _cropper.$cropper.attr('src');
            if (mUtil.isNotBlank(_src)) {
                if (_src.indexOf('?') > -1) {
                    _cropper.url = _cropper.$cropper.attr('src') + '&date=' + new Date().getTime();
                } else {
                    _cropper.url = _cropper.$cropper.attr('src') + '?date=' + new Date().getTime();
                }
                _cropper.startCropper();
                Crop.$cropper = _cropper.$img;
            } else {
                if(_cropper.$cropperModal.find('.alert').length === 0){
                    _cropper.$cropperModal.find('.modal-body > .row:eq(0)').before('<div class="alert alert-info" role="alert"><i class="la la-exclamation"></i> 请点击 <i class="fa fa-upload"></i> 上传选择图片</div>');
                }
            }
        });
        this.initPreview();
    },
    /**
     * 更改图片
     */
    change: function () {
        var files;
        var file;
        files = this.$cropperInput.prop('files');
        if (files.length > 0) {
            file = files[0];
            if (this.isImageFile(file)) {
                if (this.url) {
                    URL.revokeObjectURL(this.url);
                }
                this.url = URL.createObjectURL(file);
                this.startCropper();
                this.$cropperModal.find('.alert').remove();
            }
        }
    },
    /**
     * 提交
     */
    submit: function () {
        this.ajaxUpload();
    },
    /**
     * 判断文件是否是图片
     *
     * @param file
     * @return {boolean} true/false
     */
    isImageFile: function (file) {
        if (file.type) {
            return /^image\/\w+$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png|gif)$/.test(file);
        }
    },
    /**
     * 开始截取
     */
    startCropper: function () {
        if (this.active) {
            this.$img.cropper('replace', this.url);
        } else {
            this.$img = $('<img alt="" src="' + this.url + '">');
            this.$cropperWrapper.empty().html(this.$img);
            var aspectRatio = this.$container.data('aspect-ratio');
            this.$img.cropper({
                aspectRatio: aspectRatio,
                preview: this.$cropperPreview
            });
            this.active = true;
        }
        var _cropper = this;
        this.$cropperModal.one('hidden.bs.modal', function () {
            _cropper.$cropperPreview.empty();
            _cropper.stopCropper();
        });
    },
    /**
     * 结束截取
     */
    stopCropper: function () {
        if (this.active) {
            this.$img.cropper('destroy');
            this.$img.remove();
            this.active = false;
            this.$cropperInput.val('');
        }
    },
    /**
     * ajax上传
     */
    ajaxUpload: function () {
        var pic = this.$img.cropper("getCroppedCanvas");
        pic = pic.toDataURL("image/jpeg", 1);
        pic = pic.replace(/^data:image\/(jpeg);base64,/, '');
        var cropper = this;
        $.ajax({
            url: basePath + '/auth/cropper',
            data: pic,
            type: 'post',
            processData: false,
            success: function (res) {
                cropper.submitDone(res.data);
            }
        });
    },
    /**
     * 上传完毕
     *
     * @param data {object} 文件对象
     */
    submitDone: function (data) {
        this.url = basePath + data.url;
        this.callback(data);
        this.cropDone();
        this.$cropperInput.val('');
    },
    /**
     * 剪裁完毕，更新页面图片并关闭模态框
     */
    cropDone: function () {
        this.$cropper.attr('src', this.url);
        this.stopCropper();
        this.$cropperModal.modal('hide');
    },
    /**
     * 错误提示
     *
     * @param msg {string} 提示内容
     */
    alert: function (msg) {
        mTool.warnTip('操作失败', msg);
    }
};