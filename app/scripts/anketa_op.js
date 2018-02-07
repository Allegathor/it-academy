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
		if (value !== '') {
			if ( type === 'string' && isNaN(toIntAttempt) ) {
				return true;

			} else if ( type === 'number' && !isNaN(toIntAttempt) ) {
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
			failMsg = (!prop.num) ? ' корректно! (поле не должно быть пустым; используйте кириллицу/латиницу; числовые значения не допускаются)' : ' корректно! (поле не должно быть пустым, а введёное значение должно являться числом)';

			while (!isValid(prop.value, expType)) {
				prop.value = (!fail) ? prompt(prop.msg, '') :
				prompt(prop.msg + failMsg, '');

				if (prop.value === null) { return false; }
				fail = true;
			}

		} else {
			prop.value = confirm(prop.msg);
			if (prop.value === null) { return false; }

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
			if (!res) {
				return;
			}
		}

		formatData(user);

	}

	getData();

	btn.addEventListener('click', function(evt){
		getData();
	})
}

window.addEventListener('load', ready)
