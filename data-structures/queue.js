var Node = function (data) {
  this.data = data;
  this.next = null;
};

var Queue = function () {
  this.first = null;
  this.last = null;
};

Queue.prototype = {
  enqueue: function (data) {
    var node = new Node(data);

    if (!this.first) {
      this.first = node;
      this.last = node;
    }
    else {
      this.last.next = node;
      this.last = node;
    }

    return node;
  },

  dequeue: function () {
    var first = this.first;

    if (first) {
      this.first = first.next;
    }

    return first ? first.data : null;
  },

  isEmpty: function () {
    return this.first === null;
  }
};

module.exports = Queue;

if (require.main === module) {
  var assert = require('../misc/javascript/assert');

  var queue = new Queue();
  assert(queue.isEmpty() === true, "#isEmpty returns true when queue is empty");
  queue.enqueue(1);
  assert(queue.first.data === 1, "first is 1");
  assert(queue.last.data === 1, "last is 1");
  assert(queue.isEmpty() === false, "#isEmpty returns false when queue is not empty");

  queue.enqueue(2);
  assert(queue.first.data === 1, "first is 1");
  assert(queue.last.data === 2, "last is 2");

  queue.enqueue(3);
  assert(queue.first.data === 1, "first is 1");
  assert(queue.last.data === 3, "last is 3");

  assert(queue.dequeue() === 1, "FIFO, first dequeued item is 1");
  assert(queue.dequeue() === 2, "FIFO, second dequeued item is 2");
  assert(queue.dequeue() === 3, "FIFO, third dequeued item is 3");
  assert(queue.dequeue() === null, "FIFO, #dequeue returns null when queue is empty");

  assert(queue.isEmpty() === true, "#isEmpty returns true when queue is empty");

  console.log('\n\nwin!')
}

