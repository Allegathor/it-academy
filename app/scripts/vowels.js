var btn = document.getElementById('count-btn');
var input = document.getElementById('text-area');

var countVowels = function(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	}

	var char;
	var count = 0;

	for(var i = 0; i < string.length; i++) {
	 char = string[i];
	 if (char in vowels) {
		 count++;
	 }
	}

	return count;
}

var countVowelsFE = function(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	}

	var count = 0;
	var countVow = function(ch, i) {
		if (ch in vowels) {
			count++;
		}
	}
	string.split('').forEach(countVow);

	return count;
}

var countVowelsFilter = function(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	}

	var filterByType = function(ch, i) {
		if (ch in vowels) {
			return true;
		}
	}

	return string.split('').filter(filterByType).length;
}

var countVowelsReduce = function(string) {
	string = string.toLowerCase();
	var vowels = {
		'а': 0, 'е': 0, 'ё': 0, 'и': 0,
		'о': 0, 'у': 0, 'э': 0, 'ю': 0,
		'я': 0, 'ы': 0
	}

	var reduceToVowCount = function(acc, ch) {
		if (ch in vowels) {
			return ++acc;
		}

		return acc;
	}

	return string.split('').reduce(reduceToVowCount, 0);
}


var btnHandler = function() {
	console.log(countVowels(input.value));
	console.log('forEach: ' + countVowelsFE(input.value));
	console.log('filter: ' + countVowelsFilter(input.value));
	console.log('reduce: ' + countVowelsReduce(input.value));
}

btn.addEventListener('click', btnHandler);
