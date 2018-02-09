var btn = document.getElementById('check-btn');
var input = document.getElementById('text-area');

var searchPalindrome = function(string) {

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

var btnHandler = function() {
  console.log(searchPalindrome(input.value));
}

btn.addEventListener('click', btnHandler);
