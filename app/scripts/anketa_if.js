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
