var btn = document.getElementById('trim-string');
var input = document.getElementById('input-string');

var trimString = function(string) {
	var i = 0;
	var j = string.length - 1;

	while (string.charAt(i) === '\u0020') {
		i++;
	}

	while (string.charAt(j) === '\u0020' && j >= i) {
		j--;
	}

	string = string.substring(i, j + 1);
	return string;
}

var btnHandler = function() {
	console.log('input: "' + input.value + '"')
	var trimmed = trimString(input.value);
	console.log('output: "' + trimmed + '"');
}

btn.addEventListener('click', btnHandler);
