var input = document.getElementById('exp-input');
var output = document.getElementById('exp-result');

var getTokens = function(str) {
	var arr;
	var s = str.replace(/[^|.+-/*()0-9.]/g, '');
	s = s.replace(/(?:(?<=[-+/*^]|^)[-+])?\d+(?:[.]\d+)?|(?:(?<=[\d])[+-]|[*/()])/g, '$&|');

	arr = s.split('|');
	arr.pop();
	return arr;
}

var calc = function(tokens) {
	var operators = {
		'+': function(a, b){ return a + b },

		'-': function(a, b){ return a - b},

		'*': function(a, b){ return a * b },

		'/': function(a, b){ return a / b}
	};

	var tsStack = [];
	var oq = [];
	var t;

	for (var i = 0; i < tokens.length; i++) {
		t = tokens[i];

		if (!isNaN(t)) {
			oq.push(parseFloat(t));

		} else if (t in operators) {

			while((t === '+' || t === '-') && (tsStack[tsStack.length - 1] === '/' || tsStack[tsStack.length - 1] === '*') ) {
				oq.push(tsStack.pop());

			}

			tsStack.push(t);

		} else if (t === '(') {
			tsStack.push(t);

		} else if (t === ')') {
			while(tsStack[tsStack.length - 1] !== '(') {
				oq.push(tsStack.pop());
			}

			tsStack.pop();
		}
	}

	while(tsStack.length) {
		oq.push(tsStack.pop());
	}

	var stack = [];
	var el;
	var opd1;
	var opd2;
	var val;

	for(var n = 0; n < oq.length; n++) {
		el = oq[n];

		if(!isNaN(el)) {
			stack.push(el);

		} else if (el in operators) {
			opd1 = stack.pop();
			opd2 = stack.pop();

			val = operators[el](opd2, opd1);
			stack.push(val);
		}
	}

	return stack[0];
}


input.addEventListener('change', function(evt) {
	output.textContent = calc(getTokens(input.value));
})
