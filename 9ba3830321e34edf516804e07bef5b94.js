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
})({58:[function(require,module,exports) {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var deepClone = function deepClone(val) {
	var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);

	if (!val || type === 'number' || type === 'string') {
		return val;
	} else if (Array.isArray(val)) {
		var clone = val.slice();

		val.forEach(function (el, i) {
			clone[i] = deepClone(el);
		});
	} else if (type === 'object') {
		var clone = Object.create(val);

		for (var prop in val) {
			clone[prop] = deepClone(val[prop]);
		}
	}

	return clone;
};

var h1 = { a: 5, b: { b1: 6, b2: 7 }, c: [33, 22], d: null, e: undefined, f: Number.NaN };
var h2 = deepClone(h1);

console.log(h1 === h2, 'Must be false');
console.log((typeof h2 === 'undefined' ? 'undefined' : _typeof(h2)) === (typeof h1 === 'undefined' ? 'undefined' : _typeof(h1)), 'Must be true');
console.log(h1.a === h2.a, 'Must be true');
console.log(h1.b === h2.b, 'Must be false');
console.log(h1.b.b1 === h2.b.b1, 'Must be true');
console.log(h1.c === h2.c, 'Must be false');
console.log(h1.c[0] === h2.c[0], 'Must be true');
console.log(h1.d === h2.d, 'Must be true');
console.log(h1.e === h2.e, 'Must be true');
console.log(isNaN(h2.f), 'Must be true');

var a1 = [5, { b1: 6, b2: 7 }, [33, 22], null, undefined, Number.NaN];
var a2 = deepClone(a1);

console.log(a1 === a2, 'Must be false');
console.log((typeof a2 === 'undefined' ? 'undefined' : _typeof(a2)) === (typeof a1 === 'undefined' ? 'undefined' : _typeof(a1)), 'Must be true');
console.log(a1[0] === a2[0], 'Must be true');
console.log(a1[1] === a2[1], 'Must be false');
console.log(a1[1].b1 === a2[1].b1, 'Must be true');
console.log(a1[2] === a2[2], 'Must be false');
console.log(a1[2][0] === a2[2][0], 'Must be true');
console.log(a1[3] === a2[3], 'Must be true');
console.log(a1[4] === a2[4], 'Must be true');
console.log(isNaN(a2[5]), 'Must be true');

var v1 = "sss";
var v2 = deepClone(v1);

console.log((typeof v2 === 'undefined' ? 'undefined' : _typeof(v2)) === (typeof v1 === 'undefined' ? 'undefined' : _typeof(v1)), 'Must be true');
console.log(v1 === v2, 'Must be true');

var z1 = null;
var z2 = deepClone(z1);

console.log((typeof z2 === 'undefined' ? 'undefined' : _typeof(z2)) === (typeof z1 === 'undefined' ? 'undefined' : _typeof(z1)), 'Must be true');
console.log(z1 === z2, 'Must be true');

var n1 = Number.NaN;
var n2 = deepClone(n1);

console.log((typeof n2 === 'undefined' ? 'undefined' : _typeof(n2)) === (typeof n1 === 'undefined' ? 'undefined' : _typeof(n1)), 'Must be true');
console.log(isNaN(n2), 'Must be true');
},{}]},{},[58])