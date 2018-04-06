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
})({56:[function(require,module,exports) {
var input = document.getElementById('exp-input');
var output = document.getElementById('exp-result');

var getTokens = function getTokens(str) {
	var arr;
	var s = str.replace(/[^|.+-/*()0-9.]/g, '');
	s = s.replace(/(?:(?<=[-+/*^]|^)[-+])?\d+(?:[.]\d+)?|(?:(?<=[\d])[+-]|[*/()])/g, '$&|');

	arr = s.split('|');
	arr.pop();
	return arr;
};

var calc = function calc(tokens) {
	var operators = {
		'+': function _(a, b) {
			return a + b;
		},

		'-': function _(a, b) {
			return a - b;
		},

		'*': function _(a, b) {
			return a * b;
		},

		'/': function _(a, b) {
			return a / b;
		}
	};

	var tsStack = [];
	var oq = [];
	var t;

	for (var i = 0; i < tokens.length; i++) {
		t = tokens[i];

		if (!isNaN(t)) {
			oq.push(parseFloat(t));
		} else if (t in operators) {

			while ((t === '+' || t === '-') && (tsStack[tsStack.length - 1] === '/' || tsStack[tsStack.length - 1] === '*')) {
				oq.push(tsStack.pop());
			}

			tsStack.push(t);
		} else if (t === '(') {
			tsStack.push(t);
		} else if (t === ')') {
			while (tsStack[tsStack.length - 1] !== '(') {
				oq.push(tsStack.pop());
			}

			tsStack.pop();
		}
	}

	while (tsStack.length) {
		oq.push(tsStack.pop());
	}

	var stack = [];
	var el;
	var opd1;
	var opd2;
	var val;

	for (var n = 0; n < oq.length; n++) {
		el = oq[n];

		if (!isNaN(el)) {
			stack.push(el);
		} else if (el in operators) {
			opd1 = stack.pop();
			opd2 = stack.pop();

			val = operators[el](opd2, opd1);
			stack.push(val);
		}
	}

	return stack[0];
};

input.addEventListener('change', function (evt) {
	output.textContent = calc(getTokens(input.value));
});
},{}]},{},[56])