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

      var module = cache[name] = new newRequire.Module;

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

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({207:[function(require,module,exports) {
var btn = document.querySelector('.js-data-btn');

var findSubStr = function(str, k) {
	var subStrArr = str.split(' ');
	var head = 1;
	var q = [];
	var res;

	if (subStrArr.length > k) {

		for (var i = 0; i < subStrArr.length; i++) {

			if (subStrArr[i].length > head) {
				q.unshift(subStrArr[i]);
				head = subStrArr[i].length;

				if (q.length > k) {
					q.pop();
				}

			}

		}

		res = q.join(';');
		alert(res);

	} else {
		res = subStrArr.join(';');
		alert(res);
	}
}

var requestText = function() {
	var text = prompt('Введите текст', '');
	if (text === null) { return; }

	findSubStr(text, 3);
}

btn.addEventListener('click', function(evt){
	requestText();
})

},{}]},{},[207])