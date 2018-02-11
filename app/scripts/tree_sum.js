var m = [ 5, 7,
        [ 4, [2], 8, [1,3], 2 ],
        [ 9, [] ],
        1, 8, []];

var treeSum = function(arr, curIndex, stopIndex) {
  curIndex = curIndex || 0;
  stopIndex = stopIndex || arr.length - 1;

  var floatVal = parseFloat(arr[curIndex]);

  if ( Array.isArray(arr[curIndex]) && (arr[curIndex].length) ) {
    if (curIndex === stopIndex) {
      return treeSum(arr[curIndex]);
    }
    return treeSum(arr[curIndex]) + treeSum(arr, curIndex + 1);

  } else if ( !isNaN(floatVal) ) {
    if (curIndex === stopIndex) {
      return floatVal;
    }
    return floatVal + treeSum(arr, curIndex + 1);

  } else {
    if (curIndex === stopIndex) {
      return 0;
    }
    return treeSum(arr, curIndex + 1);
  }

}

console.log(treeSum(m));
