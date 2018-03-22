var input = document.getElementById('year-input');
var centuryOut = document.getElementById('century');

function getCentury(s) {
	var y = parseInt(s);
	return Math.ceil(y / 100) || 0;
}

input.addEventListener('input', function(evt) {
	centuryOut.textContent = getCentury(input.value) + ' век';
})
