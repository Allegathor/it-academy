// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({43:[function(require,module,exports) {
var ready = function ready(evt) {
	var gallery = document.getElementById('gallery');
	gallery.style.position = 'relative';

	var imgCollection = gallery.querySelectorAll('.gallery-image');

	for (var i = imgCollection.length - 1; i >= 0; i--) {
		var img = imgCollection[i];

		var leftPos = img.offsetLeft + 'px';
		var topPos = img.offsetTop + 'px';

		img.dataset.draggable = false;
		img.style.position = 'absolute';
		img.style.left = leftPos;
		img.style.top = topPos;
		img.style.cursor = 'default';
	}

	var dragHandler = function dragHandler(evt) {
		evt.preventDefault();
	};

	var deltaX = 0;
	var deltaY = 0;

	var mouseMoveHandler = function mouseMoveHandler(evt) {
		var el = gallery.querySelector('[data-draggable=true]');
		el.style.left = evt.pageX - deltaX + 'px';
		el.style.top = evt.pageY - deltaY + 'px';
	};

	var mouseDownHandler = function mouseDownHandler(evt) {
		if (evt.target.tagName === 'IMG') {
			evt.target.dataset.draggable = true;
			evt.target.style.cursor = 'move';
			evt.target.style.zIndex = '10';

			deltaX = evt.pageX - evt.target.offsetLeft;
			deltaY = evt.pageY - evt.target.offsetTop;

			document.body.addEventListener('mousemove', mouseMoveHandler);
		}
	};

	var mouseUpHandler = function mouseUpHandler(evt) {
		evt.target.dataset.draggable = false;
		evt.target.style.zIndex = '0';
		evt.target.style.cursor = 'default';

		gallery.removeChild(evt.target);
		gallery.appendChild(evt.target);
		document.body.removeEventListener('mousemove', mouseMoveHandler);
	};

	gallery.addEventListener('mouseup', mouseUpHandler);
	gallery.addEventListener('mousedown', mouseDownHandler);
	gallery.addEventListener('dragstart', dragHandler);
};

window.addEventListener('load', ready);
},{}]},{},[43])