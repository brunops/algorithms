function mergesort(array) {
  var middle;

  if (array.length <= 1) {
    return array;
  }

  middle = array.length / 2 >> 0;
 
  return  merge(mergesort(array.slice(0, middle)), mergesort(array.slice(middle, array.length)));
}

// recursive merge for the luuulz
function merge(arr1, arr2) {
  if (!arr1.length) {
    return arr2;
  }

  if (!arr2.length) {
    return arr1;
  }

  if (arr1[0] < arr2[0]) {
    return [arr1[0]].concat(merge(arr1.slice(1, arr1.length), arr2));
  }
  else {
    return [arr2[0]].concat(merge(arr2.slice(1, arr2.length), arr1));
  }
}

module.exports = mergesort;
