// sum1 = 50, sum2 = 54
var arr1 = [ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8]
var arr2 = [[], ['1', '1'], 2, [1, 4, [[2, 1, 3], [4, 2]], 5], [4, 6, [3, 7, 5]], '8', [], [5], [], ['-9', -1], []];

var treeSum = function(arr) {

  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    var floatVal = parseFloat(el) || 0;

    if (Array.isArray(el) && (el.length)) {
      sum += treeSum(el);

    } else if ( (floatVal) !== 0) {
      sum += floatVal;

    }
  }

  return sum;
}

var treeSumRecur = function(arr, curIndex, stopIndex) {
  curIndex = curIndex || 0;
  stopIndex = stopIndex || arr.length - 1;

  var el = arr[curIndex];
  var floatVal = parseFloat(el) || 0;

  if ( Array.isArray(el) && (el.length) )  {
    floatVal = treeSumRecur(el);
  }

  return ( curIndex < stopIndex) ?
  floatVal + treeSumRecur(arr, curIndex + 1) :
  floatVal; // base case

}

console.log( 'Loop: \nsum1 =', treeSum(arr1), '\nsum2 =', treeSum(arr2) );
console.log( 'Recursive: \nsum1 =', treeSumRecur(arr1), '\nsum2 =', treeSumRecur(arr2) );
