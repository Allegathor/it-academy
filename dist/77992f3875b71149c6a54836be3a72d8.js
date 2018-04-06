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
})({67:[function(require,module,exports) {
var form = document.getElementById('sites-form');
form.position = 'relative';
form.noValidate = true;

var formElements = Array.prototype.filter.call(form.elements, function (el) {
	if (el.type !== 'submit' && el.tagName !== 'BTN') {
		return el;
	}
});

var sectionSelect = form['section'];
var paymentRadioBtns = form['payment'];
var allowFeedbackchbx = form['allow-feedback'];
var submitBtn = document.getElementById('send-btn');

var isFilled = function isFilled(val) {
	return val !== '' ? true : false;
};

var isValidDate = function isValidDate(d, m, y) {
	var daysMax;

	switch (m) {
		case 1:
			daysMax = y % 4 && !(y % 100) || y % 400 ? 28 : 29;
			break;
		case 8:case 3:case 5:case 10:
			daysMax = 30;
		default:
			daysMax = 31;
	}

	return m >= 0 && m <= 11 && d >= 1 && d <= daysMax ? true : false;
};

var animate = function animate(fn, duration) {
	var start = performance.now();

	requestAnimationFrame(function animate(time) {
		var timePassed = time - start;

		if (timePassed > duration) timePassed = duration;

		fn(timePassed);

		if (timePassed < duration) requestAnimationFrame(animate);
	});
};

var createWarnLabel = function createWarnLabel(id, mountPoint, msg) {
	DEFAULT_MSG = 'Есть ошибки в заполнении формы!\n';

	var currentLabel = document.getElementById(id);

	if (currentLabel && msg) {
		currentLabel.innerText = DEFAULT_MSG + msg;
		return;
	} else if (currentLabel) {
		return;
	}

	var warnLabel = document.createElement('div');
	warnLabel.id = id;
	warnLabel.style.flexBasis = '100%';
	warnLabel.style.margin = '8px 0';
	warnLabel.style.padding = '0 20px';
	warnLabel.style.fontSize = '14px';
	warnLabel.style.color = 'crimson';
	warnLabel.style.whiteSpace = 'pre-line';

	warnLabel.style.transform = 'scaleY(0)';

	warnLabel.innerText = DEFAULT_MSG + msg;

	mountPoint.appendChild(warnLabel);
	animate(function (timePassed) {
		warnLabel.style.transform = 'scaleY(' + timePassed / 200 + ')';
	}, 200);
};

var removeWarnLabel = function removeWarnLabel(id, mountPoint) {
	var warnLabel = document.getElementById(id);

	if (warnLabel) mountPoint.removeChild(warnLabel);

	return;
};

var notify = function notify(el, success, msg) {
	msg = msg || '';

	var id = el.name + '-warn';
	var parent = el.parentNode;
	parent.style.position = 'relative';

	if (success) {
		el.style.borderColor = '#8c1';
		removeWarnLabel(id, parent);
		return true;
	} else {
		el.style.borderColor = 'crimson';

		createWarnLabel(id, parent, msg);
		return false;
	}
};

var checkInputs = function checkInputs(el, type) {
	var name = el.name || '';
	var val = el.value || '';

	if (type === 'text') {
		if (isFilled(val)) {

			if (name === 'url') {
				val = val.toLowerCase();
				var urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

				return val.match(urlPattern) ? notify(el, true) : notify(el, false, 'Неправильный адрес сайта');
			}

			if (name === 'email') {
				val = val.toLowerCase();
				var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

				return val.match(emailPattern) ? notify(el, true) : notify(el, false, 'Неправильный адрес почты');
			}

			if (name === 'visitors') {
				val = parseInt(val);

				return !isNaN(val) && val >= 0 ? notify(el, true) : notify(el, false, 'Значение должно быть положительным числом');
			}

			if (name === 'launch-date') {
				var datePattern = /^\d\d[\/\.]\d\d[\/\.]\d\d\d\d$/;

				if (val.match(datePattern)) {
					var dateParts = val.split(/\./g);
					var dateNums = dateParts.map(function (str) {
						return parseInt(str);
					});
					var d = dateNums[0];
					var m = dateNums[1] - 1;
					var y = dateNums[2];

					return isValidDate(d, m, y) ? notify(el, true) : notify(el, false, 'Неверная дата (превышено количество дней или месяцев)');
				} else {
					return notify(el, false, 'Введите дату в формате дд.мм.гггг');
				}
			}

			return notify(el, true);
		} else {
			return notify(el, false, 'Поле не должно быть пустым');
		}
	}

	if (type === 'checkbox') {
		return el.checked ? notify(el, true) : notify(el, false, 'Отзывы должны быть включены');
	}

	if (type === 'option') {}

	if (type === 'radio') {
		var checked = el.checked;

		if (checked) {
			return val !== '1' ? notify(el, true) : notify(el, false, 'Размещение не может быть бесплатным');
		} else {

			checked = Array.prototype.some.call(paymentRadioBtns, function (btn, i) {
				el = btn;
				return btn.checked;
			});
			return checked ? notify(el, true) : notify(el, false, 'Выберите одну из опций');
		}
	}

	if (type === 'select') {
		return val !== '1' ? notify(el, true) : notify(el, false, 'Выбрана неверная рубрика');
	}

	return true;
};

var formBlurHandler = function formBlurHandler(evt) {
	var type = evt.target.type || '';
	var tagName = evt.target.tagName;

	if (type === 'text' || tagName === 'TEXTAREA') {
		checkInputs(evt.target, 'text');
	}
};

var chbxChangeHandler = function chbxChangeHandler(evt) {
	checkInputs(evt.target, 'checkbox');
};

var radioClickHandler = function radioClickHandler(evt) {
	checkInputs(evt.target, 'radio');
};

var selectChangeHandler = function selectChangeHandler(evt) {
	checkInputs(evt.target, 'select');
};

var submitHandler = function submitHandler(evt) {
	var currentEl = null;
	var isValid = formElements.every(function (el, i) {

		var valid = false;
		currentEl = el;
		tagName = currentEl.tagName;

		if (tagName === 'TEXTAREA') {
			valid = checkInputs(el, 'text');
		} else if (tagName === 'SELECT') {
			valid = checkInputs(el, 'select');
		} else {
			valid = checkInputs(el, currentEl.type);
		}
		return valid;
	});

	if (!isValid) {
		currentEl.focus();
		evt.preventDefault();
	}
};

form.addEventListener('focusout', formBlurHandler);
allowFeedbackchbx.addEventListener('change', chbxChangeHandler);
sectionSelect.addEventListener('change', selectChangeHandler);

paymentRadioBtns.forEach(function (btn, i) {
	btn.addEventListener('click', radioClickHandler);
});

submitBtn.addEventListener('click', submitHandler);
},{}]},{},[67])