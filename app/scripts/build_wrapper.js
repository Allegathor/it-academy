function htmlEscape(text) {
	return text.replace(/[<>&"']/gi, function(match) {
		switch(match) {
			case('<'):
				return '&lt;';
				break;
			case('>'):
				return '&gt;';
				break;
			case('&'):
				return '&amp;';
				break;
			case("'"):
				return '&apos;';
				break;
			case('"'):
				return '&quot;';
				break;
		}
	})
}

function buildWrapper(tag) {

	return function(innerText) {
		var escapedText = htmlEscape(innerText);

		return '<' + tag + '>' + escapedText + '</' + tag + '>';
	}

}

var testStr = `In JS 'a' > 10 returns false, but "a" > "10" returns true`;
var wrapH2 = buildWrapper('H2');
var wrapP = buildWrapper('P');

console.log(wrapH2(testStr));
console.log(wrapP(testStr));
