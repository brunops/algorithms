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
