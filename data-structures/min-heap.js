var MinHeap = function () {
  this.heap = [null];

  // store root in position 1 to make calculations easier
  this.curr = 0;
};

MinHeap.prototype = {
  insert: function (num) {
    this.heap.push(num);
    this.curr++;
    this.bubbleUp(this.curr);
  },

  bubbleUp: function (index) {
    var parentIndex = this.parent(index);
    // stop at root
    if (parentIndex === -1) {
      return;
    }

    if (this.heap[index] < this.heap[parentIndex]) {
      var temp = this.heap[index];
      this.heap[index] = this.heap[parentIndex];
      this.heap[parentIndex] = temp;
      this.bubbleUp(parentIndex);
    }
  },

  top: function () {
    return this.heap[1] || null;
  },

  parent: function (index) {
    var parentIndex = index / 2 >> 0;

    return parentIndex || -1;
  },

  smallestChild: function (index) {
    var el = this.heap[index];

    if (!el) {
      return null;
    }

    var leftChildIndex = index * 2,
        rightChildIndex = index * 2 + 1;


    if (leftChildIndex <= this.curr && rightChildIndex <= this.curr) {
      if (this.heap[leftChildIndex] <= this.heap[rightChildIndex]) {
        return leftChildIndex;
      }

      return rightChildIndex;
    }
    else if (leftChildIndex <= this.curr) {
      return leftChildIndex;
    }
    else if (rightChildIndex <= this.curr) {
      return rightChildIndex;
    }
    else {
      return null;
    }
  },

  extractMin: function () {
    var min = this.top(),
        smallestChild = this.smallestChild(1);

    if (!min) {
      return null;
    }

    // take last element of the heap, set it as new root
    // and bubble it down to keep heap property
    var lastNode = this.heap.pop();

    // first element is null, so length 1 means empty heap
    if (this.heap.length > 1) {
      this.heap[1] = lastNode;
    }
    this.curr--;

    this.bubbleDown(1);

    return min;
  },

  bubbleDown: function (index) {
    var smallestChild = this.smallestChild(index);

    // base case
    if (!smallestChild) {
      return;
    }

    if (this.heap[index] > this.heap[smallestChild]) {
      var temp = this.heap[index];
      this.heap[index] = this.heap[smallestChild];
      this.heap[smallestChild] = temp;

      this.bubbleDown(smallestChild);
    }
  }
};

module.exports = MinHeap;

if (require.main === module) {
  var assert = require('../misc/javascript/assert');

  var minHeap = new MinHeap();

  assert(minHeap.top() === null, '#top() returns null, for empty heap');

  minHeap.insert(5);
  assert(minHeap.curr === 1, 'root is inserted at position 1');
  assert(minHeap.heap, [null, 5], '#insert(5) inserts 5 is at position 1');

  minHeap.insert(10);
  assert(minHeap.heap, [null, 5, 10], '#insert(10) inserts 10 is at position 2');

  assert(minHeap.top() === 5, '#top() returns 5, the root');

  assert(minHeap.parent(2) === 1, '#parent(2) returns 1, it\'s parent node index');
  assert(minHeap.parent(3) === 1, '#parent(3) returns 1, it\'s parent node index');
  assert(minHeap.parent(1) === -1, '#parent(1) returns -1 for root node');

  minHeap.insert(3);
  assert(minHeap.heap, [null, 3, 10, 5], '#insert(3) adds a min value that bubbles up to root');


  minHeap.insert(15);
  minHeap.insert(17);
  minHeap.insert(25);
  minHeap.insert(32);
  //                3
  //             /     \
  //           10        5
  //         /    \     /  \
  //       15      17  25   32

  minHeap.insert(2);
  minHeap.insert(13);
  minHeap.insert(20);
  //                2
  //             /     \
  //           3         5
  //         /    \     /  \
  //       10      17  25   32
  //      /  \    /
  //     15  13  20

  assert(minHeap.heap, [null, 2, 3, 5, 10, 17, 25, 32, 15, 13, 20], '#insert(2) properly bubbleUp all needed values');
  assert(minHeap.top(), '#top() is now 2');

  assert(minHeap.smallestChild(1) === 2, '#smallestChild(1) returns 2, the smallest child index');
  assert(minHeap.smallestChild(2) === 4, '#smallestChild(2) returns 2, the smallest child index');
  assert(minHeap.smallestChild(4) === 9, '#smallestChild(4) returns 9, the smallest child index');
  assert(minHeap.smallestChild(5) === 10, '#smallestChild(5) returns 10, the smallest child index');
  assert(minHeap.smallestChild(9) === null, '#smallestChild(9) returns null because there are no children');

  assert(minHeap.extractMin() === 2, '#extractMin() returns 2');

  //                3
  //             /     \
  //           10        5
  //         /    \     /  \
  //       13      17  25   32
  //      /  \
  //     15  20
  assert(minHeap.heap, [null, 3, 10, 5, 13, 17, 25, 32, 15, 20], '#extractMin() bubbles down the empty values');

  assert(minHeap.extractMin() === 3, '#extractMin() returns 3');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 5, '#extractMin() returns 5');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 10, '#extractMin() returns 10');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 13, '#extractMin() returns 13');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 15, '#extractMin() returns 15');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 17, '#extractMin() returns 17');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 20, '#extractMin() returns 20');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 25, '#extractMin() returns 25');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === 32, '#extractMin() returns 32');
  console.log(minHeap.heap);
  assert(minHeap.extractMin() === null, '#extractMin() returns null');
}
