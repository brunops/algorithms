function Tree(value) {
  this.value = value;
  this.children = [];
}

Tree.prototype = {
  addChild: function (child) {
    if (!child || !(child instanceof Tree)) {
      child = new Tree(child);
    }

    if (this.isDescendant(child)) {
      throw new Error('Child is already a descendant.');
    }

    this.children.push(child);

    return child;
  },

  isDescendant: function (child) {
    if (!!~this.children.indexOf(child)) {
      return true;
    }

    this.children.forEach(function (el) {
      if (el.isDescendant(child)) {
        return true;
      }
    }, this);

    return false;
  },

  *[Symbol.iterator]() {
    let queue = [ this ]

    while (queue.length) {
      let curr = queue.shift()

      yield curr.value

      for (const child of curr.children) {
        queue.push(child)
      }
    }
  }
};

module.exports = Tree;

if (require.main === module) {
  var assert = require('../misc/javascript/assert');

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

  assert(tree.value === 1, 'Root node value is 1');
  assert(tree.children[0].value === 2, 'left root child is 2');
  assert(tree.children[0] === branch2, 'left root child is branch2');
  assert(tree.children[1].value === 3, 'right root child is 3');
  assert(tree.children[1] === branch3, 'right root child is branch3');

  assert(branch2.children[0].value === 4, 'left branch2 child is 4');
  assert(branch2.children[1].value === 5, 'middle branch2 child is 5');
  assert(branch2.children[2].value === 6, 'right branch2 child is 6');

  assert(branch3.children[0].value === 7, 'left branch3 child is 7');
  assert(branch3.children[1].value === 8, 'middle1 branch3 child is 8');
  assert(branch3.children[2].value === 9, 'middle2 branch3 child is 9');
  assert(branch3.children[3].value === 10, 'right branch3 child is 10');

  const iterator = tree[Symbol.iterator]()
  assert(iterator.next().value === 1, 'iterator.next().value is 1')
  assert(iterator.next().value === 2, 'iterator.next().value is 2')
  assert(iterator.next().value === 3, 'iterator.next().value is 3')
  assert(iterator.next().value === 4, 'iterator.next().value is 4')
  assert(iterator.next().value === 5, 'iterator.next().value is 5')
  assert(iterator.next().value === 6, 'iterator.next().value is 6')
  assert(iterator.next().value === 7, 'iterator.next().value is 7')
  assert(iterator.next().value === 8, 'iterator.next().value is 8')
  assert(iterator.next().value === 9, 'iterator.next().value is 9')
  assert(iterator.next().value === 10, 'iterator.next().value is 10')
  assert(iterator.next().done === true, 'iterator.next().done is true')
}


