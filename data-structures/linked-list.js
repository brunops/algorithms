function Node(data, next) {
  this.data = data;
  this.next = next;
}

function LinkedList(node) {
  this.head = node;
}

LinkedList.prototype = {
  walk: function (callback) {
    var curr = this.head;
    while (curr) {
      if (callback) {
        callback(curr);
      }

      curr = curr.next;
    }
  },

  append: function (data) {
    var node = new Node(data);

    if (!this.head) {
      this.head = node;
    }
    else {
      var curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    }

    return node;
  },

  prepend: function (data) {
    var node = new Node(data);
    node.next = this.head;
    this.head = node;
  },

  remove: function (data) {
    var curr = this.head;

    if (!curr) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
    }
    else {
      while (curr.next) {
        if (curr.next.data === data) {
          curr.next = curr.next.next;
          break;
        }

        curr = curr.next;
      }
    }

  },

  print: function () {
    this.walk(function (node) {
      console.log(node.data);
    });
  }
};



module.exports = {
  Node: Node,
  LinkedList: LinkedList
};





