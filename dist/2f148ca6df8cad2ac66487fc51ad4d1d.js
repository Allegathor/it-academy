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
})({25:[function(require,module,exports) {
var ready = function() {
	var btn = document.querySelector('.js-data-btn');

	var formatData = function(userData) {
		var main;

		var ageNum = parseInt(userData.age.value, 10);
		var ageDays;
		var ageInFive;
		var gender;
		var retirement;

		main = 'Ваше ФИО: ' + userData.name.value + ' ' + userData.surname.value + ' ' + userData.patr.value;
		ageYears = 'Ваш возраст в годах: ' + userData.age.value;
		ageDays = 'Ваш возраст в днях: ' + (ageNum * 365);
		ageInFive = 'Через пять лет вам будет: ' + (ageNum + 5);

		gender = (userData.gender.value === true) ? 'Пол: мужской' : 'Пол: женский';

		(gender) ?
		(retirement = (ageNum >= 61) ? 'Вы на пенсии: да' : 'Вы на пенсии: нет') :
		(retirement = (ageNum >= 56) ? 'Вы на пенсии: да' : 'Вы на пенсии: нет');

		alert(main + '\n' + ageYears + '\n' + ageDays + '\n' + ageInFive + '\n' + gender + '\n' + retirement);

	}

	var isValid = function(value, type) {
		var toIntAttempt = parseInt(value, 10);
		if (value !== '' && value !== null) {
			if ( type === 'string' && isNaN(toIntAttempt) ) {
				return true;

			} else if ( type === 'number' && !isNaN(toIntAttempt) &&
			(toIntAttempt > 0 && toIntAttempt < 130) ) {
				return true;

			} else {
				return false;
			}
		}

		return false;

	}

	var canShowNext  = function(prop) {
		var expType;
		var fail;
		var failMsg;

		if (!prop.confirm) {

			expType = (!prop.num) ? 'string' : 'number';
			fail = false;
			failMsg = (!prop.num) ? ' корректно! (поле не должно быть пустым; используйте кириллицу/латиницу; числовые значения не допускаются)' : ' корректно! (поле не должно быть пустым, а введёное значение должно являться числом, которое больше 0, но меньше 130)';

			while (!isValid(prop.value, expType)) {
				prop.value = (!fail) ? prompt(prop.msg, '') :
				prompt(prop.msg + failMsg, '');

				fail = true;
			}

		} else {
			prop.value = confirm(prop.msg);

		}

		return true;
	}

	var getData = function() {
		var user = {};

		user.name 		= { msg:'Введите имя', value: '' };
		user.surname	= { msg: 'Введите фамилию', value: '' };
		user.patr			= { msg: 'Введите отчество', value: ''};
		user.age			= { msg: 'Введите возраст', value: '', num: true };
		user.gender		= { msg: 'Ваш пол — мужской? (Ок — да, отмена — нет)', value: 0, confirm: true };

		for (prop in user) {
			var res = canShowNext(user[prop]);
		}

		formatData(user);

	}

	getData();

	btn.addEventListener('click', function(evt){
		getData();
	})
}

window.addEventListener('load', ready)

},{}],29:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '2256' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[29,25])
//# sourceMappingURL=/dist/2f148ca6df8cad2ac66487fc51ad4d1d.map