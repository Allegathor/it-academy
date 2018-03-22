var btn = document.getElementById('check-btn');
var input = document.getElementById('text-area');

var formatString = function(str) {

  var s = str.toLowerCase();

  s = s.replace(/[\n\u0020\u2013\u2014\-?!'".,ьъ]/g, '');
  s = s.replace(/ё/g, 'е');
}

var isPalindrome = function(str) {

  var startIndex = 0;
  var stopIndex = str.length - 1;

  var i = startIndex;
  var j = stopIndex;

  if (str.length > 2) {

    while(str.charAt(i) === str.charAt(j))  {
      i++;
      j--;

      if (i > j) {
        return true;
      }
    }

    return false;

  } else if (str.length === 2) {
    return (str.charAt(i) === str.charAt(j)) ? true : false;

  } else if (str.length === 1) {
    return true;
  }
}


var isPalindromeRecur = function(str, i, j) {
  i = i || 0;
  j = j || str.length - 1;

  if (i < j) {
    if (str.charAt(i) === str.charAt(j)) {
      return isPalindromeRecur(str, i + 1, j - 1);

    } else {
      return false;

    }
  }

  return true;

}


var btnHandler = function() {
  console.log(isPalindrome(input.value));
  console.log(isPalindromeRecur(input.value));
}

btn.addEventListener('click', btnHandler);
