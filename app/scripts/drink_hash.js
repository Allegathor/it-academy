var HashStorage = function() {
	this.storage = {};
}

HashStorage.prototype.addValue = function(key, val) {
	this.storage[key] = val;
}

HashStorage.prototype.getValue = function(key) {
	return this.storage[key];
}

HashStorage.prototype.deleteValue = function(key) {
	if (key in this.storage) {
		delete this.storage[key];
		return true;
	}
	return false;
}

HashStorage.prototype.getKeys = function() {
	return Object.keys(this.storage);
}

var drinkStorage = new HashStorage();

var inputName = document.getElementById('input-name');
var inputNameDel = document.getElementById('input-name-del');
var inputNameGet = document.getElementById('input-name-get');
var receipt = document.getElementById('input-receipt')
var btnAdd = document.getElementById('add-drink');
var btnGet = document.getElementById('get-drink');
var btnDel = document.getElementById('del-drink');
var btnLi = document.getElementById('li-drink');

var btnAddHandler = function(evt) {
	if (drinkStorage.getValue(inputName.value)) {
		alert('Такой напиток уже есть!');
	} else {
		var isChecked =
			Array.prototype.some.call(document.querySelectorAll('.radio'),
			function(el, i) { if (el.checked) return (el.value === "true") ?
			true : false });

		drinkStorage.addValue(inputName.value, {
			receipt: receipt.value,
			alcoholic: isChecked
		});

		alert('Напиток с названием "' + inputName.value + '" добавлен успешно')

	}

	inputName.value = '';
	receipt.value = '';
}

var btnGetHandler = function(evt) {
	var info = drinkStorage.getValue(inputNameGet.value);

	if (info) {
		var string =  'напиток: ' + inputNameGet.value + '\n' +
			'алкогольный: ' + ((info.alcoholic) ? 'да' : 'нет') + '\n' +
			'рецепт приготовления: ' + info.receipt;
		alert(string);
	} else {
		alert('Такого напитка нет в списке!');
	}
}

var btnDelHandler = function(evt) {
	var isDel = drinkStorage.deleteValue(inputNameDel.value);
	if (isDel) {
		alert('Напиток с названием "' + inputNameDel.value + '" успешно удалён')
	} else {
		alert('Невозможно удалить напиток, т.к. его нет в списке!')
	}
	inputNameDel.value = '';
}

var btnLiHandler = function(evt) {
	alert(drinkStorage.getKeys());
}

btnAdd.addEventListener('click', btnAddHandler);
btnGet.addEventListener('click', btnGetHandler);
btnDel.addEventListener('click', btnDelHandler);
btnLi.addEventListener('click', btnLiHandler);
