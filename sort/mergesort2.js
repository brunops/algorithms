function mergesort(array) {
  var middle;

  if (array.length === 1) {
    return array;
  }

  middle = array.length / 2 >> 0;

  return merge(mergesort(array.slice(0, middle)), mergesort(array.slice(middle, array.length)));
}

// iterative merge
function merge(array1, array2) {
  var result = []

  while (array1.length > 0 && array2.length > 0) {

    if (array1[0] < array2[0]) {
      result.push(array1.shift());
    }
    else {
      result.push(array2.shift());
    }

  }

  return result.concat(array1).concat(array2);
}

module.exports = mergesort;
