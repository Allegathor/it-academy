var btn = document.querySelector('.js-data-btn');

var findSubStr = function(str, k) {
	var subStrArr = str.split(' ');
	var head = 1;
	var q = [];
	var res;

	if (subStrArr.length > k) {

		for (var i = 0; i < subStrArr.length; i++) {

			if (subStrArr[i].length > head) {
				q.unshift(subStrArr[i]);
				head = subStrArr[i].length;

				if (q.length > k) {
					q.pop();
				}

			}

		}

		res = q.join(';');
		alert(res);

	} else {
		res = subStrArr.join(';');
		alert(res);
	}
}

var requestText = function() {
	var text = prompt('Введите текст', '');
	if (text === null) { return; }

	findSubStr(text, 3);
}

btn.addEventListener('click', function(evt){
	requestText();
})
