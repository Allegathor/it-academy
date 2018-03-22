// sum1 = 50, sum2 = 54
var arr1 = [ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8]
var arr2 = [[], ['1', '1'], 2, [1, 4, [[2, 1, 3], [4, 2]], 5], [4, 6, [3, 7, 5]], '8', [], [5], [], ['-9', -1], []];

var treeSum = function(arr) {

  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];

    if (Array.isArray(el) && (el.length)) {
      sum += treeSum(el);

    } else {
      sum += parseFloat(el) || 0;

    }
  }

  return sum;
}

console.log( 'Loop: \nsum1 =', treeSum(arr1), '\nsum2 =', treeSum(arr2) );
