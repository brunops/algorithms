var MinHeap = require('../data-structures/min-heap');

function heapsort(array) {
  var i,
      minHeap = new MinHeap(),
      sortedArray = [];

  for (i = 0; i < array.length; ++i) {
    minHeap.insert(array[i]);
  }

  for (i = 0; i < array.length; ++i) {
    sortedArray[i] = minHeap.extractMin();
  }

  return sortedArray;
}

if (require.main === module) {
  var assert = require('../misc/javascript/assert');

  assert(heapsort([]), [], 'empty array returns empty array');
  assert(heapsort([1, 2, 3]), [1, 2, 3], 'sorted array [1,2,3] returns [1,2,3]');
  assert(heapsort([3, 2, 1]), [1, 2, 3], 'unsorted array [3,2,1] returns [1,2,3]');
  assert(heapsort([34, 2, 34]), [2, 34, 34], 'unsorted array [34, 2, 34] returns [2, 34, 34]');
  assert(heapsort(
    [23, 23, 11, 23, 11, 32, 2222, 123, -6, 234, -1]),
    [-6, -1, 11, 11, 23, 23, 23, 32, 123, 234, 2222],
    'unsorted array [23, 23, 11, 23, 11, 32, 2222, 123, -6, 234, -1] returns [-6, -1, 11, 11, 23, 23, 23, 32, 123, 234, 2222]'
  );
}

