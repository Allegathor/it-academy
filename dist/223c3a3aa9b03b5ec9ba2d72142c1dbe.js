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
})({27:[function(require,module,exports) {
var btn = document.getElementById('count-btn');
var input = document.getElementById('text-area');

var countVowels = function countVowels(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	};

	var char;
	var count = 0;

	for (var i = 0; i < string.length; i++) {
		char = string[i];
		if (char in vowels) {
			count++;
		}
	}

	return count;
};

var countVowelsFE = function countVowelsFE(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	};

	var count = 0;
	var countVow = function countVow(ch, i) {
		if (ch in vowels) {
			count++;
		}
	};
	string.split('').forEach(countVow);

	return count;
};

var countVowelsFilter = function countVowelsFilter(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	};

	var filterByType = function filterByType(ch, i) {
		if (ch in vowels) {
			return true;
		}
	};

	return string.split('').filter(filterByType).length;
};

var countVowelsReduce = function countVowelsReduce(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	};

	var reduceToVowCount = function reduceToVowCount(acc, ch) {
		if (ch in vowels) {
			return ++acc;
		}

		return acc;
	};

	return string.split('').reduce(reduceToVowCount, 0);
};

var btnHandler = function btnHandler() {
	console.log(countVowels(input.value));
	console.log('forEach: ' + countVowelsFE(input.value));
	console.log('filter: ' + countVowelsFilter(input.value));
	console.log('reduce: ' + countVowelsReduce(input.value));
};

btn.addEventListener('click', btnHandler);
},{}]},{},[27])