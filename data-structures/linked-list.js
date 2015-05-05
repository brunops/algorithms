function Node(data, next) {
  this.data = data;
  this.next = next;
}

function LinkedList(node) {
  this.head = node;
}

LinkedList.prototype.walk = function (callback) {
  var curr = this.head;
  while (curr) {
    if (callback) {
      callback(curr);
    }

    curr = curr.next;
  }
};

LinkedList.prototype.append = function (data) {
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
};

LinkedList.prototype.prepend = function (data) {
  var node = new Node(data);
  node.next = this.head;
  this.head = node;
};

LinkedList.prototype.remove = function (data) {
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

};

LinkedList.prototype.print = function () {
  this.walk(function (node) {
    console.log(node.data);
  });
};

var list = new LinkedList();

list.append(1);
list.append(5);
list.append(8);
list.append(2);
list.prepend(10);
list.prepend(77);
list.append(1);

list.remove(5);
list.remove(77);
list.remove(1);

list.print(); // 10 8 2 1



