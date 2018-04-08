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
})({26:[function(require,module,exports) {
var HashStorage = function HashStorage() {
	this.storage = {};
};

HashStorage.prototype.addValue = function (key, val) {
	this.storage[key] = val;
};

HashStorage.prototype.getValue = function (key) {
	return this.storage[key];
};

HashStorage.prototype.deleteValue = function (key) {
	if (key in this.storage) {
		delete this.storage[key];
		return true;
	}
	return false;
};

HashStorage.prototype.getKeys = function () {
	return Object.keys(this.storage);
};

var drinkStorage = new HashStorage();

var inputName = document.getElementById('input-name');
var inputNameDel = document.getElementById('input-name-del');
var inputNameGet = document.getElementById('input-name-get');
var receipt = document.getElementById('input-receipt');
var btnAdd = document.getElementById('add-drink');
var btnGet = document.getElementById('get-drink');
var btnDel = document.getElementById('del-drink');
var btnLi = document.getElementById('li-drink');

var btnAddHandler = function btnAddHandler(evt) {
	if (drinkStorage.getValue(inputName.value)) {
		alert('Такой напиток уже есть!');
	} else {
		var isChecked = Array.prototype.some.call(document.querySelectorAll('.radio'), function (el, i) {
			if (el.checked) return el.value === "true" ? true : false;
		});

		drinkStorage.addValue(inputName.value, {
			receipt: receipt.value,
			alcoholic: isChecked
		});

		alert('Напиток с названием "' + inputName.value + '" добавлен успешно');
	}

	inputName.value = '';
	receipt.value = '';
};

var btnGetHandler = function btnGetHandler(evt) {
	var info = drinkStorage.getValue(inputNameGet.value);

	if (info) {
		var string = 'напиток: ' + inputNameGet.value + '\n' + 'алкогольный: ' + (info.alcoholic ? 'да' : 'нет') + '\n' + 'рецепт приготовления: ' + info.receipt;
		alert(string);
	} else {
		alert('Такого напитка нет в списке!');
	}
};

var btnDelHandler = function btnDelHandler(evt) {
	var isDel = drinkStorage.deleteValue(inputNameDel.value);
	if (isDel) {
		alert('Напиток с названием "' + inputNameDel.value + '" успешно удалён');
	} else {
		alert('Невозможно удалить напиток, т.к. его нет в списке!');
	}
	inputNameDel.value = '';
};

var btnLiHandler = function btnLiHandler(evt) {
	alert(drinkStorage.getKeys());
};

btnAdd.addEventListener('click', btnAddHandler);
btnGet.addEventListener('click', btnGetHandler);
btnDel.addEventListener('click', btnDelHandler);
btnLi.addEventListener('click', btnLiHandler);
},{}]},{},[26])