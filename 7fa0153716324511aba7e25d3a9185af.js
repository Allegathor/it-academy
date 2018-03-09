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
})({301:[function(require,module,exports) {
var btn = document.querySelector('.js-data-btn');


var formatData = function(userData) {
	var formatted = {};

	var ageNum = parseInt(userData.age, 10);

	formatted.main = 'ФИО: ' + userData.name + ' ' + userData.surname + ' ' + userData.patr;
	formatted.ageYears = 'Возраст, лет: ' + userData.age;
	formatted.ageDays = 'Возраст, дней: ' + (ageNum * 365);

	if (userData.gender === true) {
		formatted.gender = 'Пол: мужской';
	} else if (userData.gender === false) {
		formatted.gender = 'Пол: женский';
	}

	if (userData.gender && ageNum >= 61) {
		formatted.retirement = 'Пенсионный возраст: да';
	} else if(!userData.gender && ageNum >= 56) {
		formatted.retirement = 'Пенсионный возраст: да';
	} else {
		formatted.retirement = 'Пенсионный возраст: нет';
	}

	alert(formatted.main + '\n' + formatted.ageYears + '\n' + formatted.ageDays + '\n' + formatted.gender + '\n' + formatted.retirement);

}

var requestData = function() {
	var user = {};

	user.name = prompt('Введите имя', '');
	if (user.name === null) { return; }

	user.surname = prompt('Введите фамилию', '');
	if (user.surname === null) { return; }

	user.patr = prompt('Введите отчество', '');
	if (user.patr === null) { return; }

	user.age = prompt('Введите возраст', '');
	if (user.age === null) { return; }

	user.gender = confirm('Вы мужчина?')
	if (user.gender === null) { return; }

	if (user) {
		formatData(user);
	}

}

requestData();

btn.addEventListener('click', function(evt){
	requestData();
})

},{}]},{},[301])