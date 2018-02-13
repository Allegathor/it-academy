var btn = document.getElementById('check-btn');
var input = document.getElementById('text-area');

var isPalindrome = function(string) {

  var s = string.toLowerCase();

  s = s.replace(/[\n\u0020\u2013\u2014\-?!'".,ьъ]/g, '');
  s = s.replace(/ё/g, 'е');

  var startIndex = 0;
  var stopIndex = s.length - 1;

  var i = startIndex;
  var j = stopIndex;

  if (s.length > 2) {

    while(s.charAt(i) === s.charAt(j))  {
      i++;
      j--;

      if (i > j) {
        return true;
      }
    }

    return false;

  } else if (s.length === 2) {
    return (s.charAt(i) === s.charAt(j)) ? true : false;

  } else if (s.length === 1) {
    return true;
  }
}


var isPalindromeRecur = function(string) {

  var s = string.toLowerCase();
  var ch1;
  var ch2;

  s = s.replace(/[\n\u0020\u2013\u2014\-?!'".,ьъ]/g, '');
  s = s.replace(/ё/g, 'е');

  return (function isEqual(i, j) {
    i = i || 0;
    j = j || s.length - 1;

    ch1 = s[i];
    ch2 = s[j];

    if (i < j) {
      if (ch1 === ch2) {
        return isEqual(i + 1, j - 1);
      } else {
        return false;
      }
    }

    return true;
  })();

}


var btnHandler = function() {
  console.log(isPalindrome(input.value));
  console.log(isPalindromeRecur(input.value));
}

btn.addEventListener('click', btnHandler);
