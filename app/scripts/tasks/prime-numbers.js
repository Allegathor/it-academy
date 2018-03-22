var findPrimeNums = function(startIndex, stopIndex) {
	var count = 0;
	var tbody = document.querySelector('.js-prime-tbody');
	var row = 1;
	var alpha = 0.02;

	for(var i = startIndex; i <= stopIndex; i++) {

		var k = 1;

		do {
			k++;

			if(k === i) {

				if( !(count % 12) && count !== 0 ) {
					row++;
				}

				tbody.querySelector('.js-row-' + row).insertAdjacentHTML('beforeEnd', '<td style="background-color: rgba(0, 52, 180, ' + alpha + ');">' + i + '</td>');

				count++;
				alpha += 0.0045;
			}

		} while(i % k && k < i);
	}

	document.querySelector('.js-prime-count').innerText = 'Общее количество простых чисел: ' + count;
}

findPrimeNums(1, 1000);
