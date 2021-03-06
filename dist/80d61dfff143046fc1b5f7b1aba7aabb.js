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
})({37:[function(require,module,exports) {
var btn = document.getElementById('check-btn');
var input = document.getElementById('text-area');

var formatString = function formatString(str) {

	var s = str.toLowerCase();

	s = s.replace(/[\n\u0020\u2013\u2014\-?!'".,ьъ]/g, '');
	s = s.replace(/ё/g, 'е');
};

var isPalindrome = function isPalindrome(str) {

	var startIndex = 0;
	var stopIndex = str.length - 1;

	var i = startIndex;
	var j = stopIndex;

	if (str.length > 2) {

		while (str.charAt(i) === str.charAt(j)) {
			i++;
			j--;

			if (i > j) {
				return true;
			}
		}

		return false;
	} else if (str.length === 2) {
		return str.charAt(i) === str.charAt(j) ? true : false;
	} else if (str.length === 1) {
		return true;
	}
};

var isPalindromeRecur = function isPalindromeRecur(str, i, j) {
	i = i || 0;
	j = j || str.length - 1;

	if (i < j) {
		if (str.charAt(i) === str.charAt(j)) {
			return isPalindromeRecur(str, i + 1, j - 1);
		} else {
			return false;
		}
	}

	return true;
};

var btnHandler = function btnHandler() {
	console.log(isPalindrome(input.value));
	console.log(isPalindromeRecur(input.value));
};

btn.addEventListener('click', btnHandler);
},{}]},{},[37])