var findPrimeNums = function(startIndex, stopIndex) {
	var count = 0;

	for(var i = startIndex; i <= stopIndex; i++) {

		var k = 1;
		do {

			k++;

			if(k === i) {
				console.log(i);
				count++;
			}

		} while(i % k && k < i);
	}

	document.querySelector('.js-prime-nums').innerText = 'Общее количество простых чисел: ' + count;
}

findPrimeNums(1, 1000);
