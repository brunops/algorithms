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





