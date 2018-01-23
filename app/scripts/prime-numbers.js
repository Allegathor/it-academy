var findPrimeNums = function(startIndex, stopIndex) {
	var count = 0;
	for(var i = startIndex; i <= stopIndex; i++) {
		if(i !== 0 && i !== 1 && i & 1) {
			count++;
			console.log(i);
		}
	}

	document.querySelector('.js-prime-nums').innerText = 'Общее количество простых чисел: ' + count;
}

findPrimeNums(1, 1000);
