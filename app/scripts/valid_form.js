var form = document.getElementById('sites-form');
form.position = 'relative';
form.noValidate = true;

var formElements = Array.prototype.filter.call(form.elements, function(el) {
	if(el.type !== 'submit' && el.tagName !== 'BUTTON') {
		return el;
	}
})

var sectionSelect = form['section'];
var paymentRadioBtns = form['payment'];
var allowFeedbackchbx = form['allow-feedback'];
var submitBtn = document.getElementById('send-btn');

var isFilled = function(val) {
	return (val !== '') ? true : false;
}

var isValidDate = function(d, m, y) {
	var daysMax;

	switch(m) {
		case 1:
			daysMax = (y % 4 && !(y % 100) || y % 400) ? 28 : 29;
			break;
		case 8: case 3: case 5: case 10:
			daysMax = 30;
		default:
			daysMax = 31;
	}

	return ((m >= 0 && m <= 11) && (d >= 1 && d <= daysMax)) ? true : false;
}

var animate = function(fn, duration) {
	var start = performance.now();

	requestAnimationFrame(function animate(time) {
		var timePassed = time - start;

		if(timePassed > duration) timePassed = duration;

		fn(timePassed);

		if(timePassed < duration)
			requestAnimationFrame(animate);
	})
}

var createWarnLabel = function(id, mountPoint, msg) {
	DEFAULT_MSG = 'Есть ошибки в заполнении формы!\n';

	var currentLabel = document.getElementById(id);

	if(currentLabel && msg) {
		currentLabel.innerText = DEFAULT_MSG + msg;
		return;
	} else if(currentLabel) {
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
	animate(function(timePassed) {
		warnLabel.style.transform =
			'scaleY(' + timePassed / 200 + ')';
	}, 200)
}

var removeWarnLabel = function(id, mountPoint) {
	var warnLabel = document.getElementById(id);

	if(warnLabel)
		mountPoint.removeChild(warnLabel);

	return;
}

var isValidVal = function(el, success, msg) {
	msg = msg || '';

	var id = el.name + '-warn';
	var parent = el.parentNode;
	parent.style.position = 'relative';

	if(success) {
		el.style.borderColor = '#8c1';
		removeWarnLabel(id, parent);
		return true;

	} else {
		el.style.borderColor = 'crimson';

		createWarnLabel(id, parent, msg);
		return false;
	}

}

var checkInputValidity = function(el, type) {
	var name = el.name || '';
	var val = el.value || '';

	if(type === 'text') {
		if(isFilled(val)) {

			if(name === 'url') {
				val = val.toLowerCase();
				var urlPattern =
					/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

				return (val.match(urlPattern)) ?
				isValidVal(el, true) :
				isValidVal(el, false, 'Неправильный адрес сайта');
			}

			if(name === 'email') {
				val = val.toLowerCase();
				var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

				return (val.match(emailPattern)) ?
				isValidVal(el, true) :
				isValidVal(el, false, 'Неправильный адрес почты');
			}

			if(name === 'visitors') {
				val = parseInt(val);

				return (!isNaN(val) && val >= 0) ?
				isValidVal(el, true) :
				isValidVal(el, false, 'Значение должно быть положительным числом');
			}

			if(name === 'launch-date') {
				var datePattern = /^\d\d[\/\.]\d\d[\/\.]\d\d\d\d$/;

				if (val.match(datePattern)) {
					var dateParts = val.split(/\./g);
					var dateNums = dateParts.map(function(str) { return parseInt(str) });
					var d = dateNums[0];
					var m = dateNums[1] - 1;
					var y = dateNums[2];

					return (isValidDate(d, m, y)) ?
					isValidVal(el, true) :
					isValidVal(el, false, 'Неверная дата (превышено количество дней или месяцев)');

				} else {
					return isValidVal(el, false, 'Введите дату в формате дд.мм.гггг');
				}

			}

			return isValidVal(el, true);

		} else {
			return isValidVal(el, false, 'Поле не должно быть пустым');
		}

	}

	if(type === 'checkbox') {
		return (el.checked) ?
		isValidVal(el, true) :
		isValidVal(el, false, 'Отзывы должны быть включены');
	}

	if(type === 'option') {

	}

	if(type === 'radio') {
		var checked = el.checked;

		if(checked) {
			return (val !== '1') ?
			isValidVal(el, true) :
			isValidVal(el, false, 'Размещение не может быть бесплатным');

		} else {

			checked = Array.prototype.some.call(paymentRadioBtns, function(btn, i) {
				el = btn;
				return btn.checked;
			})
			return (checked) ?
			isValidVal(el, true) :
			isValidVal(el, false, 'Выберите одну из опций');

		}

	}

	if(type === 'select') {
		return (val !=='1') ?
		isValidVal(el, true) :
		isValidVal(el, false, 'Выбрана неверная рубрика');
	}

	return true;
}

var formBlurHandler = function(evt) {
	var type = evt.target.type || '';
	var tagName = evt.target.tagName;

	if(type === 'text' || tagName === 'TEXTAREA') {
		checkInputValidity(evt.target, 'text');
	}
}

var chbxChangeHandler = function(evt) {
	checkInputValidity(evt.target, 'checkbox');
}

var radioClickHandler = function(evt) {
	checkInputValidity(evt.target, 'radio');
}

var selectChangeHandler = function(evt) {
	checkInputValidity(evt.target, 'select')
}

var submitHandler = function(evt) {
	var isValid = true;
	var	isFailed = false;

	formElements.forEach(function(el, i) {

		var tagName = el.tagName;

		if(tagName === 'TEXTAREA') {
			isValid = checkInputValidity(el, 'text');
		} else if(tagName === 'SELECT') {
			isValid = checkInputValidity(el, 'select');
		} else {
			isValid = checkInputValidity(el, el.type);
		}

		if(!isFailed && !isValid) {
			isFailed = true;
			el.focus();
			evt.preventDefault();
		}
	})

}

form.addEventListener('focusout', formBlurHandler);
allowFeedbackchbx.addEventListener('change', chbxChangeHandler);
sectionSelect.addEventListener('change', selectChangeHandler);

paymentRadioBtns.forEach(function(btn, i) {
	btn.addEventListener('click', radioClickHandler);
})

submitBtn.addEventListener('click', submitHandler);
