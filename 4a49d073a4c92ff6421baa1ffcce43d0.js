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
})({32:[function(require,module,exports) {
function htmlEscape(text) {
	return text.replace(/[<>&"']/gi, function(match) {
		switch(match) {
			case('<'):
				return '&lt;';
				break;
			case('>'):
				return '&gt;';
				break;
			case('&'):
				return '&amp;';
				break;
			case("'"):
				return '&apos;';
				break;
			case('"'):
				return '&quot;';
				break;
		}
	})
}

function buildWrapper(tag) {

	return function(innerText) {
		var escapedText = htmlEscape(innerText);

		return '<' + tag + '>' + escapedText + '</' + tag + '>';
	}

}

var testStr = `In JS 'a' > 10 returns false, but "a" > "10" returns true`;
var wrapH2 = buildWrapper('H2');
var wrapP = buildWrapper('P');

console.log(wrapH2(testStr));
console.log(wrapP(testStr));

},{}]},{},[32])