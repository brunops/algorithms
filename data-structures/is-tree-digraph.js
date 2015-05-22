var Queue = require('./queue');

function Node(id, data) {
  this.id = id;
  this.successors = [];

  // store random integer number as data
  this.data = data || Math.random() * 500 >> 0;
}

function isTree(nodes) {
  var visited,
      queue;

  for (var i = 0; i < nodes.length; ++i) {
    visited = {};

    // BFS
    queue = new Queue();

    // use node[i] (curr) as root
    queue.enqueue(nodes[i]);
    visited[nodes[i].id] = true;

    while (!queue.isEmpty()) {
      var curr = queue.dequeue();

      for (var n = 0; n < curr.successors.length; ++n) {
        var successor = curr.successors[n];
        if (!visited[successor.id]) {
          visited[successor.id] = true;
          queue.enqueue(successor);
        }
        else {
          // console.log('Node has multiple parents, not a tree!');
          return false;
        }
      }
    }

    if (nodes.length === Object.keys(visited).length) {
      // console.log("Tree!");
      return true;
    }
  }

  // console.log('empty list or sparse graph, not a tree');
  return false;
}


if (require.main === module) {
  var assert = require('../misc/javascript/assert');

  assert(isTree([]) === false, "Empty graph is not a tree");

  //
  //          1
  //       /     \
  //      /       \
  //     \/       \/
  //      2       3         // Digraph that is not a tree
  //       \     /
  //        \   /
  //        \/ \/
  //          4
  //

  var node1 = new Node(1),
      node2 = new Node(2),
      node3 = new Node(3),
      node4 = new Node(4);

  node1.successors.push(node2);
  node1.successors.push(node3);
  node2.successors.push(node4);
  node3.successors.push(node4);

  var digraph = [node2, node1, node3, node4];
  assert(isTree(digraph) === false, "Node has multiple parents! Not a tree!");

  //
  //          1
  //       /     \
  //      /       \
  //     \/       \/
  //      2       3       // tree!
  //       \
  //        \
  //        \/
  //          4
  //

  var node1 = new Node(1),
      node2 = new Node(2),
      node3 = new Node(3),
      node4 = new Node(4);

  node1.successors.push(node2);
  node1.successors.push(node3);
  node2.successors.push(node4);

  var digraph = [node2, node1, node3, node4];
  assert(isTree(digraph) === true, "No sparse nodes and no nodes with multiple parents - TREE!");




  //
  //          1
  //       /     \
  //      /       \
  //     \/       \/
  //      2       3
  //       \
  //        \            5  -> forever alone node :(
  //         \                 not a tree
  //         \/
  //          4
  //

  var node1 = new Node(1),
      node2 = new Node(2),
      node3 = new Node(3),
      node4 = new Node(4),
      node5 = new Node(5);

  node1.successors.push(node2);
  node1.successors.push(node3);
  node2.successors.push(node4);

  var digraph = [node2, node1, node3, node4, node5];
  assert(isTree(digraph) === false, "Sparse digraph has a forever alone node, not a tree :/");
}
