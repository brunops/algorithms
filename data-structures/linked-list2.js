function Node(num) {
  this.data = num;
  this.next = null;
}

function LinkedList(node) {
  if (node instanceof Node) {
    this.head = node;
  }
  else {
    this.head = null;
  }
}

LinkedList.prototype = {
  insertEnd: function (num) {
    var node = new Node(num),
        curr = this.head;

    // empty list
    if (!curr) {
      this.head = node;
      return node;
    }

    // non-empty list, find last node
    while (curr.next) {
      curr = curr.next;
    }

    curr.next = node;

    return node;
  },

  insertAfter: function (num, after) {
    var curr = this.head;

    // empty list
    if (!curr) {
      return null;
    }

    do {
      if (curr.data === after) {
        var node = new Node(num);

        node.next = curr.next;
        curr.next = node;
        return node;
      }

      curr = curr.next;
    } while (curr);

    return null;
  },

  insertBefore: function (num, before) {
    // empty list
    if (!this.head) {
      return null;
    }

    var prev = this.head,
        curr = prev.next;

    if (this.head.data === before) {
      var node = new Node(num);
      node.next = this.head;
      this.head = node;
      return node;
    }

    do {
      if (curr && curr.data === before) {
        var node = new Node(num);
        node.next = curr;
        prev.next = node;
        return node;
      }

      prev = curr;
      if (curr) {
        curr = curr.next;
      }
    } while (prev);

    return null;
  },

  findLoopBeginning: function () {
    var slow = this.head,
        fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) {
        // collision!
        break;
      }
    }

    // no cycle check
    if (fast === null || fast.next === null) {
      return null;
    }

    // move slow back to head and find stating node
    slow = this.head;
    while (slow !== fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return fast;
  },

  getLoopSize: function () {
    var size = 1,
        loopBeginning = this.findLoopBeginning();

    if (!loopBeginning) {
      // no loop!
      return 0;
    }

    var curr = loopBeginning.next;
    while (curr !== loopBeginning) {
      size += 1;
      curr = curr.next;
    }

    return size;
  },

  print: function () {
    var curr = this.head;

    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
};

module.exports = {
  Node: Node,
  LinkedList: LinkedList
};

var list = new LinkedList();

list.insertEnd(5);
list.insertEnd(5);
list.insertEnd(15);


list.print();
console.log('-------- 30 after 15');
list.insertAfter(30, 15);
list.print();

console.log('-------- 1 after 5');
list.insertAfter(1, 5);
list.print();

console.log('-------- 7 after 15');
list.insertAfter(7, 15);
list.print();


console.log('-------- 70 after 15000 (non existing number)');
list.insertAfter(70, 15000);
list.print();

console.log('-------- 1 before 15000 (non existing number)');
list.insertBefore(1, 15000);
list.print();

console.log('-------- 1 before 5');
list.insertBefore(1, 5);
list.print();

console.log('-------- 11 before 30');
list.insertBefore(11, 30);
list.print();

console.log('-------- 55 before 15');
list.insertBefore(55, 15);
list.print();



console.log('-------- [Cycle List]');

console.log('First list with no cycles, cycle starts at: %s', list.findLoopBeginning());
console.log('Loop size: %s', list.getLoopSize());


var list2 = new LinkedList();
console.log('\nnew list:')
console.log(' 1-2-3-5-8');
console.log('        / \\');
console.log('      35   13');
console.log('       |    \\');
console.log('       30    15');
console.log('        \\   /');
console.log('        25-21');

list2.insertEnd(1);
list2.insertEnd(2);
list2.insertEnd(3);
list2.insertEnd(5);
var cycleStart = list2.insertEnd(8);
list2.insertEnd(13);
list2.insertEnd(15);
list2.insertEnd(21);
list2.insertEnd(25);
list2.insertEnd(30);
var tail = list2.insertEnd(35);
tail.next = cycleStart;

console.log('Cycle starts at node: %s', list2.findLoopBeginning().data);
console.log('Loop size: %s', list2.getLoopSize());
