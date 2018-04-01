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
})({60:[function(require,module,exports) {
// sum1 = 50, sum2 = 54
var arr1 = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];
var arr2 = [[], ['1', '1'], 2, [1, 4, [[2, 1, 3], [4, 2]], 5], [4, 6, [3, 7, 5]], '8', [], [5], [], ['-9', -1], []];

var treeSum = function treeSum(arr) {

  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];

    if (Array.isArray(el) && el.length) {
      sum += treeSum(el);
    } else {
      sum += parseFloat(el) || 0;
    }
  }

  return sum;
};

console.log('Loop: \nsum1 =', treeSum(arr1), '\nsum2 =', treeSum(arr2));
},{}]},{},[60])