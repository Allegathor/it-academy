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
})({44:[function(require,module,exports) {
var isLeapYear = function isLeapYear(year) {

	if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
		return true;
	}

	return false;
};

var calcDays = function calcDays(month, year) {
	month = parseInt(month);
	month = !isNaN(month) && month >= 1 && month <= 12 ? month : 1;

	year = parseInt(year);
	year = !isNaN(year) ? year : 2000;

	if (month <= 7) {
		if (month === 2) return isLeapYear(year) ? 29 : 28;
		return month & 1 ? 31 : 30;
	} else {
		return !(month & 1) ? 31 : 30;
	}
};

console.log(calcDays(1, 2018));
console.log(calcDays(2, 2000));
console.log(calcDays(2, 2088));
console.log(calcDays(2, 1804));
console.log(calcDays(2, 1880));
console.log(calcDays(2, 2001));
console.log(calcDays(2, 1925));
console.log(calcDays(3, 2018));
console.log(calcDays(4, 2018));
console.log(calcDays(5, 2018));
console.log(calcDays(6, 2018));
console.log(calcDays(7, 2018));
console.log(calcDays(8, 2018));
console.log(calcDays(9, 2018));
console.log(calcDays(10, 2018));
console.log(calcDays(12, 2018));

console.log(calcDays('44', '1912'));
console.log(calcDays('2', null));
console.log(calcDays(null, null));
console.log(calcDays());
},{}]},{},[44])