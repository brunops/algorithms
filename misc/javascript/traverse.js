var Queue = require('../../data-structures/queue');

var bfs = function (root, callback) {
  if (!root) {
    throw new Error('`root` can\'t be null');
  }

  var queue = new Queue();

  if (callback) {
    callback(root);
  }

  queue.enqueue(root);
  while (!queue.isEmpty()) {
    var curr = queue.dequeue();
    curr.children.forEach(function (child) {
      if (callback) {
        callback(child);
      }

      queue.enqueue(child);
    });
  }
};

exports.bfs = bfs;
