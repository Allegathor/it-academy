var testStr = 'abcdef';

var reverseString = function(str) {
	var chars = str.split('');
	var reversedStr = chars.reverse().join('');

	return reversedStr;
}

console.log(reverseString(testStr));
