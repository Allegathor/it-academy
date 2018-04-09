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
})({37:[function(require,module,exports) {
var formDef1 = [{ label: 'Название сайта:', kind: 'longtext', name: 'sitename' }, { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' }, { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' }, { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' }, { label: 'Рубрика каталога:', kind: 'combo', name: 'division',
	variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }] }, { label: 'Размещение:', kind: 'radio', name: 'payment',
	variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }] }, { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' }, { label: 'Описание сайта:', kind: 'memo', name: 'description' }, { label: 'Опубликовать', kind: 'submit' }];

var formDef2 = [{ label: 'Фамилия:', kind: 'longtext', name: 'lastname' }, { label: 'Имя:', kind: 'longtext', name: 'firstname' }, { label: 'Отчество:', kind: 'longtext', name: 'secondname' }, { label: 'Возраст:', kind: 'number', name: 'age' }, { label: 'Зарегистрироваться', kind: 'submit' }];

var createEl = function createEl(tagName, options) {
	var el = document.createElement(tagName);

	if (options) {
		for (var prop in options) {
			if (options[prop] !== '') el[prop] = options[prop];
		}
	}

	return el;
};

var createInput = function createInput(options) {
	return createEl('input', options);
};

var createLabel = function createLabel(txt) {
	var label = createEl('label');
	label.innerText = txt;
	label.style = 'flex-basis: 180px;';

	return label;
};

var createWrap = function createWrap() {
	var wrap = document.createElement('div');
	wrap.style = 'display: flex; flex-wrap: wrap; margin-bottom: 8px;';

	return wrap;
};

var createRow = function createRow(options, txt) {
	var input = createInput(options);
	var label = createLabel(txt);
	var row = createWrap();

	row.appendChild(label);
	row.appendChild(input);

	return row;
};

var createFormElements = function createFormElements(form, data) {

	var formEl = null;
	var input = null;
	var label = null;

	data.forEach(appendFormElements);
	function appendFormElements(elProps, i) {

		if ('kind' in elProps) {
			var name = elProps.name || '';
			var labelTxt = elProps.label || '';

			var options = {};

			switch (elProps.kind) {

				case 'longtext':
					options.type = 'text';
					options.name = name;
					options.style = 'flex-basis: 60%;';
					formEl = createRow(options, labelTxt);
					break;

				case 'shorttext':
					options.type = 'text';
					options.name = name;
					options.style = 'flex-basis: 30%;';
					formEl = createRow(options, labelTxt);
					break;

				case 'number':
					options.type = 'number';
					options.name = name;
					options.style = 'flex-basis: 12%;';
					formEl = createRow(options, labelTxt);
					break;

				case 'combo':
					options.name = name;
					input = createEl('select', options);
					label = createLabel(labelTxt);
					formEl = createWrap();

					if ('variants' in elProps) {
						elProps.variants.forEach(function (el, i) {
							var txt = el.text || '';
							var val = el.val || '';

							input.appendChild(createEl('option', { innerText: txt, value: val }));
						});
					}

					formEl.appendChild(label);
					formEl.appendChild(input);
					break;

				case 'memo':
					options = { name: name, rows: 5, style: 'flex-basis: 100%;' };
					input = createEl('textarea', options);
					label = createLabel(labelTxt);
					formEl = createWrap();

					formEl.appendChild(label);
					formEl.appendChild(input);
					break;

				case 'check':
					options.type = 'checkbox';
					options.name = name;
					formEl = createRow(options, labelTxt);
					break;

				case 'radio':
					options.name = name;

					formEl = createWrap();
					label = createLabel(labelTxt);

					formEl.appendChild(label);

					if ('variants' in elProps) {
						elProps.variants.forEach(function (el, i) {
							var txt = el.text || '';
							var val = el.value || '';

							formEl.appendChild(createInput({ type: 'radio', value: val, name: name }));
							formEl.appendChild(createLabel(txt));
						});
					}
					break;

				case 'submit':
					options.type = 'submit';
					options.value = labelTxt;
					input = createInput(options);
					label = createLabel(labelTxt);
					formEl = createWrap();

					formEl.appendChild(label);
					formEl.appendChild(input);
					break;

				default:
					console.warn('Some elements were missed');
					break;
			}
		}

		if (formEl) form.appendChild(formEl);
	}
};

var createForm = function createForm(data, form) {
	form = form || document.createElement('form');
	form.method = 'POST';
	form.action = 'http://fe.it-academy.by/TestForm.php';
	form.style = 'width: 60%; margin: 12px auto;';

	var fieldset = document.createElement('fieldset');
	fieldset.style = 'padding-top: 18px;';
	form.appendChild(fieldset);

	createFormElements(fieldset, data);
	document.body.appendChild(form);
};

createForm(formDef1);
createForm(formDef2);
},{}]},{},[37])