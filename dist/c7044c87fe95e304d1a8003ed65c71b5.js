require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({8:[function(require,module,exports) {
var e=function(e,r){for(var o=0,t=document.querySelector(".js-prime-tbody"),n=1,c=.02,d=e;d<=r;d++){var u=1;do{++u===d&&(o%12||0===o||n++,t.querySelector(".js-row-"+n).insertAdjacentHTML("beforeEnd",'<td style="background-color: rgba(0, 52, 180, '+c+');">'+d+"</td>"),o++,c+=.0045)}while(d%u&&u<d)}document.querySelector(".js-prime-count").innerText="Общее количество простых чисел: "+o};e(1,1e3);
},{}]},{},[8])