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

  print: function () {
    var curr = this.head;

    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
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
