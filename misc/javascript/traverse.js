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


const dfspost = (root, cb) => {
  const queue = [ root ]

  while (queue.length) {
    const curr = queue.pop()

    if (cb) {
      cb(curr)
    }

    for (let i = 0; i < curr.children.length; ++i) {
      queue.push(curr.children[i])
    }
  }
}

const dfspre = (root, cb) => {
  const queue = [ root ]

  while (queue.length) {
    const curr = queue.pop()

    if (cb) {
      cb(curr)
    }

    for (let i = curr.children.length - 1; i >= 0; --i) {
      queue.push(curr.children[i])
    }
  }
}

exports.bfs = bfs;

if (require.main === module) {
  var Tree = require('../../data-structures/tree');

  var assert = require('./assert');

  // Create this super tree
  //          1
  //        /    \
  //      2        3
  //    / | \   / | \ \
  //   4  5 6  7  8 9  10

  var tree = new Tree(1),
      branch2 = tree.addChild(2),
      branch3 = tree.addChild(3),
      leaf4 = branch2.addChild(4),
      leaf5 = branch2.addChild(5),
      leaf6 = branch2.addChild(6),
      leaf7 = branch3.addChild(7),
      leaf8 = branch3.addChild(8),
      leaf9 = branch3.addChild(9),
      leaf10 = branch3.addChild(10);

  // Generate `bfs` expected result
  var expectedResult = (new Array(11)).join('0').split('').map(function (el, i) {
        return i + 1;
      }),
      result = [];

  bfs(tree, function (node) {
    result.push(node.value);
  });

  var bfsRecur = require('./dom-traverse').bfsRecur

  var result2 = []
  bfsRecur(tree, function (node) {
    result2.push(node.value);
  });

  console.log('result', result)
  console.log('result2', result2)

  console.log('pre')
  dfspre(tree, node => console.log(node.value))
  console.log('post')
  dfspost(tree, node => console.log(node.value))

  assert(result, expectedResult, '#bfs returns [1..10]');
}
