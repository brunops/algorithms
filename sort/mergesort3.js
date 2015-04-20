var mergesort = function (array) {
  var middle;

  if (array.length <= 1) {
    return array;
  }

  middle = array.length / 2 >> 0;

  return merge(
    mergesort(array.slice(0, middle)),
    mergesort(array.slice(middle))
  );
};

// iterative merge tracking array heads, without `.shift()` calls
var merge = function (arr1, arr2) {
  var result = [],
      head1 = 0,
      head2 = 0;

  while (head1 < arr1.length && head2 < arr2.length) {
    if (arr1[head1] < arr2[head2]) {
      result.push(arr1[head1++]);
    }
    else {
      result.push(arr2[head2++]);
    }
  }

  return result
    .concat(arr1.slice(head1))
    .concat(arr2.slice(head2));
};

module.exports = mergesort;
