function selectNumFrom(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function showRandomColors(colorsCount) {
	colorsCount = (colorsCount <= 7) ? colorsCount : 3;
	var colors = [ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
	var used = {};

	for(var i = 1; i <= colorsCount; i++) {

		var n = selectNumFrom(1, 7);
		var color = colors[n];

		while (color in used) {
			n = selectNumFrom(1, 7);
			color = colors[n];
		}

		used[color] = true;
		console.log(color);
	}
}

showRandomColors(5);
