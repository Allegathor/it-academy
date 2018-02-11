var btn = document.getElementById('count-btn');
var input = document.getElementById('text-area');

var countVowels = function(string) {
  string = string.toLowerCase();
  var count = {
    'а': 0,
    'е': 0,
    'ё': 0,
    'и': 0,
    'о': 0,
    'у': 0,
    'э': 0,
    'ю': 0,
    'я': 0,
    'ы': 0
  }

  var char;
  for(var i = 0; i < string.length; i++) {
   char = string[i];
   if (char in count) {
     count[char]++;
   }
  }

  return count;
}


var btnHandler = function() {
  console.log(countVowels(input.value));
}

btn.addEventListener('click', btnHandler);
